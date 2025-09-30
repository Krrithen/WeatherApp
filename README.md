# ChromeDash - New Tab

**ChromeDash** is a beautiful new tab dashboard Chrome extension that transforms your new tab page into a stunning, personalized experience with dynamic backgrounds, daily quotes, and weather information.

## Features

- **Dynamic Backgrounds**: Beautiful Unsplash images that change daily
- **Daily Quotes**: Motivational quotes refreshed daily  
- **Weather Widget**: Current conditions and 3-day forecasts
- **Global Weather Search**: Weather for any location worldwide
- **Interactive Charts**: Temperature and wind speed graphs
- **Customizable**: Temperature units, default location, and more
- **Weather.com Integration**: Direct access to detailed forecasts

## Quick Start

### Install ChromeDash Extension
```bash
npm run build:extension
```
Then load the `dist` folder in Chrome Extensions.

### Development
```bash
npm install
npm run serve
```

## Build Commands

- `npm run serve` - Development server
- `npm run build` - Production build  
- `npm run build:extension` - Build ChromeDash extension
- `npm run lint` - Lint and fix code

## Installation Guide

### Method 1: Quick Install
```bash
./install-extension.sh
```

### Method 2: Manual Install
1. **Build**: `npm run build:extension`
2. **Open Chrome**: Go to `chrome://extensions/`
3. **Enable Developer Mode**: Toggle in top right
4. **Load Unpacked**: Select the `dist` folder
5. **Enjoy**: Your new tab now shows ChromeDash!

### What You'll Get
- **Tab Title**: ChromeDash - New Tab
- **Extension Name**: ChromeDash - New Tab
- **Daily Backgrounds**: Beautiful Unsplash images
- **Daily Quotes**: Fresh motivational quotes
- **Weather Widget**: Current conditions and forecasts

## Why ChromeDash?

- **Instant Access**: Beautiful dashboard right when you open a new tab
- **Stunning Design**: Dynamic backgrounds and elegant interface
- **Fast Performance**: Optimized loading and smooth animations
- **Privacy First**: All data stays local, no tracking
- **Daily Fresh**: Backgrounds and quotes refresh automatically
- **Customizable**: Personalize your dashboard experience
- **Global Weather**: Works for any location worldwide
- **Clean Code**: Well-structured Vue.js application

## Technical Details

### Built With
- **Vue.js 2.6** - Frontend framework
- **Vuex** - State management
- **Chart.js** - Interactive weather charts
- **Unsplash API** - Dynamic backgrounds
- **Quotable API** - Daily motivational quotes
- **Weather API** - Real-time weather data

### Project Structure
```
ChromeDash/
├── src/
│   ├── components/     # Vue components
│   ├── services/       # API services
│   ├── store/         # Vuex store
│   └── assets/        # Weather icons
├── public/
│   ├── manifest.json  # Chrome extension config
│   ├── index.html     # Extension page
│   └── logo.png       # Extension icon
└── dist/              # Built extension
```
