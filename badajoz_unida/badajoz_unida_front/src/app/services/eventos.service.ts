/**
 @file Servicio que gestiona los datos de los eventos
 @author Daniel García <danielgarciarasero.guadalupe@alumnado.fundacionloyola.net>
 @author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
 **/

import { Injectable } from '@angular/core';
import * as dataEventos from './../data/eventos.json';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

/**
 Servicio que gestiona los datos de los eventos
 **/
export class EventosService {

  apiUrl: string ='http://localhost:8080/eventos/';
  refreshCards: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  editEvent: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  /**
   Constructor de la clase
   @param httpClient {HttpClient} Clase para realizar peticiones http
   **/
  constructor(private httpClient: HttpClient) { }

  getEventosByNovedad(){
    return this.httpClient.get(this.apiUrl + 'new');
  }

  getEventosById(id: number){
    return this.httpClient.get(this.apiUrl + id);
  }

  getEventosByUserId(){
    return this.httpClient.get(this.apiUrl + 'userInscriptions')
  }

  /**
   Método que guarda los datos de un evento en la base de datos
   @param formData {FormData} Datos del formulario de creación de eventos
   @return {Observable} Resultado de la petición POST
   **/
  createEvento(formData: FormData){
    console.log("Holaaaaaaaaaa")
    return this.httpClient.post(this.apiUrl+'save',formData)
  }

  /**
   Método que obtiene los datos de todos los eventos registrados
   @return {Observable} Resultado de la petición GET
   **/
  getAllEventos(){
    return this.httpClient.get(this.apiUrl+'all')
  }

  /**
   * Métodos para la obtención de eventos filtrados por parámetros
   * @param filtros
   */
  getEventosFiltered(filtros:any) {
    return this.httpClient.post(this.apiUrl+'allFilter',filtros)
  }

  /**
   * Método para la eliminación de un evento
   * @param id
   */
  deleteEventById(id: number){
    return this.httpClient.delete(this.apiUrl+'delete/'+id);
  }

  checkUserRegister(eventoId: number){
    return this.httpClient.get<boolean>(this.apiUrl + 'checkRegister/' + eventoId);
  }

  registerUserInEvent(eventoId: number){
    let data: any = { eventoId: eventoId };
    return this.httpClient.post(this.apiUrl + 'register', data);
  }

  removeUserFromEvent(eventoId: number){
    return this.httpClient.delete(this.apiUrl + 'removeUser/' + eventoId);
  }

  notifyRefreshCards(){
    return this.refreshCards;
  }

  setNotificationCards(){
    this.refreshCards.next(null);
  }

  /**
   * Método para el seteo del observable editEvent para le edición de un evento
   * @param event
   */
  setEditEvent(event: any){
      this.editEvent.next(event);
  }

  /**
   * Método para eliminar el registro de un evento en la aplicación
   */
  deleteEditEvent(){
    this.editEvent.next(null);
  }

  /**
   * Método para la obtención del objeto observable de edición de un evento
   */
  getEditEvent(){
    return this.editEvent;
  }

  /**
   * Método para la obtención de un excell con la información del evento
   * @param eventosId
   */
  getExcellEvent(eventosId: any) {
    return this.httpClient.get(this.apiUrl + 'generateExcell/' + eventosId,{ responseType: 'blob' });
  }

  /**
   * Método para la obtención de un pdf con la información del evento
   * @param eventosId
   */
  getPdfEvent(eventosId: any) {
    return this.httpClient.get(this.apiUrl + 'generatePdf/' + eventosId,{ responseType: 'blob' });
  }
}
