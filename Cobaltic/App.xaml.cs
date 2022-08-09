using System.Windows;
using System;
using System.Diagnostics;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Windows.Input;
using System.Windows.Threading;
using MessageBox = System.Windows.MessageBox;

namespace Cobaltic
{
    public partial class App
    {
        private async void CheckForLatest()
        {
            try
            {
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

                    if (System.Convert.ToBoolean(body) == true)
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
    }
}
