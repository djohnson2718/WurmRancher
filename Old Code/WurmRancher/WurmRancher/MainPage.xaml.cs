using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;
using System.Windows.Media.Imaging;
using Microsoft.Xna.Framework.Audio;
using System.IO.IsolatedStorage;


namespace WurmRacher
{
    public partial class MainPage : UserControl, GameControl
    {
        IsolatedStorageSettings userSettings = IsolatedStorageSettings.ApplicationSettings;

        List<GameElement> GameElements = new List<GameElement>();
        List<GameElement> DeadStuff = new List<GameElement>();
        List<GameElement> NewStuff = new List<GameElement>();

        Storyboard GameLoop = new Storyboard();       
        
        
        Plant[,] Plants; 
        Rancher theRancher;

        Random rand = new Random();

        Level current_level;

        int laserRange = 160;
        int seedRange = 150;
        int elapsed_time = 0;
        int seed_radius = 50;
        int plant_rows, plant_cols;
        int sprayRange = 180;
        int spray_radius = 70;
        
        int laser_cool_down_counter = 0;
        bool game_running = false;
        bool sound_on;

        int shots_fired;
        int shots_hit;

       
        AreaEffectCircle SeedAoEC; 
        AreaEffectCircle SprayAoEC;

        RangeCircle RangeDisplay;

        Menu MainMenu;
        LevelSelecter LevelMenu;
        MessageChildWindow MessageWindow = new MessageChildWindow();
        VictoryMenu theVictoryWindow = new VictoryMenu();
        DefeatMenu theDefeatMenu = new DefeatMenu();       

        public event EventHandler<GameEventArgs> GrassGrow;    
        
 
        public MainPage()
        {
            InitializeComponent();

            if (userSettings.Contains("sound"))
                sound_on = (bool)userSettings["sound"];
            else
            {
                sound_on = true;
                userSettings["sound"] = true;
            }


            GameLoop.Duration = TimeSpan.FromSeconds(1 / Timing.frames_per_sec);
            GameLoop.Completed += new EventHandler(GameLoop_Completed);

            //LoadLevel(new TestLevel());

            //CompositionTarget.Rendering += new EventHandler(CompositionTarget_Rendering);

            GunRB.Checked += new RoutedEventHandler(ToolSelect);
            SprayRB.Checked +=new RoutedEventHandler(ToolSelect);
            SeedRB.Checked += new RoutedEventHandler(ToolSelect);  

            MainBackGroundMusicME.MediaOpened += new RoutedEventHandler(MainBackGroundMusicME_MediaOpened);
            MainBackGroundMusicME.MediaEnded += new RoutedEventHandler(MainBackGroundMusicME_MediaEnded);
            MainBackGroundMusicME.MediaFailed += new EventHandler<ExceptionRoutedEventArgs>(MainBackGroundMusicME_MediaFailed);
            MainBackGroundMusicME.Stop();

            //MainBackGroundMusicME.Source = new Uri("/Music/DST-FlyingAces.mp3", UriKind.Relative);

            MainMenu = new Menu();
            LevelMenu = new LevelSelecter();

            MainMenu.Closed += new EventHandler(menu1_Closed);
            LevelMenu.Closed += new EventHandler(LevelMenu_Closed);
            MainMenu.SoundToggled += new EventHandler(MainMenu_SoundToggled);

            MessageWindow.Closed += new EventHandler(MessageWindow_Closed);
            theVictoryWindow.Closed += new EventHandler(VictoryWindow_Closed);
            theDefeatMenu.Closed += new EventHandler(theDefeatMenu_Closed);

            Application.Current.Host.Content.FullScreenChanged += new EventHandler(Content_FullScreenChanged);
            

            LoadLevel(new IntroDemo(Theme.Intro));
            GameLoop.Begin();
        }

        void Content_FullScreenChanged(object sender, EventArgs e)
        {
            if (Application.Current.Host.Content.IsFullScreen)
            {
                GunRB.Content = "Gun (Left)";
                SeedRB.Content = "Seed (Down)";
                SprayRB.Content = "Spray (Right)";
            }
            else
            {
                GunRB.Content = "Gun (Q, Left)";
                SeedRB.Content = "Seed (W, Down)";
                SprayRB.Content = "Spray (E, Right)";
            }
        }

