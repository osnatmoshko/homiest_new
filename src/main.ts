// import 'zone.js';  // חובה ל-SSR עם HttpClient
// import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
// import { App } from './app/app';
// import { config } from './app/app.config.server';

// const bootstrap = (context: BootstrapContext) =>
//     bootstrapApplication(App, config, context);

// export default bootstrap;

// src/main.ts
import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';

bootstrapApplication(App, appConfig)
  .catch(err => console.error(err));
