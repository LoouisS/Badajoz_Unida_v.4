/**
 @file Contiene una directiva que maneja los errores de las imagenes
 @author Daniel García <danielgarciarasero.guadalupe@alumnado.fundacionloyola.net>
 @author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
 **/
import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appNoImage]'
})

/**
 Directiva que controla los casos en los que la imagen no es cargada
 **/
export class NoImageDirective {

  /**
   Contructor de la case
   @param imgElement {ElementRef} Elemento de una etiqueta img
   **/
  constructor(private imgElement: ElementRef) { }

  /**
   Coloca una imagen por defecto en el elemento img
   **/
  @HostListener('error')
  onError(){
    this.imgElement.nativeElement.src = 'assets/default.jpg';
  }

}
