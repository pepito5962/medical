import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Medecin } from 'src/app/models/medecin.model';
import { MedecinService } from 'src/app/services/medecin.service';

@Component({
  selector: 'app-medecin-form',
  templateUrl: './medecin-form.component.html',
  styleUrls: ['./medecin-form.component.scss'],
})
export class MedecinFormComponent implements OnInit {
  medecinForm: FormGroup = this.formBuilder.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    status: ['', Validators.required],
    ville: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private medecinService: MedecinService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.medecinForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      status: ['', Validators.required],
      ville: ['', Validators.required],
    });
  }

  onSaveMedecin() {
    const nom = this.medecinForm.get('nom')!.value;
    const prenom = this.medecinForm.get('prenom')!.value;
    const status = this.medecinForm.get('status')!.value;
    const ville = this.medecinForm.get('ville')!.value;
    const newMedecin = new Medecin(nom, prenom, status, ville);
    this.medecinService.createNewMedecin(newMedecin);
    this.router.navigate(['/medecins']);
  }
}
