#!/bin/bash
# ==============================================================================
# Chintap Studio - Automated High-Resolution Brand & Marketing Asset Pipeline
# Generates master vector SVGs, 2048/2400px PNG exports, presentation cards,
# marketing graphics, social preview cards, and adaptive favicons.
# ==============================================================================
set -e

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEST="$REPO_ROOT/public/images"
PUB_DEST="$REPO_ROOT/public"
TMP_DIR="/tmp/chintap-brand-build"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PYTHON="/Users/buntu/.gemini/antigravity/brain/5b6cc729-5920-4584-8797-7766b01c0900/scratch/venv/bin/python3"

if [ ! -f "$PYTHON" ]; then
  PYTHON="python3"
fi

mkdir -p "$DEST"
mkdir -p "$TMP_DIR"

echo "🎨 Chintap Brand Asset Generator"
echo "   Destination: $DEST"
echo "   Working Dir: $TMP_DIR"

# ------------------------------------------------------------------------------
# 1. Master Inline Vector Definitions
# ------------------------------------------------------------------------------
EMBLEM_LIGHT='<svg class="emblem" viewBox="190 30 620 940" fill="none"><path d="M 469.7 50.0 L 520.8 51.9 L 558.6 63.2 L 583.2 76.5 L 602.1 89.7 L 624.8 112.4 L 639.9 133.2 L 655.0 161.6 L 666.4 203.2 L 666.4 252.3 L 656.9 288.2 L 645.6 312.8 L 632.4 333.6 L 611.6 356.3 L 579.4 379.0 L 577.5 379.0 L 577.5 329.8 L 570.0 301.5 L 558.6 282.6 L 543.5 267.4 L 520.8 254.2 L 498.1 248.5 L 475.4 248.5 L 447.1 258.0 L 422.5 276.9 L 411.1 292.0 L 399.8 320.4 L 397.9 329.8 L 397.9 379.0 L 365.8 356.3 L 346.8 335.5 L 331.7 312.8 L 320.4 288.2 L 310.9 248.5 L 310.9 203.2 L 320.4 167.2 L 339.3 129.4 L 350.6 114.3 L 375.2 89.7 L 399.8 72.7 L 433.8 57.6 L 469.7 50.0 Z" fill="#EA1C24" /><path d="M 477.3 280.7 L 505.7 282.6 L 520.8 290.1 L 535.9 305.3 L 541.6 314.7 L 545.4 326.1 L 545.4 473.5 L 551.1 479.2 L 611.6 501.9 L 621.0 507.6 L 630.5 509.5 L 639.9 515.1 L 753.4 560.5 L 774.2 579.4 L 785.5 604.0 L 787.4 611.6 L 787.4 802.5 L 779.8 834.7 L 770.4 857.4 L 755.3 881.9 L 728.8 910.3 L 702.3 929.2 L 668.3 944.3 L 639.9 950.0 L 456.5 950.0 L 424.4 942.4 L 394.1 927.3 L 379.0 916.0 L 360.1 897.1 L 348.7 881.9 L 222.1 685.3 L 214.5 666.4 L 212.6 634.2 L 218.3 619.1 L 229.6 607.8 L 241.0 602.1 L 248.5 600.2 L 273.1 602.1 L 312.8 621.0 L 416.8 721.2 L 428.2 730.7 L 430.0 728.8 L 430.0 329.8 L 433.8 316.6 L 441.4 303.4 L 458.4 288.2 L 477.3 280.7 Z" fill="#111111" /></svg>'

EMBLEM_DARK='<svg class="emblem" viewBox="190 30 620 940" fill="none"><path d="M 469.7 50.0 L 520.8 51.9 L 558.6 63.2 L 583.2 76.5 L 602.1 89.7 L 624.8 112.4 L 639.9 133.2 L 655.0 161.6 L 666.4 203.2 L 666.4 252.3 L 656.9 288.2 L 645.6 312.8 L 632.4 333.6 L 611.6 356.3 L 579.4 379.0 L 577.5 379.0 L 577.5 329.8 L 570.0 301.5 L 558.6 282.6 L 543.5 267.4 L 520.8 254.2 L 498.1 248.5 L 475.4 248.5 L 447.1 258.0 L 422.5 276.9 L 411.1 292.0 L 399.8 320.4 L 397.9 329.8 L 397.9 379.0 L 365.8 356.3 L 346.8 335.5 L 331.7 312.8 L 320.4 288.2 L 310.9 248.5 L 310.9 203.2 L 320.4 167.2 L 339.3 129.4 L 350.6 114.3 L 375.2 89.7 L 399.8 72.7 L 433.8 57.6 L 469.7 50.0 Z" fill="#EA1C24" /><path d="M 477.3 280.7 L 505.7 282.6 L 520.8 290.1 L 535.9 305.3 L 541.6 314.7 L 545.4 326.1 L 545.4 473.5 L 551.1 479.2 L 611.6 501.9 L 621.0 507.6 L 630.5 509.5 L 639.9 515.1 L 753.4 560.5 L 774.2 579.4 L 785.5 604.0 L 787.4 611.6 L 787.4 802.5 L 779.8 834.7 L 770.4 857.4 L 755.3 881.9 L 728.8 910.3 L 702.3 929.2 L 668.3 944.3 L 639.9 950.0 L 456.5 950.0 L 424.4 942.4 L 394.1 927.3 L 379.0 916.0 L 360.1 897.1 L 348.7 881.9 L 222.1 685.3 L 214.5 666.4 L 212.6 634.2 L 218.3 619.1 L 229.6 607.8 L 241.0 602.1 L 248.5 600.2 L 273.1 602.1 L 312.8 621.0 L 416.8 721.2 L 428.2 730.7 L 430.0 728.8 L 430.0 329.8 L 433.8 316.6 L 441.4 303.4 L 458.4 288.2 L 477.3 280.7 Z" fill="#FFFFFF" /></svg>'

