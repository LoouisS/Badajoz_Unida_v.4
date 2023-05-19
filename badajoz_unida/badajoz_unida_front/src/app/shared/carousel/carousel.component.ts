import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit{

  @Input() eventos: any[] = [];
  eventosAgrupados: any[] = []

  constructor() {
  }

  ngOnInit() {
    this.agruparEventos();
  }

  agruparEventos(){
    for(let i=0; i<this.eventos.length; i+=3){
      this.eventosAgrupados.push(this.eventos.slice(i, i + 3));
    }
  }

}
