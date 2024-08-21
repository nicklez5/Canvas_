import { Injectable } from '@angular/core';
import { HttpHandler, HttpRequest, HttpInterceptor, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor{
  constructor(public authService: AuthService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.getToken();
    if(authToken == null){

    }else{
      req = req.clone({
        setHeaders: {
            Authorization: "Token " + authToken 
        }
      });
    }
    
    return next.handle(req);
    
  }
}
