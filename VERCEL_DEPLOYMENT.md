# Deploying MaveriqAir to Vercel

This guide provides instructions for deploying the MaveriqAir application to Vercel, ensuring that both the frontend from the client folder and static files from the public folder are properly served.

## Prerequisites

- A [Vercel](https://vercel.com) account
- [Vercel CLI](https://vercel.com/docs/cli) installed (optional for local testing)

## Deployment Steps

### 1. Connect Your Repository

1. Log in to your Vercel account
2. Click on "Add New" → "Project"
3. Import your Git repository (GitHub, GitLab, or Bitbucket)
4. Select the MaveriqAir repository

### 2. Configure Project Settings

Vercel will automatically detect that this is a Node.js project. Configure the following settings:

- **Framework Preset**: Other
- **Build Command**: `npm run build`
- **Output Directory**: `dist/public`
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`

### 3. Environment Variables

Add any required environment variables for your application:

- For API keys
- For database connections
- For email services (SMTP settings)

### 4. Deploy

Click the "Deploy" button to start the deployment process. Vercel will:

1. Clone your repository
2. Install dependencies
3. Build the application using the build command
4. Copy static files from the public folder to the output directory
5. Deploy the application

## How It Works

The deployment process is configured through several key files:

### vercel.json

This file configures how Vercel handles routing for your application:

- API routes are directed to the serverless function
- Static files from the public folder (Geojson, Images, etc.) are properly served
- All other routes are directed to the frontend application

### build.js

This script runs during the build process to copy static files from the public folder to the output directory. It ensures that:

- The Geojson files are available at `/Geojson/*`
- The Images are available at `/Images/*`
- Individual files like `map.html` and `MaveriqAir-Logo.png` are properly copied

## Troubleshooting

If you encounter issues with the deployment:

1. Check the build logs in the Vercel dashboard
2. Ensure all required environment variables are set
3. Verify that the static files are being copied correctly
4. Check that the API routes are working as expected

## Local Testing

To test the deployment locally before pushing to Vercel:

1. Install the Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts to link to your Vercel project
4. Use `vercel dev` to test locally

## Updating the Deployment

After making changes to your application:

1. Push the changes to your Git repository
2. Vercel will automatically deploy the new version

Alternatively, you can manually trigger a deployment from the Vercel dashboard.