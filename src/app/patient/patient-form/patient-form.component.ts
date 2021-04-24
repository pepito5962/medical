import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Patient } from 'src/app/models/patient.model';
import { PatientService } from 'src/app/services/patient.service';
import { Medecin } from 'src/app/models/medecin.model';
import { MedecinService } from 'src/app/services/medecin.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss'],
})
export class PatientFormComponent implements OnInit {
  patientForm: FormGroup = this.formBuilder.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    age: ['', Validators.required],
    medecinTraitant: ['', Validators.required],
    status: ['', Validators.required],
    ville: ['', Validators.required],
  });
  medecins: Medecin[] = [];
  medecinSubscription: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private medecinService: MedecinService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.medecinSubscription = this.medecinService.medecinsSubject.subscribe(
      (medecins: Medecin[]) => {
        this.medecins = medecins;
      }
    );
    this.medecinService.getMedecins();
  }

  initForm() {
    this.patientForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      age: ['', Validators.required],
      medecinTraitant: ['', Validators.required],
      status: ['', Validators.required],
      ville: ['', Validators.required],
    });
  }

  onSavePatient() {
    const nom = this.patientForm.get('nom')!.value;
    const prenom = this.patientForm.get('prenom')!.value;
    const age = this.patientForm.get('age')!.value;
    const medecinTraitant = this.patientForm.get('medecinTraitant')!.value;
    const status = this.patientForm.get('status')!.value;
    const ville = this.patientForm.get('ville')!.value;
    const newPatient = new Patient(
      nom,
      prenom,
      age,
      medecinTraitant,
      status,
      ville
    );
    this.patientService.createNewPatient(newPatient);
    this.router.navigate(['/patients']);
  }
}
