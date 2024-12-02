import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../authentication.scss']
})
export class RegisterComponent implements OnInit {
  email: string = '';
  password: string = '';
  userType: 'user' | 'company' = 'user';
  errorMessage: string = '';

  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit() {
    this.authService.getUserType().subscribe((role) => {
      if (role === 'user') {
        this.router.navigate(['/user']);
      } else if (role === 'company') {
        this.router.navigate(['/company']);
      }
    });
  }

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
