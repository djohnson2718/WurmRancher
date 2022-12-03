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
    public static class WR_ZValues
    {        

        public static Dictionary<Type, int> ZValueDict = new Dictionary<Type, int>();

        static WR_ZValues()
        {
            ZValueDict[typeof(Rancher)] = 90;
            ZValueDict[typeof(AreaEffectCircle)] = 85;
            ZValueDict[typeof(LaserBeam)] = 80;
            ZValueDict[typeof(RangeCircle)] = 70;
            ZValueDict[typeof(Parasite)] = 60;
            ZValueDict[typeof(GrassEater)] = 50;                        
            ZValueDict[typeof(WurmHead)] = 30;
            ZValueDict[typeof(WurmBodyPiece)] = 30;
            ZValueDict[typeof(Monster)] = 20;
            ZValueDict[typeof(BigMonsterEye)] = 15;
            ZValueDict[typeof(BigMonster)] = 10;
            ZValueDict[typeof(Feeder)] = 5;
            ZValueDict[typeof(GoodGrass)] = 0;
            ZValueDict[typeof(PoisonWeed)] = 0;
            ZValueDict[typeof(Weed)] = 0;
        }


    }
}
