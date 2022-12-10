import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  username: string | undefined;
  password: string | undefined;

  private url : string = 'http://localhost:8080';
  private urldata: string = 'http://localhost:8085/v2/person';

  constructor(
    private http: HttpClient
  ) { }

  // LOGINS

  loginUser(username: string, password: string){
      return this.http.get(this.url + '/login/user',
        { headers: { authorization: this.createBasicAuthToken(username, password) } }).pipe(map((res) => {
        this.username = username;
        this.password = password;
      }));
  }

  loginCollaborator(username: string, password: string){
    return this.http.get(this.url + '/login/collaborator',
      { headers: { authorization: this.createBasicAuthToken(username, password) } }).pipe(map((res) => {
      this.username = username;
      this.password = password;
    }));
  }

  loginAdmin(username: string, password: string){
    return this.http.get(this.url + '/login/admin',
      { headers: { authorization: this.createBasicAuthToken(username, password) } }).pipe(map((res) => {
      this.username = username;
      this.password = password;
    }));
  }

  createBasicAuthToken(username: string, password: string) {
    return 'Basic ' + window.btoa(username + ":" + password);
  }

  findById(id: number | undefined){
    return this.http.get(this.urldata + '/id/' + id);
  }


}
