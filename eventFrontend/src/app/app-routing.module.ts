import { RegisterUserComponent } from './authentication/registerUser/register-user/register-user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EventDetailsComponent } from './pages/event-details/event-details.component';
import { CreateEventComponent } from './pages/create-event/create-event.component';
import { EventRegistraionComponent } from './pages/event-registraion/event-registraion.component';

const routes: Routes = [
  {path:'', redirectTo: "login", pathMatch:'full'},
  {path:"login", component: LoginComponent},
  {path:"registeruser", component: RegisterUserComponent},
  {path:"dashboard", component: DashboardComponent},
  {path:"events/:id", component: EventDetailsComponent},
  {path:"create-event", component: CreateEventComponent},
  {path:"event-registration/:id", component: EventRegistraionComponent},
  {path: "**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
