import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonFormComponent } from './components/person-form/person-form.component';
import { PersonListComponent } from './components/person-list/person-list.component';
import { StudentTransactionFormComponent } from './components/student-transaction-form/student-transaction-form.component';
import { DialogPersonComponent } from './components/dialog-person/dialog-person.component';
import { DialogCareerComponent } from './components/dialog-career/dialog-career.component';
import {CredentialsComponent} from "./components/credentials/credentials.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'persons'
  },
  {
    path: 'persons',
    component: PersonListComponent
  },
  {
    path: 'person-form',
    component: PersonFormComponent
  },
  {
    path: 'student-transaction-form',
    component: StudentTransactionFormComponent
  },
  {
    path: 'dialog-person',
    component: DialogPersonComponent
  },
  {
    path: 'dialog-career',
    component: DialogCareerComponent
  },
  {
    path: 'credentials',
    component: CredentialsComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
