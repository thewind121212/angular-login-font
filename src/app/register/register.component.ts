import { Component, inject } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../UI/button/button.component';
import { InputComponent } from '../UI/input/input.component';
import { InputInterface } from '../UI/input/input';
import { Button } from '../UI/button/button';
import { NgIf } from '@angular/common';
import { misMatchValidator } from '../../utils/validatorFn.utils';
import { ActivatedRoute, Router } from '@angular/router';
import {v4 as uuidv4} from 'uuid'

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, InputComponent, HttpClientModule, NgIf],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  route: ActivatedRoute = inject(ActivatedRoute)
  router: Router = inject(Router) 

  validator: any[] = [
    Validators.required
  ]

  http = inject(HttpClient)

  ngOnInit() {
    const searchParams = this.route.snapshot.queryParams
    if (!searchParams['uuid'] || (!searchParams['register_step'])) {
      const uuidGenerate = uuidv4() 
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {...searchParams, uuid: uuidGenerate, register_step: 'signupForm'}
      })
    }
    console.log(uuidv4())
    console.log()
  }


  registerForm = new FormGroup({
    firstName: new FormControl('', [
      ...this.validator,
    ]),
    lastName: new FormControl('', [
      ...this.validator,
    ]),
    email: new FormControl('', [
      ...this.validator,
      Validators.email,
    ]),
    phone: new FormControl('', [
      ...this.validator,
    ]),
    password: new FormControl('', [
      ...this.validator,
    ]),
    verifyPassword: new FormControl('', [
      ...this.validator,
    ])
  }, { validators: misMatchValidator })

  loginWithGoogle: Button = {
    type: 'google',
    content: 'Continue with Google'
  }

  submit: Button = {
    type: 'invert',
    content: 'Login'
  }

  firstName: InputInterface = {
    id: 1,
    formGroup: this.registerForm,
    type: 'text',
    label: 'First Name',
    controller: this.registerForm.controls.firstName,
    formControlName: 'firstName'
  }

  lastName: InputInterface = {
    id: 2,
    formGroup: this.registerForm,
    type: 'text',
    label: 'Last Name',
    controller: this.registerForm.controls.lastName,
    formControlName: 'lastName'

  }

  email: InputInterface = {
    id: 3,
    formGroup: this.registerForm,
    type: 'text',
    label: 'Your Email',
    controller: this.registerForm.controls.email,
    formControlName: 'email',

  }

  phoneNumber: InputInterface = {
    id: 4,
    formGroup: this.registerForm,
    type: 'text',
    label: 'Phone Number',
    controller: this.registerForm.controls.phone,
    formControlName: 'phone',

  }

  password: InputInterface = {
    id: 5,
    formGroup: this.registerForm,
    type: 'password',
    label: 'Password',
    controller: this.registerForm.controls.password,
    formControlName: 'password',
  }

  verifyPassword: InputInterface = {
    id: 6,
    formGroup: this.registerForm,
    type: 'password',
    label: 'Comfirm Password',
    controller: this.registerForm.controls.verifyPassword,
    formControlName: 'verifyPassword',
  }

  onSubmit() {
    if (!this.registerForm.valid) {
      console.log(this.registerForm.errors)
      return
    }

    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
      }

    )
    const data: any = {
      userName: 'thewind121212',
      email: this.registerForm.get('email')?.value?.trim(),
      password: this.registerForm.get('password')?.value?.trim(),
      confirm_password: this.registerForm.get('verifyPassword')?.value?.trim(),
      phone_number: this.registerForm.get('phone')?.value?.trim()
    }

    this.http.post("https://api.wliafdew.dev/account/register", JSON.stringify(data), { headers },).subscribe((data: any) => console.log(data))
  }


}
