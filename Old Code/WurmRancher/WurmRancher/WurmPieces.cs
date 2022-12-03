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
using Microsoft.Xna.Framework.Audio;

namespace WurmRancher
{

    public interface BackAttachable {
        Point BackAttach {  get; }
        double Angle { get; }
        WurmBodyPiece Follower { get; set; }
        Point CenterPoint{get;}
    }

    public class WurmHead : MovesToDestinationControl, BackAttachable
    {
        const int height = 30, width = 30;
        
        static BitmapImage WurmHeadBitmap = new BitmapImage();
        static SoundEffect EatSound = SoundEffect.FromStream(WRResources.dragon);
        static SoundEffect StunSound = SoundEffect.FromStream(WRResources.electic_buzz);

        static WurmHead()
        {
            WurmHeadBitmap.SetSource(WRResources.wurm_head);
        }

       
        public WurmHead (GameControl theControl_)
            : base(theControl_, height, width, Timing.RelativeSpeedToPixelsPerFrame(Timing.relWurmSpeed), Timing.RelativeRotateToRadiansPerFrame(Timing.relWurmHeadRotate))
        {
            PieceImage.Source = WurmHeadBitmap;
            this.MouseRightButtonDown += new MouseButtonEventHandler(WurmHead_MouseRightButtonDown);   
        }

        int stun_counter = 0;
        
        void WurmHead_MouseRightButtonDown(object sender, MouseButtonEventArgs e)
        {
            if (theControl.IsHitWithLaser(e, false))
                if (stun_counter == 0)
                {
                    stun_counter += Timing.WurmStunTime;
                    feeder_target = null;
                    if (theControl.SoundEffectsOn)
                        StunSound.Play();
                }
        }

        int radius = 15;
        public Point BackAttach
        {
            get{return new Point(CenterX + radius*Math.Cos(Angle),CenterY + radius*Math.Sin(Angle));}
        }

       

        WurmBodyPiece follower;
        public WurmBodyPiece Follower
        {
            get { return follower; }
            set { follower = value; }
        }


        double target_angle;
        int sight_range = 500;

        Feeder feeder_target = null;

        void SetTargetAngle()
        {
            target_angle = Math.Atan((this.CenterY - destination_y) / (this.CenterX - destination_x));
            if (target_angle < 0)
                target_angle += Math.PI * 2;

            if (this.CenterX - destination_x < 0)
                target_angle += Math.PI;
            if (target_angle >= 2 * Math.PI)
                target_angle -= Math.PI * 2;
        }

        public override void Update()
        {
            if (stun_counter > 0)
            {
                stun_counter--;
                return;
            }
            if (feeder_target != null)
            {
                feeder_target.Dibs();
                if (feeder_target.Eaten)
                {
                    feeder_target = null;
                    this.resting = true;
                }
                else
                {
                    SetDestination(feeder_target.CenterPoint);
                    SetTargetAngle();
                    if (Util.Distance(this, feeder_target) <= this.Width / 2)
                    {
                        Eats(this, new EatEventData(feeder_target));
                        if (theControl.SoundEffectsOn)
                            EatSound.Play();
                    }
                        
                    
                }
            } 
            
            if (resting){
                feeder_target = theControl.GetClosestPrey<Feeder>(this, true);
                if (feeder_target != null && Util.Distance(this, feeder_target) > sight_range)
                    feeder_target = null;
                Point new_dest;
                if (feeder_target == null)
                {
                    new_dest = RandomPointOnField();
                    this.SetDestination(new_dest);
                    SetTargetAngle();
                }
            }

     
            

            //double diff = target_angle - angle;
            //if (Math.Abs(diff) < rotation_speed)
            //    angle = target_angle;
            //else if (target_angle < rotation_speed && (2 * Math.PI - angle) < rotation_speed - target_angle)
            //    angle = target_angle;
            //else if (diff >= Math.PI)
            //    angle -= rotation_speed;
            //else if (diff <= -Math.PI)
            //    angle += rotation_speed;
            //else if (diff > 0)
            //    angle += rotation_speed;
            //else if (diff < 0)
            //    angle -= rotation_speed;

            //if (angle < 0)
            //    angle += 2 * Math.PI;
            //if (angle > 2 * Math.PI)
            //    angle -= 2 * Math.PI;
       
                
            base.Update();
        }    

