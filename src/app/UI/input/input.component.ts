import { Component, ElementRef, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { InputInterface } from './input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { passwordStrength } from 'check-password-strength';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})

export class InputComponent {
  @Input() input!: InputInterface;
  @Input() validitorFunc: (controller: FormControl) => boolean;
  @Input() passwordStreng: (form: FormControl, formName: string) => void
  @Input() otpError: boolean = false
  @Input() showPassword: boolean = false

  @ViewChild('otpInput') otpInput!: ElementRef


  toggleShowPassword() {
    this.showPassword = !this.showPassword
  }

  constructor() {
    this.validitorFunc = (controller) => {
      return (controller.valid && controller.dirty)
    }
    this.passwordStreng = (form, formName) => {
      if (formName === 'password') {
        return passwordStrength(form.value).value
      }
      return null
    }
  }

}
