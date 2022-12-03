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
    public class ProtectTheGrassLevel : Level
    {
        public ProtectTheGrassLevel(Theme theme) : base(theme) { }

        public override string Name
        {
            get
            {
                return "Protect the Grass";
            }
        }

        public override string Description
        {
            get
            {
                return string.Format("We have a nice field of grass all ready, but there is a massive herd of grass eaters coming in.  Blast all {0} of them before the grass is all gone!", num_eaters);
            }
        }

        public override string QuickObjectives
        {
            get
            {
                return string.Format("Shoot all {0} grasss eaters before the grass is gone.", num_eaters);
            }
        }

        public override bool SeedDisabled
        {
            get
            {
                return true;
            }
        }
        const int num_eaters = 60;
        int eaters_arrived;
        int eaters_shot;
        Counter eaters_counter;

        public override void InitializeLevel(GameControl theControl)
        {
            eaters_arrived = 0;
            base.InitializeLevel(theControl);
            eaters_counter = new Counter("Remaining");
            eaters_counter.Value = num_eaters;
            theControl.AddCounter(eaters_counter);
            eaters_shot = 0;
            theControl.FillWithGrass();

        }

        public override void Update(GameControl theControl)
        {
            if (!GameOver)
            {
                if (eaters_arrived < num_eaters && IntervalTimeIsUp(.2))
                {
                    eaters_arrived++;
                    GrassEater g = new GrassEater(theControl);
                    g.Shot += new EventHandler<GameEventArgs>(g_Shot);
                    theControl.AddCreature(g);
                }
                if (IntervalTimeIsUp(1))
                {
                    if (!theControl.HasGoodGrass())
                        Defeat(theControl);
                }
            }
            base.Update(theControl);
        }

        void g_Shot(object sender, GameEventArgs e)
        {
            eaters_shot++;
            eaters_counter.Value = num_eaters - eaters_shot;
            if (eaters_shot == num_eaters)
                Victory(e.theControl);
        }


        int high_score = -1;
        //public override string HighScore
        //{
        //    get
        //    {
        //        if (high_score == -1)
        //            return "--";
        //        return string.Format("{0}",high_score);
        //    }
        //}

        protected void Victory(GameControl theControl, string message = null)
        {
            if (message == null)
                message = "You saved the grass!";
            
            base.Victory(theControl, message);
        }

        //protected override void LoadHighScore()
        //{            
        //    if (levelData.Contains(this.ID + "_hs"))
        //        high_score = (int)levelData[this.ID + "_hs"];            
        //}

        //public override void ResetHighScore()
        //{
        //    high_score = -1;
        //}
        


    }
}
