import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { handleToast } from 'src/app/shared/toast/toast.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup = new FormGroup({});
  handleToastLogin: handleToast = {
    message: '',
    type: 'success',
  };

  showToast: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService,  private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }


  ngOnDestroy(): void {
    console.log('Adios');
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
// Acá poner mensajes de error try catch
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe((res: any) => {

      localStorage.setItem('userData', JSON.stringify(res));

      this.authService.setToken(res.token);

      this.handleToastLogin = {
        message: 'Login success',
        type: 'success',
      };

      setTimeout(() => {
        if (this.authService.isLoggedIn()) {
          this.router.navigate(['/notes']);
        }
      }, 500);

    },
    (error) => {
      console.log(error.error.message);
      this.handleToastLogin = {
        message: error.error.message,
        type: 'error',
      };
    
  });
  }
}
// Acá poner mensajes de error try catch
