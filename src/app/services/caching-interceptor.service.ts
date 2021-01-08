import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { RequestCacheService } from './request-cache.service';

@Injectable({
  providedIn: 'root'
})
export class CachingInterceptorService implements HttpInterceptor {


  constructor(private cache: RequestCacheService) { }


  intercept(req:HttpRequest<any>, next: HttpHandler){
    const cachedResponse = this.cache.get(req); 
    return cachedResponse ? of(cachedResponse) : this.sendRequest(req,next, this.cache)
  }

  sendRequest(
    req: HttpRequest<any>, 
    next: HttpHandler, 
    cache: RequestCacheService
  ): Observable<HttpEvent<any>>{
    return next.handle(req).pipe(
      tap(event => {
        if(event instanceof HttpResponse){
          this.cache.put(req, event)
        }
      })
    )
  }
}
