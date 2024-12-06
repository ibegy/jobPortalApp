import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { JobListComponent } from './job-list/job-list.component';
import {FormsModule} from "@angular/forms";
import {CompanyModule} from "../company/company.module";
import { CvComponent } from './cv/cv.component';


@NgModule({
  declarations: [
    UserDashboardComponent,
    JobListComponent,
    CvComponent
  ],
  imports: [
    CompanyModule,
    CommonModule,
    UserRoutingModule,
    FormsModule,
    NgOptimizedImage
  ]
})
export class UserModule { }
