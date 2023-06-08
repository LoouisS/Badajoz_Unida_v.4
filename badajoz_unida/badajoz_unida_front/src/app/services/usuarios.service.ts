import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  apiUrl: string ='http://localhost:8080/usuarios/';
  constructor(private httpClient: HttpClient) { }

  getDatosUsuario(){
    return this.httpClient.get(this.apiUrl + "datos");
  }

  saveChanges(datos: any){
    return this.httpClient.post(this.apiUrl + "save", datos);
  }

}
