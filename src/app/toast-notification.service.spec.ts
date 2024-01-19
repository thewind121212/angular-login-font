import { TestBed } from '@angular/core/testing';

import { ToastNotificationService } from './toast-notification.service';

describe('ToastNotificationService', () => {
  let service: ToastNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
