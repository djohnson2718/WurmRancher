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
    public class AreaEffectCircle : OnTheFieldPiece
    {
        public AreaEffectCircle(GameControl theControl_, int radius) : base(theControl_, 2* radius, 2*radius)
        {
            Canvas circleCanvas = new Canvas();
            this.Content = circleCanvas;
            Ellipse circle = new Ellipse();
            circle.Height = 2 * radius;
            circle.Width = 2 * radius;
            circle.Stroke = new SolidColorBrush(Colors.Gray);
            circle.StrokeThickness = 2;
            circleCanvas.Children.Add(circle);
            circle.Fill = new SolidColorBrush(Colors.Cyan);
            this.Opacity = .4;

           
        }

        public override void Update() {    }

        
    }
}
