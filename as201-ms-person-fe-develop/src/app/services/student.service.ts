import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { studentModel } from '../models/studentModel';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private url: string = environment.url_student;

  studentSelected: studentModel | undefined;
  
  constructor(private http: HttpClient) { }

  listAll() {
    return this.http.get(this.url);
  }

  listById(id: number) {
    return this.http.get(this.url + '/id/' + id);
  }

  listByStatus(status: string) {
    return this.http.get(this.url + '/status/' + status);
  }
  
  create(student: studentModel) {
    return this.http.post(this.url, student);
  } 

  update(student: studentModel) {
    return this.http.put(this.url, student);
  }

  deleteGraduated(id: number | undefined) {
    return this.http.post(this.url + '/graduated/'+ id,'');
  }

  deleteRetired(id: number | undefined) {
    return this.http.post(this.url + '/retired/'+ id,'');
  }

  restore(id: number | undefined) {
    return this.http.post(this.url + '/restore/'+ id,'');
  }
  
}