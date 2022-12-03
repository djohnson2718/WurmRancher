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
using System.Collections.Generic;

namespace WurmRacher
{
    public class FeederLevel : TimedLevel
    {
        public FeederLevel(Theme theme) : base(theme, 80) { }

        public override string Name
        {
            get
            {
                return "Feeder Raiser";
            }
        }

        public override string Description
        {
            get
            {
                return string.Format("It looks like the wurms aren't ready yet... but you might as well get the feeders ready.  Get {0} feeders up to {1} to win!", maxed_feeders_to_win, Feeder.max_size);
            }
        }

        public override string QuickObjectives
        {
            get
            {
                return string.Format("Get {0} feeders to size {1}.", maxed_feeders_to_win, Feeder.max_size);
            }
        }
        public override string HighScoreName
        {
            get
            {
                return "FeederLevel";
            }
        }

        const int maxed_feeders_to_win = 8;
        Counter FeederCounter;
        List<Feeder> feeders;
        public override void InitializeLevel(GameControl theControl)
        {
            base.InitializeLevel(theControl);
            FeederCounter = new Counter("Feeders");
            FeederCounter.Value = 0;
            theControl.AddCounter(FeederCounter);
            theControl.GrowRandomPoisonWeed();
            theControl.GrowRandomPoisonWeed();
            theControl.GrowRandomWeed();
            theControl.GrowRandomWeed();
            feeders = new List<Feeder>();
            
            for (int i = 0; i < 3; i++)
            {
                AddFeeder(theControl);
            }                
            
            theControl.AddCreature(new GrassEater(theControl));
        }

        public override void Update(GameControl theControl)
        {
            base.Update(theControl);
            if (!GameOver)
            {
                if (IntervalTimeIsUp(4))
                    theControl.AddCreature(new GrassEater(theControl));
                if (IntervalTimeIsUp(3))
                    AddFeeder(theControl);
                if (IntervalTimeIsUp(9))
                    theControl.AddCreature(new Monster(theControl));
                if (IntervalTimeIsUp(6))
                    theControl.GrowRandomPoisonWeed();
                if (IntervalTimeIsUp(70, 25))
                    theControl.AddCreature(new BigMonster(theControl));
                if (IntervalTimeIsUp(7))
                    theControl.GrowRandomWeed();
            }
        }

        void AddFeeder(GameControl theControl)
        {
            Feeder f = new Feeder(theControl);
            f.EatsGrass += new EventHandler<GameEventArgs>(Feeder_eats);
            f.Removed += new EventHandler<GameEventArgs>(Feeder_removed);
            feeders.Add(f);
            theControl.AddCreature(f);
        }

        void Feeder_removed(object sender, GameEventArgs e)
        {
            feeders.Remove((Feeder)sender);
            UpdateCounter(e.theControl);
        }

        void UpdateCounter(GameControl theControl)
        {
            int count10 = 0;
            foreach (Feeder f in feeders)
                if (f.FeederSize >= Feeder.max_size)
                    count10++;
            FeederCounter.Value = count10;
            if (count10 >= maxed_feeders_to_win)
                Victory(theControl);
        }

        void Feeder_eats(object sender, GameEventArgs e)
        {
            UpdateCounter(e.theControl);            
        }



    }
}