        public event EventHandler<EatEventData> Eats;

        public bool IsStunned
        {
            get { return stun_counter > 0; }
        }

    }

    public class WurmBodyPiece : ImagePiece, BackAttachable, Prey
    {
        const int height = 30, width = 30;
        static BitmapImage wurm_body_pic = new BitmapImage();
        RotateTransform rotate = new RotateTransform();

        static WurmBodyPiece()
        {
            wurm_body_pic.SetSource(WRResources.wurm_body);
        }

        BackAttachable leader;
        WurmHead head;
        public WurmBodyPiece(GameControl theControl_, BackAttachable leader_, WurmHead head_)
            : base(theControl_, height, width)
        {
            leader = leader_;
            head = head_;
            leader.Follower = this;            
            this.Height = 30;
            this.Width = 30;

            PieceImage.Source = wurm_body_pic;

            rotate.CenterX = height / 2.0;
            rotate.CenterY = width / 2.0;

            
            this.rotate.Angle = angle * 180/Math.PI;
            this.PieceImage.RenderTransform = rotate;
        }

        
        WurmBodyPiece follower = null;
        public WurmBodyPiece Follower
        {
            get { return follower; }
            set { follower = value; }
        }
        public BackAttachable Leader
        {
            get { return leader; }
            set { leader = value; } 
        }
        

        public Point BackAttach
        {
            get{return new Point(CenterX + radius*Math.Cos(angle),CenterY + radius*Math.Sin(angle));}
        }

        double angle;
        double radius = 15;        
        static double radians_per_frame = Timing.RelativeRotateToRadiansPerFrame(Timing.relWurmBodyRotate); //be careful here!!!!
        public event EventHandler<EventArgs> EatenByParasite;
        public double Angle
        {
            get { return angle; }
        }

        int fade_time_elapsed = 0;
        public override void Update()
        {
            if (head.IsStunned)
                return;
            angle += radians_per_frame* Math.Cos(leader.Angle - angle - Math.PI / 2);
            this.rotate.Angle = angle * 180 / Math.PI;
            
            if (total_bites_suffered > 0  && total_bites_suffered < Timing.ParasiteKillTime)
                total_bites_suffered--;

            this.CenterPoint = new Point(leader.BackAttach.X + radius * Math.Cos(angle), leader.BackAttach.Y + radius * Math.Sin(angle));

            if (IsEatenByParasite)
            {                
                fade_time_elapsed++;

                if (fade_time_elapsed > Timing.CreatureDeathFadeTime)
                    EatenByParasite(this, new EventArgs());

                this.Opacity = (double)(Timing.CreatureDeathFadeTime - fade_time_elapsed) / Timing.CreatureDeathFadeTime;               
            }
           
        }


        public bool IsEatenByParasite {
            get
            {
                return (total_bites_suffered >= Timing.ParasiteKillTime);
            }
        }

        int total_bites_suffered;

        public bool Available(bool care_about_dibs) 
        {
            if (!care_about_dibs)
                throw new Exception("something is wrong... everything that hunts wurm pieces cares about dibs");
            return (total_bites_suffered == 0);            
        }

        public void ParasiteBite()
        {
            total_bites_suffered+=2;    //we will decrement them on update as well.            
        }
    }

    public class EatEventData : EventArgs
    {
        public Feeder CreatureEaten;
        public EatEventData(Feeder f)
        {
            this.CreatureEaten = f;
        }
    }

}
