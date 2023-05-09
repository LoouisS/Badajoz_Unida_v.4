import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  authURL = 'http://localhost:8080/categorias/';

  constructor(private httpClient: HttpClient) { }

  public getCategorias(){
    return this.httpClient.get(this.authURL + 'all');
  }
}
