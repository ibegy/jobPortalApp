// src/app/company/company-dashboard/company-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.scss']
})
export class CompanyDashboardComponent implements OnInit {
  jobs: any[] = []; // Stores jobs created by the logged-in company

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.loadCompanyJobs();
  }

  private loadCompanyJobs() {
    this.authService.afAuth.authState.subscribe((user) => {
      if (user) {
        const companyUid = user.uid;

        this.firestore
          .collection('jobs', (ref) => ref.where('createdBy', '==', companyUid))
          .valueChanges({ idField: 'id' })
          .subscribe((jobs) => {
            this.jobs = jobs;
          });
      }
    });
  }
}
