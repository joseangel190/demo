import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { personModel } from 'src/app/models/personModel';
import { careerModel } from 'src/app/models/careerModel';
import { studentModel } from 'src/app/models/studentModel';
import { PersonService } from 'src/app/services/person.service';
import { CareerService } from 'src/app/services/career.service';
import { StudentService } from 'src/app/services/student.service';
import { DialogPersonComponent } from 'src/app/components/dialog-person/dialog-person.component';
import { DialogCareerComponent } from 'src/app/components/dialog-career/dialog-career.component';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  filter_person = '';
  filter_student = '';

  dialogPersonModel: personModel | undefined;
  dialogCareerModel: careerModel | undefined;

  public personForm: FormGroup = new FormGroup({});

  persons: personModel[] = [];
  students: studentModel[] = [];

  dataSource = new MatTableDataSource<personModel>(this.persons);

  person_table_page!: number;
  student_table_page!: number;

  person_type_list: number | undefined;
  active_person_list: boolean = true;

  student_type_list: number | undefined;
  status_student_list: string = '';

  visible_table_type: number | undefined;
  visible_person_table: boolean = true;
  visible_student_table: boolean = true;

  constructor(
    private personService: PersonService,
    private careerService: CareerService,
    private studentService: StudentService,
    private router: Router,
    public dialogPerson: MatDialog,
    public dialogCareer: MatDialog
  ) { }

  ngOnInit(): void {
    this.visible_table_type = 3;

    this.person_type_list = 1;
    this.active_person_list = true;
    this.listPerson();

    this.student_type_list = 1;
    this.status_student_list = 'Estudiante';
    this.listStudent();
  }

  pdfPerson() : void {
    let DATA: any = document.getElementById('pdfPerson');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('Lista de Personas');
    });
  }

  pdfStudent() : void {
    let DATA: any = document.getElementById('pdfStudent');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('Lista de Estudiantes');
    });
  }

  openDialogPerson(person_id: number | undefined){
    console.log(person_id);
    this.personService.listById(person_id).pipe(finalize(() => this.dialogPerson.open(DialogPersonComponent, {
      data: {
        id: this.dialogPersonModel ? this.dialogPersonModel.id: undefined,
        id_type: this.dialogPersonModel ? this.dialogPersonModel.id_type: undefined,
        id_number: this.dialogPersonModel ? this.dialogPersonModel.id_number: undefined,
        name: this.dialogPersonModel ? this.dialogPersonModel.name: undefined,
        lastname: this.dialogPersonModel ? this.dialogPersonModel.lastname: undefined,
        cellphone: this.dialogPersonModel ? this.dialogPersonModel.cellphone: undefined,
        email: this.dialogPersonModel ? this.dialogPersonModel.email: undefined,
        level: this.dialogPersonModel ? this.dialogPersonModel.level: undefined,
        username: this.dialogPersonModel ? this.dialogPersonModel.username: undefined,
        password: this.dialogPersonModel ? this.dialogPersonModel.password: undefined,
        active: this.dialogPersonModel ? this.dialogPersonModel.active: undefined,
      },
    },)
    )).subscribe(rest => {
      this.dialogPersonModel = rest;
    });
    console.log('fin de openDialogPerson');
  }

  openDialogCareer(career_id: number | undefined){
    console.log(career_id);
    this.careerService.listById(career_id).pipe(finalize(() => this.dialogCareer.open(DialogCareerComponent, {
      data: {
        id: this.dialogCareerModel ? this.dialogCareerModel.id: undefined,
        name: this.dialogCareerModel ? this.dialogCareerModel.name: undefined,
        boss: this.dialogCareerModel ? this.dialogCareerModel.boss: undefined,
        area: this.dialogCareerModel ? this.dialogCareerModel.area: undefined,
        institute_id: this.dialogCareerModel ? this.dialogCareerModel.institute_id: undefined,
        pension: this.dialogCareerModel ? this.dialogCareerModel.pension: undefined,
        quantity_course: this.dialogCareerModel ? this.dialogCareerModel.quantity_course: undefined,
        quantity_semester: this.dialogCareerModel ? this.dialogCareerModel.quantity_semester: undefined,
        active: this.dialogCareerModel ? this.dialogCareerModel.active: undefined,
      },
    },)
    )).subscribe(rest => {
      this.dialogCareerModel = rest;
    });
    console.log('fin de openDialogCareer');
  }

  listPerson(): void {
    if(this.person_type_list == 1){
      this.active_person_list = true;
      this.listByStatus();
    }
    if(this.person_type_list == 2){
      this.active_person_list = false;
      this.listByStatus();
    }
    if(this.person_type_list == 3){
      this.listAll();
    }
  }

  listAll(): void {
    this.personService.listAll().subscribe((rest: any) => {
      this.persons = rest;
      console.log("person", rest);
    })
  }

  listByStatus(): void {
    this.personService.listByStatus(this.active_person_list).subscribe((rest: any) => {
      this.persons = rest;
      console.log(rest);
    },
      error => {
        console.log(error)
      }
    );
  }

  editPerson(person: personModel) {
    this.personService.personSelected = person;
    this.irFormPerson();
  }
  
  deletePerson(id: number | undefined) {
    Swal.fire({
      title: '¿Deseas Eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
      icon: 'error',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Eliminando...', '', 'success')
        this.personService.delete(id).subscribe(data => {
          console.log(data);
          this.listPerson();
        }
        );
      }
    })
  }

  restorePerson(id: number | undefined) {
    Swal.fire({
      title: '¿Deseas Restaurar?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Restaurando...', '', 'success')
        this.personService.restore(id).subscribe(data => {
          console.log(data);
          this.listPerson();
        }
        );
      }
    })
  }
  
  irFormPerson() {
    this.router.navigate(['/person-form']).then();
  }

  irFormStudent() {
    this.router.navigate(['/student-transaction-form']).then();
  }


  listStudent(): void {
    if(this.student_type_list == 1){
      this.status_student_list = 'Estudiante';
      this.listByStatusStudent();
    }
    if(this.student_type_list == 2){
      this.status_student_list = 'Egresado';
      this.listByStatusStudent();
    }
    if(this.student_type_list == 3){
      this.status_student_list = 'Retirado';
      this.listByStatusStudent();
    }
    if(this.student_type_list == 4){
      this.listAllStudent();
    }
  }

  listAllStudent(): void {
    this.studentService.listAll().subscribe((rest: any) => {
      this.students = rest;
      console.log("student", rest);
    })
  }

  listByStatusStudent(): void {
    this.studentService.listByStatus(this.status_student_list).subscribe((rest: any) => {
      this.students = rest;
      console.log(rest);
    },
      error => {
        console.log(error)
      }
    );
  }

  editStudent(student: studentModel) {
    this.studentService.studentSelected = student;
    this.irFormStudent();
  }

  deleteGraduatedStudent(id: number | undefined) {
    Swal.fire({
      title: '¿Deseas Cambiar a Egresado?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
      icon: 'error',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Cambiando a Egresado...', '', 'success')
        this.studentService.deleteGraduated(id).subscribe(data => {
          console.log(data);
          this.listStudent();
        }
        );
      }
    })
  }

  deleteRetiredStudent(id: number | undefined) {
    Swal.fire({
      title: '¿Deseas Cambiar a Retirado?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
      icon: 'error',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Cambiando a Retirado...', '', 'success')
        this.studentService.deleteRetired(id).subscribe(data => {
          console.log(data);
          this.listStudent();
        }
        );
      }
    })
  }

  restoreStudent(id: number | undefined) {
    Swal.fire({
      title: '¿Deseas Cambiar a Estudiante?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Cambiando a Estudiante...', '', 'success')
        this.studentService.restore(id).subscribe(data => {
          console.log(data);
          this.listStudent();
        }
        );
      }
    })
  }

  visibleTable() {
    if(this.visible_table_type == 1){
      this.visible_person_table = true;
      this.visible_student_table = false;
    }
    if(this.visible_table_type == 2){
      this.visible_person_table = false;
      this.visible_student_table = true;
    }
    if(this.visible_table_type == 3){
      this.visible_person_table = true;
      this.visible_student_table = true;
    }
  }
  
}
