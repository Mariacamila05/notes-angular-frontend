import { Injectable, isDevMode } from '@angular/core';
import { environment as environmentProd } from '../../environments/environment';
import { environment as environmentDev } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  public urlServicesBD = '';

  constructor() {
    if (isDevMode()) {
      this.urlServicesBD = environmentDev.API_URL;
    } else {
      this.urlServicesBD = environmentProd.API_URL;
    }

    console.log('Aplication ready ✅');
  }
}