        void MainMenu_SoundToggled(object sender, EventArgs e)
        {
            sound_on = !sound_on;
            userSettings["sound"] = sound_on;
            if (!sound_on)
                MainBackGroundMusicME.Stop();
            else
                MainBackGroundMusicME.Play();
        }

        public bool SoundEffectsOn
        {
            get { return sound_on; }
        }

        void GameLoop_Completed(object sender, EventArgs e)
        {
            GameLoop.Begin();
            GameLoopMethod();
        }

        void theDefeatMenu_Closed(object sender, EventArgs e)
        {
            switch (theDefeatMenu.Result)
            {
                case DefeatMenu.DefeatMenuResult.Resume:
                    game_running = true;
                    break;
                case DefeatMenu.DefeatMenuResult.Restart:
                    LoadLevel(current_level);
                    break;
                case DefeatMenu.DefeatMenuResult.LevelMenu:
                    LevelMenu.Show();
                    break;
            }
        }

        void VictoryWindow_Closed(object sender, EventArgs e)
        {
            switch (theVictoryWindow.Result)
            {
                case VictoryMenu.VictoryMenuResult.Resume:
                    game_running = true;
                    break;
                case VictoryMenu.VictoryMenuResult.Menu:
                    LevelMenu.Show();
                    break;
                case VictoryMenu.VictoryMenuResult.Next:
                    int j = Levels.LevelsList.IndexOf(current_level);
                    if (j >= 0 && j + 1 < Levels.LevelsList.Count)
                        LoadLevel(Levels.LevelsList[j + 1]);
                    else
                        LevelMenu.Show();                    
                    break;
                case VictoryMenu.VictoryMenuResult.None:
                    game_running = true;
                    break;
            }
        }

        void MessageWindow_Closed(object sender, EventArgs e)
        {
            game_running = true;
        }

        void MainBackGroundMusicME_MediaFailed(object sender, ExceptionRoutedEventArgs e)
        {
            MessageBox.Show("Problem loading song!!");
        }

        void LevelMenu_Closed(object sender, EventArgs e)
        {
            if ((bool)LevelMenu.DialogResult)
                LoadLevel(LevelMenu.LevelSected);
            else
                game_running = true;
        }

        void menu1_Closed(object sender, EventArgs e)
        {
            if (!(bool)MainMenu.DialogResult)
            {                
                game_running = true;
                return;
            }
            switch (MainMenu.Result)
            {
                case Menu.MainMenuResults.NewGame:
                    LevelMenu.LevelSected = null;
                    LevelMenu.Show();
                    break;
            }
        }

        public Level CurrentLevel
        {
            get { return current_level; }
        }

        void InitializeGameElements()
        {
            if (current_level.NoUserControl)
            {
                this.theRancher = null;
                SprayAoEC = null;
                SeedAoEC = null;
                RangeDisplay = null;
            }
            else
            {
                this.theRancher = new Rancher(this);
                AddCreature(theRancher, new Point(theCanvas.Width / 2, theCanvas.Height / 2));
                SeedAoEC = new AreaEffectCircle(this, seed_radius);
                SprayAoEC = new AreaEffectCircle(this, spray_radius);

                SeedAoEC.Visibility = Visibility.Collapsed;
                SprayAoEC.Visibility = Visibility.Collapsed;

                theCanvas.Children.Add(SeedAoEC);
                theCanvas.Children.Add(SprayAoEC);

                RangeDisplay = new RangeCircle(this, laserRange);
                GameElements.Add(RangeDisplay);
                theCanvas.Children.Add(RangeDisplay);

                plant_rows = (int)(theCanvas.Height / Plant.plant_size) + 1;
                plant_cols = (int)(theCanvas.Width / Plant.plant_size) + 1;
                Plants = new Plant[plant_cols, plant_rows];

                shots_fired = 0;
                shots_hit = 0;
            }             
            
        }

        void ClearAll()
        {
            GameElements.Clear();
            theCanvas.Children.Clear();
            GunRB.IsChecked = true;
            elapsed_time = 0;
            laser_cool_down_counter = 0;
            CounterGrid.Children.Clear();
            
        }

