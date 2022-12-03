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
    //Warning, may not work!!!!!
    public class TestLevel :Level
    {
        public TestLevel(Theme theme) : base(theme) { }

        public override string Description
        {
            get
            {
                return "No objects, just have fun and catch bugs!";
            }
        }

        public override string Name
        {
            get
            {
                return "Test";
            }
        }

        public override void Update(GameControl theControl)
        {
            base.Update(theControl);

            if (elapsed_frames % 300 == 0)
                theControl.AddCreature(new Feeder(theControl));
            if (elapsed_frames % 500 == 0)
                theControl.AddCreature(new GrassEater(theControl));
            if (elapsed_frames % 400 == 0)
                theControl.GrowRandomWeed();
            if (elapsed_frames % 600 == 0)
                theControl.AddCreature(new Monster(theControl));
        }

        public override void InitializeLevel(GameControl theControl)
        {
            base.InitializeLevel(theControl);
            theControl.AddCreature(new GrassEater(theControl));            
            theControl.AddCreature(new Feeder(theControl));
            theControl.AddCreature(new Feeder(theControl));
            theControl.AddCreature(new Feeder(theControl));            
            theControl.AddWurm(2);
            theControl.GrowWeed(10, 10);
        }
    }
}
