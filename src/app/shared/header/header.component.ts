import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { JobFormComponent } from '../../company/job-form/job-form.component';
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menuOpen: boolean = false;
  userType: 'user' | 'company' | null = null;
  overlayRef: OverlayRef | null = null;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private overlay: Overlay,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.authService.getUserType().subscribe((type) => {
      this.userType = type;
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
      this.closeMenu();
    });
  }
  openJobFormModal() {
    this.dialog.open(JobFormComponent, {
      width: '600px',
      disableClose: true, // Prevent closing the modal by clicking outside
    });
  }
}
