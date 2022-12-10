import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { personModel } from '../models/personModel';
import { environment } from 'src/environments/environment';
import {Credentials} from "../models/credentials";

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private url: string = environment.url_person;
  private clave: string = environment.credentials;

  personSelected: personModel | undefined;


  constructor(private http: HttpClient) { }

  listAll() {
    return this.http.get(this.url);
  }

  listById(id: number | undefined) {
    return this.http.get(this.url + '/id/' + id);
  }

  listByStatus(active: boolean) {
    return this.http.get(this.url + '/active/' + active);
  }

  create(person: personModel) {
    return this.http.post(this.url, person);
  }

  update(person: personModel) {
    return this.http.put(this.url, person);
  }

  delete(id: number | undefined) {
    return this.http.post(this.url + '/delete/'+ id,'');
  }

  restore(id: number | undefined) {
    return this.http.post(this.url + '/restore/'+ id,'');
  }

  createCredentials(data: Credentials){
    return this.http.post(this.clave, data);
  }

}
