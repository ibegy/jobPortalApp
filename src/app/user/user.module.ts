import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { JobListComponent } from './job-list/job-list.component';


@NgModule({
  declarations: [
    UserDashboardComponent,
    JobListComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