# ------------------------------------------------------------------------------
# 2. Render Master Emblems directly via rsvg-convert (2048x2048)
# ------------------------------------------------------------------------------
echo "⚙️  Rendering 2048px Master Emblems..."
rsvg-convert -w 2048 -h 2048 "$DEST/chintap-emblem-light.svg" -o "$DEST/chintap-emblem-light-mode.png"
rsvg-convert -w 2048 -h 2048 "$DEST/chintap-emblem-dark.svg" -o "$DEST/chintap-emblem-dark-mode.png"

# ------------------------------------------------------------------------------
# 3. HTML Templates for Google Chrome Headless Rendering
# ------------------------------------------------------------------------------

# --- A. Square Brand (2048x2048): White BG ---
cat << HTML > "$TMP_DIR/brand-square-white.html"
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@800;900&family=Space+Grotesk:wght@700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #ffffff;
    width: 2048px;
    height: 2048px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Poppins', -apple-system, sans-serif;
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .emblem {
    width: 680px;
    height: 680px;
    margin-bottom: 56px;
  }
  .title {
    font-size: 270px;
    font-weight: 900;
    color: #111111;
    line-height: 1;
    letter-spacing: -6px;
    margin-bottom: 32px;
  }
  .title .red { color: #EA1C24; }
  .sub {
    font-family: 'Space Grotesk', monospace;
    font-size: 58px;
    font-weight: 700;
    color: #27272a;
    letter-spacing: 0.28em;
    text-indent: 0.28em;
    line-height: 1;
  }
</style>
</head>
<body>
<div class="container">
  $EMBLEM_LIGHT
  <div class="title">chin<span class="red">tap</span></div>
  <div class="sub">THINGS. APPS. POSSIBILITIES.</div>
</div>
</body>
</html>
HTML

# --- A2. Square Brand with Website URL (2048x2048): White BG ---
cat << HTML > "$TMP_DIR/brand-square-white-url.html"
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@800;900&family=Space+Grotesk:wght@700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #ffffff;
    width: 2048px;
    height: 2048px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .emblem {
    width: 600px;
    height: 600px;
    margin-bottom: 48px;
  }
  .title {
    font-size: 250px;
    font-weight: 900;
    color: #111111;
    line-height: 1;
    letter-spacing: -6px;
    margin-bottom: 28px;
  }
  .title .red { color: #EA1C24; }
  .sub {
    font-family: 'Space Grotesk', monospace;
    font-size: 54px;
    font-weight: 700;
    color: #27272a;
    letter-spacing: 0.28em;
    text-indent: 0.28em;
    line-height: 1;
    margin-bottom: 56px;
  }
  .pill {
    display: inline-flex;
    align-items: center;
    gap: 20px;
    padding: 20px 52px;
    background: #f4f4f5;
    border: 3.5px solid #e4e4e7;
    border-radius: 9999px;
  }
  .dot {
    width: 24px;
    height: 24px;
    background: #EA1C24;
    border-radius: 50%;
  }
  .url {
    font-family: 'Space Grotesk', monospace;
    font-size: 50px;
    font-weight: 700;
    color: #18181b;
    letter-spacing: 0.04em;
    line-height: 1;
  }
</style>
</head>
<body>
<div class="container">
  $EMBLEM_LIGHT
  <div class="title">chin<span class="red">tap</span></div>
  <div class="sub">THINGS. APPS. POSSIBILITIES.</div>
  <div class="pill">
    <div class="dot"></div>
    <div class="url">chintap.com</div>
  </div>
</div>
</body>
</html>
HTML

# --- A3. OpenGraph Landscape with Website URL (1200x630): White BG ---
cat << HTML > "$TMP_DIR/og-landscape-white.html"
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@800;900&family=Space+Grotesk:wght@700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #ffffff;
    width: 1200px;
    height: 630px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
    position: relative;
    overflow: hidden;
  }
  .accent-bar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: #EA1C24;
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-top: 10px;
  }
  .emblem {
    width: 165px;
    height: 165px;
    margin-bottom: 20px;
  }
  .title {
    font-size: 92px;
    font-weight: 900;
    color: #111111;
    line-height: 1;
    letter-spacing: -2.5px;
    margin-bottom: 14px;
  }
  .title .red { color: #EA1C24; }
  .sub {
    font-family: 'Space Grotesk', monospace;
    font-size: 24px;
    font-weight: 700;
    color: #3f3f46;
    letter-spacing: 0.22em;
    text-indent: 0.22em;
    line-height: 1;
    margin-bottom: 28px;
  }
  .pill {
    display: inline-flex;
    align-items: center;
    gap: 11px;
    padding: 12px 30px;
    background: #f4f4f5;
    border: 2px solid #e4e4e7;
    border-radius: 9999px;
  }
  .dot {
    width: 11px;
    height: 11px;
    background: #EA1C24;
    border-radius: 50%;
  }
  .url {
    font-family: 'Space Grotesk', monospace;
    font-size: 22px;
    font-weight: 700;
    color: #18181b;
    letter-spacing: 0.04em;
    line-height: 1;
  }
</style>
</head>
<body>
<div class="accent-bar"></div>
<div class="container">
  $EMBLEM_LIGHT
  <div class="title">chin<span class="red">tap</span></div>
  <div class="sub">THINGS. APPS. POSSIBILITIES.</div>
  <div class="pill">
    <div class="dot"></div>
    <div class="url">chintap.com</div>
  </div>
</div>
</body>
</html>
HTML

# --- A4. OpenGraph Landscape Without URL (1200x630): White BG ---
cat << HTML > "$TMP_DIR/og-landscape-no-url.html"
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@800;900&family=Space+Grotesk:wght@700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #ffffff;
    width: 1200px;
    height: 630px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
    position: relative;
    overflow: hidden;
  }
  .accent-bar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: #EA1C24;
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .emblem {
    width: 180px;
    height: 180px;
    margin-bottom: 26px;
  }
  .title {
    font-size: 98px;
    font-weight: 900;
    color: #111111;
    line-height: 1;
    letter-spacing: -2.5px;
    margin-bottom: 16px;
  }
  .title .red { color: #EA1C24; }
  .sub {
    font-family: 'Space Grotesk', monospace;
    font-size: 26px;
    font-weight: 700;
    color: #3f3f46;
    letter-spacing: 0.22em;
    text-indent: 0.22em;
    line-height: 1;
  }
</style>
</head>
<body>
<div class="accent-bar"></div>
<div class="container">
  $EMBLEM_LIGHT
  <div class="title">chin<span class="red">tap</span></div>
  <div class="sub">THINGS. APPS. POSSIBILITIES.</div>
</div>
</body>
</html>
HTML

# --- B. Square Brand (2048x2048): Dark BG ---
cat << HTML > "$TMP_DIR/brand-square-dark.html"
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@800;900&family=Space+Grotesk:wght@700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #0C0A09;
    width: 2048px;
    height: 2048px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Poppins', -apple-system, sans-serif;
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .emblem {
    width: 680px;
    height: 680px;
    margin-bottom: 56px;
  }
  .title {
    font-size: 270px;
    font-weight: 900;
    color: #FFFFFF;
    line-height: 1;
    letter-spacing: -6px;
    margin-bottom: 32px;
  }
  .title .red { color: #EA1C24; }
  .sub {
    font-family: 'Space Grotesk', monospace;
    font-size: 58px;
    font-weight: 700;
    color: #d4d4d8;
    letter-spacing: 0.28em;
    text-indent: 0.28em;
    line-height: 1;
  }
</style>
</head>
<body>
<div class="container">
  $EMBLEM_DARK
  <div class="title">chin<span class="red">tap</span></div>
  <div class="sub">THINGS. APPS. POSSIBILITIES.</div>
</div>
</body>
</html>
HTML

# --- C. Square Brand (2048x2048): Transparent BG ---
cat << HTML > "$TMP_DIR/brand-square-trans.html"
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@800;900&family=Space+Grotesk:wght@700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: transparent;
    width: 2048px;
    height: 2048px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Poppins', -apple-system, sans-serif;
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .emblem {
    width: 680px;
    height: 680px;
    margin-bottom: 56px;
  }
  .title {
    font-size: 270px;
    font-weight: 900;
    color: #111111;
    line-height: 1;
    letter-spacing: -6px;
    margin-bottom: 32px;
  }
  .title .red { color: #EA1C24; }
  .sub {
    font-family: 'Space Grotesk', monospace;
    font-size: 58px;
    font-weight: 700;
    color: #27272a;
    letter-spacing: 0.28em;
    text-indent: 0.28em;
    line-height: 1;
  }
</style>
</head>
<body>
<div class="container">
  $EMBLEM_LIGHT
  <div class="title">chin<span class="red">tap</span></div>
  <div class="sub">THINGS. APPS. POSSIBILITIES.</div>
</div>
</body>
</html>
HTML

# --- D. Horizontal Brand (2400x800): White BG ---
cat << HTML > "$TMP_DIR/brand-horizontal-white.html"
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@800;900&family=Space+Grotesk:wght@700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #ffffff;
    width: 2400px;
    height: 800px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Poppins', -apple-system, sans-serif;
  }
  .lockup {
    display: flex;
    align-items: center;
    gap: 90px;
  }
  .emblem {
    width: 440px;
    height: 440px;
  }
  .typography {
    display: flex;
    flex-direction: column;
  }
  .title {
    font-size: 240px;
    font-weight: 900;
    color: #111111;
    line-height: 0.95;
    letter-spacing: -5px;
    margin-bottom: 24px;
  }
  .title .red { color: #EA1C24; }
  .sub {
    font-family: 'Space Grotesk', monospace;
    font-size: 50px;
    font-weight: 700;
    color: #27272a;
    letter-spacing: 0.24em;
    text-indent: 0.24em;
    line-height: 1;
  }
</style>
</head>
<body>
<div class="lockup">
  $EMBLEM_LIGHT
  <div class="typography">
    <div class="title">chin<span class="red">tap</span></div>
    <div class="sub">THINGS. APPS. POSSIBILITIES.</div>
  </div>
</div>
</body>
</html>
HTML

# --- E. Horizontal Brand (2400x800): Dark BG ---
cat << HTML > "$TMP_DIR/brand-horizontal-dark.html"
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@800;900&family=Space+Grotesk:wght@700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #0C0A09;
    width: 2400px;
    height: 800px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Poppins', -apple-system, sans-serif;
  }
  .lockup {
    display: flex;
    align-items: center;
    gap: 90px;
  }
  .emblem {
    width: 440px;
    height: 440px;
  }
  .typography {
    display: flex;
    flex-direction: column;
  }
  .title {
    font-size: 240px;
    font-weight: 900;
    color: #FFFFFF;
    line-height: 0.95;
    letter-spacing: -5px;
    margin-bottom: 24px;
  }
  .title .red { color: #EA1C24; }
  .sub {
    font-family: 'Space Grotesk', monospace;
    font-size: 50px;
    font-weight: 700;
    color: #d4d4d8;
    letter-spacing: 0.24em;
    text-indent: 0.24em;
    line-height: 1;
  }
</style>
</head>
<body>
<div class="lockup">
  $EMBLEM_DARK
  <div class="typography">
    <div class="title">chin<span class="red">tap</span></div>
    <div class="sub">THINGS. APPS. POSSIBILITIES.</div>
  </div>
</div>
</body>
</html>
HTML

# --- F. Horizontal Brand (2400x800): Transparent BG ---
cat << HTML > "$TMP_DIR/brand-horizontal-trans.html"
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@800;900&family=Space+Grotesk:wght@700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: transparent;
    width: 2400px;
    height: 800px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Poppins', -apple-system, sans-serif;
  }
  .lockup {
    display: flex;
    align-items: center;
    gap: 90px;
  }
  .emblem {
    width: 440px;
    height: 440px;
  }
  .typography {
    display: flex;
    flex-direction: column;
  }
  .title {
    font-size: 240px;
    font-weight: 900;
    color: #111111;
    line-height: 0.95;
    letter-spacing: -5px;
    margin-bottom: 24px;
  }
  .title .red { color: #EA1C24; }
  .sub {
    font-family: 'Space Grotesk', monospace;
    font-size: 50px;
    font-weight: 700;
    color: #27272a;
    letter-spacing: 0.24em;
    text-indent: 0.24em;
    line-height: 1;
  }
</style>
</head>
<body>
<div class="lockup">
  $EMBLEM_LIGHT
  <div class="typography">
    <div class="title">chin<span class="red">tap</span></div>
    <div class="sub">THINGS. APPS. POSSIBILITIES.</div>
  </div>
</div>
</body>
</html>
HTML

# --- G. Brand Presentation Card (2400x1260): White ---
cat << HTML > "$TMP_DIR/brand-card-white.html"
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@800;900&family=Plus+Jakarta+Sans:wght@500;600;700&family=Space+Grotesk:wght@700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #ffffff;
    width: 2400px;
    height: 1260px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Poppins', -apple-system, sans-serif;
    position: relative;
  }
  .accent-bar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 14px;
    background: #EA1C24;
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .badge {
    display: flex;
    align-items: center;
    gap: 16px;
    background: #f4f4f5;
    border: 2px solid #e4e4e7;
    padding: 12px 34px;
    border-radius: 9999px;
    font-family: 'Space Grotesk', monospace;
    font-size: 24px;
    font-weight: 700;
    letter-spacing: 0.18em;
    color: #3f3f46;
    margin-bottom: 56px;
  }
  .badge .dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #EA1C24;
  }
  .emblem {
    width: 440px;
    height: 440px;
    margin-bottom: 40px;
  }
  .title {
    font-size: 190px;
    font-weight: 900;
    color: #111111;
    line-height: 1;
    letter-spacing: -4px;
    margin-bottom: 24px;
  }
  .title .red { color: #EA1C24; }
  .caption {
    font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
    font-size: 40px;
    font-weight: 600;
    color: #52525b;
    letter-spacing: -0.5px;
    margin-bottom: 48px;
  }
  .footer-url {
    font-family: 'Space Grotesk', monospace;
    font-size: 26px;
    font-weight: 700;
    color: #a1a1aa;
    letter-spacing: 0.1em;
  }
</style>
</head>
<body>
<div class="accent-bar"></div>
<div class="container">
  <div class="badge">
    <span class="dot"></span>
    THINGS. APPS. POSSIBILITIES.
  </div>
  $EMBLEM_LIGHT
  <div class="title">chin<span class="red">tap</span></div>
  <div class="caption">Exploring ideas and building useful things across physical and digital worlds.</div>
  <div class="footer-url">chintap.com</div>
</div>
</body>
</html>
HTML

# --- H. Brand Presentation Card (2400x1260): Dark ---
cat << HTML > "$TMP_DIR/brand-card-dark.html"
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@800;900&family=Plus+Jakarta+Sans:wght@500;600;700&family=Space+Grotesk:wght@700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #0C0A09;
    width: 2400px;
    height: 1260px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Poppins', -apple-system, sans-serif;
    position: relative;
    overflow: hidden;
  }
  .bg-glow {
    position: absolute;
    width: 1200px;
    height: 1200px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(234, 28, 36, 0.14) 0%, rgba(12, 10, 9, 0) 70%);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
  .accent-bar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 14px;
    background: #EA1C24;
  }
  .container {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .badge {
    display: flex;
    align-items: center;
    gap: 16px;
    background: #18181b;
    border: 2px solid #27272a;
    padding: 12px 34px;
    border-radius: 9999px;
    font-family: 'Space Grotesk', monospace;
    font-size: 24px;
    font-weight: 700;
    letter-spacing: 0.18em;
    color: #e4e4e7;
    margin-bottom: 56px;
  }
  .badge .dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #EA1C24;
  }
  .emblem {
    width: 440px;
    height: 440px;
    margin-bottom: 40px;
  }
  .title {
    font-size: 190px;
    font-weight: 900;
    color: #FFFFFF;
    line-height: 1;
    letter-spacing: -4px;
    margin-bottom: 24px;
  }
  .title .red { color: #EA1C24; }
  .caption {
    font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
    font-size: 40px;
    font-weight: 600;
    color: #a1a1aa;
    letter-spacing: -0.5px;
    margin-bottom: 48px;
  }
  .footer-url {
    font-family: 'Space Grotesk', monospace;
    font-size: 26px;
    font-weight: 700;
    color: #71717a;
    letter-spacing: 0.1em;
  }
</style>
</head>
<body>
<div class="accent-bar"></div>
<div class="bg-glow"></div>
<div class="container">
  <div class="badge">
    <span class="dot"></span>
    THINGS. APPS. POSSIBILITIES.
  </div>
  $EMBLEM_DARK
  <div class="title">chin<span class="red">tap</span></div>
  <div class="caption">Exploring ideas and building useful things across physical and digital worlds.</div>
  <div class="footer-url">chintap.com</div>
</div>
</body>
</html>
HTML

# --- I. Hero Showcase Graphic (2400x1350): Physical + Digital Studio ---
cat << HTML > "$TMP_DIR/hero-showcase.html"
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@800;900&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Space+Grotesk:wght@600;700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #0C0A09;
    width: 2400px;
    height: 1350px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 100px 140px 90px 140px;
    font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
    position: relative;
    overflow: hidden;
  }
  .bg-glow-right {
    position: absolute;
    width: 1400px;
    height: 1400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(234, 28, 36, 0.18) 0%, rgba(12, 10, 9, 0) 70%);
    top: -200px;
    right: -200px;
    pointer-events: none;
  }
  .accent-bar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 16px;
    background: #EA1C24;
  }
  .top-row {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .brand-lockup {
    display: flex;
    align-items: center;
    gap: 32px;
  }
  .emblem {
    width: 100px;
    height: 100px;
  }
  .brand-text {
    font-family: 'Poppins', sans-serif;
    font-size: 64px;
    font-weight: 900;
    color: #FFFFFF;
    letter-spacing: -1.5px;
    line-height: 1;
  }
  .brand-text .red { color: #EA1C24; }
  .badge {
    display: flex;
    align-items: center;
    gap: 14px;
    background: #18181b;
    border: 1.5px solid #27272a;
    padding: 12px 30px;
    border-radius: 9999px;
    font-family: 'Space Grotesk', monospace;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 0.16em;
    color: #e4e4e7;
  }
  .badge .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #EA1C24;
  }
  .hero-body {
    position: relative;
    z-index: 2;
    max-width: 1700px;
  }
  .tagline-eyebrow {
    font-family: 'Space Grotesk', monospace;
    font-size: 28px;
    font-weight: 700;
    color: #EA1C24;
    letter-spacing: 0.22em;
    margin-bottom: 24px;
    text-transform: uppercase;
  }
  .main-heading {
    font-family: 'Poppins', sans-serif;
    font-size: 110px;
    font-weight: 900;
    color: #FFFFFF;
    letter-spacing: -3.5px;
    line-height: 1.08;
    margin-bottom: 36px;
  }
  .main-heading .red { color: #EA1C24; }
  .sub-heading {
    font-size: 38px;
    font-weight: 500;
    color: #a1a1aa;
    line-height: 1.45;
    max-width: 1550px;
    margin-bottom: 48px;
  }
  .quote-blurb {
    display: flex;
    align-items: center;
    gap: 24px;
    padding-left: 32px;
    border-left: 6px solid #EA1C24;
    font-size: 32px;
    font-weight: 600;
    color: #f4f4f5;
  }
  .footer-row {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 36px;
    border-top: 2px solid #27272a;
    font-family: 'Space Grotesk', monospace;
    font-size: 22px;
    font-weight: 700;
    color: #71717a;
    letter-spacing: 0.08em;
  }
  .footer-row .highlight { color: #EA1C24; }
</style>
</head>
<body>
<div class="accent-bar"></div>
<div class="bg-glow-right"></div>
<div class="top-row">
  <div class="brand-lockup">
    $EMBLEM_DARK
    <div class="brand-text">chin<span class="red">tap</span></div>
  </div>
  <div class="badge">
    <span class="dot"></span>
    STUDIO SHOWCASE
  </div>
</div>
<div class="hero-body">
  <div class="tagline-eyebrow">Things · Apps · Possibilities</div>
  <div class="main-heading">
    Ever caught yourself wondering, <span class="red">what if?</span>
  </div>
  <div class="sub-heading">
    A thought comes along. You turn it over in your head. You tap your chin. And before long, you're exploring where it could lead — across software, hardware, and physical-digital possibilities.
  </div>
  <div class="quote-blurb">
    "The world doesn't divide its problems into physical and digital categories. Neither should Chintap."
  </div>
</div>
<div class="footer-row">
  <span><span class="highlight">01 /</span> THINGS (PHYSICAL)</span>
  <span><span class="highlight">02 /</span> APPS (DIGITAL)</span>
  <span><span class="highlight">03 /</span> POSSIBILITIES (CONNECTED)</span>
  <span class="highlight">chintap.com</span>
</div>
</body>
</html>
HTML

# --- I2. Marketing Pillars Landscape Card (1200x630 / 2400x1260 Retina): White BG ---
cat << HTML > "$TMP_DIR/marketing-pillars.html"
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@600;700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #ffffff;
    width: 1200px;
    height: 630px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 42px 72px 34px 72px;
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    position: relative;
    overflow: hidden;
    color: #111111;
  }
  .accent-bar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: #EA1C24;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  .brand-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .emblem {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .brand-name {
    font-family: 'Poppins', sans-serif;
    font-size: 27px;
    font-weight: 900;
    letter-spacing: -0.7px;
    line-height: 1;
    color: #111111;
  }
  .brand-name .red { color: #EA1C24; }
  .tagline-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 16px;
    background: #f4f4f5;
    border: 1px solid #e4e4e7;
    border-radius: 9999px;
    margin-left: 8px;
  }
  .pill-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #EA1C24;
  }
  .tagline-pill span {
    font-family: 'Space Grotesk', monospace;
    font-size: 11.5px;
    font-weight: 700;
    letter-spacing: 0.14em;
    color: #52525b;
    text-transform: uppercase;
  }
  .url {
    font-family: 'Space Grotesk', monospace;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.06em;
    color: #71717a;
  }

  .headline-section {
    margin-top: 10px;
    margin-bottom: 18px;
  }
  .headline-1 {
    font-family: 'Poppins', sans-serif;
    font-size: 38px;
    font-weight: 900;
    letter-spacing: -1px;
    line-height: 1.12;
    color: #111111;
  }
  .headline-2 {
    font-family: 'Poppins', sans-serif;
    font-size: 38px;
    font-weight: 900;
    letter-spacing: -1px;
    line-height: 1.12;
    color: #EA1C24;
  }
  .subheadline {
    margin-top: 10px;
    font-size: 17px;
    font-weight: 500;
    color: #52525b;
    line-height: 1.45;
    max-width: 980px;
  }

  .pillars-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
    position: relative;
    padding-top: 24px;
    border-top: 1px solid #f4f4f5;
  }
  .pillar-col {
    display: flex;
    flex-direction: column;
  }
  .pillar-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
  }
  .pillar-num {
    font-family: 'Space Grotesk', monospace;
    font-size: 12px;
    font-weight: 700;
    color: #EA1C24;
    background: #fee2e2;
    padding: 3px 8px;
    border-radius: 6px;
    line-height: 1;
  }
  .pillar-title {
    font-family: 'Poppins', sans-serif;
    font-size: 24px;
    font-weight: 800;
    color: #111111;
    letter-spacing: -0.5px;
    line-height: 1;
  }
  .pillar-sub {
    font-family: 'Space Grotesk', monospace;
    font-size: 13.5px;
    font-weight: 700;
    color: #EA1C24;
    letter-spacing: 0.02em;
    margin-bottom: 10px;
    line-height: 1.2;
  }
  .pillar-desc {
    font-size: 14.5px;
    font-weight: 500;
    color: #52525b;
    line-height: 1.5;
  }

  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 18px;
    border-top: 1px solid #f4f4f5;
  }
  .footer-credo {
    font-family: 'Space Grotesk', monospace;
    font-size: 12.5px;
    font-weight: 600;
    letter-spacing: 0.06em;
    color: #71717a;
  }
  .footer-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #EA1C24;
    display: inline-block;
    margin: 0 10px;
    vertical-align: middle;
  }
