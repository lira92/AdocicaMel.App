import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ui } from '../../utils/ui';
import { CustomValidator } from '../../validators/custom.validator';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css'],
  providers: [Ui]
})
export class SignupPageComponent implements OnInit {
  public form: FormGroup;
  public errors: any[] = [];

  constructor(private fb: FormBuilder, private ui: Ui, private router: Router) {
    this.form = this.fb.group({
      firstName: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(40),
        Validators.required,
      ])],
      lastName: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(40),
        Validators.required,
      ])],
      email: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(160),
        Validators.required,
        CustomValidator.EmailValidator
      ])],
      document: ['', Validators.compose([
        Validators.minLength(11),
        Validators.maxLength(11),
        Validators.required,
      ])],
      username: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required,
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])],
      confirmPassword: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])]
    });
  }

  ngOnInit() {
  }

  submit() {
    /*this.dataService.createUser(this.form.value).subscribe(result => {
      this.router.navigateByUrl('/login');
    }, error => {
      this.errors = JSON.parse(error._body.errors);
    });*/
  }
}
