import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthComponent } from './components/auth/auth.component';
import { OrganizedEventComponent } from './components/organized-event/organized-event.component';
import { authGuard } from './guard/auth.guard';
import { UserComponent } from './components/user/user.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { ResultComponent } from './components/result/result.component';
import { UserEventComponent } from './components/user-event/user-event.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthResultComponent } from './components/auth-result/auth-result.component';
import { ViewEventDetailsComponent } from './components/view-event-details/view-event-details.component';
import { UserEventRegisterComponent } from './components/user-event-register/user-event-register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UserHistoryComponent } from './components/user-history/user-history.component';
import { userguardGuard } from './guard/userguard.guard';
import { ForgotpassComponent } from './components/forgotpass/forgotpass.component';
import { BannerImageComponent } from './components/banner-image/banner-image.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ContactUsViewComponent } from './components/contact-us-view/contact-us-view.component';

const routes: Routes = [
    {path:"", redirectTo:"", pathMatch:"full"},
    {
        path:"",
        component:MainComponent,
        children:[
            {path:"", redirectTo:"", pathMatch:"full"},
            {path:"",component:HomeComponent},
            {path:"login",component:LoginComponent},
            {path:"aboutus",component:AboutusComponent},
            {path:"contactus",component:ContactusComponent},
            {path:"register",component:RegisterComponent},
            {path:"view-event/:event-name/:id", component:ViewEventDetailsComponent},
            {path:"forgotpass", component:ForgotpassComponent}
        ],
    },
    {
        path:"auth",
        component:AuthComponent,canActivate:[authGuard],
        children:[
            {path:"dashboard",component:DashboardComponent},
            {path:"organizedEvent",component:OrganizedEventComponent},
            {path:"auth-result",component:AuthResultComponent},
            {path:"user-register",component:UserEventRegisterComponent},
            {path:"images",component:BannerImageComponent},
            {path:"profile",component:ProfileComponent},
            {path:"contact",component:ContactUsViewComponent}
        ]
    },
    {
        path:"user",
        component:UserComponent,canActivate:[userguardGuard],
        children:[
            {path:"user-dashboard",component:UserDashboardComponent},
            {path:"user-result",component:ResultComponent},
            {path:"user-history",component:UserHistoryComponent},
            {path:"user-event",component:UserEventComponent},
            {path:"view-event/:event-name/:id", component:ViewEventDetailsComponent},
            {path:"profile",component:ProfileComponent}
        ]
    },
    {path:"**",component:PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
