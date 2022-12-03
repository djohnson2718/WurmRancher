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
    public abstract class ImagePiece : OnTheFieldPiece
    {
        
        protected Image PieceImage = new Image();       
           

        public ImagePiece(GameControl theControl_, int height, int width) :base(theControl_, height, width)
        {
            this.Content = PieceImage;
        }



    }
}
