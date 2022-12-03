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


namespace WurmRacher
{
    public partial class LevelSelectButton : UserControl
    {
        Level level;
        public LevelSelectButton(Level level_)
        {
            InitializeComponent();
            level = level_;
            this.LevelDescriptionTextBox.Text = level.Description;
            this.LevelName.Content = level.Name;
            UpdateLevelStatus();
            level.StatusChanged += new EventHandler(level_Ended);

            if (!level.HasHighScore)
            {
                this.ScoresButton.Content = "--";
                this.ScoresButton.IsEnabled = false;
            }
            
        }

        public event EventHandler ScoresButtonClicked;

        void level_Ended(object sender, EventArgs e)
        {
            UpdateLevelStatus();
        }

        public void UpdateLevelStatus()
        {
            switch (level.CompletionStatus)
            {
                case WurmRacher.Level.CompletionStatusEnum.Attempted:
                    this.theBorder.Background = new SolidColorBrush(Color.FromArgb(255,255,193,193));
                    this.CompletionCheckBox.IsChecked = false;
                    //this.HighScore.Content = "";
                    //this.HighScoreTitleLabel.Visibility = Visibility.Collapsed;
                    break;
                case WurmRacher.Level.CompletionStatusEnum.Completed:
                    this.theBorder.Background = new SolidColorBrush(Color.FromArgb(255, 193, 255, 193));
                    this.CompletionCheckBox.IsChecked = true;
                    //this.HighScore.Content = level.HighScore;
                    //this.HighScoreTitleLabel.Visibility = Visibility.Visible;
                    break;
                case WurmRacher.Level.CompletionStatusEnum.Unattempted:
                    this.theBorder.Background = new SolidColorBrush(Color.FromArgb(255, 212, 212, 212));
                    this.CompletionCheckBox.IsChecked = false;
                    //this.HighScore.Content = "";
                    //this.HighScoreTitleLabel.Visibility = Visibility.Collapsed;
                    break;
            }

        }

        public Level Level
        {
            get
            {
                return level;
            }
        }

        private void ScoresButton_Click(object sender, RoutedEventArgs e)
        {
            if (ScoresButtonClicked != null)
                ScoresButtonClicked(this, new EventArgs());
        }
    }
}
