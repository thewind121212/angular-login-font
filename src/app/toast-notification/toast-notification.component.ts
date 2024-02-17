import { NgClass, NgIf } from '@angular/common';
import {  ChangeDetectorRef, Component, Output, inject } from '@angular/core';
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
  @Output() cdRef: ChangeDetectorRef = inject(ChangeDetectorRef)



  constructor() {
    this.notificationService.showNotification$.subscribe((isShow) => {
      let timer: any = null

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
          this.cdRef.detectChanges()

        timer = setTimeout(() => {
            this.isNotificationRunning = false
            this.notificaitonModel.isOpen = false
            this.cdRef.detectChanges()
            setTimeout(() => {
            this.notificationService.resetToastNotification()
            }, 200);
        }, 1800)

      }


    })
  }


}
