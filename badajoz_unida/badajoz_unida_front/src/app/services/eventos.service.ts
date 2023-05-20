import { Injectable } from '@angular/core';
import * as dataEventos from './../data/eventos.json';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  apiUrl='http://localhost:8080/eventos/';
  constructor(private httpClient: HttpClient) { }

  getEventos(){
    const {data}: any = (dataEventos as any).default;
    return data;
  }
  createEvento(formData: FormData){
    return this.httpClient.post(this.apiUrl+'save',formData)
  }
  getAllEventos(){
    return this.httpClient.get(this.apiUrl+'all')
  }



}
