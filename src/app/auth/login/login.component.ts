import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../authentication.scss']
})
export class LoginComponent implements OnInit{
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading = true;
  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit() {
    this.authService.getUserType().subscribe((role) => {
      if (role === 'user') {
        this.router.navigate(['/user']);
      } else if (role === 'company') {
        this.router.navigate(['/company']);
      }
      this.isLoading = false;
    });
  }
  login() {
    this.authService.login(this.email, this.password).then(() => {
      this.authService.getUserType().subscribe(userType => {
        if (userType === 'company') {
          this.router.navigate(['/company']);
        } else if (userType === 'user') {
          console.log('here?')
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
