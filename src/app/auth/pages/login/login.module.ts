import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';

/** 
* DBR - Modulos
* */
import { AngularMaterialModule } from "src/app/shared/libraries/angular-material.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ],
  declarations: [LoginPage]
})

export class LoginPageModule { }