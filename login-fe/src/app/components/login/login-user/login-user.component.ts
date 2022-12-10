import { Component } from '@angular/core';
import {LoginService} from "../../../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent {

  username: string = '';
  password: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
  }

  login(){
    this.loginService.loginUser(this.username,this.password)
      .subscribe( rest => {
        console.log('Acceptance: ', rest)
        this.userIndex();
      }, res => {
        console.log('Recharger: ', res)
    });
  }

  userIndex(){
    this.router.navigate(['/user']).then();
  }

}
