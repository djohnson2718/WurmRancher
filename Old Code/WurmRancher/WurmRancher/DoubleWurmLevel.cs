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

namespace WurmRacher
{
    public class DoubleWurmLevel: TimedLevel
    {
        public DoubleWurmLevel(Theme theme) : base(theme, 85) { } //checked

        public override string Name
        {
            get
            {
                return "Double Trouble";
            }
        }

        public override string Description
        {
            get
            {
                return string.Format("Can you raise two wurms at once? Get a combined length of {1}, with each wurm at least {0} to win!", min_length_to_win,combined_length_to_win);
            }
        }
        public override string QuickObjectives
        {
            get
            {
                return string.Format("Grow your wurms to at least {0} each and at least {1} total.", min_length_to_win, combined_length_to_win);
            }
        }
        public override string HighScoreName
        {
            get
            {
                return "DoubleWurmLevel";
            }
        }

        const int combined_length_to_win = 18;
        const int min_length_to_win = 7;
        Wurm theWurm1;
        Wurm theWurm2;

        public override void InitializeLevel(GameControl theControl)
        {
            base.InitializeLevel(theControl);
            theWurm1 = new Wurm(theControl, 4, new Point(100, 100));
            theWurm2 = new Wurm(theControl, 4, new Point(theControl.PlayingFieldWidth - 100, theControl.PlayingFieldHeight - 100));
            theWurm1.LengthChange += new EventHandler<GameEventArgs>(theWurm_Grows);
            theWurm2.LengthChange += new EventHandler<GameEventArgs>(theWurm_Grows);
            //theControl.AddCreature(new Parasite(theControl), new Point(90, 90));
            theControl.AddCounter(new WurmCounter(theWurm1));
            theControl.AddCounter(new WurmCounter(theWurm2));
            theControl.GrowRandomWeed();
            theControl.GrowRandomWeed();
            theControl.GrowRandomWeed();
            
        }

       


        public override void Update(GameControl theControl)
        {
            base.Update(theControl);
            if (!GameOver)
            {
                if (IntervalTimeIsUp(6))
                    theControl.AddCreature(new GrassEater(theControl));
                if (IntervalTimeIsUp(1.8))
                    theControl.AddCreature(new Feeder(theControl));
                if (IntervalTimeIsUp(20, 10))
                    theControl.AddCreature(new Monster(theControl));
                if (IntervalTimeIsUp(20))
                    theControl.AddCreature(new Parasite(theControl));
                if (IntervalTimeIsUp(80, 30))
                    theControl.AddCreature(new BigMonster(theControl));
                if (IntervalTimeIsUp(6))
                    theControl.GrowRandomWeed();
            }
        }

        void theWurm_Grows(object sender, GameEventArgs e)
        {
            if (theWurm1.Length >= min_length_to_win && theWurm2.Length >= min_length_to_win && theWurm1.Length + theWurm2.Length >= combined_length_to_win)
                Victory(e.theControl);
        }
    

    

    }
}
