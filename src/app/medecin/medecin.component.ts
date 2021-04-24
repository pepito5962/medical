import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Medecin } from '../models/medecin.model';
import { MedecinService } from '../services/medecin.service';

@Component({
  selector: 'app-medecin',
  templateUrl: './medecin.component.html',
  styleUrls: ['./medecin.component.scss'],
})
export class MedecinComponent implements OnInit, OnDestroy {
  medecins: Medecin[] = [];
  medecinSubscription: Subscription = new Subscription();

  constructor(private medecinService: MedecinService, private router: Router) {}

  ngOnInit(): void {
    this.medecinSubscription = this.medecinService.medecinsSubject.subscribe(
      (medecins: Medecin[]) => {
        this.medecins = medecins;
      }
    );
    this.medecinService.getMedecins();
    this.medecinService.emitMedecins();
  }

  onNewMedecin() {
    this.router.navigate(['/medecins', 'new']);
  }

  onDeleteMedecin(medecin: Medecin) {
    this.medecinService.removeMedecin(medecin);
  }

  onViewMedecin(id: number) {
    this.router.navigate(['/medecins', 'view', id]);
  }

  ngOnDestroy() {
    this.medecinSubscription.unsubscribe();
  }

  getColor(id: number) {
    if (this.medecins[id].status === 'actif') {
      return 'green';
    } else if (this.medecins[id].status === 'conge') {
      return 'red';
    }
    return 'blue';
  }
}
