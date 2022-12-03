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

namespace WurmRancher
{
    public class Weed : Plant
    {
        static BitmapImage WeedBitmap = new BitmapImage();
        static BitmapImage WeedSprayedBitmap = new BitmapImage();
        static Random rand = new Random();
        static Weed()
        {            
            WeedBitmap.SetSource(WRResources.weed);
            WeedSprayedBitmap.SetSource(WRResources.weedsprayed);
        }
        
        public Weed(GameControl theControl_, int indexX, int indexY) : base(theControl_, indexX, indexY) 
        {
            this.PieceImage.Source = WeedBitmap;
        }

        int count = 0;
        //int spawn_rate = 500;
        public override void Update()
        {
            count++;
            if (count >= theControl.CurrentLevel.WeedGrowthRate && !IsSprayed)
            {
                count = 0;
                switch (rand.Next(4))
                {
                    case 0:
                        theControl.GrowWeed(IndexX - 1, IndexY);
                        break;
                    case 1:
                        theControl.GrowWeed(IndexX + 1, IndexY);
                        break;
                    case 2:
                        theControl.GrowWeed(IndexX,  IndexY-1);
                        break;
                    case 3:
                        theControl.GrowWeed(IndexX, IndexY+1);
                        break;
                }
            }
            base.Update();
           
        }

        protected override BitmapImage SprayedPicSource
        {
            get { return WeedSprayedBitmap; }
        } 
    }
}
