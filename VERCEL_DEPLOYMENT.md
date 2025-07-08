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

1. **Using the Vercel Dashboard**:
   - Go to your project settings
   - Navigate to the "Environment Variables" tab
   - Add each variable from the `.env.example` file
   - Specify which environments (Production, Preview, Development) should use each variable

2. **Using the Vercel CLI**:
   ```bash
   vercel env add SMTP_HOST
   vercel env add SMTP_PORT
   # etc.
   ```

3. **Required Variables**:
   - SMTP configuration for the contact form
   - API keys for external services
   - Database connection strings (if applicable)

Refer to the `.env.example` file in the project root for a template of all required environment variables.

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

**Important Configuration Notes:**

- Vercel does not allow using both `rewrites` and `routes` in the same configuration
- We've consolidated all routing rules into the `rewrites` section
- The order of rewrites matters - more specific routes should come before catch-all routes

### build.js

This script runs during the build process to copy static files from the public folder to the output directory. It ensures that:

- The Geojson files are available at `/Geojson/*`
- The Images are available at `/Images/*`
- Individual files like `map.html` and `MaveriqAir-Logo.png` are properly copied

## Performance Optimization

To optimize your Vercel deployment for performance:

### Caching Strategy

1. **Static Assets Caching**
   - Add cache headers for static assets in vercel.json:
   ```json
   {
     "headers": [
       {
         "source": "/Geojson/(.*)",
         "headers": [
           {
             "key": "Cache-Control",
             "value": "public, max-age=604800, immutable"
           }
         ]
       },
       {
         "source": "/Images/(.*)",
         "headers": [
           {
             "key": "Cache-Control",
             "value": "public, max-age=604800, immutable"
           }
         ]
       }
     ]
   }
   ```

2. **API Response Caching**
   - Implement appropriate cache headers for API responses
   - Consider using Vercel's Edge Caching for frequently accessed data

3. **Image Optimization**
   - Use Vercel's Image Optimization API for dynamic image resizing
   - Compress large GeoJSON files when possible

## Deployment Readiness Check

Before deploying to Vercel, you can run the deployment readiness check script to ensure your project is properly configured:

```bash
npm run vercel:check
```

This script will check for:
- Required files (vercel.json, package.json, build.js, etc.)
- Recommended files (.env.example, .vercelignore, etc.)
- Configuration validity (no conflicting settings in vercel.json)
- Presence of required scripts in package.json

## Troubleshooting

If you encounter issues with the deployment:

1. Check the build logs in the Vercel dashboard
2. Ensure all required environment variables are set
3. Verify that the static files are being copied correctly
4. Check that the API routes are working as expected
5. Inspect network requests in browser dev tools to verify correct routing
6. Run the deployment readiness check: `npm run vercel:check`

## Local Testing

To test the deployment locally before pushing to Vercel:

1. Install the Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts to link to your Vercel project
4. Use `vercel dev` to test locally

## Monitoring and Analytics

Vercel provides built-in analytics and monitoring tools to help you track your application's performance:

### 1. Vercel Analytics

Enable Vercel Analytics in your project settings to track:
- Page views and unique visitors
- Web Vitals metrics (LCP, FID, CLS)
- Geographic distribution of users
- Device and browser usage

### 2. Error Monitoring

- Set up error tracking with Sentry or other error monitoring tools
- Configure alerts for critical errors
- Use Vercel's built-in error logs for serverless functions

### 3. Performance Monitoring

- Monitor API response times
- Track static asset loading performance
- Set up custom performance metrics for map rendering

## Updating the Deployment

After making changes to your application:

1. Push the changes to your Git repository
2. Vercel will automatically deploy the new version
3. Use Vercel's Preview Deployments feature to test changes before merging to production

Alternatively, you can manually trigger a deployment from the Vercel dashboard.

### Automated Deployments with GitHub Actions

This project includes a GitHub Actions workflow for automated deployments to Vercel. The workflow is defined in `.github/workflows/vercel-deploy.yml` and performs the following steps:

1. Checks out the code
2. Sets up Node.js
3. Installs dependencies
4. Runs the deployment readiness check
5. Deploys to Vercel

To use this workflow, you need to set up the following secrets in your GitHub repository:

- `VERCEL_TOKEN`: Your Vercel API token
- `VERCEL_ORG_ID`: Your Vercel organization ID
- `VERCEL_PROJECT_ID`: Your Vercel project ID

You can find these values in your Vercel account settings or by running `vercel whoami` and `vercel projects list` with the Vercel CLI.

### Deployment Strategies

- **Staged Deployments**: Use Git branches to manage different environments (development, staging, production)
- **Rollbacks**: Quickly revert to previous deployments if issues are detected
- **A/B Testing**: Use Vercel's Edge Config to implement feature flags and A/B tests
- **Continuous Integration**: Use GitHub Actions to automate testing and deployment