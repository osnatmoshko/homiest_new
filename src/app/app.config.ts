// src/app/app.config.ts
import 'zone.js';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),            // ניתוב
    provideHttpClient(withFetch())    // HttpClient מוכן ל-SSR
    
  ]
};
