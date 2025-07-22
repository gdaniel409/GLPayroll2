import { HttpInterceptorFn } from '@angular/common/http';
import { AuthenticationService } from './Services/Authentication/authentication.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
   
  const authModel = inject(AuthenticationService);

  
  const authReq = req.clone({

    
    //setHeaders: { Authorization: "keEGCw4@vePm" }
    setHeaders: { Authorization: authModel.key }
  });
  return next(authReq);
};
