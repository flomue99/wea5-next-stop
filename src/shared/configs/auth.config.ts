import {AuthConfig} from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'http://localhost:8080/realms/NextStop',
  loginUrl: 'http://localhost:8080/realms/NextStop/protocol/openid-connect/auth',
  logoutUrl: 'http://localhost:8080/realms/NextStop/protocol/openid-connect/logout',
  tokenEndpoint: 'http://localhost:8080/realms/NextStop/protocol/openidconnect/token',
  sessionCheckIFrameUrl: 'http://localhost:8080/realms/NextStop/protocol/openid-connect/login-status-iframe.html',
  userinfoEndpoint: 'http://localhost:8080/realms/NextStop/protocol/openidconnect/userinfo',
  clientId: 'nextstop',
  redirectUri: window.location.origin + '',
  silentRefreshRedirectUri: window.location.origin + 'login',
  scope: 'profile email',
  silentRefreshTimeout: 5000, // For faster testing
  timeoutFactor: 0.25, // For faster testing
  sessionChecksEnabled: true,
  showDebugInformation: true, // Also requires enabling "Verbose" level indevtools
  clearHashAfterLogin: false, // https://github.com/manfredsteyer/angularoauth2-oidc/issues/457#issuecomment-431807040
};
