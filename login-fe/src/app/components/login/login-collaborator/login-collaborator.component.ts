import { Component } from '@angular/core';
import {LoginService} from "../../../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-collaborator',
  templateUrl: './login-collaborator.component.html',
  styleUrls: ['./login-collaborator.component.css']
})
export class LoginCollaboratorComponent {

  username: string = '';
  password: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
  }

  login(){
    this.loginService.loginCollaborator(this.username,this.password)
      .subscribe( rest => {
        console.log('Acceptance: ', rest)
        this.collaboratorIndex();
      }, res => {
        console.log('Recharger: ', res)
      });
  }

  collaboratorIndex(){
    this.router.navigate(['/collaborator']).then();
  }

}
