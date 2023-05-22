/**
 @file Servicio que gestiona los datos de las categorias
 @author Daniel García <danielgarciarasero.guadalupe@alumnado.fundacionloyola.net>
 @author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
 **/

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

/**
 Servicio que gestiona los datos de las categorias
 **/
export class CategoriasService {

  authURL = 'http://localhost:8080/categorias/';

  /**
   Constructor de la clase
   @param httpClient {HttpClient} Clase para realizar peticiones http
   **/
  constructor(private httpClient: HttpClient) { }

  /**
   Método que obtiene la colección de datos de todas las categorías disponibles
   @return {Observable} Resultado de la petición GET
   **/
  public getCategorias(){
    return this.httpClient.get(this.authURL + 'all');
  }
}
