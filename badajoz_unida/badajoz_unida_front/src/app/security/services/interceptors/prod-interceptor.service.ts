/**
 @file Interceptor que añade el token a las peticiones http
 @author Daniel García <danielgarciarasero.guadalupe@alumnado.fundacionloyola.net>
 @author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
 **/

import { Injectable } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {catchError, concatMap, Observable, throwError} from "rxjs";
import {TokenService} from "../auth/token.service";
import {JwtDto} from "../../models/auth/jwt-dto";
import {AuthService} from "../auth/auth.service";

const AUTHORIZATION="Authorization";
@Injectable({
  providedIn: 'root'
})

/**
 Interceptor que añade el token a las peticiones http
 **/
export class ProdInterceptorService implements HttpInterceptor{

  /**
   Constructor de la clase
   @param tokenService {TokenService} Servicio que gestiona el token de acceso,
   @param authService {AuthService} Servicio que gestiona los procesos de login y registro
   **/
  constructor(private tokenService: TokenService,private authService:AuthService) { }

  /**
   Método que introduce el token del usuario en la petición http
   @param req {HttpRequest} Petición http interceptada
   @param next {HttpHandler} Manejador de la petición http
   @return {Observable} Devuelve una nueva petición con la nueva cabecera
   **/
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(!this.tokenService.isLogged()){
      return next.handle(req);
    }

    let intReq = req;
    const token = this.tokenService.getToken();

    intReq = this.addToken(req,token);


    // @ts-ignore
    return next.handle(intReq).pipe(catchError((err:HttpErrorResponse)=>{
      if(err.status===401){
        const dto:JwtDto=new JwtDto(this.tokenService.getToken());
        return this.authService.refresh(dto).pipe(concatMap((data:any)=>{
          console.log("refreshing");
          this.tokenService.setToken(data.token);
          intReq  = this.addToken(req, data.token);
          return next.handle(intReq);
        }));
      }else{
        // this.tokenService.logOut();
        return throwError(err);
      }

    }));
  }

  /**
   Método que clona la petición agregando el token guardado en el navegador
   @param req {HttpRequest} Petición http
   @param token {string} Token de acceso del usuario
   @return {HttpRequest} Nueva petición http con token
   **/
  private addToken(req: HttpRequest<any>, token: string | null):HttpRequest<any> {
    return req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token)});
  }

}
export const interceptorProvider = [{provide: HTTP_INTERCEPTORS, useClass: ProdInterceptorService, multi: true}];
