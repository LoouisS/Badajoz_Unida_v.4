/**
 @file Contiene del footer
 @author Daniel García <danielgarciarasero.guadalupe@alumnado.fundacionloyola.net>
 @author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
 **/

import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import { LocalizedComponent } from 'src/app/config/localize.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

/**
 Vista del footer
 **/
export class FooterComponent extends LocalizedComponent implements OnInit {

  private routesMap: { [key: string]: boolean } = {
    '/perfil': true,
    '/gestion-eventos': true,
    '/gestion-categorias': true,
    '/gestion-intereses': true,
    '/gestion-usuarios': true,
  };

  anio!: number;
  @Output() tamanoFooter: EventEmitter<number> = new EventEmitter<number>();

  constructor(private router: Router) {
    super()
  }

  /**
   Método que inicializa la vista
   **/
  ngOnInit() {
    this.anio = new Date().getFullYear();
  }

  /**
   Método que abre enlaces a páginas web exteriores
   **/
  redirectTo(link: string){
    window.open(link, '_blank');
  }

  isPerfilRoute(): boolean {
    return this.routesMap[this.router.url] === true;
  }

}
