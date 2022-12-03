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
    public abstract class Plant : ImagePiece
    {
        public const int plant_size = 30;        
        int indexX, indexY;

        public Plant(GameControl theControl_, int indexX_, int indexY_) : base(theControl_, plant_size, plant_size)
        {
            this.indexX = indexX_;
            this.indexY = indexY_;
            Canvas.SetLeft(this, indexX * plant_size);
            Canvas.SetTop(this, indexY * plant_size);
                      
        }

        public int IndexX
        {
            get{ return indexX; }
        }
        public int IndexY
        {
            get { return indexY; }
        }

        

        public static int ClosestPlantIndexX(Point p)
        {
            return (int)Math.Floor(p.X / plant_size);
        }
        public static int ClosestPlantIndexY(Point p)
        {
            return (int)Math.Floor(p.Y / plant_size);
        }

        public static Point CenterPointFromIndex(int i, int j)
        {
            return new Point(plant_size * i + plant_size / 2, plant_size * j + plant_size / 2);
        }

        public override void Update()
        {
            if (sprayed)
                time_since_spray++;
            if (time_since_spray >= Timing.SprayEffectivenessTime)
                theControl.RemovePlant(this);
        }


        protected bool sprayed = false;
        
        int time_since_spray;

        public bool IsSprayed
        {
            get { return sprayed; }
        }

        internal void Spray()
        {
            sprayed = true;
            this.PieceImage.Source = this.SprayedPicSource;
        }

        protected abstract BitmapImage SprayedPicSource { get;}
    }
}
