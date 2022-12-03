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
    public class ParasiteLevel: TimedLevel
    {
        public ParasiteLevel(Theme theme) : base(theme, 70) { }

        public override string Name
        {
            get
            {
                return "Red Spider Wurm Parasites";
            }
        }

        public override string Description
        {
            get
            {
                return string.Format("Watch out for the red spider wurm parasites!  They want to attach to your wurm and eat his segments!  Grow your wurm to length {0} to win.", length_to_win);
            }
        }

        public override string QuickObjectives
        {
            get
            {
                return string.Format("Grow your wurm to length {0}.", length_to_win);
            }
        }

        public override string HighScoreName
        {
            get
            {
                return "ParasiteLevel";
            }
        }

        const int length_to_win = 15;
        Wurm theWurm;

        public override void InitializeLevel(GameControl theControl)
        {
            base.InitializeLevel(theControl);
            theWurm = new Wurm(theControl, 8, new Point(100, 100));
            theWurm.LengthChange += new EventHandler<GameEventArgs>(theWurm_Grows);
            theControl.AddCounter(new WurmCounter(theWurm));
            theControl.AddCreature(new Parasite(theControl));

            theControl.GrowRandomWeed(); theControl.GrowRandomWeed(); theControl.GrowRandomWeed(); theControl.GrowRandomWeed();
        }


        public override void Update(GameControl theControl)
        {
            base.Update(theControl);
            if (!GameOver)
            {
                if (IntervalTimeIsUp(5))
                    theControl.AddCreature(new GrassEater(theControl));
                if (IntervalTimeIsUp(3))
                    theControl.AddCreature(new Feeder(theControl));
                if (IntervalTimeIsUp(8))
                    theControl.AddCreature(new Parasite(theControl));
                if (IntervalTimeIsUp(4))
                    theControl.GrowRandomWeed();
            }
        }

        void theWurm_Grows(object sender, GameEventArgs e)
        {
            if (theWurm.Length >= length_to_win)
                Victory(e.theControl);
        }
    

    }
}
