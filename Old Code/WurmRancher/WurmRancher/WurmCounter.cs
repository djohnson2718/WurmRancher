using System;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Ink;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;

namespace WurmRancher
{
    public class WurmCounter : Counter
    {
        Wurm wurm;
        public WurmCounter(Wurm wurm_) : base("Wurm Size")
        {
            wurm = wurm_;
            Value = wurm.Length;
            wurm.LengthChange += new EventHandler<GameEventArgs>(wurm_Grows);
        }

        void wurm_Grows(object sender, GameEventArgs e)
        {
            Value = wurm.Length;
        }
    }
}
