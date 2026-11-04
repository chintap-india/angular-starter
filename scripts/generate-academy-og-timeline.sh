#!/bin/bash
set -e

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEST="$REPO_ROOT/public/images"
TMP_DIR="/tmp/chintap-brand-build"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

mkdir -p "$DEST"
mkdir -p "$TMP_DIR"

EMBLEM_SVG='<svg viewBox="0 0 1000 1000" width="100" height="100" fill="none"><path d="M 469.7 50.0 L 520.8 51.9 L 558.6 63.2 L 583.2 76.5 L 602.1 89.7 L 624.8 112.4 L 639.9 133.2 L 655.0 161.6 L 666.4 203.2 L 666.4 252.3 L 656.9 288.2 L 645.6 312.8 L 632.4 333.6 L 611.6 356.3 L 579.4 379.0 L 577.5 379.0 L 577.5 329.8 L 570.0 301.5 L 558.6 282.6 L 543.5 267.4 L 520.8 254.2 L 498.1 248.5 L 475.4 248.5 L 447.1 258.0 L 422.5 276.9 L 411.1 292.0 L 399.8 320.4 L 397.9 329.8 L 397.9 379.0 L 365.8 356.3 L 346.8 335.5 L 331.7 312.8 L 320.4 288.2 L 310.9 248.5 L 310.9 203.2 L 320.4 167.2 L 339.3 129.4 L 350.6 114.3 L 375.2 89.7 L 399.8 72.7 L 433.8 57.6 L 469.7 50.0 Z" fill="#EA1C24" /><path d="M 477.3 280.7 L 505.7 282.6 L 520.8 290.1 L 535.9 305.3 L 541.6 314.7 L 545.4 326.1 L 545.4 473.5 L 551.1 479.2 L 611.6 501.9 L 621.0 507.6 L 630.5 509.5 L 639.9 515.1 L 753.4 560.5 L 774.2 579.4 L 785.5 604.0 L 787.4 611.6 L 787.4 802.5 L 779.8 834.7 L 770.4 857.4 L 755.3 881.9 L 728.8 910.3 L 702.3 929.2 L 668.3 944.3 L 639.9 950.0 L 456.5 950.0 L 424.4 942.4 L 394.1 927.3 L 379.0 916.0 L 360.1 897.1 L 348.7 881.9 L 222.1 685.3 L 214.5 666.4 L 212.6 634.2 L 218.3 619.1 L 229.6 607.8 L 241.0 602.1 L 248.5 600.2 L 273.1 602.1 L 312.8 621.0 L 416.8 721.2 L 428.2 730.7 L 430.0 728.8 L 430.0 329.8 L 433.8 316.6 L 441.4 303.4 L 458.4 288.2 L 477.3 280.7 Z" fill="#111111" /></svg>'

EMBLEM_DARK_SVG='<svg viewBox="0 0 1000 1000" width="100" height="100" fill="none"><path d="M 469.7 50.0 L 520.8 51.9 L 558.6 63.2 L 583.2 76.5 L 602.1 89.7 L 624.8 112.4 L 639.9 133.2 L 655.0 161.6 L 666.4 203.2 L 666.4 252.3 L 656.9 288.2 L 645.6 312.8 L 632.4 333.6 L 611.6 356.3 L 579.4 379.0 L 577.5 379.0 L 577.5 329.8 L 570.0 301.5 L 558.6 282.6 L 543.5 267.4 L 520.8 254.2 L 498.1 248.5 L 475.4 248.5 L 447.1 258.0 L 422.5 276.9 L 411.1 292.0 L 399.8 320.4 L 397.9 329.8 L 397.9 379.0 L 365.8 356.3 L 346.8 335.5 L 331.7 312.8 L 320.4 288.2 L 310.9 248.5 L 310.9 203.2 L 320.4 167.2 L 339.3 129.4 L 350.6 114.3 L 375.2 89.7 L 399.8 72.7 L 433.8 57.6 L 469.7 50.0 Z" fill="#EA1C24" /><path d="M 477.3 280.7 L 505.7 282.6 L 520.8 290.1 L 535.9 305.3 L 541.6 314.7 L 545.4 326.1 L 545.4 473.5 L 551.1 479.2 L 611.6 501.9 L 621.0 507.6 L 630.5 509.5 L 639.9 515.1 L 753.4 560.5 L 774.2 579.4 L 785.5 604.0 L 787.4 611.6 L 787.4 802.5 L 779.8 834.7 L 770.4 857.4 L 755.3 881.9 L 728.8 910.3 L 702.3 929.2 L 668.3 944.3 L 639.9 950.0 L 456.5 950.0 L 424.4 942.4 L 394.1 927.3 L 379.0 916.0 L 360.1 897.1 L 348.7 881.9 L 222.1 685.3 L 214.5 666.4 L 212.6 634.2 L 218.3 619.1 L 229.6 607.8 L 241.0 602.1 L 248.5 600.2 L 273.1 602.1 L 312.8 621.0 L 416.8 721.2 L 428.2 730.7 L 430.0 728.8 L 430.0 329.8 L 433.8 316.6 L 441.4 303.4 L 458.4 288.2 L 477.3 280.7 Z" fill="#FFFFFF" /></svg>'

