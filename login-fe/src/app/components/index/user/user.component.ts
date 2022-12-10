import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../../services/login.service";
import {personModel} from "../../../model/PersonModel";
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  id: number = 1;


  personModels: personModel[] = [];

  constructor(
    private loginService: LoginService
  ) {
  }


  ngOnInit(): void {
  }

  findById(){
    this.loginService.findById(this.id)
      .subscribe((res:any) => {
          this.personModels = res;
          console.log('Respuesta: ', res);
      })
  }

}
