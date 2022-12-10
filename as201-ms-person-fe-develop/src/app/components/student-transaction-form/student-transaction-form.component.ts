import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { studentModel } from 'src/app/models/studentModel';
import { StudentService } from 'src/app/services/student.service';
import { personModel } from 'src/app/models/personModel';
import { PersonService } from 'src/app/services/person.service';
import { careerModel } from 'src/app/models/careerModel';
import { CareerService } from 'src/app/services/career.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-transaction-form',
  templateUrl: './student-transaction-form.component.html',
  styleUrls: ['./student-transaction-form.component.css']
})
export class StudentTransactionFormComponent implements OnInit {

  persons: personModel[] = [];
  careers: careerModel[] = [];

  public studentForm: FormGroup = new FormGroup({});
  edit: boolean = false;
  student: studentModel = new studentModel();

  constructor(
    public studentService: StudentService,
    public personService: PersonService,
    public careerService: CareerService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.listPersonByStatus();
    this.listCareerByStatus();
    console.log('Object Student: ' , this.studentService.studentSelected);
  }

  initForm(): void {
    this.studentForm = this.formBuilder.group(
      {
        id: [''],
        person_id:['', Validators.required] ,
        career_id:['', Validators.required] ,
        institutional_email:['', Validators.required] ,
        pay_method:['', Validators.required] ,
        admission_date:['', Validators.required] ,
        guardian_name:['', Validators.required] ,
        home_phone: ['', Validators.required] ,
        status:['']
      }
    );
    if (this.studentService.studentSelected) {
      this.studentForm.patchValue({
          id: this.studentService.studentSelected.id,
          person_id: this.studentService.studentSelected.person_id,
          career_id: this.studentService.studentSelected.career_id,
          institutional_email: this.studentService.studentSelected.institutional_email,
          pay_method: this.studentService.studentSelected.pay_method,
          admission_date: this.studentService.studentSelected.admission_date,
          guardian_name: this.studentService.studentSelected.guardian_name,
          home_phone: this.studentService.studentSelected.home_phone,
          status: this.studentService.studentSelected.status
      });
    }
  }

  save(){
    if (this.studentService.studentSelected){
      this.update();
    }else {
      this.register();
    }
  }

  register() {
    Swal.fire({
      title: '¿Deseas Guardar?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
      icon: 'info',
    }).then((result) => {
      if (result.isConfirmed) {
        this.btnCancel();
        this.student = { ...this.studentForm.value };
        this.studentService.create(this.student).subscribe(
          resp => {
            console.log(resp);
            this.edit = true;
          },
          error => {
            console.log(error);
          }
        );
      }
    })
  }

  update() {
    Swal.fire({
      title: '¿Deseas Actualizar?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
      icon: 'info',
    }).then((result) => {
      if (result.isConfirmed) {
        this.btnCancel();
        this.student = { ...this.studentForm.value };
        this.studentService.update(this.student).subscribe(
          resp => {
            console.log(resp);
            this.edit = true;
          },
          error => {
            console.log(error);
          }
        );
      }
    })
  }

  btnCancel(){
    this.router.navigate(['/persons']).then();
  }

  ngOnDestroy(): void {
    this.studentService.studentSelected = undefined;
  }

  listPersonByStatus(): void {
    this.personService.listByStatus(true).subscribe((rest: any) => {
      this.persons = rest;
      console.log(rest);
    },
      error => {
        console.log(error)
      }
    );
  }

  listCareerByStatus(): void {
    this.careerService.listByStatus(true).subscribe((rest: any) => {
      this.careers = rest;
      console.log(rest);
    },
      error => {
        console.log(error)
      }
    );
  }

}
