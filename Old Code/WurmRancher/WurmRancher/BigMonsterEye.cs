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

namespace WurmRacher
{
    public class BigMonsterEye : ImagePiece
    {
        static BitmapImage BigMonsterEyeBitmap = new BitmapImage();
        static BitmapImage BigMonsterEyeShotBitmap = new BitmapImage();
        //static SoundEffect EatSound = SoundEffect.FromStream(WRResources.pig_grunt);
        static SoundEffect BigMonsterEyeShotSound = SoundEffect.FromStream(WRResources.pain_b);

        public event EventHandler Shot;
                
        static BigMonsterEye()
        {
            BigMonsterEyeBitmap.SetSource(WRResources.monster_eye);
            BigMonsterEyeShotBitmap.SetSource(WRResources.monster_eye_shot);
             
        }
        public BigMonsterEye(GameControl theControl)
            : base(theControl, 20, 20)
        {
            this.PieceImage.Source = BigMonsterEyeBitmap;
            this.MouseRightButtonDown += new MouseButtonEventHandler(BigMonsterEye_MouseRightButtonDown);
        }

        bool shot;

        public bool IsShot
        {
            get { return shot; }
        }
        void BigMonsterEye_MouseRightButtonDown(object sender, MouseButtonEventArgs e)
        {
            if (!shot && theControl.IsHitWithLaser(e))
            {
                shot = true;
                Shot(this, new EventArgs());
                this.PieceImage.Source = BigMonsterEyeShotBitmap;
                if (theControl.SoundEffectsOn)
                    BigMonsterEyeShotSound.Play();
            }

        }

        public override void Update()
        {
           
        }

    }
}