        public void LoadLevel(Level level)
        {
            ClearAll();
            this.GameOverLabel.Visibility = Visibility.Collapsed;
            if (current_level != null)
                current_level.Quit();
            current_level = level;
            InitializeGameElements();
            level.InitializeLevel(this);
            MainBackGroundMusicME.Stop();
            MainBackGroundMusicME.Source = level.Theme.Music;
            theCanvas.Background = level.Theme.Background;
            this.GrassGrow = null;
            //this.IsEnabled = true;
            this.QuickObjectives.Text = level.QuickObjectives;
            game_running = true;
        }

        void MainBackGroundMusicME_MediaEnded(object sender, RoutedEventArgs e)
        {
            MediaElement m = (MediaElement)sender;
            m.Position = new TimeSpan(0);
            m.Play();
        }

        void MainBackGroundMusicME_MediaOpened(object sender, RoutedEventArgs e)
        {
            if (sound_on)
            {
                MediaElement m = (MediaElement)sender;
                m.Play();
            }
        }

        void ToolSelect(object sender, RoutedEventArgs e)
        {
            if (current_level.NoUserControl)
                return;
            SeedAoEC.Visibility = Visibility.Collapsed;
            SprayAoEC.Visibility = Visibility.Collapsed;
            if ((bool)GunRB.IsChecked)
            {
                RangeDisplay.Radius = laserRange;
            }
            else if ((bool)SeedRB.IsChecked)
            {
                RangeDisplay.Radius = seedRange;
            }
            else if ((bool)SprayRB.IsChecked)
            {
                RangeDisplay.Radius = sprayRange;
            }
            else
            {
                RangeDisplay.Radius = 0;
            }
            
        }

        public Rancher TheRancher
        {
            get
            {
                return theRancher;
            }
        }
        public int PlayingFieldWidth{
            get
            {
                return (int)theCanvas.Width;
            }
        }
        public int PlayingFieldHeight
        {
            get
            {
                return (int)theCanvas.Height;
            }
        }



        void GameLoopMethod()
        {
            if (game_running)
            {
                elapsed_time++;
                if (laser_cool_down_counter > 0)
                    laser_cool_down_counter--;

                current_level.Update(this);

                foreach (GameElement element in GameElements)
                {
                    element.Update();
                }
                foreach (GameElement element in DeadStuff)
                    GameElements.Remove(element);
                DeadStuff.Clear();
                foreach (GameElement element in NewStuff)
                    GameElements.Add(element);
                NewStuff.Clear();
            }
            
        }

        private void theCanvas_MouseLeftButtonUp(object sender, MouseButtonEventArgs e)
        {
            if (game_running && !current_level.NoUserControl)
                theRancher.SetDestination((int)e.GetPosition(theCanvas).X, (int)e.GetPosition(theCanvas).Y);
        }


        public void AddWurm(int length)
        {
            Wurm w = new Wurm(this, length, new Point(100, 100));        
        }
        public void AddCreature(OnTheFieldPiece e, Point start_at)  
        {
            theCanvas.Children.Add(e);
            NewStuff.Add(e);
            e.CenterPoint = start_at;
        }
        //public void AddCreature(OnTheFieldPiece e)
        //{
        //    var spot = RandomPointOnEdge();            
        //    AddCreature(e, spot.Item1);
        //}
        public void AddCreature(MovesToDestinationControl e)
        {
            var spot = RandomPointOnEdge();
            AddCreature(e, spot.Item1);
            e.FacingAngleDegrees = spot.Item2;
        }

        public void RemovePlant(Plant p)
        {            
            Plants[p.IndexX, p.IndexY] = null;
            RemovePiece(p);
        }

        public void RemovePiece(OnTheFieldPiece e)
        {
            DeadStuff.Add(e);
            theCanvas.Children.Remove(e);            
            e.Remove();

        }


        SoundEffect laser = SoundEffect.FromStream(WRResources.laser2);
        SoundEffect seeds_sown = SoundEffect.FromStream(WRResources.seeds);
        SoundEffect spray_sound = SoundEffect.FromStream(WRResources.spray_can);
        SoundEffect squish_sound = SoundEffect.FromStream(WRResources.squish);

