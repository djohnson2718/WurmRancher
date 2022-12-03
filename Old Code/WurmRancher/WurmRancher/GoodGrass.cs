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
    public class GoodGrass :  EdiblePlant
    {
        static BitmapImage SeededBitmap = new BitmapImage();
        static BitmapImage GrassBitmap = new BitmapImage();
        static BitmapImage SprayedGrassBitmap = new BitmapImage();
        
        //static SoundEffectInstance GrassEatenSoundInstance;
        static GoodGrass()
        {
            SeededBitmap.SetSource(WRResources.seeded);
            SprayedGrassBitmap.SetSource(WRResources.good_grass_new_sprayed);
            GrassBitmap.SetSource(WRResources.good_grass_new);
            //GrassEatenSoundInstance = GrassEatenSound.CreateInstance();
            //GrassEatenSoundInstance.Volume = 100;
        }
        
        public GoodGrass(GameControl theControl_, int indexX, int indexY, bool starts_mature = false) : base(theControl_, indexX, indexY) 
        {
            if (starts_mature)
                this.PieceImage.Source = GrassBitmap;
            else
                this.PieceImage.Source = SeededBitmap;
            eat_value = 1;
            mature = starts_mature;
        }

        
        int elapsed_time = 0;
        bool mature;
        
        public bool Mature
        {
            get
            {
                return mature;
            }
        }
        public override bool Available
        {
            get
            {
                return mature && dibs == 0;
            }
        }

        

        public override void Update()
        {
            
            if (!mature)
            {
                elapsed_time++;
                if (elapsed_time >= Timing.GrassGrowTime)
                {
                    mature = true;
                    if (!sprayed)
                        this.PieceImage.Source = GrassBitmap;
                    else
                        this.PieceImage.Source = SprayedGrassBitmap;
                    theControl.ReportGrassGrow(this);
                }
            }
            base.Update();           
        }

        protected override BitmapImage SprayedPicSource
        {
            get 
            {
                if (mature)
                    return SprayedGrassBitmap;
                else
                    return SeededBitmap;
           }
        } 

    }
}
