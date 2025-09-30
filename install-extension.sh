#!/bin/bash

echo "✨ ChromeDash - New Tab Chrome Extension Installer"
echo "=============================================="
echo ""

# Build the extension
echo "📦 Building the extension..."
npm run build:extension

echo ""
echo "✅ Extension built successfully!"
echo ""
echo "🚀 To install the extension:"
echo "1. Open Chrome and go to chrome://extensions/"
echo "2. Enable 'Developer mode' (toggle in top right)"
echo "3. Click 'Load unpacked'"
echo "4. Select the 'dist' folder from this project"
echo "5. The extension will be installed and active!"
echo ""
echo "🎯 Your beautiful dashboard will now load every time you open a new tab!"
echo ""
echo "📁 Extension files are in: $(pwd)/dist"
