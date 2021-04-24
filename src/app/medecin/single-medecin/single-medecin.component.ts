import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Medecin } from 'src/app/models/medecin.model';
import { MedecinService } from 'src/app/services/medecin.service';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-single-medecin',
  templateUrl: './single-medecin.component.html',
  styleUrls: ['./single-medecin.component.scss'],
})
export class SingleMedecinComponent implements OnInit {
  medecin: Medecin = new Medecin('', '', '', '');
  medecinForm: FormGroup = this.formBuilder.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    status: ['', Validators.required],
    ville: ['', Validators.required],
  });

  constructor(
    private route: ActivatedRoute,
    private medecinService: MedecinService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.medecin = new Medecin('', '', '', '');
    const id = this.route.snapshot.params['id'];
    this.medecinService.getSingleMedecin(+id).then((medecin: Medecin) => {
      this.medecin = medecin;
    });
  }

  onBack() {
    this.router.navigate(['/medecins']);
  }

  onUpdateMedecin() {
    const nom = this.medecinForm.get('nom')!.value;
    const prenom = this.medecinForm.get('prenom')!.value;
    const status = this.medecinForm.get('status')!.value;
    const ville = this.medecinForm.get('ville')!.value;
    const updateMedecin = new Medecin(nom, prenom, status, ville);
    const id = this.router.url.split('/');
    this.medecinService.updateMedecin(parseInt(id[3]), updateMedecin);
    this.router.navigate(['/medecins']);
  }

  getColor() {
    if (this.medecin.status === 'actif') {
      return 'green';
    } else if (this.medecin.status === 'conge') {
      return 'red';
    }
    return 'blue';
  }
}
