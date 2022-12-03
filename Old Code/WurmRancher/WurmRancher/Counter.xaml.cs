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
    public partial class Counter : UserControl
    {
        public Counter(string title)
        {
            InitializeComponent();
            TitleLabel.Content = title;
        }

        public object Value
        {
            set
            {
                ValueLabel.Content = value;
            }
        }
    }
}
