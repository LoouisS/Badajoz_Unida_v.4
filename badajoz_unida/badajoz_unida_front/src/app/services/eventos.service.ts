import { Injectable } from '@angular/core';
import * as dataEventos from './../data/eventos.json';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  constructor() { }

  getEventos(){
    const {data}: any = (dataEventos as any).default;
    return data;
  }



}
