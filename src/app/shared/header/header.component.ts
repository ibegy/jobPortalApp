import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { JobFormComponent } from '../../company/job-form/job-form.component';

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
    private overlay: Overlay
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
    // Close any existing overlay
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }

    // Create an overlay
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'modal-backdrop',
      panelClass: 'modal-panel',
    });

    // Render the JobFormComponent inside the overlay
    const portal = new ComponentPortal(JobFormComponent);
    this.overlayRef.attach(portal);

    // Close modal when backdrop is clicked
    this.overlayRef.backdropClick().subscribe(() => this.overlayRef?.dispose());
  }
}
