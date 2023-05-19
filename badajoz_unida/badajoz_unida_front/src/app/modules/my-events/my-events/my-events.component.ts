import {Component, OnInit} from '@angular/core';
import {EventosService} from "../../../services/eventos.service";

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit{

  listaEventos: any[] = [];

  constructor(private _eventosService: EventosService) {
  }

  ngOnInit() {
    this.listaEventos = this._eventosService.getEventos();
  }

}