</style>
</head>
<body>
<div class="accent-bar"></div>

<div class="header">
  <div class="brand-left">
    <div class="emblem">$EMBLEM_LIGHT</div>
    <div class="brand-name">chin<span class="red">tap</span></div>
    <div class="tagline-pill">
      <div class="pill-dot"></div>
      <span>Things · Apps · Possibilities</span>
    </div>
  </div>
  <div class="url">chintap.com</div>
</div>

<div class="headline-section">
  <div class="headline-1">Ideas don't come with a format.</div>
  <div class="headline-2">Neither should we.</div>
  <div class="subheadline">
    Some ideas become things. Others become apps. And some lead somewhere neither started out expecting.
  </div>
</div>

<div class="pillars-grid">
  <!-- Pillar 1 -->
  <div class="pillar-col">
    <div class="pillar-header">
      <span class="pillar-num">01</span>
      <div class="pillar-title">Things</div>
    </div>
    <div class="pillar-sub">Physical things</div>
    <div class="pillar-desc">
      Objects, tools and products that solve everyday problems or make experiences better.
    </div>
  </div>

  <!-- Pillar 2 -->
  <div class="pillar-col">
    <div class="pillar-header">
      <span class="pillar-num">02</span>
      <div class="pillar-title">Apps</div>
    </div>
    <div class="pillar-sub">Useful software</div>
    <div class="pillar-desc">
      Simple tools and applications that make something easier, clearer or more useful.
    </div>
  </div>

  <!-- Pillar 3 -->
  <div class="pillar-col">
    <div class="pillar-header">
      <span class="pillar-num">03</span>
      <div class="pillar-title">Possibilities</div>
    </div>
    <div class="pillar-sub">Beyond categories</div>
    <div class="pillar-desc">
      Ideas that bring different things together, take an unexpected direction, or become something entirely new.
    </div>
  </div>
