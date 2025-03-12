# Example Inc UI Foundation

## Project Overview
This project serves as a UI foundation built with React and TypeScript, providing a robust starting point for web applications.

Key features:
- Type-safe development with TypeScript
- Component library based on Material UI
- Efficient data fetching and caching with React Query
- Automated testing with Playwright
- Modern build tooling with Vite

## Tech Stack
- React with TypeScript
- Material UI for UI components
- React Router for navigation
- React Query for data fetching and state management
- React Hook Form for form handling
- Playwright for testing
- Vite as build tool
- ESLint for linting code
- Prettier for consistent codestyle

## Project Structure
```
src/
├── api/              # API integration layer
│   ├── http.ts       # Base HTTP client
│   ├── posts.ts      # Posts-related API calls
│   ├── types.ts      # API types definitions
│   └── users.ts      # Users-related API calls
├── components/       # Reusable UI components
│   ├── common/       # Common components
│   └── layout/       # Layout components
├── features/         # Feature-specific functionalities
│   ├── posts/        # Posts feature
│   └── users/        # Users feature
└── index.tsx         # Application entry point
```

## Prerequisites
- Node.js >=20.0.0

## Installation and Setup
1. Clone the repository
2. Install dependencies:
   ```
   npm ci
   ```

## Running the Project
Development server:
```
npm start
```

Build for production:
```
npm run build
```

Preview production build:
```
npm run preview
```

Other useful commands:
- `npm run lint` - Lint the codebase
- `npm run typecheck` - Perform type checking on the codebase
- `npm run format` - Format the codestyle

## Architecture and Flow

The application follows a modern React SPA architecture. Key architectural decisions:
- Component-based architecture using React
- Centralized state management with React Query
- Type-safe API integration layer
- Feature-based code organization
- Shared components for consistency
- Material UI theming system

Data flow:
1. Components use custom React Query based hooks for data fetching
2. React Query manages data caching and state updates
3. API layer handles communication with backend services
4. HTTP client provides consistent error handling and request formatting

## End-to-end Testing

Run tests:
```
npm test           # Run e2e tests in headless mode
npm run test:ui    # Run e2e tests with UI
```

## Next Steps

- Code generation for API types and queries
- Schema-based form validation
- `i18n` support
- Storybook to showcase design system 
- Consider moving to type-safe router
