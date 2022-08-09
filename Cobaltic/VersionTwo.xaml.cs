using System.Diagnostics;
using System.Windows.Input;

namespace Cobaltic
{
    public partial class VersionTwo
    {
        public VersionTwo()
        {
            InitializeComponent();

            Loaded += (s, e) =>
            {
                MinimizeButton.IsEnabled = true;
                MaximizeRestoreButton.IsEnabled = false;
                CloseButton.IsEnabled = true;
            };
        }

        private void InstallButton_MouseDown(object sender, MouseButtonEventArgs e)
        {
            Process.Start("https://github.com/jwhazy/cobaltic/releases");
        }
    }
}