</div>

<div class="footer">
  <div class="footer-credo">
    Chintap <span class="footer-dot"></span> Bengaluru <span class="footer-dot"></span> Exploring ideas &amp; building useful things
  </div>
</div>

</body>
</html>
HTML

# --- J. Marketing Square Card (2048x2048): White BG ---
cat << HTML > "$TMP_DIR/marketing-square-white.html"
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@800;900&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Space+Grotesk:wght@700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #ffffff;
    width: 2048px;
    height: 2048px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 120px;
    font-family: 'Poppins', -apple-system, sans-serif;
    text-align: center;
    position: relative;
  }
  .accent-bar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 18px;
    background: #EA1C24;
  }
  .emblem {
    width: 480px;
    height: 480px;
    margin-bottom: 40px;
  }
  .title {
    font-size: 220px;
    font-weight: 900;
    color: #111111;
    line-height: 1;
    letter-spacing: -5px;
    margin-bottom: 24px;
  }
  .title .red { color: #EA1C24; }
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 16px;
    background: #fee2e2;
    padding: 14px 40px;
    border-radius: 9999px;
    font-family: 'Space Grotesk', monospace;
    font-size: 32px;
    font-weight: 700;
    color: #EA1C24;
    letter-spacing: 0.22em;
    margin-bottom: 50px;
  }
  .quote {
    font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
    font-size: 48px;
    font-weight: 700;
    color: #18181b;
    line-height: 1.35;
    max-width: 1600px;
    margin-bottom: 60px;
  }
  .pillars-row {
    display: flex;
    justify-content: center;
    gap: 40px;
    width: 100%;
  }
  .pillar-box {
    flex: 1;
    max-width: 520px;
    background: #fafafa;
    border: 2px solid #e4e4e7;
    border-radius: 28px;
    padding: 40px 30px;
    text-align: left;
  }
  .pillar-num {
    font-family: 'Space Grotesk', monospace;
    font-size: 24px;
    font-weight: 700;
    color: #EA1C24;
    margin-bottom: 12px;
  }
  .pillar-title {
    font-size: 34px;
    font-weight: 800;
    color: #111111;
    margin-bottom: 10px;
  }
  .pillar-desc {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 22px;
    color: #52525b;
    line-height: 1.4;
  }
