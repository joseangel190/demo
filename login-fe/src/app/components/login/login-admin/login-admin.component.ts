import { Component } from '@angular/core';
import {LoginService} from "../../../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {

  username: string = '';
  password: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
  }

  login(){
    this.loginService.loginAdmin(this.username,this.password)
      .subscribe( rest => {
        console.log('Acceptance: ', rest)
        this.adminIndex();
      }, res => {
        console.log('Rechargers : ', res)
      });
  }

  adminIndex(){
    this.router.navigate(['/admin']).then();
  }

}
