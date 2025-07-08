# Run the build command (this is already handled in package.json)

# Create necessary directories
New-Item -ItemType Directory -Force -Path dist/public/Geojson
New-Item -ItemType Directory -Force -Path dist/public/Images

# Copy static files from public folder to dist/public
Copy-Item -Path public/Geojson/* -Destination dist/public/Geojson/ -Recurse -Force
Copy-Item -Path public/Images/* -Destination dist/public/Images/ -Recurse -Force
Copy-Item -Path public/MaveriqAir-Logo.png -Destination dist/public/ -Force
Copy-Item -Path public/map.html -Destination dist/public/ -Force

Write-Host "Build completed and static files copied successfully!"