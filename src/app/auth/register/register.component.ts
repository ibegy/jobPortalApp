import { Router } from '@angular/router';
import {AuthenticationService} from "../../services/authentication.service";
import {Component} from "@angular/core";

export type userType = 'user' | 'company';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  email = '';
  password = '';
  user:userType = 'user';

  constructor(private authService: AuthenticationService, private router: Router) {}

  register() {
    this.authService.register(this.email, this.password, this.user)
      .then(() => this.router.navigate(['/login']))
      .catch((error: any) => console.error("Registration error:", error));
  }
}
