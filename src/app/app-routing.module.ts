import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CompanyDashboardComponent } from './company/company-dashboard/company-dashboard.component';
import { JobFormComponent } from './company/job-form/job-form.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { JobListComponent } from './user/job-list/job-list.component';
import { companyGuard } from './guards/company.guard';
import { userGuard } from './guards/user.guard';
import { CvComponent } from './user/cv/cv.component';
import {AboutComponent} from "./company/about/about.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'company', component: CompanyDashboardComponent, canActivate: [companyGuard] },
  { path: 'company/create-job', component: JobFormComponent, canActivate: [companyGuard] },
  { path: 'company/about', component: AboutComponent, canActivate: [companyGuard] },
  { path: 'user', component: UserDashboardComponent, canActivate: [userGuard] },
  { path: 'user/jobs', component: JobListComponent, canActivate: [userGuard] },
  { path: 'user/cv', component: CvComponent, canActivate: [userGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
