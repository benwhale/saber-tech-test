
## Development

Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Build and Production

Build for production:
```bash
npm run build
```

Run production build:
```bash
npm start
```

## Features

- URL shortening form
- File upload interface
- History view of shortened URLs and uploaded files
- Responsive design using Tailwind CSS

## Project Structure

- `/src/app` - Next.js pages and routing
- `/src/components` - React components
- `/src/hooks` - Custom React hooks for API integration
- `/src/lib` - Utility functions and types

## Deployment

The application is configured for deployment on Vercel. Connect your repository to Vercel and it will automatically deploy when you push to main.

Make sure to configure the `NEXT_PUBLIC_API_URL` environment variable in your Vercel project settings.