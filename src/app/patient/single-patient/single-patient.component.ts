import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from 'src/app/models/patient.model';
import { PatientService } from 'src/app/services/patient.service';
import 'rxjs/add/operator/filter';
import { MedecinService } from 'src/app/services/medecin.service';
import { Medecin } from 'src/app/models/medecin.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-single-patient',
  templateUrl: './single-patient.component.html',
  styleUrls: ['./single-patient.component.scss'],
})
export class SinglePatientComponent implements OnInit {
  patient: Patient = new Patient('', '', 0, 0, '', '');
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
    private route: ActivatedRoute,
    private patientService: PatientService,
    private medecinService: MedecinService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.patient = new Patient('', '', 0, 0, '', '');
    const id = this.route.snapshot.params['id'];
    this.patientService.getSinglePatient(+id).then((patient: Patient) => {
      this.patient = patient;
    });
    this.medecinSubscription = this.medecinService.medecinsSubject.subscribe(
      (medecins: Medecin[]) => {
        this.medecins = medecins;
      }
    );
    this.medecinService.getMedecins();
  }

  onBackPatient() {
    this.router.navigate(['/patients']);
  }

  onUpdatePatient() {
    const nom = this.patientForm.get('nom')!.value;
    const prenom = this.patientForm.get('prenom')!.value;
    const age = this.patientForm.get('age')!.value;
    const medecinTraitant = this.patientForm.get('medecinTraitant')!.value;
    const status = this.patientForm.get('status')!.value;
    const ville = this.patientForm.get('ville')!.value;
    const updatePatient = new Patient(
      nom,
      prenom,
      age,
      medecinTraitant,
      status,
      ville
    );
    const id = this.router.url.split('/');
    this.patientService.updatePatient(parseInt(id[3]), updatePatient);
    this.router.navigate(['/patients']);
  }

  getColor() {
    if (this.patient.status === 'traite') {
      return 'green';
    } else if (this.patient.status === 'traitement') {
      return 'red';
    }
    return 'blue';
  }
}
