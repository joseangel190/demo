import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPerson'
})
export class FilterPersonPipe implements PipeTransform {

  /*transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }*/

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 2) return value;
    const resultPerson = [];
    for (const persons of value) {
      if (persons.id_type.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPerson.push(persons);
      };
      if (persons.id_number.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPerson.push(persons);
      };
      if (persons.name.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPerson.push(persons);
      };
      if (persons.lastname.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPerson.push(persons);
      };
      if (persons.cellphone.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPerson.push(persons);
      };
      if (persons.email.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPerson.push(persons);
      };
      if (persons.username.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPerson.push(persons);
      };
    };
    return resultPerson;
  }

}