</style>
</head>
<body>
<div class="accent-bar"></div>
$EMBLEM_LIGHT
<div class="title">chin<span class="red">tap</span></div>
<div class="badge">THINGS. APPS. POSSIBILITIES.</div>
<div class="quote">
  The world doesn't divide its problems into physical and digital categories. <span style="color:#EA1C24;">Neither should Chintap.</span>
</div>
<div class="pillars-row">
  <div class="pillar-box">
    <div class="pillar-num">01 / PHYSICAL</div>
    <div class="pillar-title">Things</div>
    <div class="pillar-desc">Hardware, physical products, devices, kits, and tangible experiences.</div>
  </div>
  <div class="pillar-box">
    <div class="pillar-num">02 / DIGITAL</div>
    <div class="pillar-title">Apps</div>
    <div class="pillar-desc">Software, web apps, developer tools, and purposeful interfaces.</div>
  </div>
  <div class="pillar-box">
    <div class="pillar-num">03 / CONNECTED</div>
    <div class="pillar-title">Possibilities</div>
    <div class="pillar-desc">Bridging physical devices with software intelligence and new ventures.</div>
  </div>
</div>
</body>
</html>
HTML

# --- K. Marketing Square Card (2048x2048): Transparent BG ---
cat << HTML > "$TMP_DIR/marketing-square-trans.html"
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@800;900&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Space+Grotesk:wght@700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: transparent;
    width: 2048px;
    height: 2048px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 120px;
    font-family: 'Poppins', -apple-system, sans-serif;
    text-align: center;
  }
  .emblem {
    width: 520px;
    height: 520px;
    margin-bottom: 40px;
  }
  .title {
    font-size: 240px;
    font-weight: 900;
    color: #111111;
    line-height: 1;
    letter-spacing: -5px;
    margin-bottom: 28px;
  }
  .title .red { color: #EA1C24; }
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 16px;
    background: #111111;
    padding: 16px 44px;
    border-radius: 9999px;
    font-family: 'Space Grotesk', monospace;
    font-size: 34px;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: 0.22em;
    margin-bottom: 50px;
  }
  .badge .dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #EA1C24;
  }
  .quote {
    font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
    font-size: 52px;
    font-weight: 700;
    color: #18181b;
    line-height: 1.35;
    max-width: 1600px;
  }
