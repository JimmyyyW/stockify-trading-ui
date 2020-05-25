import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StockListComponent } from './stocks/stock-list/stock-list.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guard/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { ReportComponent } from './report/report.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'stocks', component: StockListComponent, canActivate: [AuthGuard] },
  { path: 'reports', component: ReportComponent, canActivate: [AuthGuard] },
  { path: 'payment-details', component: PaymentDetailsComponent, canActivate: [AuthGuard] },
  { path: 'home/:id', component: HomeComponent },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
