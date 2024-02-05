import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  formRegister: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private authService: AuthService,  private router: Router) {}

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    console.log('Adios');
  }

  onSubmit(): void {
    if (this.formRegister.invalid) {
      return;
    }

    const { fullName, email, password } = this.formRegister.value;

    this.authService.register(fullName, email, password).subscribe((res: any) => {

      localStorage.setItem('userData', JSON.stringify(res));

      this.authService.setToken(res.token);

      if (this.authService.isLoggedIn()) {
        this.router.navigate(['/notes']);
      }

    });

  }
}
