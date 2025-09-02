# CV Portfolio App

**Status: In Development** - Personal portfolio and CV application

A React-based digital CV and portfolio application with authentication-gated access, designed to showcase professional experience and skills in an interactive web format. If unauthenticated, users are redirected to a PDF version of the CV.

## Tech Stack

- **React 19** - Modern React with hooks and concurrent features
- **TypeScript** - Full type safety for reliable code
- **Vite** - Fast development and optimized production builds
- **Tailwind CSS** - Utility-first styling approach

## Current Features

### Core Functionality

- 🔐 **Authentication Gate** - Secure access to CV content
- 📄 **Digital CV** - Interactive web-based curriculum vitae
- 🚀 **Fallback Redirect** - Automatic PDF CV fallback for unauthenticated users
- 📱 **Responsive Design** - Optimized for various screen sizes

### Architecture Patterns

- **Authentication Flow** - Uses `useUser` hook for secure access control
- **Error Handling** - Graceful fallback to external PDF CV
- **Component Structure** - Clean separation with dedicated CV component
- **Shared Libraries** - Integration with authentication system

## Project Structure

```
apps/cv/src/
├── app/
│   ├── app.tsx              # Main app with authentication logic
│   └── skeleton.tsx         # Loading state component
├── components/
│   └── cv/
│       └── cv.tsx           # Main CV component
├── main.tsx                 # Application entry point
└── styles.css               # Global styles
```

## Access Control Logic

The application implements a sophisticated access control system:

1. **Authenticated Users** - Full access to interactive CV content
2. **Unauthenticated Users** - Automatic redirect to PDF version at `parda.me/cv.pdf`
3. **Error States** - Graceful handling with PDF fallback

## Development

### Local Development

```bash
# Start CV app in development mode
nx serve cv

# Run tests
nx test cv

# Lint code
nx lint cv

# Type check
nx typecheck cv
```

### Production Build

```bash
# Build for production
nx build cv

# Preview production build
nx preview cv
```

## Integration with Shared Libraries

- **Authentication** - Uses `@cockpit-app/shared-react-data-access` for user management
- **API Types** - Type-safe integration via `@cockpit-app/api-types`
- **UI Components** - Leverages shared React components where applicable

## Future Development

Planned enhancements for the CV application:

- **Interactive Sections** - Expandable experience and project details
- **Skills Visualization** - Dynamic charts and progress indicators
- **Contact Integration** - Direct messaging and networking features
- **Multi-language Support** - Internationalized CV content
- **Export Options** - PDF generation from web content

---

_A professional portfolio application demonstrating secure content access and modern React development patterns._
