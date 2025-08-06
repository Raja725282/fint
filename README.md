# fint

Flint Directors Onboarding Portal - A web application for onboarding new directors with dynamic data pulling capabilities.

## Features

- **Dynamic Data Pulling**: The application can pull data from external API endpoints
- **Fallback Support**: Uses local fallback data if API endpoints are unavailable  
- **Real-time Refresh**: Users can refresh data manually via the "Refresh Data" button
- **Responsive Design**: Works on desktop and mobile devices
- **Progress Tracking**: Tracks onboarding progress and completion status

## Data API Integration

The application supports pulling data from external APIs with the following endpoints:

- `/api/flint-values` - Company values and principles
- `/api/tech-stack` - Technology stack information  
- `/api/onboarding-steps` - Onboarding process steps
- `/api/testimonials` - Customer testimonials
- `/api/resources` - Support resources and documentation

### Configuration

API configuration can be modified in `app.js`:

```javascript
const apiConfig = {
  baseUrl: '/api', // Change to your API server URL
  endpoints: {
    flintValues: '/flint-values',
    techStack: '/tech-stack', 
    onboardingSteps: '/onboarding-steps',
    testimonials: '/testimonials',
    resources: '/resources'
  },
  fallbackToLocal: true // Use local data if API fails
};
```

## Usage

1. Open `index.html` in a web browser
2. The application will automatically attempt to pull data from configured API endpoints
3. If APIs are unavailable, it will use fallback data
4. Use the "Refresh Data" button in the user menu to manually refresh data

## Development

To serve the application locally:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.