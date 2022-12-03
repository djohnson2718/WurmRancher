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
    public interface GameControl
    {
        Rancher TheRancher{
            get;
        }
        int PlayingFieldWidth
        {
            get;
        }
        int PlayingFieldHeight
        {
            get;
        }
        bool SoundEffectsOn
        {
            get;
        }
        int NumberOfGoodGrass
        {
            get;
        }

        double RancherAccuracy { get; }
        int ShotsHit { get; }
        int ShotsFired { get; }
        void RemovePiece(OnTheFieldPiece e);
        void RemovePlant(Plant p);
        //bool IsHitWithLaser(OnTheFieldPiece e);
        bool IsHitWithLaser(MouseButtonEventArgs e, bool counts_for_accuracy = true);
        void GrowWeed(int i, int j);
        void AddCreature(MovesToDestinationControl e);
        void AddCreature(OnTheFieldPiece e, Point starting_pos);

        T GetClosestPlant<T>(ImagePiece e) where T : EdiblePlant;

        T GetClosestPrey<T>(ImagePiece to, bool care_about_dibs) where T : OnTheFieldPiece, Prey;

        //void AddMovesToDestinationControl(MovesToDestinationControl e);

        void GrowRandomWeed();

        void AddWurm(int p);

        Level CurrentLevel
        {
            get;
        }

        event EventHandler<GameEventArgs> GrassGrow;
        //event EventHandler FeederEats;


        void ReportGrassGrow(GoodGrass g);
        //void ReportFeederEats(Feeder f);

        void ShowMessage(string message, string title);

        void ShowVictory(string message, _3XH.IHighScoreCtrl hsc = null);

        void AddCounter(Counter timer);

        void ShowDefeat(string message);

        double WeedRatio { get; }

        void GrowPoisonWeed(int p, int IndexY);

        void GrowRandomPoisonWeed();

        bool HasGoodGrass();

        void FillWithGrass();

        void DestroyGoodThings(Point point, int height);

        void GrowWeedAtPoint(Point point);
    }
}
