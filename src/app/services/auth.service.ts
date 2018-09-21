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
    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('username', data.username)
      .set('password', data.password)
      .set('audience', environment.authService.audience)
      .set('scope', 'openid')
      .set('client_id', environment.authService.clientId)
      .set('client_secret', environment.authService.clienteSecret);
    const headers = new HttpHeaders(
      { 'Content-Type': `application/x-www-form-urlencoded` }
    );
    return this.http
      .post<any>(environment.authService.baseUrl + 'oauth/token', body.toString(), {headers: headers});
  }

  getUserInfo() {
    return this.http
      .get<any>(environment.authService.baseUrl + 'userinfo', {headers: this.getHeaders()});
  }
}
