import { Injectable } from '@angular/core';
import { PromiseRegisterResponse, InternalError } from "../utils/modals.utils"
import { ToastNotificationService } from './toast-notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  notificationService = new ToastNotificationService()


  constructor() { }



  async registerUser(data: any): Promise<PromiseRegisterResponse | any> {
    const dataUser = JSON.stringify(data)
    try {
      const datafetch = await fetch('http://localhost:8080/account/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: dataUser
      })

      const res = await datafetch.json()
      const promiseReturn = {
        res,
        status: datafetch.status
      }

      if (datafetch.status == 200) {
        return Promise.resolve(promiseReturn)
      }

      if (datafetch.status !== 200) {
        return Promise.reject(promiseReturn)
      }

    } catch (error) {
      return Promise.reject(InternalError)
    }
  }

  async verifyOtp(data: any): Promise<any> {
    const verifyData = JSON.stringify(data)
    try {
      const datafetch = await fetch('http://localhost:8080/account/register/verifyAccountOTP', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: verifyData
      })
      const res = await datafetch.json()
      const promiseReturn = {
        res,
        status: datafetch.status
      }
      if (datafetch.status == 200) {
        return Promise.resolve(promiseReturn)
      }

      if (datafetch.status !== 200) {
        return Promise.reject(promiseReturn)
      }
    } catch (error) {
      return Promise.reject(InternalError)
    }
  }


  async verifyJWT(data: any): Promise<any> {
    const verifyData = JSON.stringify(data)
    try {
      const datafetch = await fetch('http://127.0.0.1:8080/account/register/verifyAccountJWT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: verifyData
      })

      const res = await datafetch.json()
      const promiseReturn = {
        res,
        status: datafetch.status
      }
      if (datafetch.status == 200) {
        return Promise.resolve(promiseReturn)
      }

      if (datafetch.status !== 200) {
        return Promise.reject(promiseReturn)
      }
    } catch (error) {
      return Promise.reject(InternalError)
    }
  }



}

