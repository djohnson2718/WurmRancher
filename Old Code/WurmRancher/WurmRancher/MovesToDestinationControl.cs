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
    public abstract class MovesToDestinationControl : ImagePiece
    {        
        //double pixels_per_sec;
        double pixels_per_frame;
        protected bool resting =true;
        protected int destination_x, destination_y;
        protected RotateTransform rotate = new RotateTransform();
        double angle = 0;
        //double radians_per_sec;
        double radians_per_frame;
        double turn_diameter;
        bool angle_aquired = false;

        public MovesToDestinationControl(GameControl theControl_, int height, int width, double pixels_per_frame_, double radian_per_frame_) : base(theControl_, height, width) 
        {
            rotate.CenterX = height / 2.0;
            rotate.CenterY = width / 2.0;
            rotate.Angle = angle;
            PieceImage.RenderTransform = rotate;
            //pixels_per_sec = speed_;
            pixels_per_frame = pixels_per_frame_; 
            //radians_per_sec = rotation_speed_;
            radians_per_frame = radian_per_frame_ ; 
            turn_diameter = pixels_per_frame_ * 2 / radian_per_frame_;
        }

        public double FacingAngleDegrees
        {
            set
            {
                angle = value / 180 *  Math.PI;
                rotate.Angle = value;
            }
        }

        protected double RelativeSpeed
        {
            set { pixels_per_frame = Timing.RelativeSpeedToPixelsPerFrame(value); }
        }
        protected double RelativeRotate
        {
            set { radians_per_frame = Timing.RelativeRotateToRadiansPerFrame(value); }
        }

        public double Angle
        {
            get { return angle; }
            set
            {
                angle = value;
                this.rotate.Angle = angle * 180 / Math.PI;
            }
        }

        public void UpdateOld()
        {            
            if (this.resting) return;
            double distance = Math.Sqrt(Math.Pow(this.CenterY - this.destination_y, 2) + Math.Pow(this.CenterX - this.destination_x, 2));
            if (distance < this.pixels_per_frame)
            {
                resting = true;
                this.CenterX = destination_x;
                this.CenterY = destination_y;
                return;
            }
            double ratio = this.pixels_per_frame / distance;
            this.CenterX =ratio * this.destination_x + this.CenterX * (1 - ratio);
            this.CenterY =ratio * this.destination_y + this.CenterY * (1 - ratio);
            
        }      

        public override void Update()
        {
            if (this.resting) return;
            double distance = Math.Sqrt(Math.Pow(this.CenterY - this.destination_y, 2) + Math.Pow(this.CenterX - this.destination_x, 2));
            if (distance < this.pixels_per_frame)
            {
                resting = true;
                this.CenterX = destination_x;
                this.CenterY = destination_y;
                return;
            }

            double target_angle = Math.Atan2(this.CenterY - destination_y, this.CenterX - destination_x);
            if (target_angle < 0)
                target_angle += Math.PI * 2;

            double diff = target_angle - angle;
            if (Math.Abs(diff) < radians_per_frame)
            {
                angle = target_angle;
                angle_aquired = true;
            }
            else if ((2 * Math.PI - angle) + target_angle < radians_per_frame) //target_angle < radians_per_frame &&
            {
                angle = target_angle;
                angle_aquired = true;
            }
            else if (diff >= Math.PI)
                angle -= radians_per_frame;
            else if (diff <= -Math.PI)
                angle += radians_per_frame;
            else if (diff > 0)
                angle += radians_per_frame;
            else if (diff < 0)
                angle -= radians_per_frame;

            if (angle < 0)
                angle += 2 * Math.PI;
            if (angle > 2 * Math.PI)
                angle -= 2 * Math.PI;


            if (angle_aquired || distance >= turn_diameter)
            {
                this.CenterX -= pixels_per_frame * Math.Cos(angle);
                this.CenterY -= pixels_per_frame * Math.Sin(angle);
            }
            this.rotate.Angle = angle * 180/Math.PI;
        }

        public virtual void SetDestination(int x, int y)
        {
            this.destination_x = x;
            this.destination_y = y;
            this.resting = false;
            double target_angle = Math.Atan2(this.CenterY - y,this.CenterX - x);
            angle_aquired = false;            
        }
        public void SetDestination(Point new_dest)
        {
            SetDestination((int)new_dest.X, (int)new_dest.Y);
        }

        static Random rand = new Random();
        protected static Point PickPointInRectangle(Rect r)
        {
            return new Point( rand.Next((int)r.Left, (int)r.Right + 1), rand.Next((int)r.Top, (int)r.Bottom + 1));
        }

        protected Point RandomPointOnField()
        {
            return new Point(rand.Next(0, theControl.PlayingFieldWidth), rand.Next(0, theControl.PlayingFieldHeight));
        }


    }
}
