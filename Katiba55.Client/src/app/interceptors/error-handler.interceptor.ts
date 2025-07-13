import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { Result } from '../models/Result';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { ToasterService } from '../services/toaster.service';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {

  let router = inject(Router);
  let toaster = inject(ToasterService);

  return next(req).pipe(catchError(error => {
    if (error.status === 404) {
      router.navigate(['/404']);
    }
    else if (error.status === 500) {
      router.navigate(['/500']);
    }
    else {
      let message = error.error?.message || 'حدث خطأ غير متوقع.';
      toaster.showToast('خطأ', message, 'danger');
    }

    return throwError(() => error.error as Result<any>);
  }));
};
