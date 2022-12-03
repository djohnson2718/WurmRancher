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
    public class BigMonsterLevel: TimedLevel
    {
        public BigMonsterLevel(Theme theme) : base(theme, 80) { }

        public override string Name
        {
            get
            {
                return "Monster Boss";
            }
        }

        public override string Description
        {
            get
            {
                return string.Format("There seems to be a new kind of creature interfering with your operation... it is huge, tramples your grass and feeders, and spreads weeds. You laser seems ineffective against his thick armor. Maybe if you shoot him in the eye it will work... but that might make him mad.  Grow your wurm to length {0} to win.", length_to_win);
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
                if (IntervalTimeIsUp(6))
                    theControl.AddCreature(new GrassEater(theControl));
                if (IntervalTimeIsUp(3))
                    theControl.AddCreature(new Feeder(theControl));
                if (IntervalTimeIsUp(15))
                    theControl.AddCreature(new BigMonster(theControl));
                if (IntervalTimeIsUp(7))
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
