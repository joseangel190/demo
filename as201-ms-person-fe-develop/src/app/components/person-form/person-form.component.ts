import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { personModel } from 'src/app/models/personModel';
import { PersonService } from 'src/app/services/person.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit, OnDestroy {

  persons: personModel[] = [];

  public personForm: FormGroup = new FormGroup({});
  edit: boolean = false;
  person: personModel = new personModel();

  password: boolean = true;

  visible: boolean = true;
  change_type: boolean =true;

  constructor(
    public personService: PersonService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.editPassword();
    console.log('Object Person: ' , this.personService.personSelected);
  }

  initForm(): void {
    this.personForm = this.formBuilder.group(
      {
        id: [''],
        id_type:['', Validators.required] ,
        id_number:['', Validators.required] ,
        name:['', Validators.required] ,
        lastname:['', Validators.required] ,
        cellphone:['', Validators.required] ,
        email:['', Validators.required] ,
        level: [''],
        username:['', Validators.required] ,
        password:['', Validators.required] ,
        active:['']
      }
    );
    if (this.personService.personSelected) {
      this.personForm.patchValue({
          id: this.personService.personSelected.id,
          id_type: this.personService.personSelected.id_type,
          id_number: this.personService.personSelected.id_number,
          name: this.personService.personSelected.name,
          lastname: this.personService.personSelected.lastname,
          cellphone: this.personService.personSelected.cellphone,
          email: this.personService.personSelected.email,
          level: this.personService.personSelected.level,
          username: this.personService.personSelected.username,
          password: this.personService.personSelected.password,
          active: this.personService.personSelected.active
      });
    }
  }

  viewPassword(){
    this.visible = !this.visible;
    this.change_type = !this.change_type;
  }

  editPassword(){
    if (this.personService.personSelected){
      this.password = false;
    }else {
      this.password = true;
    }
  }

  listByStatus() {
    this.personService.listByStatus(true).subscribe((rest: any) => {
      this.persons = rest;
      console.log(rest);
    },
      error => {
        console.log(error)
      }
    );
  }

  save(){
    if (this.personService.personSelected){
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
        this.credentials();
        this.person = { ...this.personForm.value };
        this.personService.create(this.person).subscribe(
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
        this.listByStatus();
        this.person = { ...this.personForm.value };
        this.personService.update(this.person).subscribe(
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
    this.personService.personSelected = undefined;


  }

  credentials(){
    this.router.navigate(['/credentials']).then();
  }

}
