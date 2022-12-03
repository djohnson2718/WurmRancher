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
    public class IntroDemo : Level
    {
        public IntroDemo(Theme theme) : base(theme) { }

        public override bool NoUserControl
        {
            get
            {
                return true;
            }
        }

        public override string QuickObjectives
        {
            get
            {
                return "";
            }
        }

        public override void InitializeLevel(GameControl theControl)
        {
            base.InitializeLevel(theControl);
            new Wurm(theControl, 28, new Point(100, 370));
        }

        
    }
}
