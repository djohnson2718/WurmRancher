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

namespace WurmRancher
{
    public partial class VictoryMenu : ChildWindow
    {
        public enum VictoryMenuResult
        {
            Next, Resume, Menu, None
        }

        public VictoryMenuResult Result = VictoryMenuResult.None;
        public VictoryMenu()
        {
            InitializeComponent();

            this.Closed += new EventHandler(MessageChildWindow_Closed);
        }

        void MessageChildWindow_Closed(object sender, EventArgs e)
        {
            Application.Current.RootVisual.SetValue(Control.IsEnabledProperty, true);
        }

        private void Menu_Click(object sender, RoutedEventArgs e)
        {
            this.Result = VictoryMenuResult.Menu;
            this.Close();
        }

        private void Resume_Click(object sender, RoutedEventArgs e)
        {
            this.Result = VictoryMenuResult.Resume;
            this.Close();
        }

        private void Next_Click(object sender, RoutedEventArgs e)
        {
            this.Result = VictoryMenuResult.Next;
            this.Close();
        }

        public string Message
        {
            set { this.theTextBlock.Text = value; }
        }
    }
}

