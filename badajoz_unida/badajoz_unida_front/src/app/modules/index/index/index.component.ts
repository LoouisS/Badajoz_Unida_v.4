/**
 @file Contiene la vista del componente inicial o home
 @author Daniel García <danielgarciarasero.guadalupe@alumnado.fundacionloyola.net>
 @author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
 **/

import { Component } from '@angular/core';
import { LocalizedComponent } from 'src/app/config/localize.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})

/**
 Vista del componente inicial o home
 **/
export class IndexComponent extends LocalizedComponent{

}
