import { Injectable } from '@angular/core';
import {LoginUsuario} from "../../models/auth/login-usuario";
import {BehaviorSubject, Observable} from "rxjs";
import {NuevoUsuario} from "../../models/auth/nuevo-usuario";
import {HttpClient} from "@angular/common/http";
import {JwtDto} from "../../models/auth/jwt-dto";
import {Model} from "../../../models/model.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isFormRegister: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  authURL = 'http://localhost:8080/auth/';
  modelo: Model = new Model();

  constructor(private httpClient: HttpClient) {
  }

  public nuevo(nuevoUsuario: NuevoUsuario): Observable<any> {
    console.log(nuevoUsuario);
    return this.httpClient.post<any>(this.authURL + 'register', nuevoUsuario);
  }

  public login(loginUsuario: LoginUsuario): Observable<JwtDto> {
    return this.httpClient.post<JwtDto>(this.authURL + 'login', loginUsuario);

  }
  //
  // public refresh(dto: JwtDto): Observable<JwtDto> {
  //   return this.httpClient.post<JwtDto>(this.authURL + 'refresh', dto);
  // }

  public getCategorias(){
    let categorias: any[] = this.modelo.getCategorias();
    let categoriasIntereses: any[] = [];
    for(let categoria of categorias){
      let intereses = this.modelo.getInteresesByCategoriaId(categoria.id);
      categoriasIntereses.push({categoria: categoria, intereses: intereses});
    }
    return categoriasIntereses;
  }

  public changeAuthMessage(isFormRegister: boolean){
    this.isFormRegister.next(isFormRegister);
  }

  public getAuthMessage(){
    return this.isFormRegister;
  }

}
