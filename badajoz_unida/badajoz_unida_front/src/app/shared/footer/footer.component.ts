/**
 @file Contiene del footer
 @author Daniel García <danielgarciarasero.guadalupe@alumnado.fundacionloyola.net>
 @author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
 **/

import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
    '/eventos': true,
    '/mis-eventos': true
  };

  anio!: number;
  @Output() tamanoFooter: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild('politica') politicaPrivacidad: TemplateRef<any>;


  constructor(private router: Router, private modalService: NgbModal) {
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
    const regex = new RegExp('^/eventos/\\d+$');
    return this.routesMap[this.router.url] === true && !regex.test(this.router.url);
  }

    mostrarModal() {
    this.modalService.open(this.politicaPrivacidad, {
      size: 'lg',
      backdrop: 'static',
    });
  }

    cerrarModal() {
    this.modalService.dismissAll(this.politicaPrivacidad);
  }




}
