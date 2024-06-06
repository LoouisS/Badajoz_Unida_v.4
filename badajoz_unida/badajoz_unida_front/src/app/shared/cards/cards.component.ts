/**
 @file Contiene la vista de las tarjetas de la página
 @author Daniel García <danielgarciarasero.guadalupe@alumnado.fundacionloyola.net>
 @author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
 **/

import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {EventosService} from "../../services/eventos.service";
import {Util} from "leaflet";
import formatNum = Util.formatNum;
import {AlertsService} from "../../services/alerts.service";
import { LocalizedComponent } from 'src/app/config/localize.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})

/**
 Vista de las tarjetas
 **/
export class CardsComponent extends LocalizedComponent implements OnInit{

  @Input() evento: any;
  @Input() desapuntarse: boolean = false;

  /**
   Constructor de la clase
   @param router {Router} Clase para la navegación entre componentes
   **/
  constructor(private messageService: MessageService, private router: Router, private _eventosService: EventosService, private _alertsService: AlertsService) {
    super();
  }

  ngOnInit() {
    console.log(this.evento);
  }

  /**
   Cambia al componente que muestra los detalles del evento
   **/
  showEvent(id: number){
    this.router.navigate(['/eventos', id]);
  }

  async removeUserFromEvent(eventoId: number){
        let respuesta = await this._alertsService.askConfirmation(
      `${this.resources.cancelParticipationTitle}`,
      `${this.resources.cancelParticipation}`,
    );
    if(respuesta){
      this._eventosService.removeUserFromEvent(eventoId).subscribe((data: any) => {
        if (data['status'] != 'error') {
                              this.messageService.add({
          severity: 'success',
          summary:`${this.resources.participationCancelled}`,
          detail:`${this.resources.participationCancelledDetail}`,
        }),
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary:`${this.resources.errorCancelParticipation}`,
            detail:`${this.resources.errorCancelParticipationDetail}`,
          });
        }
          this._eventosService.setNotificationCards();
        }
      });
    }
  }

}
