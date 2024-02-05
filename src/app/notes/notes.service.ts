import { Injectable, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';
import { AuthService } from '../auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NotesService implements OnInit {
  constructor(
    private readonly dbService: DbService,
    private readonly authService: AuthService
  ) { }

  ngOnInit() { }

  getNotes<T>(): Promise<T> {
    let vm = this;
    return new Promise((resolve, reject) => {
      vm.dbService
        .getQuery<T>('notes', [
          {
            key: 'Authorization',
            value: 'Bearer ' + this.authService.getToken(),
          },
        ])
        .subscribe({
          next: (res: T) => resolve(res),
          error: (e: HttpErrorResponse) => reject(e),
        });
    });
  }

  getNoteById<T>(id: string): Promise<T> {
    let vm = this;

    return new Promise((resolve, reject) => {
      vm.dbService
        .getQuery<T>(`notes/${id}`, [
          {
            key: 'Authorization',
            value: 'Bearer ' + this.authService.getToken(),
          },
        ])
        .subscribe({
          next: (res: T) => resolve(res),
          error: (e: HttpErrorResponse) => reject(e),
        });
    });
  }

  createNotes<T>(data: any): Promise<T> {
    let vm = this;

    return new Promise((resolve, reject) => {
      vm.dbService
        .postQuery<T>('notes', data, [
          {
            key: 'Authorization',
            value: 'Bearer ' + this.authService.getToken(),
          },
        ])
        .subscribe({
          next: (res: T) => resolve(res),
          error: (e: HttpErrorResponse) => reject(e),
        });
    });
  }

  updateNotes<T>(id: string, data: any): Promise<T> {
    let vm = this;

    return new Promise((resolve, reject) => {
      vm.dbService
        .updQuery<T>(`notes/${id}`, data, [
          {
            key: 'Authorization',
            value: 'Bearer ' + this.authService.getToken(),
          },
        ])
        .subscribe({
          next: (res: T) => resolve(res),
          error: (e: HttpErrorResponse) => reject(e),
        });
    });
  }

  deleteNote<T>(id: string): Promise<T> {
    let vm = this;

    return new Promise((resolve, reject) => {
      vm.dbService
        .delQuery<T>(`notes/${id}`, null, [
          {
            key: 'Authorization',
            value: 'Bearer ' + this.authService.getToken(),
          },
        ])
        .subscribe({
          next: (res: T) => resolve(res),
          error: (e: HttpErrorResponse) => reject(e),
        });
    });
  }
}
