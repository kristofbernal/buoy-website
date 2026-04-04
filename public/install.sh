#!/bin/sh
set -e

VERSION="1.0"
ZIP_URL="https://github.com/gabemempin/buoy/releases/download/v${VERSION}/Buoy-${VERSION}.zip"

echo "Installing Buoy ${VERSION}..."

# Quit Buoy if running
osascript -e 'quit app "Buoy"' 2>/dev/null || true

curl -fsSL "$ZIP_URL" -o /tmp/Buoy.zip
unzip -qo /tmp/Buoy.zip -d /Applications/
rm /tmp/Buoy.zip
echo "Done. Launch Buoy from /Applications or Spotlight."
