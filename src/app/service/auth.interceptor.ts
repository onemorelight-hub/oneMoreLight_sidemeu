import { Injectable, Injector } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { finalize, catchError, tap, switchMap } from 'rxjs/operators';
import { AuthenticateService } from './authenticate.service'
import { Router } from '@angular/router';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private inj: Injector, 
    private authenticationService: AuthenticateService,public loadingController: LoadingController,
    private router: Router, ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authToken = this.authenticationService.getToken();
    // alert("Interceptor:-> authToken: " + JSON.stringify(authToken));
    
    if(authToken != undefined){
      const authReq = req.clone({headers: req.headers.set('Authorization', authToken)});
      req = authReq;
        // Without loading in the HTTP request
      return next.handle(req).pipe(tap(event => {
        if (event instanceof HttpResponse) {
          console.log(" all looks good");
        }
      }, error => {
          console.log("--- end of response---");
          if(error.status == 401){
            this.authenticationService.logout();
            this.router.navigate(["/login"]);
          }
        }));
    }
    else{
      // added loading in the every HTTP request
    return from(this.loadingController.create())
    .pipe(
      tap((loading) => {
        return loading.present();
      }),
      switchMap((loading) => {
        return next.handle(req).pipe(
          tap(event => {
          if (event instanceof HttpResponse) {
            console.log(" all looks good");
            // http response status code
            console.log(event.status);
          }
        }, error => {
            console.log("--- end of response---");
            if(error.status == 401){
              this.authenticationService.logout();
              this.router.navigate(["/login"]);
            }
        }))
        .pipe(finalize(() => {loading.dismiss();}))}))} 
  }

}
