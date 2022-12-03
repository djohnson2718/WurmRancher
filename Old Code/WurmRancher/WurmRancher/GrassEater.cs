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
using Microsoft.Xna.Framework.Audio;

namespace WurmRancher
{
    public class GrassEater : LaserDestructablePiece
    {
        const int height = 30, width = 30;
        
 
        static BitmapImage GrassEaterBitmap = new BitmapImage();
        static SoundEffect GrassEaterDieSoud = SoundEffect.FromStream(WRResources.gruntz);

        static GrassEater()
        {
            GrassEaterBitmap.SetSource(WRResources.grass_eater);
           
        }

        public GrassEater(GameControl theControl_)
            : base(theControl_,height, width, Timing.RelativeSpeedToPixelsPerFrame(Timing.relGrassEaterSpeed), Timing.RelativeRotateToRadiansPerFrame(Timing.relGrassEaterRotate))
        {
            PieceImage.Source = GrassEaterBitmap;
        }

        protected override SoundEffect DieSound
        {
            get
            {
                return GrassEaterDieSoud;
            }
        }

        GoodGrass target_plant = null;
        public override void Update()
        {
            if (target_plant != null && Util.Distance(this, target_plant) < 1 && !(this.hit))
            {
                target_plant.Eat();
                if (target_plant.Eaten)
                    target_plant = null;
            }

            if (target_plant == null && this.resting) // find a new destination!
            {
                target_plant = theControl.GetClosestPlant<GoodGrass>(this);
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
    }
}
