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
using System.Windows.Media.Imaging;

namespace WurmRacher
{
    public class Rancher : MovesToDestinationControl
    {
        const int height = 30, width = 30;
        
        static BitmapImage RancherBitmap = new BitmapImage();

        static Rancher()
        {
            RancherBitmap.SetSource(WRResources.rancher);
        }
        
        public Rancher(GameControl theControl_):base(theControl_, height, width, Timing.RelativeSpeedToPixelsPerFrame(Timing.relRancherSpeed), Timing.RelativeRotateToRadiansPerFrame(Timing.relRancherRotate))
        {
            PieceImage.Source = RancherBitmap;
        }

    }
}
