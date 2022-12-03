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
    public static class Util
    {
        

        public static double Distance(Point p1, Point p2)
        {
            return Math.Sqrt(Math.Pow(p1.X - p2.X, 2) + Math.Pow(p1.Y - p2.Y, 2));
        }
        public static double Distance(OnTheFieldPiece p1, OnTheFieldPiece p2)
        {
            return Distance(p1.CenterPoint, p2.CenterPoint);
        }
    }
}
