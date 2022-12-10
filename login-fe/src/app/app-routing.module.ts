import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginUserComponent} from "./components/login/login-user/login-user.component";
import {UserComponent} from "./components/index/user/user.component";
import {LoginCollaboratorComponent} from "./components/login/login-collaborator/login-collaborator.component";
import {LoginAdminComponent} from "./components/login/login-admin/login-admin.component";
import {CollaboratorComponent} from "./components/index/collaborator/collaborator.component";
import {AdminComponent} from "./components/index/admin/admin.component";

const routes: Routes = [

  // LOGINS

  {
    path: 'login-user',
    component: LoginUserComponent
  },
  {
    path: 'login-collaborator',
    component: LoginCollaboratorComponent
  },
  {
    path: 'login-admin',
    component: LoginAdminComponent
  },

  // INDEXS

  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'collaborator',
    component: CollaboratorComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
