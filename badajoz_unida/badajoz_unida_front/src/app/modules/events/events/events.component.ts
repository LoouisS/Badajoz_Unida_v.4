import {Component, OnInit} from '@angular/core';
import {EventosService} from "../../../services/eventos.service";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit{

  listaEventos: any[] = [];

  constructor(private _eventosService: EventosService) {
  }

  ngOnInit() {
    this.listaEventos = this._eventosService.getEventos();
  }

}
