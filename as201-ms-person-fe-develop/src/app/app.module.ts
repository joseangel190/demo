import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from "ngx-pagination";
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { PersonListComponent } from './components/person-list/person-list.component';
import { PersonFormComponent } from './components/person-form/person-form.component';
import { DialogPersonComponent } from './components/dialog-person/dialog-person.component';
import { DialogCareerComponent } from './components/dialog-career/dialog-career.component';
import { StudentTransactionFormComponent } from './components/student-transaction-form/student-transaction-form.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTableExporterModule } from 'mat-table-exporter';
import { FilterPersonPipe } from './pipes/filter-person.pipe';
import { FilterStudentPipe } from './pipes/filter-student.pipe';
import { CredentialsComponent } from './components/credentials/credentials.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonListComponent,
    PersonFormComponent,
    StudentTransactionFormComponent,
    DialogPersonComponent,
    DialogCareerComponent,
    FilterPersonPipe,
    FilterStudentPipe,
    CredentialsComponent
  ],
  exports: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    MatDialogModule,
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatTableExporterModule
  ],
  entryComponents: [
    DialogPersonComponent,
    DialogCareerComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
