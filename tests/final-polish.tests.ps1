$ErrorActionPreference = 'Stop'
$failures = [System.Collections.Generic.List[string]]::new()

foreach ($asset in @('favicon.ico', 'favicon.svg', 'favicon-16x16.png', 'favicon-32x32.png', 'favicon-48x48.png', 'apple-touch-icon.png')) {
  if (-not (Test-Path (Join-Path $PSScriptRoot "..\\$asset"))) { $failures.Add("Missing favicon asset: $asset") }
}

foreach ($page in @('index.html', 'cafe-khemisset.html', 'villa-contemporaine.html', 'parapharmacie-sale.html')) {
  $html = Get-Content -Raw (Join-Path $PSScriptRoot "..\\$page")
  foreach ($reference in @('/favicon.ico?v=4', '/favicon.svg?v=4', '/favicon-32x32.png?v=4', '/favicon-48x48.png?v=4', '/apple-touch-icon.png?v=4')) {
    if (-not $html.Contains($reference)) { $failures.Add("$page is missing root-relative icon reference: $reference") }
  }
}

Add-Type -AssemblyName System.Drawing
foreach ($expected in @(@('favicon-16x16.png', 16), @('favicon-32x32.png', 32), @('favicon-48x48.png', 48), @('apple-touch-icon.png', 180))) {
  $image = [System.Drawing.Image]::FromFile((Join-Path $PSScriptRoot "..\\$($expected[0])"))
  if ($image.Width -ne $expected[1] -or $image.Height -ne $expected[1]) { $failures.Add("Unexpected dimensions for $($expected[0])") }
  $image.Dispose()
}

$mobile = Get-Content -Raw (Join-Path $PSScriptRoot '..\\mobile.css')
foreach ($rule in @('min-height: 44px', 'font-size: 12px', 'padding: 82px 6vw')) {
  if (-not $mobile.Contains($rule)) { $failures.Add("Missing mobile refinement rule: $rule") }
}

if ($failures.Count) { $failures; exit 1 }
Write-Output 'FINAL POLISH TEST PASS'
