import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ToastComponent } from '../shared/toast/toast.component';


@NgModule({
  declarations: [LoginComponent, RegisterComponent,ToastComponent ],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, RouterModule],
  exports: [LoginComponent, RegisterComponent],
})
export class AuthModule { }
