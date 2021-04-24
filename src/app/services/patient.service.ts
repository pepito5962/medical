import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Subject } from 'rxjs';
import { Patient } from '../models/patient.model';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable()
export class PatientService {
  patients: Patient[] = [];
  patientsSubject = new Subject<Patient[]>();

  constructor() {}

  emitPatients() {
    this.patientsSubject.next(this.patients);
  }

  savePatients() {
    firebase.database().ref('/patients').set(this.patients);
  }

  getPatients() {
    firebase
      .database()
      .ref('/patients')
      .on('value', (data) => {
        this.patients = data.val() ? data.val() : [];
        this.emitPatients();
      });
  }

  getSinglePatient(id: number) {
    return new Promise<Patient>((resolve, reject) => {
      firebase
        .database()
        .ref('/patients/' + id)
        .once('value')
        .then(
          (data: DataSnapshot) => {
            resolve(data.val());
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  createNewPatient(newPatient: Patient) {
    this.patients.push(newPatient);
    this.savePatients();
    this.emitPatients();
  }

  updatePatient(id: number, updatePatients: Patient) {
    this.patients[id].nom = updatePatients.nom;
    this.patients[id].prenom = updatePatients.prenom;
    this.patients[id].age = updatePatients.age;
    this.patients[id].medecinTraitant = updatePatients.medecinTraitant;
    this.patients[id].status = updatePatients.status;
    this.patients[id].ville = updatePatients.ville;
    this.savePatients();
    this.emitPatients();
  }

  removePatient(patient: Patient) {
    const patientIndexToRemove = this.patients.findIndex((patientEl) => {
      if (patientEl === patient) {
        return true;
      } else {
        return false;
      }
    });
    this.patients.splice(patientIndexToRemove, 1);
    this.savePatients();
    this.emitPatients();
  }
}
