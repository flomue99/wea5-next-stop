import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../shared/services/auth/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Button} from 'primeng/button';

@Component({
  selector: 'wea5-login',
  standalone: true,
  imports: [
    Button
  ],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent implements OnInit {

  private returnTo: string = '';

  constructor(private auth: AuthenticationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => this.returnTo = params['returnUrl'])
  }

  submitLogin() {
    if (this.auth.login()) {
      this.router.navigateByUrl(this.returnTo);
    } else {
    }
  }
}
