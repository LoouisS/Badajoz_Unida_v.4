import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appNoImage]'
})
export class NoImageDirective {

  constructor(private imgElement: ElementRef) { }

  @HostListener('error')
  onError(){
    this.imgElement.nativeElement.src = 'assets/default.jpg';
  }

}
