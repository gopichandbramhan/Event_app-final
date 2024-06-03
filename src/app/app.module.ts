import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { MainComponent } from './components/main/main.component';
import { AuthComponent } from './components/auth/auth.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrganizedEventComponent } from './components/organized-event/organized-event.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { Header2Component } from './components/header2/header2.component';
import { Footer2Component } from './components/footer2/footer2.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { DateTimePickerModule } from "@syncfusion/ej2-angular-calendars";
import { UserComponent } from './components/user/user.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { ResultComponent } from './components/result/result.component';
import { UserEventComponent } from './components/user-event/user-event.component';
import { RegisterComponent } from './components/register/register.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { AuthResultComponent } from './components/auth-result/auth-result.component';
import { UserEventRegisterComponent } from './components/user-event-register/user-event-register.component';
import { ViewEventDetailsComponent } from './components/view-event-details/view-event-details.component';
import { DataTablesModule } from 'angular-datatables';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UserHistoryComponent } from './components/user-history/user-history.component';
import { ForgotpassComponent } from './components/forgotpass/forgotpass.component';
import { BannerImageComponent } from './components/banner-image/banner-image.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ContactUsViewComponent } from './components/contact-us-view/contact-us-view.component';

// import {APP_BASE_HREF} from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AboutusComponent,
    ContactusComponent,
    MainComponent,
    AuthComponent,
    DashboardComponent,
    OrganizedEventComponent,
    HeaderComponent,
    Header2Component,
    Footer2Component,
    FooterComponent,
    UserComponent,
    UserDashboardComponent,
    ResultComponent,
    UserEventComponent,
    RegisterComponent,
    AuthResultComponent,
    ViewEventDetailsComponent,
    UserEventRegisterComponent,
    PageNotFoundComponent,
    UserHistoryComponent,
    ForgotpassComponent,
    BannerImageComponent,
    ProfileComponent,
    ContactUsViewComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    DateTimePickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DataTablesModule 
  ],
  providers: [],
  // providers: [{provide: APP_BASE_HREF, useValue: '/eventapp/'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
