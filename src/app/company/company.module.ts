import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyDashboardComponent } from './company-dashboard/company-dashboard.component';
import { JobFormComponent } from './job-form/job-form.component';


@NgModule({
  declarations: [
    CompanyDashboardComponent,
    JobFormComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule
  ]
})
export class CompanyModule { }
