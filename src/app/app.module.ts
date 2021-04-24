import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { HeaderComponent } from './header/header.component';
import { MedecinComponent } from './medecin/medecin.component';
import { SingleMedecinComponent } from './medecin/single-medecin/single-medecin.component';
import { MedecinFormComponent } from './medecin/medecin-form/medecin-form.component';
import { PatientComponent } from './patient/patient.component';
import { SinglePatientComponent } from './patient/single-patient/single-patient.component';
import { PatientFormComponent } from './patient/patient-form/patient-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth.service';
import { MedecinService } from './services/medecin.service';
import { AuthGuardService } from './services/auth-guard.service';
import { PatientService } from './services/patient.service';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  {
    path: 'medecins',
    canActivate: [AuthGuardService],
    component: MedecinComponent,
  },
  {
    path: 'medecins/new',
    canActivate: [AuthGuardService],
    component: MedecinFormComponent,
  },
  {
    path: 'medecins/view/:id',
    canActivate: [AuthGuardService],
    component: SingleMedecinComponent,
  },
  {
    path: 'patients',
    canActivate: [AuthGuardService],
    component: PatientComponent,
  },
  {
    path: 'patients/new',
    canActivate: [AuthGuardService],
    component: PatientFormComponent,
  },
  {
    path: 'patients/view/:id',
    canActivate: [AuthGuardService],
    component: SinglePatientComponent,
  },
  { path: '', redirectTo: 'medecins', pathMatch: 'full' },
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HeaderComponent,
    MedecinComponent,
    SingleMedecinComponent,
    MedecinFormComponent,
    PatientComponent,
    SinglePatientComponent,
    PatientFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [AuthService, MedecinService, PatientService, AuthGuardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
