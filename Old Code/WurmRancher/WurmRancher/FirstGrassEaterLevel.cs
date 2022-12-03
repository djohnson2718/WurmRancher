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
    public class FirstGrassEaterLevel : TimedLevel
    {
        public FirstGrassEaterLevel(Theme theme) : base(theme, 80) { }

        public override string Name
        {
            get
            {
                return "We've got company!";
            }
        }

        public override string Description
        {
            get
            {
                return string.Format("The blue creatures want to steal your grass!  Blast them with your gun!  Grow your wurm to length {0} to win.", length_to_win);
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
        }

        
        public override void Update(GameControl theControl)        
        {
            base.Update(theControl);
            if (IntervalTimeIsUp(4))
                theControl.AddCreature(new GrassEater(theControl));
            if (IntervalTimeIsUp(3))
                theControl.AddCreature(new Feeder(theControl));
            if (IntervalTimeIsUp(8))
                theControl.GrowRandomWeed();
        }

        void theWurm_Grows(object sender, GameEventArgs e)
        {
            if (theWurm.Length >= length_to_win)
                Victory(e.theControl);
        }


    }
}
