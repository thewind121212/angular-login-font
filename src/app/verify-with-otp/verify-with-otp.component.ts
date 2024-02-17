import { Component, QueryList, ViewChildren, inject } from '@angular/core';
import { InputComponent } from '../UI/input/input.component';
import { InputInterface } from '../UI/input/input';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../UI/button/button.component';
import { Button } from '../UI/button/button';
import { NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { ToastNotificationService } from '../toast-notification.service';



@Component({
  selector: 'app-verify-with-otp',
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule, ButtonComponent, NgIf],
  templateUrl: './verify-with-otp.component.html',
})

export class VerifyWithOtpComponent {

  otpForm = new FormGroup({
    otp1: new FormControl('', [Validators.required, Validators.minLength(1)]),
    otp2: new FormControl('', [Validators.required, Validators.minLength(1)]),
    otp3: new FormControl('', [Validators.required, Validators.minLength(1)]),
    otp4: new FormControl('', [Validators.required, Validators.minLength(1)]),
    otp5: new FormControl('', [Validators.required, Validators.minLength(1)]),
    otp6: new FormControl('', [Validators.required, Validators.minLength(1)]),
  })

  notificationSerivce = inject(ToastNotificationService)




  @ViewChildren(InputComponent) otpInputItems!: QueryList<InputComponent>

  timer: any
  http = inject(HttpClient)
  isOTPError: boolean = false
  route: ActivatedRoute = inject(ActivatedRoute)
  email: string = this.route.snapshot.queryParams['email']
  authService = inject(AuthService)
  verifyStatus: 'pending' | 'complete'  = 'pending'


  onPress(event: KeyboardEvent, otpPostion: string) {
    const keyPressed = event.key
    console.log(keyPressed)
    const allowKey = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Backspace", "ArrowRight", "ArrowLeft"]
    if (allowKey.includes(keyPressed)) {
      this.listtenOtpChange(keyPressed, otpPostion)
    }
  }

  listtenOtpChange(keyPressed: string, otp: string): void {
    this.otpForm.valueChanges.subscribe(() => {
      this.verifyBtn.isDisabled = this.otpForm.invalid
    })

    if (keyPressed === "ArrowRight") {
      this.otpInputItems.get(Number(otp))?.otpInput.nativeElement.focus()
      return
    }
    if (keyPressed === "ArrowLeft") {
      this.otpInputItems.get(Number(otp) - 2)?.otpInput.nativeElement.focus()
      return
    }
    if (keyPressed === "Backspace") {
      this.isOTPError = false
      if (this.otpInputItems.get(Number(otp) - 1)?.input.controller.value.length === 1) {
        this.otpInputItems.get(Number(otp) - 1)?.input.controller.setValue("")
        this.timer = setTimeout(() => {
          this.otpInputItems.get(Number(otp) - 1)?.otpInput.nativeElement.focus()
        }, 1)
      return
      }
      if (this.otpInputItems.get(Number(otp) - 1)?.input.controller.value === "") {
        this.otpInputItems.get(Number(otp) - 1)?.input.controller.setValue("")
        this.timer = setTimeout(() => {
          this.otpInputItems.get(Number(otp) - 2)?.otpInput.nativeElement.focus()
        }, 1)
      return
      }
      
    }
    else {
      this.otpInputItems.get(Number(otp) - 1)?.input.controller.setValue(keyPressed)
      this.timer = setTimeout(() => {
        this.otpInputItems.get(Number(otp))?.otpInput.nativeElement.focus()
      }, 1)

    }

  }

  onPaste(event: ClipboardEvent) : void {
    const textData = event.clipboardData?.getData('text')  
    const numericRegex = /^[0-9]+$/;
    const otpData :any = textData?.slice(0, 6)
    console.log(numericRegex.test(otpData))
    if (otpData.length !== 6 || !numericRegex.test(otpData)) {
      return 
    }
    //make sure contenet is number
    console.log(otpData)
    for (let i = 0; i < otpData.length; i++) {
      this.otpInputItems.get(i)?.input.controller.setValue(otpData[i])
    }

    this.otpInputItems.get(5)?.otpInput.nativeElement.focus()
    this.verifyBtn.isDisabled = this.otpForm.invalid

  }


  verifyBtn: Button = {
    type: 'invert',
    content: 'Verify Your Account',
    isDisabled: true,
    buttonStatus: 'normal'
  }


  otp1: InputInterface = {
    id: 11,
    formGroup: this.otpForm,
    type: 'text',
    label: 'none',
    controller: this.otpForm.controls.otp1,
    formControlName: 'otp1',
  }

  otp2: InputInterface = {
    id: 12,
    formGroup: this.otpForm,
    type: 'text',
    label: 'none',
    controller: this.otpForm.controls.otp2,
    formControlName: 'otp2',
  }
  otp3: InputInterface = {
    id: 13,
    formGroup: this.otpForm,
    type: 'text',
    label: 'none',
    controller: this.otpForm.controls.otp3,
    formControlName: 'otp3',
  }
  otp4: InputInterface = {
    id: 14,
    formGroup: this.otpForm,
    type: 'text',
    label: 'none',
    controller: this.otpForm.controls.otp4,
    formControlName: 'otp4',
  }
  otp5: InputInterface = {
    id: 15,
    formGroup: this.otpForm,
    type: 'text',
    label: 'none',
    controller: this.otpForm.controls.otp5,
    formControlName: 'otp5',
  }

  otp6: InputInterface = {
    id: 16,
    formGroup: this.otpForm,
    type: 'text',
    label: 'none',
    controller: this.otpForm.controls.otp6,
    formControlName: 'otp6',
  }


  async verifyOtp() {
    //simlulate api call
    this.verifyBtn.buttonStatus = 'loading'

    if (!this.otpForm.valid) {
      return
    }



    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
      }
    )

    let otp: string = ""
    for (let i = 1; i < 7; i++) {
      otp += this.otpForm.get(`otp${i}`)?.value
      if (i == 6) {
        otp.length == 6 ? this.isOTPError = false : this.isOTPError = true
      }
    }
    const data: any = {
      email: this.route.snapshot.queryParams['email'],
      uuid: this.route.snapshot.queryParams['uuid'],
      otp: otp
    }

    this.authService.verifyOtp(data).then(async (res) => {
      this.isOTPError = false
      this.verifyStatus = 'complete'
      this.verifyBtn.buttonStatus = 'normal'
      // this.notificationSerivce.pushToastNotification(res)
      
    }).catch(async (error) => {
      this.isOTPError = true
      this.verifyBtn.buttonStatus = 'normal'
      // this.notificationSerivce.pushToastNotification(error)
    })

  }

}
