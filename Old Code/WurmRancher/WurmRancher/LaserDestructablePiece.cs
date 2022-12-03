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
using Microsoft.Xna.Framework.Audio;

namespace WurmRancher
{
    public abstract class LaserDestructablePiece : MovesToDestinationControl
    {

        
        public LaserDestructablePiece(GameControl theControl_, int height, int width, double speed_, double rotation_speed) :base(theControl_, height, width, speed_, rotation_speed)
        {
            this.MouseRightButtonDown += new MouseButtonEventHandler(LaserDestructablePiece_MouseRightButtonDown);
        }

        //public LaserDestructablePiece(GameControl theControl_, int height, int width, double speed_)
        //    : base(theControl_, height, width, speed_)
        //{
        //    this.MouseRightButtonDown += new MouseButtonEventHandler(LaserDestructablePiece_MouseRightButtonDown);
        //}

        public event EventHandler<GameEventArgs> Shot;

        protected abstract SoundEffect DieSound
        {
            get;
        }

        protected bool hit = false;
        
        int fade_time_elapsed = 0;
        void LaserDestructablePiece_MouseRightButtonDown(object sender, MouseButtonEventArgs e)
        {
            if (!hit && theControl.IsHitWithLaser(e))
            {
                if (theControl.SoundEffectsOn)
                    DieSound.Play();
                if (Shot != null)
                    Shot(this, new GameEventArgs(theControl));                
                this.hit = true;                
            }
        }

        public override void Update()
        {
            if (hit)
            {
                fade_time_elapsed++;

                if (fade_time_elapsed > Timing.CreatureDeathFadeTime)
                    theControl.RemovePiece(this);

                this.Opacity = (double)(Timing.CreatureDeathFadeTime - fade_time_elapsed) / Timing.CreatureDeathFadeTime;
            }
            else
                base.Update();
        }

        public override void SetDestination(int new_x, int new_y)
        {
            if (!hit)
                base.SetDestination(new_x, new_y);
        }

    }
}
