// src/app/auth/login/login.component.ts
import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';

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
    }).catch(error => console.error("Login error:", error));
  }
}