</style>
</head>
<body>
$EMBLEM_LIGHT
<div class="title">chin<span class="red">tap</span></div>
<div class="badge"><span class="dot"></span>THINGS. APPS. POSSIBILITIES.</div>
<div class="quote">
  Exploring ideas and building useful things across the physical and digital worlds.
</div>
</body>
</html>
HTML

# --- L. Apple Touch Icons (512x512 with safe padding) ---
cat << HTML > "$TMP_DIR/apple-touch-icon-light.html"
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #ffffff;
    width: 512px;
    height: 512px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .emblem {
    width: 410px;
    height: 410px;
  }
</style>
</head>
<body>
$EMBLEM_LIGHT
</body>
</html>
HTML

cat << HTML > "$TMP_DIR/apple-touch-icon-dark.html"
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #0C0A09;
    width: 512px;
    height: 512px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .emblem {
    width: 410px;
    height: 410px;
  }
</style>
</head>
<body>
$EMBLEM_DARK
</body>
</html>
HTML

# ------------------------------------------------------------------------------
# 4. Execute Headless Google Chrome Screenshots
# ------------------------------------------------------------------------------
echo "🚀 Rendering High-Resolution Graphics with Headless Chrome..."

# 1. Square Brand Exports (2048x2048)
"$CHROME" --headless --disable-gpu --run-all-compositor-stages-before-draw --virtual-time-budget=3000 --window-size=2048,2048 --hide-scrollbars --screenshot="$DEST/chintap-brand-white-bg-2048.png" "file://$TMP_DIR/brand-square-white.html"
"$CHROME" --headless --disable-gpu --run-all-compositor-stages-before-draw --virtual-time-budget=3000 --window-size=2048,2048 --hide-scrollbars --screenshot="$DEST/chintap-brand-url-white-bg-2048.png" "file://$TMP_DIR/brand-square-white-url.html"
"$CHROME" --headless --disable-gpu --run-all-compositor-stages-before-draw --virtual-time-budget=3000 --window-size=2048,2048 --hide-scrollbars --screenshot="$DEST/chintap-brand-dark-2048.png" "file://$TMP_DIR/brand-square-dark.html"
"$CHROME" --headless --disable-gpu --default-background-color=00000000 --run-all-compositor-stages-before-draw --virtual-time-budget=3000 --window-size=2048,2048 --hide-scrollbars --screenshot="$DEST/chintap-brand-2048.png" "file://$TMP_DIR/brand-square-trans.html"

