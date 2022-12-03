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
    public class SharpShooterLevel: TimedLevel //checked
    {
        public SharpShooterLevel(Theme theme) : base(theme, 70) { }

        public override string Name
        {
            get
            {
                return "Sharpshooter Challenge";
            }
        }

        public override string Description
        {
            get
            {
                return string.Format("Ammo is in short supply... if you miss more than {0} shots and go below {1}% accuracy, you lose. (Shooting your wurm is excluded.) Grow your wurm to length {2} to win.", allowed_misses, allowed_accuracy,length_to_win);
            }
        }

        public override string QuickObjectives
        {
            get
            {
                return string.Format("Grow wurm to {0}, don't both miss more than {1} shots and go below {2}% accuracy.", length_to_win,allowed_misses,allowed_accuracy);
            }
        }
        public override string HighScoreName
        {
            get
            {
                return "SharpShooterLevel";
            }
        }

        const int allowed_misses = 3;
        const int allowed_accuracy = 75;
        const int length_to_win = 12;
        Wurm theWurm;
        Counter MissedCounter;
        Counter AccuracyCounter;

        public override void InitializeLevel(GameControl theControl)
        {
            base.InitializeLevel(theControl);
            theWurm = new Wurm(theControl, 4, new Point(100, 100));
            theWurm.LengthChange += new EventHandler<GameEventArgs>(theWurm_Grows);
            theControl.AddCounter(new WurmCounter(theWurm));            
            MissedCounter = new Counter("Missed");
            AccuracyCounter = new Counter("Accuracy");
            MissedCounter.Value = 0;
            AccuracyCounter.Value = "--";
            theControl.AddCounter(MissedCounter);
            theControl.AddCounter(AccuracyCounter);

            theControl.GrowRandomWeed(); theControl.GrowRandomWeed(); theControl.GrowRandomWeed(); theControl.GrowRandomWeed();
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
                if (IntervalTimeIsUp(20,10))
                    theControl.AddCreature(new Monster(theControl));
                if (IntervalTimeIsUp(20))
                    theControl.AddCreature(new Parasite(theControl));
                if (IntervalTimeIsUp(43))
                    theControl.AddCreature(new BigMonster(theControl));
                if (IntervalTimeIsUp(7))
                    theControl.GrowRandomWeed();
                if (IntervalTimeIsUp(.2))
                    CheckAccuracy(theControl);
            }
        }

        void theWurm_Grows(object sender, GameEventArgs e)
        {
            if (theWurm.Length >= length_to_win)
                Victory(e.theControl);
        }

        void CheckAccuracy(GameControl theControl){
            double acc_per = theControl.RancherAccuracy * 100;
            if (double.IsNaN(acc_per))
                AccuracyCounter.Value = "--";
            else
                AccuracyCounter.Value = string.Format("{0:0}%", acc_per);
            MissedCounter.Value = theControl.ShotsFired-theControl.ShotsHit;

            if (theControl.ShotsFired-theControl.ShotsHit > allowed_misses && acc_per < allowed_accuracy)
                Defeat(theControl,"You wasted too much ammo!");
        }
    

    }

    
}
