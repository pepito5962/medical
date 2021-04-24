import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Patient } from '../models/patient.model';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
})
export class PatientComponent implements OnInit, OnDestroy {
  patients: Patient[] = [];
  patientSubscription: Subscription = new Subscription();

  constructor(private patientService: PatientService, private router: Router) {}

  ngOnInit(): void {
    this.patientSubscription = this.patientService.patientsSubject.subscribe(
      (patients: Patient[]) => {
        this.patients = patients;
      }
    );
    this.patientService.getPatients();
    this.patientService.emitPatients();
  }

  onNewPatient() {
    this.router.navigate(['/patients', 'new']);
  }

  onDeletePatient(patient: Patient) {
    this.patientService.removePatient(patient);
  }

  onViewPatient(id: number) {
    this.router.navigate(['/patients', 'view', id]);
  }

  ngOnDestroy() {
    this.patientSubscription.unsubscribe();
  }

  getColor(id: number) {
    if (this.patients[id].status === 'traite') {
      return 'green';
    } else if (this.patients[id].status === 'traitement') {
      return 'red';
    }
    return 'blue';
  }
}