        private void theCanvas_MouseRightButtonDown(object sender, MouseButtonEventArgs e)
        {
            if (!game_running || current_level.NoUserControl)
                return;
            e.Handled = true;

            if ((bool)GunRB.IsChecked && laser_cool_down_counter == 0)
            {
                if (Util.Distance(e.GetPosition(theCanvas), theRancher.CenterPoint) > laserRange)
                    return;
                laser_cool_down_counter += Timing.LaserCoolDown;
                if (SoundEffectsOn)
                    laser.Play();
                Rect r = new Rect(e.GetPosition(theCanvas), theRancher.CenterPoint);
                double dx = e.GetPosition(theCanvas).X - theRancher.CenterX;
                double dy = e.GetPosition(theCanvas).Y - theRancher.CenterY;

                LaserBeam l = new LaserBeam(this, dx, dy);
                theCanvas.Children.Add(l);
                Canvas.SetLeft(l, Math.Min(e.GetPosition(theCanvas).X, theRancher.CenterX));
                Canvas.SetTop(l, Math.Min(e.GetPosition(theCanvas).Y, theRancher.CenterY));
                GameElements.Add(l);
                shots_fired++;
                return;
            }
            if ((bool)SeedRB.IsChecked && !current_level.SeedDisabled)
            {
                if (Util.Distance(e.GetPosition(theCanvas), TheRancher.CenterPoint) > seedRange)
                    return;
                if (SoundEffectsOn)
                    seeds_sown.Play();
                foreach (Tuple<int,int> I in PlantSpotsInRadius(e.GetPosition(theCanvas), seed_radius) )               
                {
                    if (Plants[I.Item1, I.Item2] == null)
                    {
                        Plants[I.Item1, I.Item2] = new GoodGrass(this,I.Item1,I.Item2);
                        GameElements.Add(Plants[I.Item1,I.Item2]);
                        theCanvas.Children.Add(Plants[I.Item1,I.Item2]);
                    }
                }
                            
            }             
            
            if ((bool)SprayRB.IsChecked)
            {
                if (Util.Distance(e.GetPosition(theCanvas), TheRancher.CenterPoint) > sprayRange)
                    return;
                if (SoundEffectsOn)
                    spray_sound.Play();
                foreach (Tuple<int, int> I in PlantSpotsInRadius(e.GetPosition(theCanvas), spray_radius))
                {
                    if (Plants[I.Item1, I.Item2] != null)
                    {
                        Plants[I.Item1, I.Item2].Spray();
                    }
                }

            }
            
        }

        System.Collections.IEnumerable PlantSpotsInRadius(Point p, double radius)
        {
                int half_rect_width = (int) (double)(radius)/Plant.plant_size + 1;
                int cplix = Plant.ClosestPlantIndexX(p);
                int cpliy = Plant.ClosestPlantIndexY(p);
                int fromx = Math.Max(cplix-half_rect_width, 0);
                int tox = Math.Min(cplix + half_rect_width, plant_cols-1);
                int fromy = Math.Max(cpliy - half_rect_width, 0);
                int toy = Math.Min(cpliy + half_rect_width, plant_rows-1);
                for (int i = fromx; i <= tox; i++)
                    for (int j = fromy; j <= toy; j++)                    
                        if (Util.Distance(Plant.CenterPointFromIndex(i,j), p) < radius)
                            yield return Tuple.Create(i,j);

        }

        //public bool IsHitWithLaser(OnTheFieldPiece e)
        //{
        //    return game_running && (bool)GunRB.IsChecked && laser_cool_down_counter == 0 && (Util.Distance(e.CenterPoint, theRancher.CenterPoint) <= laserRange);                 
        //}

        public bool IsHitWithLaser(MouseButtonEventArgs e, bool counts_for_accuracy = true)
        {
            bool result = game_running && (bool)GunRB.IsChecked && laser_cool_down_counter == 0 && (Util.Distance(e.GetPosition(theCanvas), theRancher.CenterPoint) <= laserRange);
            if (result && counts_for_accuracy)
                shots_hit++;
            else if (result) //if the shot doesn't count, but it did hit, don't count it as a shot.
                shots_fired--;
            return result;
        }

