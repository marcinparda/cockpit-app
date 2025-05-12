# CockpitApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.11.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Environment Configuration

The application uses environment files for configuration. These files are located in the `src/environments/` directory:

```
src/environments/
├── environment.ts         # Development environment settings
└── environment.prod.ts    # Production environment settings
```

To configure environment-specific variables:

1. Open the relevant environment file
2. Modify the environment object with your settings:

```typescript
export const environment = {
  production: false,
  apiUrl: "http://localhost:3000/api", // Add your environment variables here
};
```

When building for production, the CLI will automatically use the production environment file:

```bash
ng build --configuration production
```

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
