import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InteresesService {

  apiUrl: string ='http://localhost:8080/intereses/';
  editInteres: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(private httpClient: HttpClient) { }

  /**
   * Método para la obtención de todos los intereses existente en la aplicación
   */
  getAll(){
    return this.httpClient.get(this.apiUrl+'getAll');
  }

  /**
   * Método para el registro de un nuevo interés
   * @param interes
   */
  registrarInteres(interes: any ) {
    return this.httpClient.post(this.apiUrl+'save',interes);
  }

  /**
   * Método para el almacenamiento de un interés en el observable editInteres
   * @param categoria
   */
  setEditInteres(categoria: any){
    this.editInteres.next(categoria);
  }

  /**
   * Método para la obtención de la información registrada en el observable de editInteres
   */
  getEditInteres(){
    return this.editInteres;
  }

  /**
   * Método para eliminar los registros almacenados en el observable editInteres
   */
  deleteEditInteres(){
    this.editInteres.next(null);
  }

  /**
   * Método para eliminar el registro de un interes
   * @param interesId
   */
  eliminarInteres(interesId: number) {
    return this.httpClient.delete(this.apiUrl+'delete/'+interesId);
  }

  /**
   * Método para la obtención de intereses filtrados
   * @param filtros
   */
  getInteresesFiltered(filtros: any) {
    return this.httpClient.post(this.apiUrl + 'getAllFilter',filtros);
  }
}
