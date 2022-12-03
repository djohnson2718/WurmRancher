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

namespace WurmRancher
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
                i++;
            }

            this.Closed += new EventHandler(MessageChildWindow_Closed);
        }

        void MessageChildWindow_Closed(object sender, EventArgs e)
        {
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

