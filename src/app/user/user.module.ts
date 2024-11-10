import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { JobListComponent } from './job-list/job-list.component';
import {FormsModule} from "@angular/forms";
import {CompanyModule} from "../company/company.module";


@NgModule({
  declarations: [
    UserDashboardComponent,
    JobListComponent
  ],
  imports: [
    CompanyModule,
    CommonModule,
    UserRoutingModule,
    FormsModule
  ]
})
export class UserModule { }
