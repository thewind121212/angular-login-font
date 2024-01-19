import { NgClass, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, Input, inject } from '@angular/core';
import { ToastNotificationService, } from '../toast-notification.service';
import { ToastNotificationModal } from '../../utils/modals.utils';

@Component({
  selector: 'app-toast-notification',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './toast-notification.component.html',
  styleUrl: './toast-notification.component.css'
})
export class ToastNotificationComponent {
  notificationService = inject(ToastNotificationService)
  notificaitonModel: ToastNotificationModal = {
    isClosable: true,
    isAllowToPush: true,
    type: 'success',
    isOpen: false,
    message: '',
  }
  isNotificationRunning: boolean = false



  constructor() {
    this.notificationService.showNotification$.subscribe((isShow) => {

      let timer: any = null
      console.log(isShow)

      if (isShow.length === 0) {
        clearTimeout(timer)
        return
      }

      if (this.isNotificationRunning === false) {
        this.isNotificationRunning = true
        if (isShow.length === 0) {
          this.isNotificationRunning = false
        }
          this.notificaitonModel.isOpen = true
          this.notificaitonModel.message = isShow[0].res.message
          this.notificaitonModel.type = isShow[0].status === 200 ? 'success' : 'error'

        timer = setTimeout(() => {
            this.isNotificationRunning = false
            this.notificaitonModel.isOpen = false
            setTimeout(() => {
            this.notificationService.resetToastNotification()
            }, 200);
        }, 2000)

      }




      // if (this.notificaitonModel.isOpen === false && isShow.length !== 0 && this.notificaitonModel.isAllowToPush === true) {
      //   this.notificaitonModel.message = isShow[0].res.message
      //   this.notificaitonModel.type = isShow[0].status === 200 ? 'success' : 'error'
      //   this.notificaitonModel.isAllowToPush = false
      //   this.notificaitonModel.isOpen = true
      //   setTimeout(() => {
      //     this.notificaitonModel.isOpen = false
      //     this.notificationService.resetToastNotification()
      //     setTimeout(() => {
      //       this.notificaitonModel.isAllowToPush = true
      //     }, 200)
      //   }, 4000)
      // }


    })
  }


}
