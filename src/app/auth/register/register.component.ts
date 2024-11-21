import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../authentication.scss']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  userType: 'user' | 'company' = 'user';
  errorMessage: string = '';

  constructor(private authService: AuthenticationService, private router: Router) {}

  register() {
    this.authService.register(this.email, this.password, this.userType)
      .then(() => this.router.navigate(['/login']))
      .catch(error => {
        this.errorMessage = error.message;
      });
  }

  backToLogin() {
    console.log('ovdje sam kliknbut')
    this.router.navigate(['/login']);
  }
}
