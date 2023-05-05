import { Injectable } from '@angular/core';
import {Model} from "../models/model.model";

@Injectable({
  providedIn: 'root'
})
export class IdiomasService {

  modelo: Model = new Model();

  constructor() { }

  getIdiomas(){
    return this.modelo.getIdiomas();
  }

}
