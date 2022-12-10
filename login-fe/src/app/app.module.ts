import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginUserComponent } from './components/login/login-user/login-user.component';
import { UserComponent } from './components/index/user/user.component';
import { CollaboratorComponent } from './components/index/collaborator/collaborator.component';
import { AdminComponent } from './components/index/admin/admin.component';
import { LoginCollaboratorComponent } from './components/login/login-collaborator/login-collaborator.component';
import { LoginAdminComponent } from './components/login/login-admin/login-admin.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginUserComponent,
    UserComponent,
    CollaboratorComponent,
    AdminComponent,
    LoginCollaboratorComponent,
    LoginAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
