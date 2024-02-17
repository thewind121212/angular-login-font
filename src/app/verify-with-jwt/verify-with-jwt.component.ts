import { ChangeDetectorRef, Component, Input, afterNextRender, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { ToastNotificationService } from '../toast-notification.service';

@Component({
  selector: 'app-verify-with-jwt',
  standalone: true,
  imports: [NgIf, HttpClientModule],
  templateUrl: './verify-with-jwt.component.html',
  styleUrl: './verify-with-jwt.component.css'
})

export class VerifyWithJwtComponent {

  route: ActivatedRoute = inject(ActivatedRoute)
  httpClient: HttpClient = inject(HttpClient)
  @Input() verifyStatus: string = 'loading'
  authService: AuthService = inject(AuthService)
  notificationSerivce = inject(ToastNotificationService)
  private cdRef: ChangeDetectorRef = inject(ChangeDetectorRef)


  verify = async (): Promise<any> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const uuid = this.route.snapshot.queryParams['uuid']
    const jwt = this.route.snapshot.queryParams['p']
    this.authService.verifyJWT({ uuid, jwt }).then((res) => {
      this.verifyStatus = 'success'
      this.notificationSerivce.pushToastNotification(res)
      this.cdRef.detectChanges()
    }).catch((err) => {
      this.verifyStatus = 'error'
      this.notificationSerivce.pushToastNotification(err)
      this.cdRef.detectChanges()
    })
  }



  constructor() {
    afterNextRender(() => {
      this.verify()
    })

  }



}




