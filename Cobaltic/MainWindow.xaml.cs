using System;
using System.Diagnostics;
using System.Net;
using System.Windows;
using System.Windows.Forms;
using System.Windows.Input;
using System.Windows.Threading;

namespace Cobaltic
{
    public partial class MainWindow
    {
        public MainWindow()
        {
            InitializeComponent();
            main = this;

            Loaded += (s, e) =>
            {
                MinimizeButton.IsEnabled = true;
                MaximizeRestoreButton.IsEnabled = false;
                CloseButton.IsEnabled = true;
            };
        }

        internal static MainWindow main;

        private void InstallButton_Click(object sender, RoutedEventArgs e)
        {
            var executable = System.IO.Directory.GetCurrentDirectory() + "\\splash.exe";
            var arguments = "-manifest " + ManifestID + " -install-dir " + Directory;

            using (var client = new WebClient())
            {
                client.DownloadFile("https://github.com/polynite/splash/releases/download/v1.1.5/splash_1.1.5_windows_amd64.exe", "splash.exe");
            }
            Process.Start(executable, arguments);
        }

        private void BrowseButton_Click(object sender, RoutedEventArgs e)
        {
            using (var fbd = new FolderBrowserDialog())
            {
                DialogResult result = fbd.ShowDialog();

                if (!string.IsNullOrWhiteSpace(fbd.SelectedPath))
                {
                    Directory = fbd.SelectedPath;
                }
                else
                {
                    Directory = "Please try again.";
                }
            }
        }

        internal string Directory
        {
            get { return DirectoryBox.Text.ToString(); }
            set { Dispatcher.Invoke(new Action(() => { DirectoryBox.Text = value; })); }
        }

        internal string ManifestID
        {
            get { return ManifestBox.Text.ToString(); }
            set { Dispatcher.Invoke(new Action(() => { ManifestBox.Text = value; })); }
        }

        private void DirectoryBoxReset(object sender, RoutedEventArgs e)
        {
            Directory = "";
        }

        private void ManifestList_Click(object sender, MouseButtonEventArgs e)
        {
            Process.Start("https://github.com/polynite/fn-releases");
        }
    }
}