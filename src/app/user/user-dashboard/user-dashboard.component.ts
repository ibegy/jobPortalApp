import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  jobs: any[] = [];
  filteredJobs: any[] = [];
  searchTerm: string = '';
  currentUserUid: string = '';

  constructor(private firestore: AngularFirestore, private authService: AuthenticationService) {}

  async ngOnInit() {
    const currentUser = await this.authService.afAuth.currentUser;

    if (currentUser) {
      this.currentUserUid = currentUser.uid;

      this.firestore.collection('jobs').valueChanges({ idField: 'id' }).subscribe(jobs => {
        this.jobs = jobs;
        this.filteredJobs = jobs;

        this.checkUserApplications();
      });
    }
  }
  searchJobs() {
    const term = this.searchTerm.toLowerCase();
    this.filteredJobs = this.jobs.filter(job =>
      job.role.toLowerCase().includes(term) ||
      job.description.toLowerCase().includes(term) ||
      job.techStack.toLowerCase().includes(term)
    );
  }

  private checkUserApplications() {
    this.jobs.forEach(job => {
      this.firestore
        .collection('applications', ref =>
          ref.where('jobId', '==', job.id).where('userId', '==', this.currentUserUid)
        )
        .get()
        .subscribe(applications => {
          job.hasApplied = !applications.empty; // Mark as applied if there are matching documents
        });
    });
  }

  async applyToJob(jobId: string) {
    try {
      if (!this.currentUserUid) {
        alert('User is not logged in.');
        return;
      }

      const application = {
        jobId: jobId,
        userId: this.currentUserUid,
        appliedAt: new Date()
      };

      await this.firestore.collection('applications').add(application);
      alert('Application submitted successfully!');

      const job = this.jobs.find(j => j.id === jobId);
      if (job) {
        job.hasApplied = true;
      }
    } catch (error) {
      console.error('Error applying to job:', error);
    }
  }
}
