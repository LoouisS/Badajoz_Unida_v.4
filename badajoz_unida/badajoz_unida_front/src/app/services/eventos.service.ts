import { Injectable } from '@angular/core';
import * as dataEventos from './../data/eventos.json';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  apiUrl='http://localhost:8080/eventos/'
  token='eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJTYXJhSmFyYSIsInJvbGVzIjpbIlJPTEVfVVNFUiJdLCJpYXQiOjE2ODQ1MjgzMjMsImV4cCI6MTY4NDcyODMyM30.eETtvq4LxxJsVkkVjRKm8C7UGDjQVKlCNIY4IkQUNov789VHUvciq_XBknVWs3WFgKCc76iwZJTnpV5nqblyWg';
  constructor(private httpClient: HttpClient) { }

  getEventos(){
    const {data}: any = (dataEventos as any).default;
    return data;
  }
  createEvento(formData: FormData){
    const token = {
      Authorization:`Bearer ${this.token}`
    }
    const headers = new HttpHeaders(token)
    return this.httpClient.post(this.apiUrl+'save',formData,{headers})
  }



}
