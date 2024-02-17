import { Injectable } from '@angular/core';
import { BehaviorSubject, } from 'rxjs';
import { PromiseRegisterResponse } from "../utils/modals.utils"

@Injectable({
  providedIn: 'root'
})
export class ToastNotificationService {

  private notificationState = new BehaviorSubject<PromiseRegisterResponse[]>([])
  showNotification$ = this.notificationState.asObservable()


  pushToastNotification(notificationContent: PromiseRegisterResponse): void {
    const currentValue = this.notificationState.getValue()
    if (currentValue.length !== 0 && notificationContent.res.type === currentValue[currentValue.length-1].res.type) {
        return 
    }
    const newStack: PromiseRegisterResponse[] = currentValue ? [...currentValue] : []
    newStack.push(notificationContent)
    this.notificationState.next(newStack)
  }

  resetToastNotification(): void {
    let lastValue: any = this.notificationState.getValue()
    lastValue?.shift()
    if (lastValue.length === 0) {
      this.notificationState.next([])
    } else {
      this.notificationState.next(lastValue)
    }
  }

}
