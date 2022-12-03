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
    public partial class MessageChildWindow : ChildWindow
    {
        public MessageChildWindow()
        {
            InitializeComponent();  
            this.Closed +=new EventHandler(MessageChildWindow_Closed);
        }

        void  MessageChildWindow_Closed(object sender, EventArgs e)
        {
            Application.Current.RootVisual.SetValue(Control.IsEnabledProperty, true);
        }

        public string Text
        {
            set { MessageText.Text = value; }
        }

        private void OKButton_Click(object sender, RoutedEventArgs e)
        {
            this.DialogResult = true;
        }

        public int TextWidth
        {
            set { MessageText.Width = value; }
        }


        

        
    }
}

