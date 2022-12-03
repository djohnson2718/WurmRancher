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
    public class Wurm 
    {
        WurmHead head;
        BackAttachable tail;
        int length;
        GameControl theControl;

        int food_eaten_since_growth = 0;
        const int food_per_segment = 4;

        public event EventHandler<GameEventArgs> Eats;
        public event EventHandler<GameEventArgs> LengthChange;

        public Wurm(GameControl theControl_, int length_, Point starting_pos)
        {
            theControl = theControl_;
            length = length_;
            head = new WurmHead(theControl);
            theControl.AddCreature(head, starting_pos);
            WurmBodyPiece w2 = new WurmBodyPiece(theControl, head, head);
            w2.EatenByParasite += new EventHandler<EventArgs>(PieceEatenByParasite);
            theControl.AddCreature(w2, starting_pos);

            for (int i = 0; i < length - 2; i++)
            {
                WurmBodyPiece w3 = new WurmBodyPiece(theControl, w2, head);
                w3.EatenByParasite +=new EventHandler<EventArgs>(PieceEatenByParasite);
                theControl.AddCreature(w3, starting_pos);
                w2 = w3;
            }
            tail = w2;
            head.Eats += new EventHandler<EatEventData>(head_Eats);
        }

        void PieceEatenByParasite(object sender, EventArgs e)
        {
            WurmBodyPiece w = (WurmBodyPiece)sender;
            if (w.Follower != null)
            {
                w.Follower.Leader = w.Leader;
            }
            if (w == tail)
                tail = w.Leader;

            theControl.RemovePiece(w);
            length--;
            if (LengthChange != null)
                LengthChange(this, new GameEventArgs(theControl));
        }

        void head_Eats(object sender, EatEventData e)
        {
            if (!e.CreatureEaten.Eaten)
            {
                food_eaten_since_growth += e.CreatureEaten.Size;
                e.CreatureEaten.Eat();
                if (Eats != null)
                    Eats(this, new GameEventArgs(theControl));
            }
            while (food_eaten_since_growth >= food_per_segment)
            {
                food_eaten_since_growth -= food_per_segment;
                WurmBodyPiece wp = new WurmBodyPiece(theControl, tail, head);
                wp.EatenByParasite +=new EventHandler<EventArgs>(PieceEatenByParasite);
                theControl.AddCreature(wp, tail.CenterPoint);
                tail = wp;
                length++;
                if (LengthChange != null)
                    LengthChange(this, new GameEventArgs(theControl));
            }
        }

        public int Length
        {
            get { return length; }
        }
    }
}
