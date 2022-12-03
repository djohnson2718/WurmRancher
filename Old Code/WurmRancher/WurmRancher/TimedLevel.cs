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
    public class TimedLevel : Level
    {
        double rel_time_allowed;
        int frames_left;
        protected double high_score = double.NaN;
        
        Counter timer;
        public TimedLevel(Theme theme, int rel_time_allowed_) : base(theme)
        {
            rel_time_allowed = rel_time_allowed_;
            
        }

        bool high_score_submitted = false;
        public override void InitializeLevel(GameControl theControl)
        {
            base.InitializeLevel(theControl);
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
                    Defeat(theControl);
            }
        }

        protected void Victory(GameControl theControl, string message = null)
        {
            double score = Timing.FramesToRealTime(frames_left);
            if (message == null)
                message = "You completed the objectives in time and beat the level!";

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

                     highScoreCtrl.submitScore(score, HighScoreName);
                 }
            

            base.Victory(theControl, message, highScoreCtrl);
        }

        protected override void Defeat(GameControl theControl, string message = null)
        {
            if (message == null)
                message = "You did not complete the objectives in the allotted time. Try again.";
            base.Defeat(theControl, message);
        }

        //public override string HighScore
        //{
        //    get
        //    {
        //        return string.Format("{0:0.0}", high_score);
        //    }
        //}

        //protected override void LoadHighScore()
        //{
        //    if (levelData.Contains(this.ID + "_hs"))
        //        high_score = (double)levelData[this.ID + "_hs"];
        //}

        //public override void ResetHighScore()
        //{
        //    high_score = double.NaN;
        //}
    }
}
