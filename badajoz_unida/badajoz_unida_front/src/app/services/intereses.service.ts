import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class InteresesService {

  apiUrl: string ='http://localhost:8080/intereses/';

  constructor(private httpClient: HttpClient) { }

  /**
   * Método para la obtención de todos los intereses existente en la aplicación
   */
  getAll(){
    return this.httpClient.get(this.apiUrl+'getAll');
  }
}
