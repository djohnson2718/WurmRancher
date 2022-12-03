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
    public class TutorialLevel : Level
    {
        public TutorialLevel(Theme theme) : base(theme) { }

        public override string Name
        {
            get { return "Tutorial"; }
        }
        public override string Description
        {
            get { return "An easy introduction to Wurm Rancher concepts."; }
        }
        public override string QuickObjectives
        {
            get
            {
                return string.Format("Follow the pop-up instructions. Grow your wurm to length {0}.", length_to_win);
            }
        }
        public override bool HasHighScore
        {
            get
            {
                return false;
            }
        }
       

        const string message_title = "Tutorial";
        const int starting_feeders = 3;
        Feeder[] feeders = new Feeder[starting_feeders];
        Wurm theWurm;
        bool grass_planted;
        bool wurm_has_eaten;
        const int length_to_win = 11;
        bool feeders_ate_message_shown;
        int frames_since_wurm_eaten;

        const int rel_time_from_wurm_eaten_to_weeds = 6;
        int frames_wurm_eaten_to_weeds = Timing.RelativeTimeToFrames(rel_time_from_wurm_eaten_to_weeds);
        const int rel_time_from_wurm_eaten_to_shoot_wurm_message = 4;
        int frames_wurm_eaten_to_shoot_wurm_message = Timing.RelativeTimeToFrames(rel_time_from_wurm_eaten_to_shoot_wurm_message);

        public override void InitializeLevel(GameControl theControl)
        {
            base.InitializeLevel(theControl);
            

            theControl.GrassGrow += new EventHandler<GameEventArgs>(theControl_GrassGrow);

            for (int i = 0; i < starting_feeders; i++)
            {
                feeders[i] = new Feeder(theControl);
                feeders[i].EatsGrass += new EventHandler<GameEventArgs>(FeederEats);
                theControl.AddCreature(feeders[i]);
            }

            theWurm = null;
            grass_planted = false;
            wurm_has_eaten = false;
            feeders_ate_message_shown = false;
            frames_since_wurm_eaten = 0;

        }
       
        
        public override void Update(GameControl theControl)
        {
            base.Update(theControl);
            if (wurm_has_eaten)
                frames_since_wurm_eaten++;
            if (OneTimeTriggerIsUp(.1))
                theControl.ShowMessage("Click with the left mouse button to make the rancher move.", message_title);

            if (OneTimeTriggerIsUp(3.5))
                theControl.ShowMessage("Ok, good.  Your feeders (the yellow creatures) are hungry (note the zero on them).  You need to make some food for them.  Push 'W' or the Down Arrow to select the seed tool, and right click inside the range circle to plant some seeds.", message_title);

            if (IntervalTimeIsUp(4) && wurm_has_eaten)
                theControl.AddCreature(new Feeder(theControl));



            if (frames_since_wurm_eaten == frames_wurm_eaten_to_weeds)
            {
                theControl.ShowMessage("Uh oh, weeds are starting to grow in your pasture!  They are not edible, and get in the way of your grass.  If they get out of control, better use the Spray tool (E, Right Arrow) and right click to get rid of them.", message_title);
                for (int i = 0; i < 6; i++)
                    theControl.GrowRandomWeed();
            }

            if (frames_since_wurm_eaten == frames_wurm_eaten_to_shoot_wurm_message)
                theControl.ShowMessage("If you select the Gun tool (Q, Left Arrow), you can shoot (right click) your wurm in the head to stun him for a second or so.  It won't hurt him, but it might prevent him from eating the feeders before they are fat and ready.", message_title);

            if (frames_since_wurm_eaten >= frames_wurm_eaten_to_weeds && IntervalTimeIsUp(2))
                theControl.GrowRandomWeed();
        
        }

        

        
        void theControl_GrassGrow(object sender, GameEventArgs e)
        {
            if (!grass_planted)
            {
                e.theControl.ShowMessage("Excellent. Now wait for your feeders to find it and eat it.", message_title);
                grass_planted = true;
            }
        }

        void FeederEats(object sender, GameEventArgs e)
        {
            Feeder f = (Feeder)sender;
            if (f.FeederSize >= 4 && !feeders_ate_message_shown)
            {
                feeders_ate_message_shown = true;
                
                e.theControl.ShowMessage("Your feeders are growing!  Soon they will be ready for your wurm to eat!", message_title);
                feeders_ate_message_shown = true;
                theWurm = new Wurm(e.theControl, 3, new Point(0, 0));
                theWurm.Eats += new EventHandler<GameEventArgs>(theWurm_Eats);
                theWurm.LengthChange += new EventHandler<GameEventArgs>(theWurm_Grows);
                e.theControl.AddCounter(new WurmCounter(theWurm));
            }
        }

        
        void theWurm_Grows(object sender, GameEventArgs e)
        {
            if (((Wurm)sender).Length >= length_to_win)
                Victory(e.theControl, "You completed the tutorial! Try the next level, where you will need your gun to eliminate the competition.");
        }

        
        void theWurm_Eats(object sender, GameEventArgs e)
        {
            if (!wurm_has_eaten)
            {
                e.theControl.ShowMessage(string.Format("Your wurm has eaten!  He will grow new segments when he eats enough.  His growth rate is proportional to the numbers on the feeders.  We will send some new feeders along.  Grow your wurm to length {0} to win the tutorial!", length_to_win), message_title);
                wurm_has_eaten = true;
            }
        }      

        void ShowMessage(string message)
        {
            MessageBox.Show(message, "Tutorial", MessageBoxButton.OK);
        }
    }
}
