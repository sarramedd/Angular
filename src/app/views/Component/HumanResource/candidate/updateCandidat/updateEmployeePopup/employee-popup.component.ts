
import { Civility } from './../../../../../../shared/models/contact';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  Validators,  FormGroup, FormBuilder, FormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { updateCandidatService } from '../updateCandidat.service';
import { Country, Employee, MaritalSituation, Title } from 'app/shared/models/Employee';
import { LanguageLevel } from 'app/shared/models/Language';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';


@Component({
  selector: 'app-ngx-table-popup',
  templateUrl: './employee-popup.component.html'
})
export class employeePopupComponent implements OnInit {
  employeeId : number
  updateEmployee: FormGroup;
  id:number;
  employee : Employee;
  Civility :string []= Object.values(Civility);
  countries: Country[];
  states: string[];
  MaritalSituation :string []= Object.values(MaritalSituation);
  title :string[]= Object.values(Title);
  LanguageLevel : string[] = Object.values(LanguageLevel);
  submitted = false;
  selectedFile: File;
  constructor(
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<employeePopupComponent>,
    private fb: FormBuilder,
    private update: updateCandidatService,  
    private http: HttpClient,
    private route:ActivatedRoute 
  ) { this.countries = this.update.getCountries();}





  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  ngOnInit() {
    const educationData = this.data.payload;
   // this.getemployee();
   
    this.updateEmployee = new UntypedFormGroup({
      firstName: new UntypedFormControl(this.data.payload.firstName, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15),
      ]),
      lastName: new UntypedFormControl(this.data.payload.lastName, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
      ]),
      birthDate: new UntypedFormControl(this.data.payload.birthDate, ),
      title: new UntypedFormControl(this.data.payload.title, ),
      address: new UntypedFormControl(this.data.payload.address),
      emailOne: new UntypedFormControl(this.data.payload.emailOne, ),
      phoneNumberOne: new UntypedFormControl(this.data.payload.phoneNumberOne, ),
      civility: new UntypedFormControl(this.data.payload.civility, []),
      maritalSituation: new UntypedFormControl(this.data.payload.maritalSituation, []),
      country: new UntypedFormControl(this.data.payload.country, []),
      city: new UntypedFormControl(this.data.payload.city, []),
      postCode: new UntypedFormControl(this.data.payload.postCode, ),
      emailTwo: new UntypedFormControl(this.data.payload.emailTwo, ),
      phoneNumberTwo: new UntypedFormControl(this.data.payload.phoneNumberTwo, ),
      id: new UntypedFormControl(this.data.technichalFile, [])
    })

  }

  submit() {
    this.dialogRef.close(this.updateEmployee.value)
   
  }

 
  ///// Form Submit///// 
  onSubmit() {
    // Get the values of each form
    const formData = this.updateEmployee.value;
    console.log('Submitting form...');
    //  if (this.myForm.valid) {
        console.log('Form is valid, submitting...');
        this.update.updateItem(this.id,this.employee).subscribe({
          next: (res) => {
            console.log('Item updated successfully', res);
           
            
            console.log('Form value', this.updateEmployee.value);
            this.submitted = true;
          },
          error: (e) => console.error('Error adding item', e)
        });
  }

  getemployee() {
    this.update.getItemById(this.id).subscribe((data: any) => {
      this.employee = data;

    });
  }

onCountryChange(countryShotName: string) {
  this.states = this.update.getStatesByCountry(countryShotName);
}

  maritalSituationMap = {
    [MaritalSituation.SINGLE]:'Célibatire',
    [MaritalSituation.MARRIED]:'Marrié',
   [MaritalSituation.DIVORCED]:'Divorvé',
   [MaritalSituation.WIDOWED] :'Veuf/Veuve',
   [MaritalSituation.COMPLICATED] :'Compliqué'
  };

  civilityMap = {
    [Civility.MRS]:'Mme',
    [Civility.MS]:'Mlle',
   [Civility.MR]:'Mr'
  };

  employeeTitleMap = {
    [Title.FRONT_END_DEVELOPER]: 'Développeur Front-End',
    [Title.BACK_END_DEVELOPER]: 'Développeur Back-End',
    [Title.FULLSTACK_DEVELOPER]: 'Développeur Full-Stack',
    [Title.CRM]: 'CRM',
    [Title.HUMAN_RESOURCE_MANAGER]: 'Responsable des Ressources Humaines',
    [Title.HUMAN_RESOURCE]: 'Ressources Humaines',
    [Title.PROJECT_MANAGER]: 'Chef de Projet',
    [Title.TECH_LEAD]: 'Chef de Projet',
    [Title.UI_UX_DESIGNER]: 'Concepteur UI/UX',
    [Title.QA_ENGINEER]: 'Ingénieur QA',
    [Title.DEVOPS_ENGINEER]: 'Ingénieur DevOps',
    [Title.WEB_DEVELOPER]: 'Développeur Web',
    [Title.OFFICE_MANAGER]: 'Responsable d Agence',
    [Title.ACCOUNTANT]: 'Comptable',
    [Title.SALES_REPRESENTATIVE]: 'Représentant Commercial',
    [Title.CUSTOMER_SUPPORT_SPECIALIST]: 'Spécialiste du Support Client',
    [Title.MARKETING_COORDINATOR]: 'Coordinateur Marketing'
    
  };

  LanguageLevelMap = {
    [LanguageLevel.BEGINNER_A1]: 'Niveau Débutant A1',
    [LanguageLevel.BEGINNER]: 'Niveau Débutant',
    [LanguageLevel.ELEMENTARY_A2]: 'Niveau Elémentaire A2',
    [LanguageLevel.BASIC]: 'Niveau de Base',
    [LanguageLevel.INTERMEDIATE_B1]: 'Niveau Intermédiaire B1',
    [LanguageLevel.INTERMEDIATE]: 'Niveau Intermédiaire',
    [LanguageLevel.UPPER_INTERMEDIATE_B2]: 'Niveau Intermédiaire Supérieur B2',
    [LanguageLevel.PROFESSIONAL]: 'Niveau Professionnel',
    [LanguageLevel.ADVANCED_C1]: 'Niveau Avancé C1',
    [LanguageLevel.FLUENT]: 'Courant',
    [LanguageLevel.PROFICIENT_C2]: 'Niveau Expert C2',
    [LanguageLevel.NATIVE_LANGUAGE]: 'Langue Maternelle',
    [LanguageLevel.BILINGUAL]: 'Bilingue'
  };

}