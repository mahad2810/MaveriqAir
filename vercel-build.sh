#!/bin/bash

# Run the build command
npm run build

# Create necessary directories
mkdir -p dist/public/Geojson
mkdir -p dist/public/Images

# Copy static files from public folder to dist/public
cp -r public/Geojson/* dist/public/Geojson/
cp -r public/Images/* dist/public/Images/
cp public/MaveriqAir-Logo.png dist/public/
cp public/map.html dist/public/

echo "Build completed and static files copied successfully!"