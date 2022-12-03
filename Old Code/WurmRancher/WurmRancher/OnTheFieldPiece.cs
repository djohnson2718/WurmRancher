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
    public abstract class OnTheFieldPiece : ContentControl, GameElement
    {
        protected GameControl theControl;

        //should be fired only by the Remove() method, called by theControl
        public event EventHandler<GameEventArgs> Removed;

        public OnTheFieldPiece(GameControl theControl_, int height, int width)
        {
            this.Height = height;
            this.Width = width;
            theControl = theControl_;
            Canvas.SetZIndex(this, WR_ZValues.ZValueDict[this.GetType()]);
        }

        public abstract void Update();

        //called by the control
        public void Remove()
        {
            if (Removed != null)
                Removed(this, new GameEventArgs(theControl));
        }

        public double CenterX
        {
            get
            {
                return Canvas.GetLeft(this) + this.Width / 2;
            }
            set
            {
                Canvas.SetLeft(this, value - this.Width / 2);
            }
        }

        public double CenterY
        {
            get
            {
                return Canvas.GetTop(this) + this.Height / 2;
            }
            set
            {
                Canvas.SetTop(this, value - this.Height / 2);
            }
        }

        public Point CenterPoint
        {
            get
            {
                return new Point(CenterX, CenterY);
            }
            set
            {
                CenterX = value.X;
                CenterY = value.Y;
            }
        }
    }
}
