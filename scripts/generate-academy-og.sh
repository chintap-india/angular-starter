#!/bin/bash
set -e

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEST="$REPO_ROOT/public/images"
TMP_DIR="/tmp/chintap-brand-build"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

mkdir -p "$DEST"
mkdir -p "$TMP_DIR"

EMBLEM_SVG='<svg viewBox="0 0 1000 1000" width="108" height="108" fill="none"><path d="M 469.7 50.0 L 520.8 51.9 L 558.6 63.2 L 583.2 76.5 L 602.1 89.7 L 624.8 112.4 L 639.9 133.2 L 655.0 161.6 L 666.4 203.2 L 666.4 252.3 L 656.9 288.2 L 645.6 312.8 L 632.4 333.6 L 611.6 356.3 L 579.4 379.0 L 577.5 379.0 L 577.5 329.8 L 570.0 301.5 L 558.6 282.6 L 543.5 267.4 L 520.8 254.2 L 498.1 248.5 L 475.4 248.5 L 447.1 258.0 L 422.5 276.9 L 411.1 292.0 L 399.8 320.4 L 397.9 329.8 L 397.9 379.0 L 365.8 356.3 L 346.8 335.5 L 331.7 312.8 L 320.4 288.2 L 310.9 248.5 L 310.9 203.2 L 320.4 167.2 L 339.3 129.4 L 350.6 114.3 L 375.2 89.7 L 399.8 72.7 L 433.8 57.6 L 469.7 50.0 Z" fill="#EA1C24" /><path d="M 477.3 280.7 L 505.7 282.6 L 520.8 290.1 L 535.9 305.3 L 541.6 314.7 L 545.4 326.1 L 545.4 473.5 L 551.1 479.2 L 611.6 501.9 L 621.0 507.6 L 630.5 509.5 L 639.9 515.1 L 753.4 560.5 L 774.2 579.4 L 785.5 604.0 L 787.4 611.6 L 787.4 802.5 L 779.8 834.7 L 770.4 857.4 L 755.3 881.9 L 728.8 910.3 L 702.3 929.2 L 668.3 944.3 L 639.9 950.0 L 456.5 950.0 L 424.4 942.4 L 394.1 927.3 L 379.0 916.0 L 360.1 897.1 L 348.7 881.9 L 222.1 685.3 L 214.5 666.4 L 212.6 634.2 L 218.3 619.1 L 229.6 607.8 L 241.0 602.1 L 248.5 600.2 L 273.1 602.1 L 312.8 621.0 L 416.8 721.2 L 428.2 730.7 L 430.0 728.8 L 430.0 329.8 L 433.8 316.6 L 441.4 303.4 L 458.4 288.2 L 477.3 280.7 Z" fill="#111111" /></svg>'

EMBLEM_DARK_SVG='<svg viewBox="0 0 1000 1000" width="108" height="108" fill="none"><path d="M 469.7 50.0 L 520.8 51.9 L 558.6 63.2 L 583.2 76.5 L 602.1 89.7 L 624.8 112.4 L 639.9 133.2 L 655.0 161.6 L 666.4 203.2 L 666.4 252.3 L 656.9 288.2 L 645.6 312.8 L 632.4 333.6 L 611.6 356.3 L 579.4 379.0 L 577.5 379.0 L 577.5 329.8 L 570.0 301.5 L 558.6 282.6 L 543.5 267.4 L 520.8 254.2 L 498.1 248.5 L 475.4 248.5 L 447.1 258.0 L 422.5 276.9 L 411.1 292.0 L 399.8 320.4 L 397.9 329.8 L 397.9 379.0 L 365.8 356.3 L 346.8 335.5 L 331.7 312.8 L 320.4 288.2 L 310.9 248.5 L 310.9 203.2 L 320.4 167.2 L 339.3 129.4 L 350.6 114.3 L 375.2 89.7 L 399.8 72.7 L 433.8 57.6 L 469.7 50.0 Z" fill="#EA1C24" /><path d="M 477.3 280.7 L 505.7 282.6 L 520.8 290.1 L 535.9 305.3 L 541.6 314.7 L 545.4 326.1 L 545.4 473.5 L 551.1 479.2 L 611.6 501.9 L 621.0 507.6 L 630.5 509.5 L 639.9 515.1 L 753.4 560.5 L 774.2 579.4 L 785.5 604.0 L 787.4 611.6 L 787.4 802.5 L 779.8 834.7 L 770.4 857.4 L 755.3 881.9 L 728.8 910.3 L 702.3 929.2 L 668.3 944.3 L 639.9 950.0 L 456.5 950.0 L 424.4 942.4 L 394.1 927.3 L 379.0 916.0 L 360.1 897.1 L 348.7 881.9 L 222.1 685.3 L 214.5 666.4 L 212.6 634.2 L 218.3 619.1 L 229.6 607.8 L 241.0 602.1 L 248.5 600.2 L 273.1 602.1 L 312.8 621.0 L 416.8 721.2 L 428.2 730.7 L 430.0 728.8 L 430.0 329.8 L 433.8 316.6 L 441.4 303.4 L 458.4 288.2 L 477.3 280.7 Z" fill="#FFFFFF" /></svg>'

