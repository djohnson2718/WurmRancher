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
    public class WanderingAnimal : LaserDestructablePiece
    {

        static BitmapImage default_pic = new BitmapImage();
        static WanderingAnimal()
        {
            default_pic.SetSource(WRResources.star);
        }

        
        public WanderingAnimal(GameControl theControl_) :base(theControl_)
        {
            this.Height = 30;
            this.Width = 30;
            this.speed = 2;             
            PieceImage.Source = default_pic;
            this.Content = PieceImage;
        }


        static Random rand = new Random();
        public override void Update()
        {
            if (this.resting)
            {
                this.SetDestination(this.RandomPointOnField());
            }
            base.Update();
        }



    }
}
