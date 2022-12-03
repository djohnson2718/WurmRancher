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
    public class StupidLevel : Level
    {

        public StupidLevel(Theme theme) : base(theme) { }

        public override string Name
        {
            get
            {
                return "Stupid Level";
            }
        }

        public override string Description
        {
            get
            {
                return "You win instantly, used to test victory menu, etc.";
            }
        }

        public override void Update(GameControl theControl)
        {
            base.Update(theControl);
            if (elapsed_frames == 5)
                Victory(theControl);
        }


    }
}
