import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyDashboardComponent } from './company-dashboard/company-dashboard.component';
import { JobFormComponent } from './job-form/job-form.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CompanyDashboardComponent,
    JobFormComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    FormsModule
  ]
})
export class CompanyModule { }
