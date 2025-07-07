# AQI Map - Air Quality Monitoring & Forecasting Platform

## Overview

AQI Map is a comprehensive air quality monitoring and forecasting platform designed to bridge the data gap for underserved regions. The application provides real-time AQI data, predictive forecasting, and personalized health recommendations, extending coverage beyond major metropolitan areas to include small towns and rural areas.

**Current Status**: Complete marketing landing page showcasing the platform's capabilities, features, and integration opportunities. The landing page effectively communicates the value proposition and includes interactive elements demonstrating the app interface.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **UI Library**: Radix UI with shadcn/ui components
- **Styling**: Tailwind CSS with custom design system
- **State Management**: TanStack Query for server state and caching
- **Routing**: Wouter for lightweight client-side routing
- **Form Management**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Email Service**: Nodemailer for contact form notifications
- **Development**: Vite for build tooling and hot module replacement

### Database Design
- **ORM**: Drizzle with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` for type-safe database operations
- **Migration Strategy**: Drizzle Kit for schema management
- **Tables**:
  - `users`: User authentication and management
  - `contact_submissions`: Contact form data with API request tracking

## Key Components

### Data Sources Integration
- **ISRO Satellite Data**: High-resolution atmospheric imagery
- **IMD Weather Data**: Meteorological information from India Meteorological Department
- **CPCB Ground Stations**: Real-time pollution data from Central Pollution Control Board
- **ML Forecasting**: TensorFlow-based predictive models for 24-72 hour forecasts

### Core Features
- **Real-time AQI Mapping**: Hyperlocal air quality visualization
- **Predictive Forecasting**: Machine learning-powered air quality predictions
- **Health Recommendations**: Personalized advice based on pollution levels
- **Historical Analysis**: Trend analysis with location-based filtering
- **Pollution Source Mapping**: Identification of pollution sources
- **Smart Alerts**: Push notifications for pollution spikes

### API Endpoints
- `POST /api/contact`: Contact form submission with email notifications
- Additional endpoints for air quality data (to be implemented)

## Data Flow

1. **Data Collection**: Satellite data, weather information, and ground station readings
2. **Data Processing**: Real-time aggregation and ML-based forecasting
3. **Client Requests**: Frontend fetches processed data via REST API
4. **Visualization**: Interactive maps and charts display air quality information
5. **Notifications**: Alert system for threshold-based warnings

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **@tanstack/react-query**: Server state management
- **@radix-ui/react-***: UI component primitives
- **drizzle-orm**: Type-safe database operations
- **react-hook-form**: Form state management
- **zod**: Runtime type validation
- **nodemailer**: Email service integration

### Development Dependencies
- **vite**: Build tooling and development server
- **typescript**: Type checking and compilation
- **tailwindcss**: Utility-first CSS framework
- **drizzle-kit**: Database schema management

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React application to `dist/public`
2. **Backend Build**: ESBuild bundles Node.js server to `dist/index.js`
3. **Database Setup**: Drizzle migrations applied via `npm run db:push`

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string
- **SMTP_***: Email service configuration
- **NODE_ENV**: Environment-specific settings

### Hosting Requirements
- Node.js runtime environment
- PostgreSQL database
- SMTP service for email notifications
- Static file serving capability

## Changelog

```
Changelog:
- July 07, 2025. Initial setup and complete marketing landing page
  - Created comprehensive landing page with hero, features, demo, and contact sections
  - Implemented interactive demo showcasing app interface
  - Added technology stack information highlighting data sources (ISRO, IMD, CPCB)
  - Integrated health recommendations and API access sections
  - Built functional contact form with email notifications
  - Updated hero section with actual app interface screenshot
  - Fixed all TypeScript errors and storage implementation
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```