# 2. Horizontal Brand Exports (2400x800)
"$CHROME" --headless --disable-gpu --run-all-compositor-stages-before-draw --virtual-time-budget=3000 --window-size=2400,800 --hide-scrollbars --screenshot="$DEST/chintap-brand-horizontal-white-bg-2400.png" "file://$TMP_DIR/brand-horizontal-white.html"
"$CHROME" --headless --disable-gpu --run-all-compositor-stages-before-draw --virtual-time-budget=3000 --window-size=2400,800 --hide-scrollbars --screenshot="$DEST/chintap-brand-horizontal-dark-2400.png" "file://$TMP_DIR/brand-horizontal-dark.html"
"$CHROME" --headless --disable-gpu --default-background-color=00000000 --run-all-compositor-stages-before-draw --virtual-time-budget=3000 --window-size=2400,800 --hide-scrollbars --screenshot="$DEST/chintap-brand-horizontal-2400.png" "file://$TMP_DIR/brand-horizontal-trans.html"

# 3. Brand Presentation Cards (2400x1260)
"$CHROME" --headless --disable-gpu --run-all-compositor-stages-before-draw --virtual-time-budget=3000 --window-size=2400,1260 --hide-scrollbars --screenshot="$DEST/chintap-brand-card-2400.png" "file://$TMP_DIR/brand-card-white.html"
"$CHROME" --headless --disable-gpu --run-all-compositor-stages-before-draw --virtual-time-budget=3000 --window-size=2400,1260 --hide-scrollbars --screenshot="$DEST/chintap-brand-card-dark-2400.png" "file://$TMP_DIR/brand-card-dark.html"

# 4. Marketing Pillars & Showcase Graphics
"$CHROME" --headless --disable-gpu --run-all-compositor-stages-before-draw --virtual-time-budget=3000 --window-size=1200,630 --force-device-scale-factor=2 --hide-scrollbars --screenshot="$DEST/chintap-marketing-pillars-2400.png" "file://$TMP_DIR/marketing-pillars.html"
sips -z 630 1200 "$DEST/chintap-marketing-pillars-2400.png" --out "$DEST/chintap-marketing-pillars.png"
sips -s format jpeg -s formatOptions 94 "$DEST/chintap-marketing-pillars.png" --out "$DEST/chintap-marketing-pillars.jpg"
"$CHROME" --headless --disable-gpu --run-all-compositor-stages-before-draw --virtual-time-budget=3000 --window-size=2048,2048 --hide-scrollbars --screenshot="$DEST/chintap-marketing-square-2048.png" "file://$TMP_DIR/marketing-square-white.html"
"$CHROME" --headless --disable-gpu --default-background-color=00000000 --run-all-compositor-stages-before-draw --virtual-time-budget=3000 --window-size=2048,2048 --hide-scrollbars --screenshot="$DEST/chintap-marketing-square-trans-2048.png" "file://$TMP_DIR/marketing-square-trans.html"
"$CHROME" --headless --disable-gpu --run-all-compositor-stages-before-draw --virtual-time-budget=3000 --window-size=2400,1350 --hide-scrollbars --screenshot="$DEST/chintap-hero-showcase-2400.png" "file://$TMP_DIR/hero-showcase.html"

# 5. OpenGraph & Social Previews (1200x630) via Headless Chrome (exact Poppins 900 font weight)
"$CHROME" --headless --disable-gpu --run-all-compositor-stages-before-draw --virtual-time-budget=3000 --window-size=1200,630 --hide-scrollbars --screenshot="$DEST/chintap-og.png" "file://$TMP_DIR/og-landscape-white.html"
"$CHROME" --headless --disable-gpu --run-all-compositor-stages-before-draw --virtual-time-budget=3000 --window-size=1200,630 --hide-scrollbars --screenshot="$DEST/chintap-og-no-url.png" "file://$TMP_DIR/og-landscape-no-url.html"

