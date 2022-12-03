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
using System.IO;

namespace WurmRancher
{
    public partial class Menu : ChildWindow
    {
        public enum MainMenuResults
        {
            NewGame, Options, Instructions
        }
        public Menu()
        {
            InitializeComponent();
            this.Closed += new EventHandler(MessageChildWindow_Closed);            
        }

        public event EventHandler SoundToggled;

        void MessageChildWindow_Closed(object sender, EventArgs e)
        {
            Application.Current.RootVisual.SetValue(Control.IsEnabledProperty, true);
        }

        public MainMenuResults Result;      


        private void NewGameButton_Click(object sender, RoutedEventArgs e)
        {
            this.Result = MainMenuResults.NewGame;
            DialogResult = true;
        }

        private void CloseResumeButton_Click(object sender, RoutedEventArgs e)
        {
            DialogResult = false;
        }

        private void ToggleSoundButton_Click(object sender, RoutedEventArgs e)
        {
            SoundToggled(this, new EventArgs());
        }

        private void ToggleFullScreenButton_Click(object sender, RoutedEventArgs e)
        {
            App.Current.Host.Content.IsFullScreen = !App.Current.Host.Content.IsFullScreen;
        }

        MessageChildWindow CreditsMessageWindow;        
        
        private void Credits_Click(object sender, RoutedEventArgs e)
        {
            if (CreditsMessageWindow == null)
            {
                CreditsMessageWindow = new MessageChildWindow();
                CreditsMessageWindow.Text = WRResources.Credits;
                CreditsMessageWindow.TextWidth = 600;
                CreditsMessageWindow.Title = "Credits/About";
            }
            CreditsMessageWindow.Show();
        }

        InstructionsWindow theInstructionsWindow;

        private void InstructionsButton_Click(object sender, RoutedEventArgs e)
        {
            if (theInstructionsWindow == null)
                theInstructionsWindow = new InstructionsWindow();
            theInstructionsWindow.Show();
        }


    }
}

