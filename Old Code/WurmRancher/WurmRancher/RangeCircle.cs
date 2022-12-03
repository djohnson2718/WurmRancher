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
    public class RangeCircle : OnTheFieldPiece
    {
        Ellipse circle = new Ellipse();
        public RangeCircle(GameControl theControl_, int radius) : base(theControl_, 2* radius, 2*radius)
        {
            Canvas circleCanvas = new Canvas();
            this.Content = circleCanvas;            
            circle.Height = 2 * radius;
            circle.Width = 2 * radius;
            circle.Stroke = new SolidColorBrush(Colors.White);
            circle.StrokeThickness = 2;
            circleCanvas.Children.Add(circle);
            this.Opacity = .7;
            
        }

        public override void Update()
        {
            this.CenterPoint = theControl.TheRancher.CenterPoint;
        }

        public int Radius
        {
            set
            {
                circle.Height = 2 * value;
                circle.Width = 2 * value;
                this.Height = 2 * value;
                this.Width = 2 * value;
            }
        }
    }
}
