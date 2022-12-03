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
using System.Collections.Generic;

namespace WurmRancher
{
    public static class Levels
    {
        public static List<Level> LevelsList = new List<Level>();

        static Levels()
        {
            //LevelsList.Add(new StupidLevel(Theme.Mud));
            LevelsList.Add(new ProtectTheGrassEasyVersion(Theme.RedPebbles));
            LevelsList.Add(new TutorialLevel(Theme.Sand));
            LevelsList.Add(new FirstGrassEaterLevel(Theme.RedPebbles));
            LevelsList.Add(new MonsterLevel(Theme.Pebbles));
            LevelsList.Add(new WeedLevel(Theme.Snow));
            LevelsList.Add(new ParasiteLevel(Theme.Cracked));
            LevelsList.Add(new ProtectTheGrassLevel(Theme.Mud));
            LevelsList.Add(new PoisonWeedLevel(Theme.Sand));
            LevelsList.Add(new BigMonsterLevel(Theme.RedPebbles));
            LevelsList.Add(new SharpShooterLevel(Theme.Pebbles));
            LevelsList.Add(new DoubleWurmLevel(Theme.Snow));
            LevelsList.Add(new FeederLevel(Theme.Cracked));

        }
    }
}
