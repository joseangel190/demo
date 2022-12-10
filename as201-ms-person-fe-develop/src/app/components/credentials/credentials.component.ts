import { Component, OnInit } from '@angular/core';
import {PersonService} from "../../services/person.service";
import {Router, RouterModule} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Credentials} from "../../models/credentials";

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.css']
})
export class CredentialsComponent implements OnInit {

  credentials: Credentials[] = [];

  public credentialsForm: FormGroup = new FormGroup({});

  constructor(
    private credentialsService: PersonService,
    private router: Router,
    private formBuilde: FormBuilder
    ) { }

  ngOnInit(): void {
    this.initFrom();
  }

  initFrom(){
    this.credentialsForm = this.formBuilde.group({
      id: [''],
      sname: [''],
      password: [''],
      srole: ['']
    });
  }

create(){
    const credentials: Credentials = {...this.credentialsForm.value};
    this.credentialsService.createCredentials(credentials)
      .subscribe(
        res =>{
          this.credentialsForm.reset();
          this.btnCancel()
        }
      )
}

  btnCancel(){
    this.router.navigate(['/persons']).then();
  }

}
