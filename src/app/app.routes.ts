import { Routes } from '@angular/router';

import { LandingComponent } from './pages/landing/landing.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { dashboardRoutes } from './pages/dashboard/dashboard.routes';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { AuthGuard } from './auth.guard';

export const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: dashboardRoutes,
  },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' } // Catch-all for unknown routes
];
