// generate-promo.js
// Generates public/promo-content.png (text block) and public/promo.png (1080x1920)
// Usage: node scripts/generate-promo.js

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');

function toDataURI(filePath) {
  const ext = path.extname(filePath).slice(1).replace('jpg', 'jpeg');
  const data = fs.readFileSync(filePath).toString('base64');
  return `data:image/${ext};base64,${data}`;
}

async function main() {
  const iconURI = toDataURI(path.join(PUBLIC, 'icon.png'));
  const heroURI = toDataURI(path.join(PUBLIC, 'hero-light.png'));

  const browser = await puppeteer.launch({ headless: true });

  // ── Pass 1: render content block to its own PNG ───────────────────────────
  const contentHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body {
    width: 1080px;
    background: #FFF9F0;
    font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 80px 60px 80px;
    text-align: center;
  }
  .icon {
    width: 180px;
    height: 180px;
  }
  h1 {
    margin-top: 52px;
    font-size: 120px;
    font-weight: 700;
    color: #FCC527;
    line-height: 1.1;
  }
  h2 {
    margin-top: 36px;
    font-size: 52px;
    font-weight: 600;
    color: #4BA6C1;
    line-height: 1.35;
  }
  p {
    margin-top: 48px;
    font-size: 38px;
    font-weight: 400;
    color: #777;
    line-height: 1.55;
  }
  .btn {
    margin-top: 90px;
    background: #FCC527;
    color: #fff;
    font-size: 44px;
    font-weight: 600;
    border-radius: 50px;
    padding: 26px 80px;
    display: inline-block;
  }
</style>
</head>
<body>
  <div class="content">
    <img class="icon" src="${iconURI}" alt="Buoy icon">
    <h1>Meet Buoy</h1>
    <h2>A lightweight, always-on-top floating notepad for macOS.</h2>
    <p>Lives in your menu bar and stays above every window so you never lose your notes.</p>
    <div class="btn">Join the waitlist</div>
  </div>
</body>
</html>`;

  const contentPage = await browser.newPage();
  await contentPage.setViewport({ width: 1080, height: 1200, deviceScaleFactor: 1 });
  await contentPage.setContent(contentHtml, { waitUntil: 'networkidle0' });

  // measure the actual content height
  const contentHeight = await contentPage.evaluate(() => document.body.scrollHeight);

  const contentPngPath = path.join(PUBLIC, 'promo-content.png');
  await contentPage.screenshot({
    path: contentPngPath,
    type: 'png',
    clip: { x: 0, y: 0, width: 1080, height: contentHeight },
  });
  await contentPage.close();
  console.log(`✓ Saved ${contentPngPath} (${contentHeight}px tall)`);

  // ── Pass 2: embed content PNG into final 1080×1920 layout ─────────────────
  const contentURI = toDataURI(contentPngPath);

  // Instagram safe zone: ~250px top, ~250px bottom
  // We add 200px cream above the hero so it clears the top UI
  const finalHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body {
    width: 1080px;
    height: 1920px;
    overflow: hidden;
    background: #FFF9F0;
  }
  .safe-top {
    width: 1080px;
    height: 200px;
    background: #FFF9F0;
  }
  .hero {
    width: 1080px;
    height: 380px;
    overflow: hidden;
  }
  .hero img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  .content-img {
    width: 1080px;
    display: block;
  }
</style>
</head>
<body>
  <div class="safe-top"></div>
  <div class="hero">
    <img src="${heroURI}" alt="hero">
  </div>
  <img class="content-img" src="${contentURI}" alt="content">
</body>
</html>`;

  const finalPage = await browser.newPage();
  await finalPage.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });
  await finalPage.setContent(finalHtml, { waitUntil: 'networkidle0' });

  const pngPath = path.join(PUBLIC, 'promo.png');
  await finalPage.screenshot({ path: pngPath, type: 'png', clip: { x: 0, y: 0, width: 1080, height: 1920 } });
  await finalPage.close();

  await browser.close();
  console.log(`✓ Saved ${pngPath}`);

  // ── Clean up old SVG ───────────────────────────────────────────────────────
  const svgPath = path.join(PUBLIC, 'promo.svg');
  if (fs.existsSync(svgPath)) {
    fs.unlinkSync(svgPath);
    console.log(`✓ Deleted ${svgPath}`);
  }
}

main().catch(err => { console.error(err); process.exit(1); });
