import { Component } from '@angular/core';
import { ButtonComponent } from '../UI/button/button.component';
import { Button } from '../UI/button/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../UI/input/input.component';
import { InputInterface } from '../UI/input/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, InputComponent],
  templateUrl: './login.component.html',
})

export class LoginComponent {
  loginForm  = new FormGroup({
    userNameLogin: new FormControl(''),
    password: new FormControl(''),
  })

  loginWithGoogle : Button = {
    type: 'google',
    content: 'Continue with Google'
  }

  submit : Button = {
    type: 'invert',
    content: 'Login'
  }

  // userName : InputInterface = {
  //   formGroup: this.loginForm,
  //   type: 'text',
  //   label: 'User Name',
  //   formControlName: 'userNameLogin',
    
  // }

  // password : InputInterface = {
  //   formGroup: this.loginForm,
  //   type: 'password',
  //   label: 'Password',
  //   formControlName: 'password',
  // }

  onSubmit() {
    console.warn(this.loginForm.value);
  }
}
