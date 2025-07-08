/**
 * Vercel Deployment Readiness Check
 * 
 * This script checks if your project is ready for deployment to Vercel
 * by verifying the presence of required files and configurations.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const requiredFiles = [
  'vercel.json',
  'package.json',
  'build.js',
  'client/index.html',
  'api/index.js'
];

const recommendedFiles = [
  '.env.example',
  '.vercelignore',
  'VERCEL_DEPLOYMENT.md'
];

function checkFile(filePath, required = true) {
  const fullPath = path.join(__dirname, filePath);
  const exists = fs.existsSync(fullPath);
  
  if (exists) {
    console.log(`✅ ${required ? 'Required' : 'Recommended'} file found: ${filePath}`);
    return true;
  } else {
    console.log(`❌ ${required ? 'Required' : 'Recommended'} file missing: ${filePath}`);
    return false;
  }
}

function checkVercelConfig() {
  const vercelJsonPath = path.join(__dirname, 'vercel.json');
  
  if (!fs.existsSync(vercelJsonPath)) {
    return false;
  }
  
  try {
    const vercelConfig = JSON.parse(fs.readFileSync(vercelJsonPath, 'utf8'));
    
    // Check for conflicting configuration
    if (vercelConfig.rewrites && vercelConfig.routes) {
      console.log('⚠️ Warning: vercel.json contains both "rewrites" and "routes" which is not allowed');
      return false;
    }
    
    // Check for output directory
    if (!vercelConfig.outputDirectory) {
      console.log('⚠️ Warning: vercel.json is missing "outputDirectory" property');
    }
    
    // Check for build command
    if (!vercelConfig.buildCommand) {
      console.log('⚠️ Warning: vercel.json is missing "buildCommand" property');
    }
    
    return true;
  } catch (error) {
    console.log('❌ Error parsing vercel.json:', error.message);
    return false;
  }
}

function checkPackageJson() {
  const packageJsonPath = path.join(__dirname, 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    return false;
  }
  
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Check for build script
    if (!packageJson.scripts || !packageJson.scripts.build) {
      console.log('⚠️ Warning: package.json is missing "build" script');
      return false;
    }
    
    // Check for copy-static-files script
    if (!packageJson.scripts || !packageJson.scripts['copy-static-files']) {
      console.log('⚠️ Warning: package.json is missing "copy-static-files" script');
    }
    
    return true;
  } catch (error) {
    console.log('❌ Error parsing package.json:', error.message);
    return false;
  }
}

function runChecks() {
  console.log('🔍 Running Vercel deployment readiness checks...');
  console.log('\n=== Required Files ===');
  
  let allRequiredFilesExist = true;
  
  for (const file of requiredFiles) {
    if (!checkFile(file)) {
      allRequiredFilesExist = false;
    }
  }
  
  console.log('\n=== Recommended Files ===');
  for (const file of recommendedFiles) {
    checkFile(file, false);
  }
  
  console.log('\n=== Configuration Checks ===');
  const vercelConfigValid = checkVercelConfig();
  const packageJsonValid = checkPackageJson();
  
  console.log('\n=== Summary ===');
  if (allRequiredFilesExist && vercelConfigValid && packageJsonValid) {
    console.log('✅ Your project is ready for deployment to Vercel!');
  } else {
    console.log('❌ Your project has issues that need to be fixed before deployment.');
  }
}

runChecks();