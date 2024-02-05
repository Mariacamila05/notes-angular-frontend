import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { tap, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const isLoggedIn = inject(AuthService).isLoggedIn();

  if (!isLoggedIn) {
    router.navigate(['/login']);
  }

  return isLoggedIn;
};

export const authGuardLoggued: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const isLoggedIn = inject(AuthService).isLoggedIn();

  if (isLoggedIn) {
    router.navigate(['/notes']);
  }

  return !isLoggedIn;
}