        public T GetClosestPrey<T>(ImagePiece to, bool care_about_dibs) where T : OnTheFieldPiece, Prey
        {
            double best_dist_so_far = Double.PositiveInfinity;
            T closest = null;
            T f = null;
            double cur_dist;
            foreach (GameElement e in GameElements)
            {
                if (e is T)
                {
                    f = (T)e;
                    if (f.Available(care_about_dibs))
                    {
                        cur_dist = Util.Distance(f, to);
                        if (cur_dist < best_dist_so_far)
                        {
                            closest = f;
                            best_dist_so_far = cur_dist;
                        }
                    }
                }
            }
            return closest;

        }

    


        public T GetClosestPlant<T>(ImagePiece to)  where T : EdiblePlant
        {
            T closest_plant = null;
            double best_dist_so_far = Double.PositiveInfinity;

            //may have optimization potential here
            for (int i = 0; i < plant_cols; i++)
                for (int j = 0; j < plant_rows; j++)
                    if (Plants[i, j] is T )
                    {
                        T g = (T)Plants[i, j];
                        if (g.Available)
                        {
                            double dist = Util.Distance(to.CenterPoint, g.CenterPoint);
                            if (dist < best_dist_so_far)
                            {
                                best_dist_so_far = dist;
                                closest_plant = g;
                            }
                        }
                            
                    }
            
            return closest_plant;
        }

        public void GrowWeed(int i, int j)
        {
            if (i < 0 || j < 0 || i >= this.plant_cols || j >= this.plant_rows)
                return;
            if (Plants[i, j] == null)
            {
                Plants[i, j] = new Weed(this, i, j);
                NewStuff.Add(Plants[i, j]);
                theCanvas.Children.Add(Plants[i, j]);
            }
        }

        public void GrowPoisonWeed(int i, int j)
        {
            if (i < 0 || j < 0 || i >= this.plant_cols || j >= this.plant_rows)
                return;
            if (Plants[i, j] == null)
            {
                Plants[i, j] = new PoisonWeed(this, i, j);
                NewStuff.Add(Plants[i, j]);
                theCanvas.Children.Add(Plants[i, j]);
            }
        }

        public void GrowRandomWeed()
        {
            GrowWeed(rand.Next(plant_cols), rand.Next(plant_rows));
        }
        public void GrowRandomPoisonWeed()
        {
            GrowPoisonWeed(rand.Next(plant_cols), rand.Next(plant_rows));
        }

        public Tuple<Point, double> RandomPointOnEdge()
        {
            int num = rand.Next(0, (int)(theCanvas.Width * 2 + theCanvas.Height * 2));
            if (num <= theCanvas.Width)
                return Tuple.Create(new Point(num, 0), 270.0);
            num -= (int)(theCanvas.Width);

            if (num <= theCanvas.Height)
                return Tuple.Create(new Point(theCanvas.Width, num), 0.0);
            num -= (int)theCanvas.Height;

            if (num <= theCanvas.Width)
                return Tuple.Create(new Point(num, theCanvas.Height), 90.0);
            num -= (int)theCanvas.Width;         

            return Tuple.Create(new Point(0, num), 180.0);
        }

        private void UserControl_MouseMove(object sender, MouseEventArgs e)
        {
            if (!game_running || current_level.NoUserControl)
                return;
            if ((bool)SeedRB.IsChecked)
                if (Util.Distance(e.GetPosition(theCanvas), theRancher.CenterPoint) < seedRange)
                {
                    SeedAoEC.Visibility = Visibility.Visible;
                    SeedAoEC.CenterPoint = e.GetPosition(theCanvas);
                }
                else
                {
                    SeedAoEC.Visibility = Visibility.Collapsed;
                }
            else if ((bool)SprayRB.IsChecked)
                if (Util.Distance(e.GetPosition(theCanvas), theRancher.CenterPoint) < sprayRange)
                {
                    SprayAoEC.Visibility = Visibility.Visible;
                    SprayAoEC.CenterPoint = e.GetPosition(theCanvas);
                }
                else
                {
                    SprayAoEC.Visibility = Visibility.Collapsed;
                }

        }

        private void UserControl_KeyDown(object sender, KeyEventArgs e)
        {
            if (!game_running)
                return;
            switch (e.Key)
            {
                case Key.Left:
                case Key.Q:                    
                    GunRB.IsChecked = true;
                    break;
                case Key.Down:
                case Key.W:
                    SeedRB.IsChecked = true;
                    break;
                case Key.Right:
                case Key.E:
                    SprayRB.IsChecked = true;
                    break;
                case Key.Space:            
                    MainMenu.Show();
                    game_running = false;
                    break;
                case Key.Tab:
                    if (current_level.MakeFeedersAtWill)
                        AddCreature(new Feeder(this));
                    break;
            }

        }

