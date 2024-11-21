import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoggedIn = false;

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    this.authService.afAuth.authState.subscribe((user) => {
      this.isLoggedIn = !!user;
    });
  }
}
