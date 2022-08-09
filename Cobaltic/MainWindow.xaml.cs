using System;
using System.Diagnostics;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Forms;
using System.Windows.Input;
using System.Windows.Threading;
using MessageBox = System.Windows.MessageBox;

namespace Cobaltic
{
    public partial class MainWindow
    {
        public MainWindow()
        {
            CheckForLatest();
            InitializeComponent();

            CheckForUpdates();
            CheckForBeta();

            try 
            {
                var versionInfo = FileVersionInfo.GetVersionInfo(System.Reflection.Assembly.GetEntryAssembly().Location);
                string version = versionInfo.FileVersion;
#if DEBUG
                VersionLabel.Text = "v" + version + "-dev";
#else
    VersionLabel.Text = "v" + version; 
#endif

            }
            catch (Exception ex)
            {
                MessageBox.Show("Error occurred while setting version number. " + ex.ToString());
            }
            

            Loaded += (s, e) =>
            {
                MinimizeButton.IsEnabled = true;
                MaximizeRestoreButton.IsEnabled = false;
                CloseButton.IsEnabled = true;
            };
        }


        private void InstallButton_Click(object sender, RoutedEventArgs e)
        {
            var directory = '"' + DirectoryBox.Text.TrimEnd('\\') + '"';
            var manifest = ManifestBox.Text;
            var executable = '"' + Directory.GetCurrentDirectory() + "\\splash.exe" + '"';
            var arguments = " -manifest " + manifest + " -install-dir " + directory;

            var versionInfo = FileVersionInfo.GetVersionInfo(System.Reflection.Assembly.GetEntryAssembly().Location);
            string version = versionInfo.FileVersion;

            if (String.IsNullOrEmpty(ManifestBox.Text) || String.IsNullOrEmpty(DirectoryBox.Text))
            {
                MessageBox.Show("Make sure you have entered a correct manifest ID and selected a folder.");
                return;
            }

            try
            {
                if (!File.Exists("splash.exe"))
                {
                    using (var client = new WebClient())
                    {
                        client.DownloadFile("https://github.com/polynite/splash/releases/download/v1.1.5/splash_1.1.5_windows_amd64.exe", "splash.exe");
                    }
                }
                Process.Start("cmd.exe", "/C " + '"' + executable + arguments + " & echo. & echo Thank you for using Cobaltic v" + version + " by jacksta (https://github.com/jwhazy/). & echo If an error occurred, try a different manifest ID. & pause" + '"');
            }
            catch (Exception ex)
            {
                MessageBox.Show("Something went wrong. If this continues report it in the Discord server. Here is the information: " + ex.ToString());
            }

        }

        private void BrowseButton_Click(object sender, RoutedEventArgs e)
        {
            try
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
            } catch (Exception ex)
            {
                MessageBox.Show("Error while setting download path. Exception caught: " + ex.ToString());
            }
        }

        private void ManifestButton_Click(object sender, RoutedEventArgs e)
        {
            Process.Start("https://github.com/polynite/fn-releases/blob/master/README.md");
        }

        private void ManifestText_Click(object sender, MouseButtonEventArgs e)
        {
            Process.Start("https://github.com/jwhazy/cobaltic/blob/master/HELP.md");
        }

        private void CreditsText_Click(object sender, MouseButtonEventArgs e)
        {
            Process.Start("https://github.com/jwhazy/cobaltic#credits");
        }

        private void DirectoryBoxReset(object sender, RoutedEventArgs e)
        {
            DirectoryBox.Text = "";
        }

        private async void CheckForLatest()
        {
            
            try
            {
                var versionInfo = FileVersionInfo.GetVersionInfo(System.Reflection.Assembly.GetEntryAssembly().Location);
                string version = versionInfo.FileVersion;
                var client = new HttpClient();
                var request = new HttpRequestMessage
                {
                    Method = HttpMethod.Get,
                    RequestUri = new Uri("https://api.cobaltic.jacksta.dev/api/check"),
                };
                using (var response = await client.SendAsync(request))
                {

                    response.EnsureSuccessStatusCode();
                    var body = await response.Content.ReadAsStringAsync();

                    if (Convert.ToBoolean(body) == true)
                    {
                        VersionTwo versionTwo = new VersionTwo();
                        this.Close();
                        versionTwo.ShowDialog(); 
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Something went wrong while fetching for updates. You may have issues downloading game files. Exception thrown: " + ex.ToString());
            }
        }

        private async void CheckForBeta()
        {

            try
            {
                var versionInfo = FileVersionInfo.GetVersionInfo(System.Reflection.Assembly.GetEntryAssembly().Location);
                string version = versionInfo.FileVersion;
                var client = new HttpClient();
                var request = new HttpRequestMessage
                {
                    Method = HttpMethod.Get,
                    RequestUri = new Uri("https://api.cobaltic.jacksta.dev/api/beta"),
                };
                using (var response = await client.SendAsync(request))
                {

                    response.EnsureSuccessStatusCode();
                    var body = await response.Content.ReadAsStringAsync();

                    if (Convert.ToBoolean(body) == true)
                    {
                        VersionTwoText.Text = "You can now beta test Cobaltic v2. Click to learn more.";
                        VersionTwoText.MouseDown -= VersionTwo_MouseDown;
                        VersionTwoText.MouseDown += VersionTwoBeta_MouseDown;
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Something went wrong while fetching for updates. You may have issues downloading game files. Exception thrown: " + ex.ToString());
            }
        }

        private async void CheckForUpdates()
        {
            try
            {
                var versionInfo = FileVersionInfo.GetVersionInfo(System.Reflection.Assembly.GetEntryAssembly().Location);
                string version = versionInfo.FileVersion;
                var client = new HttpClient();
                var request = new HttpRequestMessage
                {
                    Method = HttpMethod.Get,
                    RequestUri = new Uri("https://api.cobaltic.jacksta.dev/api/version"),
                };
                using (var response = await client.SendAsync(request))
                {

                    response.EnsureSuccessStatusCode();
                    var body = await response.Content.ReadAsStringAsync();

                    if (body != version)
                    {
                        MessageBox.Show("New update available. Download it from the GitHub (https://github.com/jwhazy/cobaltic/releases/latest).");
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Something went wrong while fetching for updates. You may have issues downloading game files. Exception thrown: " + ex.ToString());
            }
        }

        private void VersionTwo_MouseDown(object sender, MouseButtonEventArgs e)
        {
            MessageBox.Show("Cobaltic v2 is nearing release. You can beta test by going to the GitHub (https://github.com/jwhazy/cobaltic/tree/dev) and downloading the latest release. Cobaltic v1 will be available until v2 is stable. Cobaltic v2 contains easier season/client selecting, multiple download methods (soon!) and a updated UI. Built with Rust and TypeScript.");
        }

        private void VersionTwoBeta_MouseDown(object sender, MouseButtonEventArgs e)
        {
            Process.Start("https://github.com/jwhazy/cobaltic/releases");
        }
    }
}
