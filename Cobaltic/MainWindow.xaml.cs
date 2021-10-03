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

            Loaded += (s, e) =>
            {
                MinimizeButton.IsEnabled = true;
                MaximizeRestoreButton.IsEnabled = false;
                CloseButton.IsEnabled = true;
            };
        }


        private void InstallButton_Click(object sender, RoutedEventArgs e)
        {
            var executable = System.IO.Directory.GetCurrentDirectory() + "\\splash.exe";
            var arguments = "-manifest " + ManifestBox.Text + " -install-dir " + DirectoryBox.Text;

            if ((DirectoryBox.Text == "") || (ManifestBox.Text == ""))
            {
                System.Windows.MessageBox.Show("Make sure you have selected a correct manifest ID and selected a folder.");
                return;
            }

            try
            {
                using (var client = new WebClient())
                {
                    client.DownloadFile("https://github.com/polynite/splash/releases/download/v1.1.5/splash_1.1.5_windows_amd64.exe", "splash.exe");
                }
                Process.Start("cmd.exe", "/C" + executable + " " + arguments + " & echo Thank you for using Cobaltic by JWHAZY (https://github.com/jackstadevelopment/). & echo If an error occurred, try a different manifest ID. & pause");
            }
            catch (Exception ex)
            {
                System.Windows.MessageBox.Show("Something went wrong. If this continues report it in the Discord server. Here is the information: " + ex.ToString());
                throw new Exception(ex.ToString());
            }

        }

        private void BrowseButton_Click(object sender, RoutedEventArgs e)
        {
            using (var fbd = new FolderBrowserDialog())
            {
                DialogResult result = fbd.ShowDialog();

                if (!string.IsNullOrWhiteSpace(fbd.SelectedPath))
                {
                    DirectoryBox.Text = fbd.SelectedPath;
                }
                else
                {
                    DirectoryBox.Text = "Please try again.";
                }
            }
        }

        private void ManifestButton_Click(object sender, RoutedEventArgs e)
        {
            Process.Start("https://github.com/polynite/fn-releases/blob/master/README.md");
        }

        private void ManifestText_Click(object sender, MouseButtonEventArgs e)
        {
            Process.Start("https://github.com/jackstadevelopment/cobaltic/blob/master/HELP.md");
        }

        private void DirectoryBoxReset(object sender, RoutedEventArgs e)
        {
            DirectoryBox.Text = "";
        }
    }
}