import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, AfterViewInit{

  anio!: number;
  @Output() tamanoFooter: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild('footer') footer!: ElementRef;

  ngOnInit() {
    this.anio = new Date().getFullYear();
    console.log(this.footer);
  }

  ngAfterViewInit() {
    let tamano: number = this.footer.nativeElement.offsetHeight;
    this.tamanoFooter.emit(tamano);
  }

  cambioTamano(){
    console.log('El tamaño ha cambiado');
  }

  redirectTo(link: string){
    window.open(link, '_blank');
  }

}
