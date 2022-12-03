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

namespace WurmRacher
{
    public partial class InstructionsWindow : ChildWindow
    {
        public InstructionsWindow()
        {
            InitializeComponent();

            this.textBlock1.Text = WRResources.Instructions;           
        }

        private void OKButton_Click(object sender, RoutedEventArgs e)
        {
            this.Close();
        }

        
    }
}

