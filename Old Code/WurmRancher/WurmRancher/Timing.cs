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
    public static class Timing
    {
        public const double frames_per_sec = 30.0;
        const double speed_multiplier = 1.0;

        //These are the values to adjust

        //These should be in pixels per second, times the multiplier
        public const double relRancherSpeed = 200;
        public const double relGrassEaterSpeed = 140;
        public const double relMonsterSpeed = 160;
        public const double relFeederSpeed = 140;
        public const double relWurmSpeed = 160;
        public const double relParasiteSpeed = 190;
        public const double relBigMonsterSpeed = 130;
        public const double relBigMonsterAngrySpeed = 250;

        //These are in degrees per second, times the multiplier
        public const double relRancherRotate = 360;
        public const double relGrassEaterRotate = 270;
        public const double relMonsterRotate = 180;
        public const double relFeederRotate = 270;
        public const double relWurmHeadRotate = 200;
        public const double relWurmBodyRotate = 200;
        public const double relParasiteRotate = 300;
        public const double relBigMonsterRotate = 130;
        public const double relBigMonsterAngryRotate = 270;

        //In seconds, times multiplier
        const double relGrassGrowTime = 4;
        const double relEatGrassTime = 1;
        const double relWurmStunTime = 2;
        const double relLaserCoolDown = .2;
        const double relSprayEffectivenessTime = 1.5;
        const double relParasiteKillTime = 2;
        const double relBigMonsterTantrumTime = 2;
        const double relBigMonsterStompTime = .25;
        const double relBigMonsterWeedSpawnTime = .75;

        public static int GrassGrowTime = RelativeTimeToFrames(relGrassGrowTime);
        public static int EatGrassTime = RelativeTimeToFrames(relEatGrassTime);
        public static int WurmStunTime = RelativeTimeToFrames(relWurmStunTime);
        public static int LaserCoolDown = RelativeTimeToFrames(relLaserCoolDown);
        public static int SprayEffectivenessTime = RelativeTimeToFrames(relSprayEffectivenessTime);
        public static int ParasiteKillTime = RelativeTimeToFrames(relParasiteKillTime);
        public static int BigMonsterTantrumTime = RelativeTimeToFrames(relBigMonsterTantrumTime);
        public static int BigMonsterStompTime = RelativeTimeToFrames(relBigMonsterStompTime);
        public static int BigMonsterWeedSpawnTime = RelativeTimeToFrames(relBigMonsterWeedSpawnTime);

        //In seconds, no multiplier
        const double realLaserFadeTime = .25;
        const double realCreatureDeathFadeTime = 1;        

        public static int LaserFadeTime = RealTimeToFrames(realLaserFadeTime);
        public static int CreatureDeathFadeTime = RealTimeToFrames(realCreatureDeathFadeTime);       



        public static double RelativeSpeedToPixelsPerFrame(double rel_speed)
        {
            return rel_speed / frames_per_sec * speed_multiplier;
        }

        public static double RelativeRotateToRadiansPerFrame(double rel_rot)
        {
            return rel_rot / frames_per_sec / 180 * Math.PI * speed_multiplier;
        }

        public static int RelativeTimeToFrames(double rel_time)
        {
            return (int) (rel_time*frames_per_sec * speed_multiplier);
        }

        public static int RealTimeToFrames(double real_time)
        {
            return (int)(real_time * frames_per_sec);
        }

        public static double FramesToRealTime(int frames)
        {
            return frames / frames_per_sec;
        }


    }
}
