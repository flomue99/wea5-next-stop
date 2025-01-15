import {APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import Aura from '@primeng/themes/aura';
import {routes} from './app.routes';
import {providePrimeNG} from 'primeng/config';
import {provideHttpClient, withInterceptors, withInterceptorsFromDi} from '@angular/common/http';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {OAuthService, provideOAuthClient} from 'angular-oauth2-oidc';
import {authConfig} from '../shared/configs/auth.config';
import {authInterceptor} from '../shared/interceptors/AuthInterceptor';


function initializeOAuth(oauthService: OAuthService): () => Promise<void> {
  return () => {
    return new Promise((resolve) => {
      oauthService.configure(authConfig);
      oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
        resolve();
      });
    });
  };
}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}),
    provideHttpClient(
      withInterceptors([authInterceptor]),
      withInterceptorsFromDi()
    ),
    provideRouter(routes),
    provideOAuthClient(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          cssLayer: {
            name: 'primeng',
            order: 'tailwind-base, primeng, tailwind-utilities'
          }
        }
      },
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeOAuth,
      deps: [OAuthService],
      multi: true
    }
  ],
};
