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

namespace WurmRacher
{
    public class LaserBeam : OnTheFieldPiece
    {
        
        public LaserBeam(GameControl theControl_, double dx, double dy) :base(theControl_,(int)Math.Abs(dy),(int)Math.Abs(dx))
        { 
            Canvas laserCanvas = new Canvas();
            this.Content = laserCanvas;
            Line line = new Line();
            if ((dx / dy) > 0)
            {
                line.X1 = 0;
                line.Y1 = 0;
                line.X2 = Width;
                line.Y2 = Height;
            }
            else
            {
                line.X1 = 0;
                line.Y1 = Height;
                line.X2 = Width;
                line.Y2 = 0;
            }
            line.Stroke = new SolidColorBrush(Colors.Cyan);
            line.StrokeThickness = 3;
            laserCanvas.Children.Add(line);
        }

        int time=0;
        public override void Update()
        {
            time++;
            if (time >= Timing.LaserFadeTime)
                theControl.RemovePiece(this);
            //this.Opacity -= .20;
            this.Opacity = (double)(Timing.LaserFadeTime - time) / Timing.LaserFadeTime;

        }

    }
}
