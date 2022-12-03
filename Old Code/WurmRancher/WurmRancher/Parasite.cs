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

namespace WurmRacher
{
    public class Parasite : LaserDestructablePiece
    {
        const int height = 25, width = 25;        
        static BitmapImage ParasiteBitmap = new BitmapImage();
        static SoundEffect AttachSound = SoundEffect.FromStream(WRResources.insect10);
        static SoundEffect ParasiteDieSound = SoundEffect.FromStream(WRResources.insect11);
        static SoundEffect ParasiteEatSound = SoundEffect.FromStream(WRResources.insect9);


        static Parasite()
        {
            ParasiteBitmap.SetSource(WRResources.parasite);       
             
        }

        public Parasite(GameControl theControl_)
            : base(theControl_, height, width, Timing.RelativeSpeedToPixelsPerFrame(Timing.relParasiteSpeed), Timing.RelativeRotateToRadiansPerFrame(Timing.relParasiteRotate))
        { 
            PieceImage.Source = ParasiteBitmap;
        }

        protected override SoundEffect DieSound
        {
            get
            {
                return ParasiteDieSound;
            }
        }

        WurmBodyPiece target_wurm_peice = null;
        bool is_attached = false;
        public override void Update()
        {
            if (!hit)
            {
                if (target_wurm_peice != null )
                {
                    if (is_attached)
                    {
                        this.CenterPoint = target_wurm_peice.CenterPoint;
                        this.Angle = target_wurm_peice.Angle;

                        target_wurm_peice.ParasiteBite();
                        if (target_wurm_peice.IsEatenByParasite)
                        {
                            if (theControl.SoundEffectsOn)
                                ParasiteEatSound.Play();
                            target_wurm_peice = null;
                            is_attached = false;
                            resting = false;                 
                            
                        }
                    }
                    else 
                    {
                        SetDestination(target_wurm_peice.CenterPoint);
                        if (Util.Distance(this, target_wurm_peice) <= this.Width / 2)
                        {
                            if (target_wurm_peice.Available(true))
                            {
                                is_attached = true;
                                resting = true;
                                if (theControl.SoundEffectsOn)
                                    AttachSound.Play();
                            }
                            else
                            {
                                target_wurm_peice = null;
                                resting = true;
                            }
                        }
                    }
                }

                if ((target_wurm_peice == null && this.resting) ) // find a new destination!
                {
                    target_wurm_peice = theControl.GetClosestPrey<WurmBodyPiece>(this, true);
                    if (target_wurm_peice != null)
                    {
                        this.SetDestination(target_wurm_peice.CenterPoint);
                    }
                    else
                        this.SetDestination(this.RandomPointOnField());
                }
            }
            base.Update();
        }
    }
}
