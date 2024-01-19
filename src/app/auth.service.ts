import { Injectable } from '@angular/core';
import  {PromiseRegisterResponse} from "../utils/modals.utils"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  async registerUser(data: any): Promise<PromiseRegisterResponse | any> {
    const dataUser = JSON.stringify(data)
      const datafetch = await fetch('https://api.wliafdew.dev/account/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: dataUser
      })
    
    const  res = await datafetch.json()
    const  promiseReturn = {
      res,
      status: datafetch.status
    } 

    if (datafetch.status == 200) {
      return Promise.resolve(promiseReturn)
    }

    if (datafetch.status !== 200) {
      return Promise.reject(promiseReturn)
    }
  }

  async verifyOtp(data: any): Promise<any> {
    const verifyData = JSON.stringify(data)
      const datafetch = await fetch('https://api.wliafdew.dev/account/register/verifyAccountOTP', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: verifyData
      })
    
    const  res = await datafetch.json()
    const  promiseReturn = {
      res,
      status: datafetch.status
    } 
    if (datafetch.status == 200) {
      return Promise.resolve(promiseReturn)
    }

    if (datafetch.status !== 200) {
      return Promise.reject(promiseReturn)
    }
  }

}

