import { Injectable } from '@angular/core';
import { DbService } from '../services/db.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _userData: any = {};
  private _userDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});
  userData$: Observable<any> = this._userDataSubject.asObservable();

  constructor(private dbService: DbService) { }

  get userData(): any {
    return this._userDataSubject.getValue();
  }

  set userData(value: any) {
    this._userDataSubject.next(value);
  }

  login(email: string, password: string) {
    return this.dbService.postQuery('auth/login', { email, password });
  }

  register(fullName: string, email: string, password: string) {
    return this.dbService.postQuery('auth/register', {
      fullName,
      email,
      password,
    });
  }

  logout() {
    const token = this.getToken();
    return this.dbService.postQuery('auth/logout', {}, [
      {
        key: 'Authorization',
        value: `Bearer ${token}`,
      },
    ]);
  }

  setToken(token: string): void {
    localStorage.setItem('token', token); // Almacena el token en el localStorage
  }

  getToken(): string | null {
    return localStorage.getItem('token'); // Obtiene el token del localStorage
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null; // Verifica si hay un token almacenado
  }
}