# --- 1. Light Mode Academy OG Card (1200x630) ---
cat << 'HTML' > "$TMP_DIR/academy-og-light.html"
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Corinthia:wght@700&family=Ephesis&family=Poppins:wght@600;700;800;900&family=Space+Grotesk:wght@600;700&family=Plus+Jakarta+Sans:wght@500;600;700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #ffffff;
    width: 1200px;
    height: 630px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 38px 48px 34px 48px;
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
  .bg-glow {
    position: absolute;
    width: 600px;
    height: 350px;
    top: -50px;
    left: 300px;
    background: radial-gradient(circle, rgba(234, 28, 36, 0.04) 0%, rgba(255, 255, 255, 0) 70%);
    pointer-events: none;
    z-index: 0;
  }

  /* Header Section */
  .header-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    z-index: 1;
    margin-top: 6px;
  }
  .emblem-row {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
  }
  .emblem-row svg {
    width: 72px;
    height: 72px;
  }
  .brand-lockup {
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 12px;
    line-height: 1;
  }
  .brand-academy {
    font-family: 'Ephesis', 'Corinthia', cursive, sans-serif;
    font-size: 78px;
    font-weight: 700;
    color: #EA1C24;
    line-height: 0.95;
    letter-spacing: -0.01em;
  }
  .brand-by {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 24px;
    font-weight: 600;
    color: #71717a;
  }
  .brand-chintap {
    font-family: 'Poppins', sans-serif;
    font-size: 44px;
    font-weight: 900;
    color: #18181b;
    letter-spacing: -1.5px;
  }
  .brand-chintap .red { color: #EA1C24; }
  
  .caption {
    font-family: 'Space Grotesk', monospace;
    font-size: 21px;
    font-weight: 700;
    color: #52525b;
    letter-spacing: 0.24em;
    text-indent: 0.24em;
    margin-top: 10px;
    text-transform: uppercase;
  }

  /* Timeline Section */
  .timeline-container {
    width: 100%;
    max-width: 1080px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 1;
    margin: 12px 0 8px 0;
  }
  .timeline-track-wrap {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .timeline-line {
    position: absolute;
    top: 50%;
    left: 45px;
    right: 45px;
    height: 2px;
    background: repeating-linear-gradient(to right, #e2e8f0 0, #e2e8f0 8px, transparent 8px, transparent 14px);
    z-index: 0;
    transform: translateY(-50%);
  }

  .step-pill {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #ffffff;
    border: 1.5px solid #e4e4e7;
    border-radius: 16px;
    padding: 10px 18px 12px 18px;
    width: 146px;
    box-shadow: 0 4px 14px -2px rgba(24, 24, 27, 0.05);
    transition: transform 0.2s ease;
  }
  .step-pill.highlight {
    border-color: #EA1C24;
    background: #fff5f5;
    box-shadow: 0 6px 18px -2px rgba(234, 28, 36, 0.16);
  }
  .step-badge {
    font-family: 'Space Grotesk', monospace;
    font-size: 11px;
    font-weight: 800;
    color: #a1a1aa;
    letter-spacing: 0.08em;
    margin-bottom: 5px;
  }
  .step-pill.highlight .step-badge {
    color: #EA1C24;
  }
  .step-icon {
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 6px;
  }
  .step-label {
    font-family: 'Poppins', sans-serif;
    font-size: 15.5px;
    font-weight: 700;
    color: #18181b;
    letter-spacing: -0.01em;
  }
  .step-pill.highlight .step-label {
    color: #EA1C24;
  }

  /* Footer URL Section */
  .footer-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1;
  }
  .url-pill {
    display: inline-flex;
    align-items: center;
    gap: 11px;
    padding: 10px 28px;
    background: #f4f4f5;
    border: 1.5px solid #e4e4e7;
    border-radius: 9999px;
  }
  .url-dot {
    width: 10px;
    height: 10px;
    background: #EA1C24;
    border-radius: 50%;
  }
  .url-text {
    font-family: 'Space Grotesk', monospace;
    font-size: 19px;
    font-weight: 700;
    color: #18181b;
    letter-spacing: 0.04em;
    line-height: 1;
  }
</style>
</head>
<body>
<div class="accent-bar"></div>
<div class="bg-glow"></div>

<!-- Header -->
<div class="header-wrap">
  <div class="emblem-row">
    __EMBLEM__
  </div>
  <div class="brand-lockup">
    <span class="brand-academy">Academy</span>
    <span class="brand-by">by</span>
    <span class="brand-chintap">chin<span class="red">tap</span></span>
  </div>
  <div class="caption">From ideas to life.</div>
</div>

<!-- Timeline -->
<div class="timeline-container">
  <div class="timeline-track-wrap">
    <div class="timeline-line"></div>
    
    <!-- Step 01: Imagine -->
    <div class="step-pill">
      <span class="step-badge">01</span>
      <div class="step-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z"/>
        </svg>
      </div>
      <span class="step-label">Imagine</span>
    </div>

    <!-- Step 02: Explore -->
    <div class="step-pill">
      <span class="step-badge">02</span>
      <div class="step-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
        </svg>
      </div>
      <span class="step-label">Explore</span>
    </div>

    <!-- Step 03: Learn -->
    <div class="step-pill">
      <span class="step-badge">03</span>
      <div class="step-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
        </svg>
      </div>
      <span class="step-label">Learn</span>
    </div>

    <!-- Step 04: Build -->
    <div class="step-pill">
      <span class="step-badge">04</span>
      <div class="step-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
        </svg>
      </div>
      <span class="step-label">Build</span>
    </div>

    <!-- Step 05: Test -->
    <div class="step-pill">
      <span class="step-badge">05</span>
      <div class="step-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
        </svg>
      </div>
      <span class="step-label">Test</span>
    </div>

    <!-- Step 06: Launch -->
    <div class="step-pill highlight">
      <span class="step-badge">06</span>
      <div class="step-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EA1C24" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-2.05 9.05A22 22 0 0 1 15 12z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
        </svg>
      </div>
      <span class="step-label">Launch</span>
    </div>

  </div>
</div>

<!-- Footer URL -->
<div class="footer-wrap">
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
<link href="https://fonts.googleapis.com/css2?family=Corinthia:wght@700&family=Ephesis&family=Poppins:wght@600;700;800;900&family=Space+Grotesk:wght@600;700&family=Plus+Jakarta+Sans:wght@500;600;700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #0c0a09;
    width: 1200px;
    height: 630px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 38px 48px 34px 48px;
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
  .bg-glow {
    position: absolute;
    width: 700px;
    height: 400px;
    top: -50px;
    left: 250px;
    background: radial-gradient(circle, rgba(234, 28, 36, 0.12) 0%, rgba(12, 10, 9, 0) 70%);
    pointer-events: none;
    z-index: 0;
  }

  /* Header Section */
  .header-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    z-index: 1;
    margin-top: 6px;
  }
  .emblem-row {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
  }
  .emblem-row svg {
    width: 72px;
    height: 72px;
  }
  .brand-lockup {
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 12px;
    line-height: 1;
  }
  .brand-academy {
    font-family: 'Ephesis', 'Corinthia', cursive, sans-serif;
    font-size: 78px;
    font-weight: 700;
    color: #EA1C24;
    line-height: 0.95;
    letter-spacing: -0.01em;
  }
  .brand-by {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 24px;
    font-weight: 600;
    color: #a8a29e;
  }
  .brand-chintap {
    font-family: 'Poppins', sans-serif;
    font-size: 44px;
    font-weight: 900;
    color: #ffffff;
    letter-spacing: -1.5px;
  }
  .brand-chintap .red { color: #EA1C24; }
  
  .caption {
    font-family: 'Space Grotesk', monospace;
    font-size: 21px;
    font-weight: 700;
    color: #d6d3d1;
    letter-spacing: 0.24em;
    text-indent: 0.24em;
    margin-top: 10px;
    text-transform: uppercase;
  }

  /* Timeline Section */
  .timeline-container {
    width: 100%;
    max-width: 1080px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 1;
    margin: 12px 0 8px 0;
  }
  .timeline-track-wrap {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .timeline-line {
    position: absolute;
    top: 50%;
    left: 45px;
    right: 45px;
    height: 2px;
    background: repeating-linear-gradient(to right, #292524 0, #292524 8px, transparent 8px, transparent 14px);
    z-index: 0;
    transform: translateY(-50%);
  }

  .step-pill {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #1c1917;
    border: 1.5px solid #292524;
    border-radius: 16px;
    padding: 10px 18px 12px 18px;
    width: 146px;
    box-shadow: 0 4px 14px -2px rgba(0, 0, 0, 0.4);
    transition: transform 0.2s ease;
  }
  .step-pill.highlight {
    border-color: #EA1C24;
    background: #2a1215;
    box-shadow: 0 6px 20px -2px rgba(234, 28, 36, 0.3);
  }
  .step-badge {
    font-family: 'Space Grotesk', monospace;
    font-size: 11px;
    font-weight: 800;
    color: #78716c;
    letter-spacing: 0.08em;
    margin-bottom: 5px;
  }
  .step-pill.highlight .step-badge {
    color: #EA1C24;
  }
  .step-icon {
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 6px;
  }
  .step-label {
    font-family: 'Poppins', sans-serif;
    font-size: 15.5px;
    font-weight: 700;
    color: #f5f5f4;
    letter-spacing: -0.01em;
  }
  .step-pill.highlight .step-label {
    color: #EA1C24;
  }

  /* Footer URL Section */
  .footer-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1;
  }
  .url-pill {
    display: inline-flex;
    align-items: center;
    gap: 11px;
    padding: 10px 28px;
    background: #1c1917;
    border: 1.5px solid #292524;
    border-radius: 9999px;
  }
  .url-dot {
    width: 10px;
    height: 10px;
    background: #EA1C24;
    border-radius: 50%;
  }
  .url-text {
    font-family: 'Space Grotesk', monospace;
    font-size: 19px;
    font-weight: 700;
    color: #f5f5f4;
    letter-spacing: 0.04em;
    line-height: 1;
  }
</style>
</head>
<body>
<div class="accent-bar"></div>
<div class="bg-glow"></div>

<!-- Header -->
<div class="header-wrap">
  <div class="emblem-row">
    __EMBLEM__
  </div>
  <div class="brand-lockup">
    <span class="brand-academy">Academy</span>
    <span class="brand-by">by</span>
    <span class="brand-chintap">chin<span class="red">tap</span></span>
  </div>
  <div class="caption">From ideas to life.</div>
</div>

<!-- Timeline -->
<div class="timeline-container">
  <div class="timeline-track-wrap">
    <div class="timeline-line"></div>
    
    <!-- Step 01: Imagine -->
    <div class="step-pill">
      <span class="step-badge">01</span>
      <div class="step-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z"/>
        </svg>
      </div>
      <span class="step-label">Imagine</span>
    </div>

    <!-- Step 02: Explore -->
    <div class="step-pill">
      <span class="step-badge">02</span>
      <div class="step-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
        </svg>
      </div>
      <span class="step-label">Explore</span>
    </div>

    <!-- Step 03: Learn -->
    <div class="step-pill">
      <span class="step-badge">03</span>
      <div class="step-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
        </svg>
      </div>
      <span class="step-label">Learn</span>
    </div>

    <!-- Step 04: Build -->
    <div class="step-pill">
      <span class="step-badge">04</span>
      <div class="step-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
        </svg>
      </div>
      <span class="step-label">Build</span>
    </div>

    <!-- Step 05: Test -->
    <div class="step-pill">
      <span class="step-badge">05</span>
      <div class="step-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
        </svg>
      </div>
      <span class="step-label">Test</span>
    </div>

    <!-- Step 06: Launch -->
    <div class="step-pill highlight">
      <span class="step-badge">06</span>
      <div class="step-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EA1C24" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-2.05 9.05A22 22 0 0 1 15 12z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
        </svg>
      </div>
      <span class="step-label">Launch</span>
    </div>

  </div>
</div>

<!-- Footer URL -->
<div class="footer-wrap">
  <div class="url-pill">
    <div class="url-dot"></div>
    <div class="url-text">chintap.com/academy</div>
  </div>
</div>

</body>
</html>
HTML

sed -i '' "s|__EMBLEM__|$EMBLEM_DARK_SVG|g" "$TMP_DIR/academy-og-dark.html"

# --- 3. Square Brand Card (1200x1200) for social profile / square previews ---
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
    justify-content: space-between;
    padding: 80px 60px 70px 60px;
    font-family: 'Poppins', -apple-system, sans-serif;
    position: relative;
    overflow: hidden;
  }
  .accent-bar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 10px;
    background: #EA1C24;
  }
  .emblem-row svg {
    width: 140px;
    height: 140px;
  }
  .brand-lockup {
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 16px;
    line-height: 1;
    margin-top: 10px;
  }
  .brand-academy {
    font-family: 'Ephesis', 'Corinthia', cursive, sans-serif;
    font-size: 130px;
    font-weight: 700;
    color: #EA1C24;
    line-height: 0.9;
  }
  .brand-by {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 34px;
    font-weight: 600;
    color: #71717a;
  }
  .brand-chintap {
    font-family: 'Poppins', sans-serif;
    font-size: 64px;
    font-weight: 900;
    color: #18181b;
    letter-spacing: -2px;
  }
  .brand-chintap .red { color: #EA1C24; }
  .caption {
    font-family: 'Space Grotesk', monospace;
    font-size: 30px;
    font-weight: 700;
    color: #52525b;
    letter-spacing: 0.25em;
    text-indent: 0.25em;
    margin-top: 20px;
    text-transform: uppercase;
  }
  .grid-timeline {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    width: 100%;
    max-width: 900px;
    margin: 40px 0;
  }
  .step-pill {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #ffffff;
    border: 2px solid #e4e4e7;
    border-radius: 20px;
    padding: 20px 24px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.05);
  }
  .step-pill.highlight {
    border-color: #EA1C24;
    background: #fff5f5;
  }
  .step-badge {
    font-family: 'Space Grotesk', monospace;
    font-size: 14px;
    font-weight: 800;
    color: #a1a1aa;
    margin-bottom: 8px;
  }
  .step-pill.highlight .step-badge { color: #EA1C24; }
  .step-icon {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
  }
  .step-label {
    font-family: 'Poppins', sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: #18181b;
  }
  .step-pill.highlight .step-label { color: #EA1C24; }
  .url-pill {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    padding: 16px 40px;
    background: #f4f4f5;
    border: 2px solid #e4e4e7;
    border-radius: 9999px;
  }
  .url-dot {
    width: 14px;
    height: 14px;
    background: #EA1C24;
    border-radius: 50%;
  }
  .url-text {
    font-family: 'Space Grotesk', monospace;
    font-size: 26px;
    font-weight: 700;
    color: #18181b;
    letter-spacing: 0.04em;
  }
</style>
</head>
<body>
<div class="accent-bar"></div>
<div style="display: flex; flex-direction: column; align-items: center; text-align: center;">
  <div class="emblem-row">__EMBLEM__</div>
  <div class="brand-lockup">
    <span class="brand-academy">Academy</span>
    <span class="brand-by">by</span>
    <span class="brand-chintap">chin<span class="red">tap</span></span>
  </div>
  <div class="caption">From ideas to life.</div>
</div>

<div class="grid-timeline">
  <div class="step-pill">
    <span class="step-badge">01</span>
    <div class="step-icon">
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z"/>
      </svg>
    </div>
    <span class="step-label">Imagine</span>
  </div>
  <div class="step-pill">
    <span class="step-badge">02</span>
    <div class="step-icon">
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
      </svg>
    </div>
    <span class="step-label">Explore</span>
  </div>
  <div class="step-pill">
    <span class="step-badge">03</span>
    <div class="step-icon">
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    </div>
    <span class="step-label">Learn</span>
  </div>
  <div class="step-pill">
    <span class="step-badge">04</span>
    <div class="step-icon">
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    </div>
    <span class="step-label">Build</span>
  </div>
  <div class="step-pill">
    <span class="step-badge">05</span>
    <div class="step-icon">
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
      </svg>
    </div>
    <span class="step-label">Test</span>
  </div>
  <div class="step-pill highlight">
    <span class="step-badge">06</span>
    <div class="step-icon">
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#EA1C24" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-2.05 9.05A22 22 0 0 1 15 12z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
      </svg>
    </div>
    <span class="step-label">Launch</span>
  </div>
</div>

<div class="url-pill">
  <div class="url-dot"></div>
  <div class="url-text">chintap.com/academy</div>
</div>
</body>
</html>
HTML

sed -i '' "s|__EMBLEM__|$EMBLEM_SVG|g" "$TMP_DIR/academy-square.html"

# Render PNGs via Headless Chrome
echo "🎨 Rendering Academy OG & Brand Assets via Headless Chrome..."
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
