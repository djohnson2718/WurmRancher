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
    public class MonsterLevel : TimedLevel
    {
        public MonsterLevel(Theme theme) : base(theme, 80) { }

        public override string Name
        {
            get
            {
                return "The Monster is coming";
            }
        }

        public override string Description
        {
            get
            {
                return string.Format("Your tasty feeders have attracted the attention of some of the native fauna.  Protect them at all costs!  Grow your wurm to length {0} to win.", length_to_win);
            }
        }

        public override string QuickObjectives
        {
            get
            {
                return string.Format("Grow your wurm to length {0}.", length_to_win);
            }
        }

        const int length_to_win = 12;
        Wurm theWurm;

        public override void InitializeLevel(GameControl theControl)
        {
            base.InitializeLevel(theControl);
            theWurm = new Wurm(theControl, 3, new Point(100, 100));
            theWurm.LengthChange += new EventHandler<GameEventArgs>(theWurm_Grows);
            theControl.AddCounter(new WurmCounter(theWurm));
            theControl.GrowRandomWeed();
            theControl.GrowRandomWeed();
            theControl.GrowRandomWeed();
        }


        public override void Update(GameControl theControl)
        {
            base.Update(theControl);
            if (!GameOver)
            {
                if (IntervalTimeIsUp(4))
                    theControl.AddCreature(new GrassEater(theControl));
                if (IntervalTimeIsUp(3))
                    theControl.AddCreature(new Feeder(theControl));
                if (IntervalTimeIsUp(11))
                    theControl.AddCreature(new Monster(theControl));
                if (IntervalTimeIsUp(6))
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
