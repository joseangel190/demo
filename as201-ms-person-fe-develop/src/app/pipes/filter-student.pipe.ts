import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterStudent'
})
export class FilterStudentPipe implements PipeTransform {

  /*transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }*/

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 2) return value;
    const resultStudent = [];
    for (const students of value) {
      if (students.institutional_email.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultStudent.push(students);
      };
      if (students.pay_method.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultStudent.push(students);
      };
      if (students.admission_date.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultStudent.push(students);
      };
      if (students.guardian_name.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultStudent.push(students);
      };
      if (students.home_phone.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultStudent.push(students);
      };
    };
    return resultStudent;
  }

}