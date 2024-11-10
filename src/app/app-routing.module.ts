import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CompanyDashboardComponent } from './company/company-dashboard/company-dashboard.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { companyGuard } from './guards/company.guard';
import { userGuard } from './guards/user.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'company', component: CompanyDashboardComponent, canActivate: [companyGuard] },
  { path: 'user', component: UserDashboardComponent, canActivate: [userGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
