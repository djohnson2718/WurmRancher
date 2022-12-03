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
    public class ProtectTheGrassEasyVersion : Level
    {
        public ProtectTheGrassEasyVersion(Theme theme) : base(theme) { }

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

        protected override string HighScoreName
        {
            get
            {
                return "ProtectGrassEasy";
            }
        }

        public override bool SeedDisabled
        {
            get
            {
                return true;
            }
        }
        const int num_eaters = 3;
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
                message = string.Format("You saved {0} patches of grass!", theControl.NumberOfGoodGrass);

            // create the high score control

            _3XH.IHighScoreCtrl highScoreCtrl = _3XH.API.Instance.createHighScoreCtrl();

            // init the high score control with the application key and secret

            highScoreCtrl.init(ApplicationKey, ApplicationSecret);

            // set the event handler that will be called when the user closes the high score control

            highScoreCtrl.setOnCloseHandler((sender, e) => { highScoreCtrl.hide(); });

            // call submit score

            highScoreCtrl.submitScore(theControl.NumberOfGoodGrass, HighScoreName);


            base.Victory(theControl, message, highScoreCtrl);
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

