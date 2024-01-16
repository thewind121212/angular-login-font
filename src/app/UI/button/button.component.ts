import { Component, Input } from '@angular/core';
import {Button} from  './button';
import { NgClass, NgIf } from '@angular/common';



@Component({
  selector: 'app-button',
  imports: [NgIf, NgClass],
  standalone: true,
  templateUrl: './button.component.html',
})

export class ButtonComponent {
  @Input() button!: Button;
  @Input() imgGoogle: string = 'https://firebasestorage.googleapis.com/v0/b/static-only-2ff95.appspot.com/o/angular%2Fgoogle.png?alt=media&token=7b6cbdc6-ca6d-43e5-a81b-f0640c4a5e6c';

  constructor() {
  }

  ngOnInit(): void  {}

}
