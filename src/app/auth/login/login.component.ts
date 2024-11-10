import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthenticationService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).then(() => {
      this.authService.getUserType().subscribe(userType => {
        if (userType === 'company') {
          this.router.navigate(['/company']);
        } else {
          this.router.navigate(['/user']);
        }
      });
    }).catch(error => {
      this.errorMessage = error.message;
    });
  }
  goToRegister() {
    this.router.navigate(['/register']);
  }
}
