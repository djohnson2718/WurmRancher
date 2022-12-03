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
    public class PoisonWeed :  EdiblePlant
    {
        static BitmapImage PoisonWeedBitmap = new BitmapImage();
        static BitmapImage PoisonWeedSprayedBitmap = new BitmapImage();
        static Random rand = new Random();
        static PoisonWeed()
        {            
            PoisonWeedBitmap.SetSource(WRResources.poison_weed);
            PoisonWeedSprayedBitmap.SetSource(WRResources.poison_weed_sprayed);
        }
        
        public PoisonWeed(GameControl theControl_, int indexX, int indexY) : base(theControl_, indexX, indexY) 
        {
            this.PieceImage.Source = PoisonWeedBitmap;
            eat_value = -1;
        }

        int count = 0;
        //int spawn_rate = 500;
        public override void Update()
        {
            count++;
            if (count >= theControl.CurrentLevel.PoisonWeedGrowthRate && !IsSprayed)
            {
                count = 0;
                switch (rand.Next(4))
                {
                    case 0:
                        theControl.GrowPoisonWeed(IndexX - 1, IndexY);
                        break;
                    case 1:
                        theControl.GrowPoisonWeed(IndexX + 1, IndexY);
                        break;
                    case 2:
                        theControl.GrowPoisonWeed(IndexX, IndexY - 1);
                        break;
                    case 3:
                        theControl.GrowPoisonWeed(IndexX, IndexY + 1);
                        break;
                }
            }
            base.Update();
           
        }

        protected override BitmapImage SprayedPicSource
        {
            get { return PoisonWeedSprayedBitmap; }
        }


        public override bool Available
        {
            get { return !this.sprayed; }
        }
       
    }
}
