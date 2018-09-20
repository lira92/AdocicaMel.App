import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BaseService } from './base.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  constructor(private http: Http, private router: Router) {
    super();
  }

  tokenIsValid() {
    return moment.utc(localStorage.getItem('smsi.expires'), 'YYYY-MM-DDTHH:mm:ssZ') <= moment.utc();
  }

  canActivate() {
    if (!localStorage.getItem('adocicamel.token') || !this.tokenIsValid()) {
        this.router.navigate(['/login']);
        return false;
    }

    return true;
  }

  authenticate(data: any) {
    const dt = `grant_type=password&username=${data.username}&password=${data.password}&audience=${environment.authService.audience}` +
    `&scope=openid&client_id=${environment.authService.clientId}&client_secret=${environment.authService.clienteSecret}`;
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({headers: headers});
    return this.http
      .post(environment.authService.baseUrl + 'oauth/token', dt, options)
      .pipe(
        map((response) => {
          return response.json();
        })
      );
  }

  getUserInfo() {
    const options = new RequestOptions({headers: this.getHeaders()});
    return this.http
      .get(environment.authService.baseUrl + 'userinfo', options)
      .pipe(
        map((response) => {
          return response.json();
        })
      );
  }
}