        private void button1_Click(object sender, RoutedEventArgs e)
        {
            MainMenu.Show();
            game_running = false;
        }

        public void ReportGrassGrow(GoodGrass g)
        {
            if (GrassGrow != null)
                GrassGrow(g, new GameEventArgs(this));
        }    

        public void ShowMessage(string message, string title)
        {            
            MessageWindow.Text = message;
            MessageWindow.Title = title;
            game_running = false;
            MessageWindow.Show();
        }

        public void ShowVictory(string message, _3XH.IHighScoreCtrl highScoreCtr=null)
        {
            game_running = false;
            GameOverLabel.Content = "Victory!";
            GameOverLabel.Visibility = Visibility.Visible;
            theVictoryWindow.Result = VictoryMenu.VictoryMenuResult.None;
            theVictoryWindow.Message = message;
            theVictoryWindow.HighScoreGrid.Children.Clear();
            if (highScoreCtr != null)
                highScoreCtr.show(theVictoryWindow.HighScoreGrid);               
            theVictoryWindow.Show();
        }

        public void ShowDefeat(string message)
        {
            game_running = false;
            GameOverLabel.Content = "Game Over";
            GameOverLabel.Visibility = Visibility.Visible;
            theDefeatMenu.Result = DefeatMenu.DefeatMenuResult.Resume;
            theDefeatMenu.Message = message;
            theDefeatMenu.Show();
        }

        public void AddCounter(Counter c)
        {
            CounterGrid.Children.Add(c);
            Grid.SetColumn(c, CounterGrid.Children.Count-1);
        }

        public double WeedRatio
        {
            get
            {
                int weed_count=0;
                for (int i = 0; i < plant_cols; i++)
                    for (int j = 0; j < plant_rows; j++)
                        if (Plants[i, j] is Weed)
                            weed_count++;
                return (double)weed_count / (plant_cols * plant_rows);
            }
        }

        public void FillWithGrass()
        {
            for (int i = 0; i < plant_cols; i++)
                for (int j = 0; j < plant_rows; j++)
                {
                    Plants[i, j] = new GoodGrass(this, i, j, true);
                    theCanvas.Children.Add(Plants[i, j]);
                    GameElements.Add(Plants[i, j]);
                }

        }

        public bool HasGoodGrass()
        {
            for (int i = 0; i < plant_cols; i++)
                for (int j = 0; j < plant_rows; j++)
                    if (Plants[i, j] != null && Plants[i, j] is GoodGrass)
                        return true;
            return false;
        }

        public void DestroyGoodThings(Point p, int radius)
        {
            foreach (Tuple<int, int> I in PlantSpotsInRadius(p, radius))
            {
                if (Plants[I.Item1, I.Item2] != null && Plants[I.Item1, I.Item2] is GoodGrass)
                    RemovePlant(Plants[I.Item1, I.Item2]);
            }

            bool squished_one = false;
            foreach (GameElement e in GameElements)
            {
                if (e is Feeder && Util.Distance(((Feeder)e).CenterPoint, p) <= radius)
                {
                    RemovePiece((Feeder)e);
                    squished_one = true;
                }                
            }
            if (squished_one && SoundEffectsOn)
                squish_sound.Play();
        }


        public void GrowWeedAtPoint(Point p)
        {
            GrowWeed(Plant.ClosestPlantIndexX(p), Plant.ClosestPlantIndexY(p));
        }

        public int ShotsFired
        {
            get { return shots_fired; }
        }
        public int ShotsHit
        {
            get { return shots_hit; }
        }
        public double RancherAccuracy
        {
            get { return (double)shots_hit / shots_fired; }
        }
        public int NumberOfGoodGrass
        {
            get
            {
                int count=0;
                for (int i = 0; i < plant_cols; i++)
                    for (int j = 0; j < plant_rows; j++)
                        if (Plants[i, j] != null && Plants[i, j] is GoodGrass)
                            count++;
                return count;
            }
        }

    }
}
