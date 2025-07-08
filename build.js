import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define source and destination directories
const publicDir = path.join(__dirname, 'public');
const distDir = path.join(__dirname, 'dist', 'public');

// Create directories if they don't exist
function ensureDirectoryExists(directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}

// Copy a file from source to destination
function copyFile(source, destination) {
  ensureDirectoryExists(path.dirname(destination));
  fs.copyFileSync(source, destination);
  console.log(`Copied: ${source} -> ${destination}`);
}

// Copy a directory recursively
function copyDirectory(source, destination) {
  ensureDirectoryExists(destination);
  
  const files = fs.readdirSync(source);
  
  for (const file of files) {
    const sourcePath = path.join(source, file);
    const destPath = path.join(destination, file);
    
    const stats = fs.statSync(sourcePath);
    
    if (stats.isDirectory()) {
      copyDirectory(sourcePath, destPath);
    } else {
      copyFile(sourcePath, destPath);
    }
  }
}

// Main function to copy static files
function copyStaticFiles() {
  console.log('Starting to copy static files...');
  
  // Ensure the dist directory exists
  ensureDirectoryExists(distDir);
  
  // Copy Geojson directory
  const geojsonSource = path.join(publicDir, 'Geojson');
  const geojsonDest = path.join(distDir, 'Geojson');
  if (fs.existsSync(geojsonSource)) {
    copyDirectory(geojsonSource, geojsonDest);
  }
  
  // Copy Images directory
  const imagesSource = path.join(publicDir, 'Images');
  const imagesDest = path.join(distDir, 'Images');
  if (fs.existsSync(imagesSource)) {
    copyDirectory(imagesSource, imagesDest);
  }
  
  // Copy individual files
  const filesToCopy = ['MaveriqAir-Logo.png', 'map.html'];
  for (const file of filesToCopy) {
    const sourcePath = path.join(publicDir, file);
    const destPath = path.join(distDir, file);
    if (fs.existsSync(sourcePath)) {
      copyFile(sourcePath, destPath);
    }
  }
  
  console.log('Static files copied successfully!');
}

// Execute the copy function
copyStaticFiles();