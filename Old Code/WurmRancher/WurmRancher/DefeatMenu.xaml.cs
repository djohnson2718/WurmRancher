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
    public partial class DefeatMenu : ChildWindow
    {
        public enum DefeatMenuResult
        {
            Resume, Restart, LevelMenu 
        }

        public DefeatMenuResult Result;

        public DefeatMenu()
        {
            InitializeComponent();
            this.Closed += new EventHandler(MessageChildWindow_Closed);
        }

        void MessageChildWindow_Closed(object sender, EventArgs e)
        {
            Application.Current.RootVisual.SetValue(Control.IsEnabledProperty, true);
        }

        private void Restart_Click(object sender, RoutedEventArgs e)
        {
            Result = DefeatMenuResult.Restart;
            this.Close();
        }

        private void Menu_Click(object sender, RoutedEventArgs e)
        {
            Result = DefeatMenuResult.LevelMenu;
            this.Close();
        }

        private void ResumeButton_Click(object sender, RoutedEventArgs e)
        {
            Result = DefeatMenuResult.Resume;
            this.Close();
        }

        public string Message {
            set { theTextBlock.Text = value; }
        }
    }
}

