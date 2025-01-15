import { Injectable } from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private oauthService: OAuthService) {}

  login(): boolean {
    this.oauthService.initCodeFlow();
    return true;
  }

  logout(): boolean {
    this.oauthService.logOut();
    return true;
  }

  isLoggedIn(): boolean {
    return (
      this.oauthService.hasValidAccessToken() &&
      this.oauthService.hasValidIdToken()
    );
  }

  getAccessToken(): string {
    return this.oauthService.getAccessToken();
  }

  getCurrentLoggedInUserEmail(): string{
    return this.oauthService.getIdentityClaims()['email']
  }
}
