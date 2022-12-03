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

namespace WurmRancher
{
    public class PoisonWeedLevel: TimedLevel
    {
        public PoisonWeedLevel(Theme theme) : base(theme, 70) { }

        public override string Name
        {
            get
            {
                return "Poison Plants";
            }
        }

        public override string Description
        {
            get
            {
                return string.Format("There is a new kind of weed around... apparently the feeders like to eat it, but it is not very healthy for them.  Spray them quickly! Grow your wurm to length {0} to win!", length_to_win);
            }
        }
        public override string QuickObjectives
        {
            get
            {
                return string.Format("Grow your wurm to length {0}.", length_to_win);
            }
        }
       

        const int length_to_win = 11;
        Wurm theWurm;

        public override void InitializeLevel(GameControl theControl)
        {
            base.InitializeLevel(theControl);
            theWurm = new Wurm(theControl, 3, new Point(100, 100));
            theWurm.LengthChange += new EventHandler<GameEventArgs>(theWurm_Grows);
            theControl.AddCounter(new WurmCounter(theWurm));
            theControl.AddCreature(new GrassEater(theControl));

            theControl.GrowRandomPoisonWeed(); theControl.GrowRandomPoisonWeed();
        }


        public override void Update(GameControl theControl)
        {
            base.Update(theControl);
            if (!GameOver)
            {
                if (IntervalTimeIsUp(6.5))
                    theControl.AddCreature(new GrassEater(theControl));
                if (IntervalTimeIsUp(3))
                    theControl.AddCreature(new Feeder(theControl));
                if (IntervalTimeIsUp(16))
                    theControl.AddCreature(new Parasite(theControl));
                if (IntervalTimeIsUp(16, 9))
                    theControl.AddCreature(new Monster(theControl));
                if (IntervalTimeIsUp(5))
                    theControl.GrowRandomWeed();
                if (IntervalTimeIsUp(6))
                    theControl.GrowRandomPoisonWeed();
            }
        }

        void theWurm_Grows(object sender, GameEventArgs e)
        {
            if (theWurm.Length >= length_to_win)
                Victory(e.theControl);
        }
    

    }
}
