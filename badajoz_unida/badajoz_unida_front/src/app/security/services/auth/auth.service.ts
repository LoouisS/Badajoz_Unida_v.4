import { Injectable } from '@angular/core';
import {LoginUsuario} from "../../models/auth/login-usuario";
import {Observable} from "rxjs";
import {NuevoUsuario} from "../../models/auth/nuevo-usuario";
import {HttpClient} from "@angular/common/http";
import {JwtDto} from "../../models/auth/jwt-dto";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authURL = 'http://localhost:8080/auth/';

  constructor(private httpClient: HttpClient) {
  }

  public nuevo(nuevoUsuario: NuevoUsuario): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'register', nuevoUsuario);
  }

  public login(loginUsuario: LoginUsuario): Observable<JwtDto> {
    return this.httpClient.post<JwtDto>(this.authURL + 'login', loginUsuario);

  }

  public refresh(dto: JwtDto): Observable<JwtDto> {
    return this.httpClient.post<JwtDto>(this.authURL + 'refresh', dto);

  }
}
