import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {AuthenticationService} from "../../services/authentication.service";
import { MatDialogRef } from "@angular/material/dialog";

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

  constructor(private firestore: AngularFirestore, private authService: AuthenticationService, public dialogRef: MatDialogRef<JobFormComponent>) {}
  closeDialog() {
    this.dialogRef.close();
  }
  async createJob() {
    try {
      const currentUser = await this.authService.afAuth.currentUser;

      if (currentUser) {
        const job = {
          companyName: this.companyName,
          role: this.role,
          coverImage: this.coverImage,
          description: this.description,
          techStack: this.techStack,
          deadline: this.deadline,
          createdBy: currentUser.uid
        };

        console.log(job)

        this.firestore
          .collection('jobs')
          .add(job)
          .then(() => {
            console.log('Job created successfully');
          })
          .catch((error) => {
            console.error('Error creating job:', error);
          });

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
