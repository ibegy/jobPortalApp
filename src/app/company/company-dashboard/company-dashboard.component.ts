// src/app/company/company-dashboard/company-dashboard.component.ts
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthenticationService } from '../../services/authentication.service';
import {lastValueFrom} from "rxjs";

export interface Job {
  id: string; // Firestore document ID
  role: string;
  companyName: string;
  description: string;
  techStack: string;
  deadline: string;
  createdBy: string;
  applicantCount?: number;
}
@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.scss']
})
export class CompanyDashboardComponent implements OnInit {
  jobs: Job[] = []; // Strongly typed array of jobs
  loading = true; // Add a loading state for the dashboard

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthenticationService,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadCompanyJobs();
  }

  private loadCompanyJobs() {
    this.authService.afAuth.authState.subscribe((user) => {
      if (user) {
        const companyUid = user.uid;

        this.firestore
          .collection<Job>('jobs', (ref) => ref.where('createdBy', '==', companyUid))
          .snapshotChanges()
          .subscribe(async (jobSnapshots) => {
            const jobPromises = jobSnapshots.map(async (jobSnapshot) => {
              const jobData = jobSnapshot.payload.doc.data() as Job;
              const jobId = jobSnapshot.payload.doc.id;

              const applications = await lastValueFrom(
                this.firestore
                  .collection('applications', (ref) => ref.where('jobId', '==', jobId))
                  .get()
              );

              jobData.applicantCount = applications?.size || 0;
              return { ...jobData, id: jobId };
            });

            this.jobs = await Promise.all(jobPromises);
            this.loading = false;
            this.cdr.detectChanges();
          });
      }
    });
  }
}
