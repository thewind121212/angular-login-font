import { Component, Input } from '@angular/core';
import { InputInterface } from './input'; 
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
  @Input() validitorFunc: (controller :FormControl) => boolean;
  @Input() passwordStreng: (form: FormControl, formName : string ) => void

  constructor() {
    this.validitorFunc = (controller) => {
      return (controller.valid && controller.dirty)
    }
    this.passwordStreng = (form , formName) => {
      if (formName === 'password') {
         return passwordStrength(form.value).value 
      }
      return null
    }
  }

}
