// src/app/company/job-form/job-form.component.ts
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss']
})
export class JobFormComponent {
  companyName = '';
  role = '';
  coverImage = '';
  description = '';
  techStack = '';
  deadline = '';

  constructor(private firestore: AngularFirestore, private authService: AuthenticationService) {}

  async createJob() {
    try {
      // Wait for the current user to be fetched
      const currentUser = await this.authService.afAuth.currentUser;

      // Ensure currentUser exists before accessing uid
      if (currentUser) {
        const job = {
          companyName: this.companyName,
          role: this.role,
          coverImage: this.coverImage,
          description: this.description,
          techStack: this.techStack,
          deadline: this.deadline,
          createdBy: currentUser.uid // Use the uid from currentUser
        };

        // Save the job to Firestore
        await this.firestore.collection('jobs').add(job);
        alert('Job created successfully!');
        this.resetForm();
      } else {
        alert('User is not logged in.');
      }
    } catch (error) {
      console.error("Error creating job:", error);
    }
  }

  resetForm() {
    this.companyName = '';
    this.role = '';
    this.coverImage = '';
    this.description = '';
    this.techStack = '';
    this.deadline = '';
  }
}
