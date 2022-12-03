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
    public class Monster : LaserDestructablePiece
    {
        const int height = 50, width = 50;        
        static BitmapImage MosterBitmap = new BitmapImage();
        static SoundEffect EatSound = SoundEffect.FromStream(WRResources.pig_grunt);
        static SoundEffect MonsterDieSound = SoundEffect.FromStream(WRResources.pains);

        static Monster()
        {
            MosterBitmap.SetSource(WRResources.monster);       
             
        }

        public Monster(GameControl theControl_)
            : base(theControl_, height, width, Timing.RelativeSpeedToPixelsPerFrame(Timing.relMonsterSpeed), Timing.RelativeRotateToRadiansPerFrame(Timing.relMonsterRotate))
        { 
            PieceImage.Source = MosterBitmap;
        }

        protected override SoundEffect DieSound
        {
            get
            {
                return MonsterDieSound;
            }
        }

        Feeder target_feeder = null;
        public override void Update()
        {
            if (!hit)
            {
                if (target_feeder != null)
                {
                    if (target_feeder.Eaten)
                    {
                        target_feeder = null;
                        this.resting = true;
                    }
                    else
                    {
                        SetDestination(target_feeder.CenterPoint);
                        if (Util.Distance(this, target_feeder) <= this.Width / 2)
                        {
                            target_feeder.Eat();
                            if (theControl.SoundEffectsOn)
                                EatSound.Play();
                        }
                    }
                }

                if (target_feeder == null && this.resting) // find a new destination!
                {
                    target_feeder = theControl.GetClosestPrey<Feeder>(this, false);
                    if (target_feeder != null)
                    {
                        this.SetDestination(target_feeder.CenterPoint);
                    }
                    else
                        this.SetDestination(this.RandomPointOnField());
                }
            }
            base.Update();
        }

    }
}
