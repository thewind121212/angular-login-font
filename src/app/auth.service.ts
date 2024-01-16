import { Injectable } from '@angular/core';
import { json } from 'node:stream/consumers';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  async registerUser(data: any): Promise<any> {
    const dataUser = JSON.stringify(data)
      const datafetch = await fetch('https://api.wliafdew.dev/account/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: dataUser
      })
    
    const  res = await datafetch.json()
    if (datafetch.status == 200) {
      return Promise.resolve(res)
    }

    if (datafetch.status !== 200) {
      return Promise.reject(new Error(res))
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
    if (datafetch.status == 200) {
      return Promise.resolve(res)
    }

    if (datafetch.status !== 200) {
      return Promise.reject(new Error(res))
    }
  }

}

