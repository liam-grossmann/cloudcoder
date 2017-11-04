# Powershell script to deploy the website to production

$appdirectory="dist"
$webappname="cloudcoder"
$resourcegroup="Default-Web-NorthCentralUS"
 
# Login. You will be prompted for your username and password
Login-AzureRmAccount

# Get publishing profile for the web app
$xml = [xml](Get-AzureRmWebAppPublishingProfile -Name $webappname -ResourceGroupName $resourcegroup -OutputFile null)
 
# Extract connection information from publishing profile
$username = $xml.SelectNodes("//publishProfile[@publishMethod=`"FTP`"]/@userName").value
$password = $xml.SelectNodes("//publishProfile[@publishMethod=`"FTP`"]/@userPWD").value
$url = $xml.SelectNodes("//publishProfile[@publishMethod=`"FTP`"]/@publishUrl").value

# Debug
Write-Output "Uploading Cloud Coder" 
Write-Output $webappname 
Write-Output $username
Write-Output $password
Write-Output $url

# Upload files recursively 
$webclient = New-Object -TypeName System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential($username,$password)
$files = Get-ChildItem -Path $appdirectory -Recurse | Where-Object{!($_.PSIsContainer)}
foreach ($file in $files)
{
    $relativepath = (Resolve-Path -Path $file.FullName -Relative).Replace(".\", "").Replace($appdirectory + "\", "").Replace('\', '/')
    $uri = New-Object System.Uri("$url/$relativepath")
    "Uploading to " + $uri.AbsoluteUri
    $webclient.UploadFile($uri, $file.FullName)
} 
$webclient.Dispose()

# Finish
Write-Output "Uploading Cloud Coder Completed" 