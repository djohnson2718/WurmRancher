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
    public abstract class EdiblePlant : Plant
    {
        static SoundEffect GrassEatenSound = SoundEffect.FromStream(WRResources.apple_crunch);
        protected int eat_value;

        public EdiblePlant(GameControl theControl_, int indexX, int indexY)
            : base(theControl_, indexX, indexY)
        {
        }

        public abstract bool Available
        {
            get;
        }

        int bites_taken = 0;
        protected int dibs = 0;

        public int Eat()
        {
            bites_taken++;
            if (bites_taken >= Timing.EatGrassTime)
                theControl.RemovePlant(this);
            this.dibs = 5;

            //returns 1 if the caller should get credit for eating this.
            if (bites_taken == Timing.EatGrassTime)
            {
                if (theControl.SoundEffectsOn)
                    GrassEatenSound.Play();
                return eat_value;
            }
            else
                return 0;
        }

        public void Dibs(int d)
        {
            dibs = d;
        }

        public bool Eaten
        {
            get
            {
                return bites_taken >= Timing.EatGrassTime;
            }
        }

        public override void Update()
        {
            if (dibs > 0)
                dibs--;
            base.Update();
        }

    }
}
