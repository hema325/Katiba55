import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  private toastSubject = new Subject<any>();
  toast$ = this.toastSubject.asObservable();

  showToast(title: string, message: string, color: string) {
    this.toastSubject.next({ title, message, color });
  }

}
