# Cockpit Dashboard

**Status: ✅ Deployment Ready** - Main dashboard application for managing multiple services

A React-based dashboard application providing a central hub for accessing and managing various applications and services within the CockpitApp ecosystem.

## Tech Stack

- **React 19** - Latest React with modern hooks and concurrent features
- **React Query** - Server state management and data synchronization
- **React Router** - Client-side routing for single-page application
- **TypeScript** - Full type safety across components and hooks
- **Vite** - Fast development server and optimized production builds
- **Tailwind CSS** - Utility-first styling with custom design system

## Current Features

### Core Components
- 🏠 **App Layout** - Centralized layout with navigation and branding
- 🧭 **Top Navigation** - Responsive navigation bar with brand integration
- 👤 **User Management** - Authentication state and user information display
- 📱 **Apps Overview** - Central hub for accessing different applications

### Architecture Patterns
- **Custom Hooks** - `useUser` for authentication state management
- **Provider Pattern** - Centralized providers for React Query and routing
- **Shared Components** - Leverages `@cockpit-app/cockpit-ui` library
- **Type-safe API** - Integration with `@cockpit-app/api-types`

## Project Structure

```
apps/cockpit/src/
├── app/
│   ├── app.tsx              # Main application component
│   ├── providers.tsx        # React Query and other providers
│   ├── skeleton.tsx         # Loading state component
│   ├── apps/
│   │   └── apps.tsx         # Apps overview page
│   └── components/
│       └── TopNavBarRighContent.tsx  # Navigation user menu
├── main.tsx                 # Application entry point
└── styles.css               # Global styles and Tailwind imports
```

## Development

### Local Development
```bash
# Start cockpit app in development mode
nx serve cockpit

# Run tests  
nx test cockpit

# Lint code
nx lint cockpit

# Type check
nx typecheck cockpit
```

### Production Build
```bash
# Build for production
nx build cockpit

# Preview production build
nx preview cockpit
```

## Integration with Shared Libraries

- **UI Components** - Uses `@cockpit-app/cockpit-ui` for dashboard-specific components
- **Data Access** - Leverages `@cockpit-app/shared-react-data-access` for user management
- **API Types** - Type-safe integration via `@cockpit-app/api-types`
- **Common Utilities** - Shared authentication logic from `@cockpit-app/common-shared-data-access`

## Future Development

This dashboard serves as the central control panel for the CockpitApp ecosystem. Planned enhancements include:

- **Service Monitoring** - Real-time status of connected applications
- **User Analytics** - Usage metrics and application insights  
- **Admin Controls** - User and application management interfaces
- **Customizable Widgets** - Personalized dashboard components

---

*A modern React dashboard providing centralized access to the CockpitApp ecosystem.*