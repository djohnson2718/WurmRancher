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
    public class BigMonster: MovesToDestinationControl
    {
        const int height = 90, width = 90;
        static int trample_radius = (int)(Math.Sqrt(2) * height / 2 *.8);
        static BitmapImage BigMonsterBitmap = new BitmapImage();
        //static SoundEffect EatSound = SoundEffect.FromStream(WRResources.pig_grunt);
        //static SoundEffect BigMonsterDieSound = SoundEffect.FromStream(WRResources.pains);
        static Random rand = new Random();

        const int num_eyes = 3;
        BigMonsterEye[] Eyes = new BigMonsterEye[3];
                
        static BigMonster()
        {
            BigMonsterBitmap.SetSource(WRResources.big_monster);       
             
        }

        public BigMonster(GameControl theControl_)
            : base(theControl_, height, width, Timing.RelativeSpeedToPixelsPerFrame(Timing.relBigMonsterSpeed), Timing.RelativeRotateToRadiansPerFrame(Timing.relBigMonsterRotate))
        {

            PieceImage.Source = BigMonsterBitmap;
            PieceImage.Height = height;
            PieceImage.Width = width;
            Canvas BigMonsterCanvas = new Canvas();

            this.Content = BigMonsterCanvas;
            BigMonsterCanvas.Children.Add(this.PieceImage);

            for (int i = 0; i < num_eyes; i++)
            {
                Eyes[i] = new BigMonsterEye(theControl);
                Eyes[i].Shot += new EventHandler(BigMonster_Shot);
                BigMonsterCanvas.Children.Add(Eyes[i]);
            }

            Eyes[0].CenterPoint = new Point(10,10);
            Eyes[1].CenterPoint = new Point(10,45);
            Eyes[2].CenterPoint = new Point(10,80);

            BigMonsterCanvas.RenderTransform = this.rotate;
            PieceImage.RenderTransform = null;
        }

        int tantrum_counter = 0;

        int EyesLeft
        {
            get
            {
                int count = 0;
                for (int i = 0; i < num_eyes; i++)
                    if (!Eyes[i].IsShot)
                        count++;
                return count;
            }
        }

        void BigMonster_Shot(object sender, EventArgs e)
        {
            if (EyesLeft > 0)
            {
                tantrum_counter = Timing.BigMonsterTantrumTime;
                this.RelativeSpeed = Timing.relBigMonsterAngrySpeed;
                this.RelativeRotate = Timing.relBigMonsterAngryRotate;
            }
            else
                fading = true;
                
        }

        bool fading = false;
        int fade_time_elapsed = 0;
        int monster_counter = 0;
        

        public override void Update()
        {
            if (fading)
            {
                fade_time_elapsed++;

                if (fade_time_elapsed > Timing.CreatureDeathFadeTime)
                    theControl.RemovePiece(this);

                this.Opacity = (double)(Timing.CreatureDeathFadeTime - fade_time_elapsed) / Timing.CreatureDeathFadeTime;
            }
            else{
                if (tantrum_counter > 0)
                {
                    tantrum_counter--;
                    if (tantrum_counter == 0)
                    {
                        this.RelativeSpeed = Timing.relBigMonsterSpeed;
                        this.RelativeRotate = Timing.relBigMonsterRotate;
                    }
                    if (rand.NextDouble() < .1)
                        this.SetDestination(RandomPointOnField());
                }
                if (resting)
                    this.SetDestination(RandomPointOnField());

                monster_counter++;
                
                if (monster_counter % Timing.BigMonsterStompTime==0) //magic number here! 
                    theControl.DestroyGoodThings(this.CenterPoint, trample_radius);
                if (monster_counter % Timing.BigMonsterWeedSpawnTime == 0)
                    theControl.GrowWeedAtPoint(this.CenterPoint);
                base.Update();
            }
        }
    }
}
