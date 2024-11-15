// src/app/user/job-list/job-list.component.ts
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {
  jobs: any[] = [];
  filteredJobs: any[] = [];
  searchTerm: string = '';

  constructor(private firestore: AngularFirestore, private authService: AuthenticationService) {}

  ngOnInit() {
    this.firestore.collection('jobs').valueChanges({ idField: 'id' }).subscribe(jobs => {
      this.jobs = jobs;
      this.filteredJobs = jobs;  // Start with all jobs
    });
  }

  searchJobs() {
    const term = this.searchTerm.toLowerCase();
    this.filteredJobs = this.jobs.filter(job =>
      job.role.toLowerCase().includes(term) ||
      job.description.toLowerCase().includes(term) ||
      job.techStack.toLowerCase().includes(term)
    );
  }

  async applyToJob(jobId: string) {
    try {
      // Wait for the current user to be fetched
      const currentUser = await this.authService.afAuth.currentUser;

      // Ensure currentUser exists before accessing uid
      if (currentUser) {
        const application = {
          jobId: jobId,
          userId: currentUser.uid, // Use the uid from currentUser
          appliedAt: new Date()
        };

        // Save the application to Firestore
        await this.firestore.collection('applications').add(application);
        alert('Application submitted successfully!');
      } else {
        alert('User is not logged in.');
      }
    } catch (error) {
      console.error("Error applying to job:", error);
    }
  }
}