# --- 1. Light Mode Academy OG Card (1200x630) ---
cat << 'HTML' > "$TMP_DIR/academy-og-light.html"
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Corinthia:wght@700&family=Ephesis&family=Poppins:wght@600;700;800;900&family=Space+Grotesk:wght@600;700&display=swap" rel="stylesheet">
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
    padding: 48px;
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
    position: relative;
    overflow: hidden;
  }
  .accent-bar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 8px;
    background: #EA1C24;
  }
  .bg-glow {
    position: absolute;
    width: 800px;
    height: 500px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: radial-gradient(circle, rgba(234, 28, 36, 0.05) 0%, rgba(255, 255, 255, 0) 70%);
    pointer-events: none;
    z-index: 0;
  }

  .content-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    z-index: 1;
  }

  .emblem-row {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 22px;
    filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.06));
  }

  .brand-lockup {
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 16px;
    line-height: 1;
    margin-bottom: 18px;
  }
  .brand-academy {
    font-family: 'Ephesis', 'Corinthia', cursive, sans-serif;
    font-size: 115px;
    font-weight: 700;
    color: #EA1C24;
    line-height: 0.9;
    letter-spacing: -0.01em;
  }
  .brand-by {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 32px;
    font-weight: 600;
    color: #71717a;
    letter-spacing: 0.02em;
  }
  .brand-chintap {
    font-family: 'Poppins', sans-serif;
    font-size: 62px;
    font-weight: 900;
    color: #18181b;
    letter-spacing: -2px;
  }
  .brand-chintap .red { color: #EA1C24; }
  
  .caption {
    font-family: 'Space Grotesk', monospace;
    font-size: 26px;
    font-weight: 700;
    color: #4b5563;
    letter-spacing: 0.28em;
    text-indent: 0.28em;
    text-transform: uppercase;
    margin-bottom: 34px;
  }

  .url-pill {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 12px 36px;
    background: #EA1C24;
    border-radius: 9999px;
    box-shadow: 0 8px 24px -2px rgba(234, 28, 36, 0.38);
  }
  .url-dot {
    width: 8px;
    height: 8px;
    background: #ffffff;
    border-radius: 50%;
    opacity: 0.95;
  }
  .url-text {
    font-family: 'Space Grotesk', monospace;
    font-size: 20px;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: 0.06em;
    line-height: 1;
  }
</style>
</head>
<body>
<div class="accent-bar"></div>
<div class="bg-glow"></div>

<div class="content-wrap">
  <div class="emblem-row">
    __EMBLEM__
  </div>
  <div class="brand-lockup">
    <span class="brand-academy">Academy</span>
    <span class="brand-by">by</span>
    <span class="brand-chintap">chin<span class="red">tap</span></span>
  </div>
  <div class="caption">From ideas to life.</div>
  <div class="url-pill">
    <div class="url-dot"></div>
    <div class="url-text">chintap.com/academy</div>
  </div>
</div>

</body>
</html>
HTML

sed -i '' "s|__EMBLEM__|$EMBLEM_SVG|g" "$TMP_DIR/academy-og-light.html"

# --- 2. Dark Mode Academy OG Card (1200x630) ---
cat << 'HTML' > "$TMP_DIR/academy-og-dark.html"
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Corinthia:wght@700&family=Ephesis&family=Poppins:wght@600;700;800;900&family=Space+Grotesk:wght@600;700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #09090b;
    width: 1200px;
    height: 630px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px;
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
    position: relative;
    overflow: hidden;
  }
  .accent-bar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 8px;
    background: #EA1C24;
  }
  .bg-glow {
    position: absolute;
    width: 850px;
    height: 520px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: radial-gradient(circle, rgba(234, 28, 36, 0.14) 0%, rgba(9, 9, 11, 0) 70%);
    pointer-events: none;
    z-index: 0;
  }

  .content-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    z-index: 1;
  }

  .emblem-row {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 22px;
    filter: drop-shadow(0 8px 24px rgba(234, 28, 36, 0.15));
  }

  .brand-lockup {
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 16px;
    line-height: 1;
    margin-bottom: 18px;
  }
  .brand-academy {
    font-family: 'Ephesis', 'Corinthia', cursive, sans-serif;
    font-size: 115px;
    font-weight: 700;
    color: #EA1C24;
    line-height: 0.9;
    letter-spacing: -0.01em;
  }
  .brand-by {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 32px;
    font-weight: 600;
    color: #a1a1aa;
    letter-spacing: 0.02em;
  }
  .brand-chintap {
    font-family: 'Poppins', sans-serif;
    font-size: 62px;
    font-weight: 900;
    color: #ffffff;
    letter-spacing: -2px;
  }
  .brand-chintap .red { color: #EA1C24; }
  
  .caption {
    font-family: 'Space Grotesk', monospace;
    font-size: 26px;
    font-weight: 700;
    color: #d4d4d8;
    letter-spacing: 0.28em;
    text-indent: 0.28em;
    text-transform: uppercase;
    margin-bottom: 34px;
  }

  .url-pill {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 12px 36px;
    background: #EA1C24;
    border-radius: 9999px;
    box-shadow: 0 8px 28px -2px rgba(234, 28, 36, 0.55);
  }
  .url-dot {
    width: 8px;
    height: 8px;
    background: #ffffff;
    border-radius: 50%;
    opacity: 0.95;
  }
  .url-text {
    font-family: 'Space Grotesk', monospace;
    font-size: 20px;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: 0.06em;
    line-height: 1;
  }
</style>
</head>
<body>
<div class="accent-bar"></div>
<div class="bg-glow"></div>

<div class="content-wrap">
  <div class="emblem-row">
    __EMBLEM__
  </div>
  <div class="brand-lockup">
    <span class="brand-academy">Academy</span>
    <span class="brand-by">by</span>
    <span class="brand-chintap">chin<span class="red">tap</span></span>
  </div>
  <div class="caption">From ideas to life.</div>
  <div class="url-pill">
    <div class="url-dot"></div>
    <div class="url-text">chintap.com/academy</div>
  </div>
</div>

</body>
</html>
HTML

sed -i '' "s|__EMBLEM__|$EMBLEM_DARK_SVG|g" "$TMP_DIR/academy-og-dark.html"

# --- 3. Square Brand Card (1200x1200) ---
cat << 'HTML' > "$TMP_DIR/academy-square.html"
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Corinthia:wght@700&family=Ephesis&family=Poppins:wght@600;700;800;900&family=Space+Grotesk:wght@600;700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #ffffff;
    width: 1200px;
    height: 1200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px;
    font-family: 'Poppins', -apple-system, sans-serif;
    position: relative;
    overflow: hidden;
  }
  .accent-bar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 12px;
    background: #EA1C24;
  }
  .bg-glow {
    position: absolute;
    width: 1000px;
    height: 1000px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: radial-gradient(circle, rgba(234, 28, 36, 0.05) 0%, rgba(255, 255, 255, 0) 70%);
    pointer-events: none;
    z-index: 0;
  }

  .content-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    z-index: 1;
  }

  .emblem-row {
    margin-bottom: 36px;
    filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.07));
  }
  .emblem-row svg {
    width: 160px;
    height: 160px;
  }

  .brand-lockup {
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 22px;
    line-height: 1;
    margin-bottom: 28px;
  }
  .brand-academy {
    font-family: 'Ephesis', 'Corinthia', cursive, sans-serif;
    font-size: 160px;
    font-weight: 700;
    color: #EA1C24;
    line-height: 0.9;
  }
  .brand-by {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 42px;
    font-weight: 600;
    color: #71717a;
    letter-spacing: 0.02em;
  }
  .brand-chintap {
    font-family: 'Poppins', sans-serif;
    font-size: 86px;
    font-weight: 900;
    color: #18181b;
    letter-spacing: -3px;
  }
  .brand-chintap .red { color: #EA1C24; }

  .caption {
    font-family: 'Space Grotesk', monospace;
    font-size: 34px;
    font-weight: 700;
    color: #4b5563;
    letter-spacing: 0.28em;
    text-indent: 0.28em;
    text-transform: uppercase;
    margin-bottom: 48px;
  }

  .url-pill {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding: 16px 48px;
    background: #EA1C24;
    border-radius: 9999px;
    box-shadow: 0 10px 30px -4px rgba(234, 28, 36, 0.4);
  }
  .url-dot {
    width: 11px;
    height: 11px;
    background: #ffffff;
    border-radius: 50%;
    opacity: 0.95;
  }
  .url-text {
    font-family: 'Space Grotesk', monospace;
    font-size: 26px;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: 0.06em;
  }
</style>
</head>
<body>
<div class="accent-bar"></div>
<div class="bg-glow"></div>

<div class="content-wrap">
  <div class="emblem-row">__EMBLEM__</div>
  <div class="brand-lockup">
    <span class="brand-academy">Academy</span>
    <span class="brand-by">by</span>
    <span class="brand-chintap">chin<span class="red">tap</span></span>
  </div>
  <div class="caption">From ideas to life.</div>
  <div class="url-pill">
    <div class="url-dot"></div>
    <div class="url-text">chintap.com/academy</div>
  </div>
</div>

</body>
</html>
HTML

sed -i '' "s|__EMBLEM__|$EMBLEM_SVG|g" "$TMP_DIR/academy-square.html"

# Render PNGs via Headless Chrome
echo "🎨 Rendering Decluttered Academy OG & Brand Assets via Headless Chrome..."
"$CHROME" --headless --disable-gpu --run-all-compositor-stages-before-draw --virtual-time-budget=3000 --window-size=1200,630 --hide-scrollbars --screenshot="$DEST/academy-og.png" "file://$TMP_DIR/academy-og-light.html"
"$CHROME" --headless --disable-gpu --run-all-compositor-stages-before-draw --virtual-time-budget=3000 --window-size=1200,630 --hide-scrollbars --screenshot="$DEST/academy-og-dark.png" "file://$TMP_DIR/academy-og-dark.html"
"$CHROME" --headless --disable-gpu --run-all-compositor-stages-before-draw --virtual-time-budget=3000 --window-size=1200,1200 --hide-scrollbars --screenshot="$DEST/academy-square.png" "file://$TMP_DIR/academy-square.html"

cp "$DEST/academy-og.png" "$DEST/academy-og-preview.png"

# Convert to high-quality JPEGs via native macOS sips
sips -s format jpeg -s formatOptions 95 "$DEST/academy-og.png" --out "$DEST/academy-og.jpg"
sips -s format jpeg -s formatOptions 95 "$DEST/academy-og.png" --out "$DEST/academy-og-preview.jpg"
sips -s format jpeg -s formatOptions 95 "$DEST/academy-og-dark.png" --out "$DEST/academy-og-dark.jpg"
sips -s format jpeg -s formatOptions 95 "$DEST/academy-square.png" --out "$DEST/academy-square.jpg"

echo "✅ Academy OG assets generated successfully in $DEST"
