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
using System.IO.IsolatedStorage;

namespace WurmRacher
{
    public partial class LevelSelecter : ChildWindow
    {
        public LevelSelecter()
        {
            InitializeComponent();
            LevelSelectButton lb;

            int i = 0;
            foreach (Level l in Levels.LevelsList)
            {
                lb = new LevelSelectButton(l);
                RowDefinition rd = new RowDefinition();
                rd.Height = GridLength.Auto;
                this.ScrollGrid.RowDefinitions.Add(rd);
                this.ScrollGrid.Children.Add(lb);
                Grid.SetRow(lb, i);
                lb.MouseLeftButtonUp += new MouseButtonEventHandler(lb_MouseLeftButtonUp);
                lb.ScoresButtonClicked += new EventHandler(lb_ScoresButtonClicked);

                i++;
            }

            this.Closed += new EventHandler(MessageChildWindow_Closed);
        }

        void lb_ScoresButtonClicked(object sender, EventArgs e)
        {
            LevelSelectButton lb = (LevelSelectButton)sender;
            HighScoreGrid.Children.Clear();
            
            // create the high score control

            _3XH.IHighScoreCtrl highScoreCtrl = _3XH.API.Instance.createHighScoreCtrl();

            // init the high score control with the application key and secret

            highScoreCtrl.init(Level.ApplicationKey, Level.ApplicationSecret);

            // add the high score control as a child of the panel

            highScoreCtrl.show(HighScoreGrid);

            // set the event handler that will be called when the user closes the high score control

            highScoreCtrl.setOnCloseHandler((sender2, e2) => { highScoreCtrl.hide(); });

            // call get high score list

            highScoreCtrl.getHighScoreList(lb.Level.HighScoreName);
        }
       
        void MessageChildWindow_Closed(object sender, EventArgs e)
        {
            this.HighScoreGrid.Children.Clear();
            Application.Current.RootVisual.SetValue(Control.IsEnabledProperty, true);
        }

        public Level LevelSected;

        void lb_MouseLeftButtonUp(object sender, MouseButtonEventArgs e)
        {
            LevelSelectButton lb = (LevelSelectButton)sender;
            LevelSected = lb.Level;
            this.DialogResult = true;
        }      

        private void CancelButton_Click(object sender, RoutedEventArgs e)
        {
            
            this.DialogResult = false;
        }

        //private void ResetScores_Click(object sender, RoutedEventArgs e)
        //{
        //    if (MessageBox.Show("Are you sure you want to reset all the high scores and completion data? This cannot be undone!", "Confirm", MessageBoxButton.OKCancel) == MessageBoxResult.OK)
        //    {
        //        IsolatedStorageSettings data = IsolatedStorageSettings.ApplicationSettings;
        //        data.Clear();
        //        foreach (LevelSelectButton l in ScrollGrid.Children)
        //        {                    
        //            l.Level.CompletionStatus = Level.CompletionStatusEnum.Unattempted;
        //            l.Level.ResetHighScore();
        //            l.UpdateLevelStatus();
        //        }
        //    }

        //}
    }
}

