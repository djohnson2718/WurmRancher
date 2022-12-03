using System;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Ink;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;
using System.Windows.Media.Imaging;

namespace WurmRacher
{
    public class Feeder : MovesToDestinationControl, Prey
    {
        const int height = 30, width = 30;
        
        static BitmapImage FeederBitmap = new BitmapImage();

        static Feeder()
        {
            FeederBitmap.SetSource(WRResources.feeder);
        }

        public event EventHandler<GameEventArgs> EatsGrass;

        Label count_label = new Label();
        public Feeder (GameControl theControl_)
            : base(theControl_, height, width, Timing.RelativeSpeedToPixelsPerFrame(Timing.relFeederSpeed), Timing.RelativeRotateToRadiansPerFrame(Timing.relFeederRotate))
        {
            PieceImage.Source = FeederBitmap;
            PieceImage.Height = height;
            PieceImage.Width = width;
            Canvas FeederCanvas = new Canvas();
            
            this.Content = FeederCanvas;
            FeederCanvas.Children.Add(this.PieceImage);

            count_label.Content = size;
            count_label.FontSize = 10;
            count_label.FontWeight = FontWeights.ExtraBold;
            count_label.HorizontalAlignment = HorizontalAlignment.Left;
            count_label.VerticalAlignment = VerticalAlignment.Bottom;
            FeederCanvas.Children.Add(count_label);            

                       
        }

        EdiblePlant target_plant = null;
        const int max_vision = 200;
        int size = 0;
        public const int max_size = 10;
        int dibs = 0;
        public override void Update()
        {
            if (dibs >0)
                dibs--;
            if (target_plant != null && Util.Distance(this, target_plant) < 1)
            {
                int eats = target_plant.Eat();
                if (eats != 0)
                {
                    size += eats;
                    if (EatsGrass != null)
                        EatsGrass(this, new GameEventArgs(theControl));
                    
                }
                if (size > max_size)
                    size = max_size;
                if (size < 0)
                    size = 0;

                this.count_label.Content = size;
                if (target_plant.Eaten)
                    target_plant = null;
            }

            if (target_plant == null && this.resting) // find a new destination!
            {
                target_plant = theControl.GetClosestPlant<EdiblePlant>(this);
                if (target_plant != null && Util.Distance(target_plant, this) > max_vision)
                    target_plant = null;

                if (target_plant != null)
                {
                    this.SetDestination(target_plant.CenterPoint);
                    target_plant.Dibs(10);
                }
                else
                    this.SetDestination(this.RandomPointOnField());
            }
            base.Update();
        }

        bool eaten = false;
        public bool Eaten
        {
            get { return eaten; }
        }

        public int Size { get{return size;} }

        public int Eat()
        {
            if (eaten)
                return 0;

            eaten = true;
            theControl.RemovePiece(this);
            return this.size;
        }

        public int FeederSize { get { return size; }  }

        public bool Available(bool care_about_dibs)
        {
            return (!care_about_dibs || dibs == 0);
        }

        public void Dibs()
        {
            dibs = 10;
        }

    }
}
