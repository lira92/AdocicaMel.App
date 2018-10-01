import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { BaseService } from './base.service';
import * as moment from 'moment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  constructor(private http: HttpClient, private router: Router) {
    super();
  }

  tokenIsValid() {
    return moment.utc(localStorage.getItem('adocicamel.expires'), 'YYYY-MM-DDTHH:mm:ssZ') <= moment.utc();
  }

  canActivate() {
    if (!localStorage.getItem('adocicamel.token') || !this.tokenIsValid()) {
        this.router.navigate(['/login']);
        return false;
    }

    return true;
  }

  authenticate(data: any) {
    const body = new HttpParams()
      .set('username', data.username)
      .set('password', data.password);
    const headers = new HttpHeaders(
      { 'Content-Type': `application/x-www-form-urlencoded` }
    );
    return this.http
      .post<any>(environment.api.url + '/oauth/token', body.toString(), {headers: headers});
  }

  getUserInfo() {
    return this.http
      .get<any>(environment.api.url + '/userinfo', {headers: this.getHeaders()});
  }
}
