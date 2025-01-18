import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './shared/header/header.component';
import {OAuthService} from 'angular-oauth2-oidc';
import {authConfig} from '../shared/configs/auth.config';

@Component({
  selector: 'wea5-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  title = 'next-stop';

}

