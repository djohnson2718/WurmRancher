﻿#pragma checksum "c:\users\drew\documents\visual studio 2010\Projects\WurmRancher\WurmRancher\MainPage.xaml" "{406ea660-64cf-4c82-b6f0-42d48172a799}" "B86A3DF67E406E79595CE39725619949"
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.269
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

using System;
using System.Windows;
using System.Windows.Automation;
using System.Windows.Automation.Peers;
using System.Windows.Automation.Provider;
using System.Windows.Controls;
using System.Windows.Controls.Primitives;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Ink;
using System.Windows.Input;
using System.Windows.Interop;
using System.Windows.Markup;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Media.Imaging;
using System.Windows.Resources;
using System.Windows.Shapes;
using System.Windows.Threading;


namespace WurmRancher {
    
    
    public partial class MainPage : System.Windows.Controls.UserControl {
        
        internal System.Windows.Controls.Grid LayoutRoot;
        
        internal System.Windows.Controls.Canvas theCanvas;
        
        internal System.Windows.Controls.Label GameOverLabel;
        
        internal System.Windows.Controls.MediaElement MainBackGroundMusicME;
        
        internal System.Windows.Controls.Grid LowerToolBarGrid;
        
        internal System.Windows.Controls.Button button1;
        
        internal System.Windows.Controls.Grid ButtonGrid;
        
        internal System.Windows.Controls.RadioButton GunRB;
        
        internal System.Windows.Controls.RadioButton SeedRB;
        
        internal System.Windows.Controls.RadioButton SprayRB;
        
        internal System.Windows.Controls.Grid CounterGrid;
        
        internal System.Windows.Controls.TextBlock QuickObjectives;
        
        private bool _contentLoaded;
        
        /// <summary>
        /// InitializeComponent
        /// </summary>
        [System.Diagnostics.DebuggerNonUserCodeAttribute()]
        public void InitializeComponent() {
            if (_contentLoaded) {
                return;
            }
            _contentLoaded = true;
            System.Windows.Application.LoadComponent(this, new System.Uri("/WurmRancher;component/MainPage.xaml", System.UriKind.Relative));
            this.LayoutRoot = ((System.Windows.Controls.Grid)(this.FindName("LayoutRoot")));
            this.theCanvas = ((System.Windows.Controls.Canvas)(this.FindName("theCanvas")));
            this.GameOverLabel = ((System.Windows.Controls.Label)(this.FindName("GameOverLabel")));
            this.MainBackGroundMusicME = ((System.Windows.Controls.MediaElement)(this.FindName("MainBackGroundMusicME")));
            this.LowerToolBarGrid = ((System.Windows.Controls.Grid)(this.FindName("LowerToolBarGrid")));
            this.button1 = ((System.Windows.Controls.Button)(this.FindName("button1")));
            this.ButtonGrid = ((System.Windows.Controls.Grid)(this.FindName("ButtonGrid")));
            this.GunRB = ((System.Windows.Controls.RadioButton)(this.FindName("GunRB")));
            this.SeedRB = ((System.Windows.Controls.RadioButton)(this.FindName("SeedRB")));
            this.SprayRB = ((System.Windows.Controls.RadioButton)(this.FindName("SprayRB")));
            this.CounterGrid = ((System.Windows.Controls.Grid)(this.FindName("CounterGrid")));
            this.QuickObjectives = ((System.Windows.Controls.TextBlock)(this.FindName("QuickObjectives")));
        }
    }
}

