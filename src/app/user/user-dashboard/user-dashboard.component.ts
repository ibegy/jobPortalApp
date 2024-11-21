import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  jobs: any[] = [];          // Stores all jobs from Firebase
  filteredJobs: any[] = [];   // Stores filtered jobs for display
  searchTerm: string = '';    // Search term input by the user

  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    // Retrieve all job postings from Firebase
    this.firestore.collection('jobs').valueChanges({ idField: 'id' }).subscribe(jobs => {
      this.jobs = jobs;
      this.filteredJobs = jobs;  // Initialize filteredJobs with all jobs initially
    });
  }

  // Filter jobs based on search term
  filterJobs() {
    const term = this.searchTerm.toLowerCase();
    this.filteredJobs = this.jobs.filter(job =>
      job.role.toLowerCase().includes(term) ||
      job.description.toLowerCase().includes(term) ||
      job.techStack.toLowerCase().includes(term)
    );
  }
}
