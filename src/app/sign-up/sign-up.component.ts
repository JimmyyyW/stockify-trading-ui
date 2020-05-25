import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  accountExist = false;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  submitSignUpForm() {
    this.authService.register(this.signUpForm.get('name').value,
    this.signUpForm.get('surname').value,
    this.signUpForm.get('username').value, 
    this.signUpForm.get('password').value, 
    this.signUpForm.get('email').value)
    .pipe(first())
    .subscribe(
      response => {
        console.log(response);
        if (response.outcome == 'success') {
          alert('check your emails for the activation link');
          this.router.navigateByUrl('/login')
        } else if (response.outcome == 'failure') {
          this.accountExist = true;
        } else {
          console.log(response);         
        }
      },
      error => {
        console.log(error);
        if (error instanceof HttpErrorResponse) {
          if (error.status === 400) {
            this.accountExist = true;
          }
        }
      }
    )
  }
}
