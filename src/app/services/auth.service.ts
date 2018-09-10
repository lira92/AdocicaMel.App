import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: Http, private router:Router) { }
  
  canActivate() {
    if(!localStorage.getItem('adocicamel.token')) {
        this.router.navigate(['/login']);
        return false;
    }

    return true;
  }
  
  authenticate(data: any) {
    var dt = `grant_type=password&username=${data.username}&password=${data.password}&audience=${environment.authService.audience}&scope=openid&client_id=${environment.authService.clientId}&client_secret=${environment.authService.clienteSecret}`;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({headers: headers});
    return this.http
      .post(environment.authService.baseUrl + "oauth/token", dt, options)
      .pipe(
        map((response:Response) => {
          return response.json();
        })
      );
  }

  getUserInfo() {
    let access_token = localStorage.getItem('adocicamel.token');
    let headers = new Headers(
      { 'Authorization': `Bearer ${access_token}` }
    );
    let options = new RequestOptions({headers: headers});
    return this.http
      .get(environment.authService.baseUrl + "userinfo", options)
      .pipe(
        map((response:Response) => {
          return response.json();
        })
      );
  }
}
