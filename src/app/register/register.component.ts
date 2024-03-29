import { Component, inject } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../UI/button/button.component';
import { VerifyWithOtpComponent } from '../verify-with-otp/verify-with-otp.component';
import { VerifyWithJwtComponent } from '../verify-with-jwt/verify-with-jwt.component';
import { InputComponent } from '../UI/input/input.component';
import { InputInterface } from '../UI/input/input';
import { Button } from '../UI/button/button';
import { NgIf } from '@angular/common';
import { misMatchValidator, userNameValidator, nameValidator, passwordValidator } from '../../utils/validatorFn.utils';
import { ActivatedRoute, Router } from '@angular/router';
import { isValidUUIDV4 } from "is-valid-uuid-v4";
import { generateRegisterURl } from '../../utils/register.utils';
import { AuthService } from '../auth.service';
import { ToastNotificationService } from '../toast-notification.service';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, InputComponent, HttpClientModule, NgIf, VerifyWithOtpComponent, VerifyWithJwtComponent],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  route: ActivatedRoute = inject(ActivatedRoute)
  router: Router = inject(Router)
  http = inject(HttpClient)
  uuid!: string
  authService = inject(AuthService)
  notificationSerivce = inject(ToastNotificationService)
  validator: any[] = [
    Validators.required
  ]


  ngOnInit(): void {

    this.registerForm.valueChanges.subscribe(() => {
      // this.submit.isDisabled = this.registerForm.invalid
      this.submit.isDisabled = false
    })

    const searchParams = this.route.snapshot.queryParams

    if (!searchParams['uuid'] || (!searchParams['register_step']) || !isValidUUIDV4(searchParams['uuid'])) {
      const uuid = generateRegisterURl(this.route, this.router)
      this.uuid = uuid
      return
    }
    this.uuid = searchParams['uuid']

    if (searchParams['register_step'] !== 'signupForm' && searchParams['register_step'] !== 'verify_with_otp' && searchParams['register_step'] !== 'verify_with_jwt') {
      this.router.navigate(['404'])
      return
    }

  }



  registerForm = new FormGroup({
    userName: new FormControl('', [
      ...this.validator,
      Validators.minLength(8),
      Validators.maxLength(50),
      userNameValidator()
    ]),
    firstName: new FormControl('', [
      ...this.validator,
      Validators.minLength(3),
      Validators.maxLength(20),
      nameValidator()
    ]),
    lastName: new FormControl('', [
      ...this.validator,
      Validators.minLength(3),
      Validators.maxLength(20),
      nameValidator()
    ]),
    email: new FormControl('', [
      ...this.validator,
      Validators.email,
    ]),
    phone: new FormControl('', [
      ...this.validator,
      // fix later
    ]),
    password: new FormControl('', [
      ...this.validator,
      Validators.minLength(8),
      passwordValidator()
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
    content: 'Login',
    isDisabled: this.registerForm.invalid,
    buttonStatus: 'normal'
  }

  userName: InputInterface = {
    id: 7,
    formGroup: this.registerForm,
    type: 'text',
    label: 'User Name',
    controller: this.registerForm.controls.userName,
    formControlName: 'userName'
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
    console.log('run')
    this.submit.buttonStatus = 'loading'
    // if (!this.registerForm.valid) {
    //   return
    // }


    if (!this.uuid) {
      return
    }

    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
      }

    )
    const data: any = {
      userName: this.registerForm.get('userName')?.value?.trim(),
      email: this.registerForm.get('email')?.value?.trim(),
      password: this.registerForm.get('password')?.value?.trim(),
      confirm_password: this.registerForm.get('verifyPassword')?.value?.trim(),
      phone_number: this.registerForm.get('phone')?.value?.trim(),
      uuid: this.uuid
    }

    this.authService.registerUser(data).then(async (res) => {
      this.submit.buttonStatus = 'normal'
      const urlVerifyOTP = { ...this.route.snapshot.queryParams, register_step: 'verify_with_otp', email: this.registerForm.get('email')?.value?.trim() }
      this.notificationSerivce.pushToastNotification(res)
      this.router.navigate(['register'], { queryParams: urlVerifyOTP })
    }).catch(async (error) => {
      this.submit.buttonStatus = 'normal'
      this.notificationSerivce.pushToastNotification(error)
    })

  }

}

