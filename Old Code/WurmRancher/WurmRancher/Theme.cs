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

namespace WurmRancher
{
    public class Theme
    {
        public virtual Uri Music
        {
            get { 
                return  music;
            }
        }

        public virtual Brush Background
        {
            get
            {
                return background;  
            }
        }

        Uri music;
        Brush background;
        const string music_path = "/Music/";
        public Theme(string song_name, System.IO.UnmanagedMemoryStream background_stream)
        {
            music = new Uri(music_path + song_name, UriKind.Relative);
            background = MakeImageBrush(background_stream);
        }

        protected Brush MakeImageBrush(System.IO.UnmanagedMemoryStream stream)
        {
            BitmapImage image = new BitmapImage();
            image.SetSource(stream);
            ImageBrush brush = new ImageBrush();

            brush.ImageSource = image;
            return brush;

        }

        public static Theme Mud
        {
            get
            {
                return new Theme("DST-RockX.mp3", WRResources.SoilMud);
            }
        }

        
        public static Theme Cracked
        {
            get
            {
                return new Theme("DST-InCircles.mp3", WRResources.SoilCracked);
            }
        }
        public static Theme Sand
        {
            get
            {
                return new Theme("DST-BlazeOn.mp3", WRResources.SoilBeach);
            }
        }
        public static Theme RedPebbles
        {
            get
            {
                return new Theme("DST-RockX.mp3", WRResources.SandPebblesRed);
            }
        }
        public static Theme Pebbles
        {
            get
            {
                return new Theme("DST-InCircles.mp3", WRResources.SandPebblesBrown);
            }
        }
        public static Theme Snow
        {
            get
            {
                return new Theme("DST-BlazeOn.mp3", WRResources.Snow);
            }
        }
        public static Theme Intro
        {
            get
            {
                return new Theme("DST-BlazeOn.mp3", WRResources.IntroScreen);
            }
        }

    }
}
