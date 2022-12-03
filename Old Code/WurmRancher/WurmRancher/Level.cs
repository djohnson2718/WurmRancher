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
using System.Windows.Media.Imaging;
using System.IO.IsolatedStorage;

namespace WurmRacher
{
    public abstract class Level
    {        
        bool gameover = false;
        protected static IsolatedStorageSettings levelData = IsolatedStorageSettings.ApplicationSettings;

        public const string ApplicationKey = "868a65a194464d31b4ca21f8977bd01a";
        public const string ApplicationSecret = "wrs";

        public enum CompletionStatusEnum
        {
            Unattempted, Attempted, Completed
        }

        public CompletionStatusEnum CompletionStatus = CompletionStatusEnum.Unattempted;


        //This returns true if the game is over.
        public bool GameOver
        {
            get { return gameover; }
        }

        public virtual int WeedGrowthRate{
            get { return Timing.RelativeTimeToFrames(3); } 
        }
        public virtual int PoisonWeedGrowthRate
        {
            get { return Timing.RelativeTimeToFrames(4); }
        }
        public virtual string Name
        {
            get {return "unknown";}
        }
        public virtual string Description
        {
            get {return "no description available";}
        }
        public Theme Theme
        {
            get { return theme; }
        }
        public virtual bool NoUserControl
        {
            get { return false; }
        }
        //public virtual string HighScore
        //{
        //    get { return "--"; }
        //}
        public string ID
        {
            get { return Name + Version; }
        }
        protected virtual string Version
        {
            get { return "1"; }
        }
        //protected virtual void LoadHighScore()
        //{
        //}
        public virtual string QuickObjectives
        {
            get { return "Objectives unknown."; }
        }
        public virtual bool SeedDisabled
        {
            get { return false; }
        }
        //public virtual void ResetHighScore() { }

        public virtual string HighScoreName
        {
            get { return "none"; }
        }
        public virtual bool HasHighScore
        {
            get { return true; }
        }
        public virtual bool MakeFeedersAtWill
        {
            get { return false; }
        }

        Theme theme;
        public Level(Theme theme_)
        {
            theme = theme_;
            if (levelData.Contains(ID + "_c"))
            {
                this.CompletionStatus = CompletionStatusEnum.Completed;
                //this.LoadHighScore();
            }
            else if (levelData.Contains(ID + "_a"))
                this.CompletionStatus = CompletionStatusEnum.Attempted;         

        }

        public event EventHandler StatusChanged;

        
        protected int elapsed_frames=0;
        public virtual void Update(GameControl theControl)
        {
            if (gameover)
                return;
            elapsed_frames++;
            if (elapsed_frames == 1 && !this.NoUserControl)
                theControl.ShowMessage(Description, Name);
        }
        public virtual void InitializeLevel(GameControl theControl)
        {
            elapsed_frames = 0;
            gameover = false;
            if (CompletionStatus == CompletionStatusEnum.Unattempted)
            {
                CompletionStatus = CompletionStatusEnum.Attempted;
                levelData[this.ID + "_a"] = true;
            }
            if (!gameover && StatusChanged != null)
                StatusChanged(this, new EventArgs());
        }

        protected virtual void Victory(GameControl theControl, string message = null, _3XH.IHighScoreCtrl highScoreCtr = null)
        {
            if (gameover)
                return;
            if (message == null)
                message = "You have completed the mission " + Name + "!";
            CompletionStatus = CompletionStatusEnum.Completed;
            levelData[ID + "_c"] = true;
            gameover = true;
            if (StatusChanged != null)
                StatusChanged(this, new EventArgs());
            theControl.ShowVictory(message, highScoreCtr);

        }

        protected virtual void Defeat(GameControl theControl, string message = null)
        {
            if (gameover)
                return;
            if (message == null)
                message = "You failed to complete the mission objectives.";            
            gameover = true;
            theControl.ShowDefeat(message);
            if (StatusChanged != null)
                StatusChanged(this, new EventArgs());
        }

        protected bool IntervalTimeIsUp(double rel_interval, double rel_offset = 0)
        {
            int interval = Timing.RelativeTimeToFrames(rel_interval);
            int offset = Timing.RelativeTimeToFrames(rel_offset);
            return (elapsed_frames % interval == offset);
        }

        protected bool OneTimeTriggerIsUp(double rel_time)
        {
            return (elapsed_frames == Timing.RelativeTimeToFrames(rel_time));
        }

        //theControl should call this if the level is stopped prematurely.
        public void Quit()
        {
            if (!gameover && StatusChanged != null)
                StatusChanged(this, new EventArgs());
        }
    }
}
