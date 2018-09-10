import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  public form: FormGroup;
  public error: any;

  constructor(private fb: FormBuilder, private router:Router, private authService:AuthService) {
    this.form = this.fb.group({
      username: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(160),
        Validators.required
        //,CustomValidator.EmailValidator
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])]
    });

    var token = localStorage.getItem('adocicamel.token');
    if(token) {
      this.router.navigateByUrl('/');
    }
  }

  ngOnInit() {
  }

  submit() {
    this.authService.authenticate(this.form.value).subscribe(result => {
      localStorage.setItem('adocicamel.token', result.access_token);
      
      this.authService.getUserInfo().subscribe(userInfoResult => {
        localStorage.setItem('adocicamel.user', JSON.stringify(userInfoResult));
        this.router.navigateByUrl('/');
      });
    }, error => {
      console.log(error);
      let parsedError = JSON.parse(error._body);
      let translatedMessage = this.translateMessage(parsedError);
      this.error = {
        ...parsedError,
        translated_message: translatedMessage
      };
      console.log(this.error);
    });
  }

  private translateMessage(error:any) {
    switch(error.error) {
      case "invalid_grant":
        return "E-mail ou senha inváidos";
      case "unauthorized":
        return "Por favor, verifique seu e-mail antes de efetuar o login";
      default:
        return error.error_description;
    }
  }

}
