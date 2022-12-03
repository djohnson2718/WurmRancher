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
    public class BigWurmContest :Level
    {
        const double rel_time_allowed = 90;
        int frames_left;
        protected double high_score = double.NaN;
        
        Counter timer;
        public BigWurmContest(Theme theme) : base(theme)
        {           
            
        }

        public override bool MakeFeedersAtWill
        {
            get
            {
                return true;
            }
        }

        public override string Name
        {
            get
            {
                return "Giant Wurm Contest";
            }
        }

        public override string Description
        {
            get
            {
                return "See how big you can grow your wurm before the time runs out. You can have as many feeders as you want, just press TAB to get a new one!";
            }
        }

        public override string QuickObjectives
        {
            get
            {
                return string.Format("Grow until the time runs out! Push TAB for feeders!");
            }
        }

        public override string HighScoreName
        {
            get
            {
                return "GiantWurmContest";
            }
        }

        bool high_score_submitted = false;
        Wurm theWurm;
        public override void InitializeLevel(GameControl theControl)
        {
            base.InitializeLevel(theControl);
            theWurm = new Wurm(theControl, 3, new Point(100, 100));
            theControl.AddCounter(new WurmCounter(theWurm));
            theControl.GrowRandomWeed();
            theControl.GrowRandomWeed();
            theControl.GrowRandomWeed();
            theControl.GrowRandomPoisonWeed();
            frames_left = Timing.RelativeTimeToFrames(rel_time_allowed);
            timer = new Counter("Time Left");
            timer.Value = string.Format("{0:0.0}", Timing.FramesToRealTime(frames_left));
            theControl.AddCounter(timer);
            high_score_submitted = false;
        }

        public override void Update(GameControl theControl)
        {
            base.Update(theControl);
            if (!GameOver)
            {
                frames_left--;
                timer.Value = string.Format("{0:0.0}", Timing.FramesToRealTime(frames_left));
                if (frames_left <= 0)
                    Victory(theControl);

                if (IntervalTimeIsUp(6))
                    theControl.AddCreature(new GrassEater(theControl));                
                if (IntervalTimeIsUp(14))
                    theControl.AddCreature(new Monster(theControl));
                if (IntervalTimeIsUp(15))
                    theControl.AddCreature(new Parasite(theControl));
                if (IntervalTimeIsUp(90, 45))
                    theControl.AddCreature(new BigMonster(theControl));
                if (IntervalTimeIsUp(7))
                {
                    theControl.GrowRandomWeed();
                    theControl.GrowRandomPoisonWeed();
                }
            }
        }

        protected void Victory(GameControl theControl, string message = null)
        {            
            if (message == null)
                message = string.Format("Times up! You grew your wurm to length {0}.", theWurm.Length);

            // create the high score control
            
            _3XH.IHighScoreCtrl highScoreCtrl = _3XH.API.Instance.createHighScoreCtrl();

            // init the high score control with the application key and secret

            highScoreCtrl.init(ApplicationKey, ApplicationSecret);

            // set the event handler that will be called when the user closes the high score control

            highScoreCtrl.setOnCloseHandler((sender, e) => { highScoreCtrl.hide(); });

             if (!high_score_submitted)
                {
                    high_score_submitted = true;
                // call submit score

                     highScoreCtrl.submitScore(theWurm.Length, HighScoreName);
                 }
            

            base.Victory(theControl, message, highScoreCtrl);
        }                    
             


        

    }
}
