import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Subject } from 'rxjs';
import { Medecin } from '../models/medecin.model';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable()
export class MedecinService {
  medecins: Medecin[] = [];
  medecinsSubject = new Subject<Medecin[]>();

  constructor() {}

  emitMedecins() {
    this.medecinsSubject.next(this.medecins);
  }

  saveMedecins() {
    console.log(this.medecins);
    firebase.database().ref('/medecins').set(this.medecins);
  }

  getMedecins() {
    firebase
      .database()
      .ref('/medecins')
      .on('value', (data) => {
        this.medecins = data.val() ? data.val() : [];
        this.emitMedecins();
      });
  }

  getSingleMedecin(id: number) {
    return new Promise<Medecin>((resolve, reject) => {
      firebase
        .database()
        .ref('/medecins/' + id)
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

  createNewMedecin(newMedecin: Medecin) {
    this.medecins.push(newMedecin);
    this.saveMedecins();
    this.emitMedecins();
  }

  updateMedecin(id: number, updateMedecin: Medecin) {
    this.medecins[id].nom = updateMedecin.nom;
    this.medecins[id].prenom = updateMedecin.prenom;
    this.medecins[id].status = updateMedecin.status;
    this.medecins[id].ville = updateMedecin.ville;
    this.saveMedecins();
    this.emitMedecins();
  }

  removeMedecin(medecin: Medecin) {
    const medecinIndexToRemove = this.medecins.findIndex((medecinEl) => {
      if (medecinEl === medecin) {
        return true;
      } else {
        return false;
      }
    });
    this.medecins.splice(medecinIndexToRemove, 1);
    this.saveMedecins();
    this.emitMedecins();
  }
}