# 6. Apple Touch Icons (512x512 downsampled to 180x180)
"$CHROME" --headless --disable-gpu --run-all-compositor-stages-before-draw --virtual-time-budget=2000 --window-size=512,512 --hide-scrollbars --screenshot="$TMP_DIR/apple-touch-icon-512.png" "file://$TMP_DIR/apple-touch-icon-light.html"
"$CHROME" --headless --disable-gpu --run-all-compositor-stages-before-draw --virtual-time-budget=2000 --window-size=512,512 --hide-scrollbars --screenshot="$TMP_DIR/apple-touch-icon-dark-512.png" "file://$TMP_DIR/apple-touch-icon-dark.html"

# Downsample Square URL Card via native macOS sips (1024x1024)
sips -z 1024 1024 "$DEST/chintap-brand-url-white-bg-2048.png" --out "$DEST/chintap-brand-url-white-bg.png"
cp "$DEST/chintap-og.png" "$DEST/chintap-og-preview.png"
sips -s format jpeg -s formatOptions 94 "$DEST/chintap-og.png" --out "$DEST/chintap-og.jpg"
sips -s format jpeg -s formatOptions 94 "$DEST/chintap-og.png" --out "$DEST/chintap-og-preview.jpg"
sips -s format jpeg -s formatOptions 94 "$DEST/chintap-og-no-url.png" --out "$DEST/chintap-og-no-url.jpg"

# ------------------------------------------------------------------------------
# 5. Downsampling, JPEG Conversion & Favicon Packaging via Python PIL
# ------------------------------------------------------------------------------
echo "📦 Generating Standard Web Downsamples & Favicon Package..."
"$PYTHON" -c "
import os
from PIL import Image

dest = '$DEST'
pub = '$PUB_DEST'
tmp = '$TMP_DIR'

# 1. Standard 1024x1024 Brand Downsamples
Image.open(f'{dest}/chintap-brand-2048.png').resize((1024, 1024), Image.Resampling.LANCZOS).save(f'{dest}/chintap-brand.png')
Image.open(f'{dest}/chintap-brand-white-bg-2048.png').resize((1024, 1024), Image.Resampling.LANCZOS).save(f'{dest}/chintap-brand-white-bg.png')
Image.open(f'{dest}/chintap-brand-url-white-bg-2048.png').resize((1024, 1024), Image.Resampling.LANCZOS).save(f'{dest}/chintap-brand-url-white-bg.png')
Image.open(f'{dest}/chintap-brand-dark-2048.png').resize((1024, 1024), Image.Resampling.LANCZOS).save(f'{dest}/chintap-brand-dark.png')

# 2. Legacy compatible 1200x1200 logo/icon names
Image.open(f'{dest}/chintap-brand-white-bg-2048.png').resize((1200, 1200), Image.Resampling.LANCZOS).save(f'{dest}/chintap-logo-light.png')
Image.open(f'{dest}/chintap-brand-dark-2048.png').resize((1200, 1200), Image.Resampling.LANCZOS).save(f'{dest}/chintap-logo-dark.png')
Image.open(f'{dest}/chintap-brand-white-bg-2048.png').convert('RGB').resize((1200, 1200), Image.Resampling.LANCZOS).save(f'{dest}/chintap-logo-light.jpg', quality=95)
Image.open(f'{dest}/chintap-brand-dark-2048.png').convert('RGB').resize((1200, 1200), Image.Resampling.LANCZOS).save(f'{dest}/chintap-logo-dark.jpg', quality=95)

# 3. Transparent Icon Assets
Image.open(f'{dest}/chintap-emblem-light-mode.png').resize((1200, 1200), Image.Resampling.LANCZOS).save(f'{dest}/chintap-icon-light.png')
Image.open(f'{dest}/chintap-emblem-dark-mode.png').resize((1200, 1200), Image.Resampling.LANCZOS).save(f'{dest}/chintap-icon-dark.png')

# 4. OpenGraph JPEGs and Previews
Image.open(f'{dest}/chintap-og.png').convert('RGB').save(f'{dest}/chintap-og.jpg', quality=94)
Image.open(f'{dest}/chintap-og.png').save(f'{dest}/chintap-og-preview.png')
Image.open(f'{dest}/chintap-og.png').convert('RGB').save(f'{dest}/chintap-og-preview.jpg', quality=94)
Image.open(f'{dest}/chintap-og-no-url.png').convert('RGB').save(f'{dest}/chintap-og-no-url.jpg', quality=94)
Image.open(f'{dest}/chintap-marketing-pillars.png').convert('RGB').save(f'{dest}/chintap-marketing-pillars.jpg', quality=94)

# 5. Apple Touch Icons (180x180)
touch_light = Image.open(f'{tmp}/apple-touch-icon-512.png').resize((180, 180), Image.Resampling.LANCZOS)
touch_light.save(f'{pub}/apple-touch-icon.png')
touch_dark = Image.open(f'{tmp}/apple-touch-icon-dark-512.png').resize((180, 180), Image.Resampling.LANCZOS)
touch_dark.save(f'{dest}/apple-touch-icon-dark.png')

# 6. Favicons
fav64 = Image.open(f'{tmp}/apple-touch-icon-512.png').resize((64, 64), Image.Resampling.LANCZOS)
fav64.save(f'{pub}/favicon.png')
fav64.save(f'{dest}/favicon.png')

# Multi-resolution ICO (16, 32, 48)
fav_img = Image.open(f'{tmp}/apple-touch-icon-512.png')
fav_img.save(f'{pub}/favicon.ico', sizes=[(16, 16), (32, 32), (48, 48)])

print('✅ Python downsampling and favicon generation completed.')
"

# ------------------------------------------------------------------------------
# 7. Academy OpenGraph & Social Brand Assets
# ------------------------------------------------------------------------------
echo "🎓 Building Academy OpenGraph and Brand Assets..."
bash "$REPO_ROOT/scripts/generate-academy-og.sh"

echo "✨ All Chintap brand and marketing assets built successfully!"
