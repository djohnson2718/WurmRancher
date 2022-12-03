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
    public class WeedLevel : TimedLevel
    {
        public WeedLevel(Theme theme) : base(theme, 70) { }

        public override int WeedGrowthRate
        {
            get
            {
                return Timing.RelativeTimeToFrames(2);
            }
        }

        public override string Name
        {
            get
            {
                return "Weed Invasion!";
            }
        }
        public override string Description
        {
            get
            {
                return string.Format("This area seems to be particularly overgrown. No matter-- just use your spray!  Grow your wurm to length {0} to win!  And while your at it, make sure the weed ratio is less than {1}.",length_to_win,ratio_to_win);
            }
        }

        public override string QuickObjectives
        {
            get
            {
                return string.Format("Grow your wurm to length {0} and get the weed ratio down to {1:#.000}.", length_to_win, ratio_to_win);
            }
        }

        const int length_to_win = 10;
        const double ratio_to_win = .20;
        Wurm theWurm;
        Counter WeedDensityCounter;

        public override void InitializeLevel(GameControl theControl)
        {
            base.InitializeLevel(theControl);
            theWurm = new Wurm(theControl, 3, new Point(100, 100));
            theWurm.LengthChange += new EventHandler<GameEventArgs>(theWurm_Grows);
            theControl.AddCounter(new WurmCounter(theWurm));
            WeedDensityCounter = new Counter("Weed Density");
            theControl.AddCounter(WeedDensityCounter);
            while (theControl.WeedRatio < .4)
                theControl.GrowRandomWeed();
            WeedDensityCounter.Value = string.Format("{0:#.000}", theControl.WeedRatio);
            
        }

        void theWurm_Grows(object sender, GameEventArgs e)
        {
            if (theWurm.Length >= length_to_win && e.theControl.WeedRatio <= ratio_to_win)
                Victory(e.theControl);
        }

        public override void Update(GameControl theControl)
        {
            base.Update(theControl);
            if (GameOver)
                return;
            if (IntervalTimeIsUp(1))
                theControl.GrowRandomWeed();
            if (IntervalTimeIsUp(6))
                theControl.AddCreature(new GrassEater(theControl));
            if (IntervalTimeIsUp(3))
                theControl.AddCreature(new Feeder(theControl));
            if (IntervalTimeIsUp(15))
                theControl.AddCreature(new Monster(theControl));

            if (IntervalTimeIsUp(1))
            {
                double weed_ratio = theControl.WeedRatio;
                WeedDensityCounter.Value = string.Format("{0:#.000}", weed_ratio);
                if (theWurm.Length >= length_to_win && weed_ratio <= ratio_to_win)
                    Victory(theControl);
            }

        }

    }
}
