import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {EventosService} from "../../../services/eventos.service";
import {Subject} from "rxjs";
import {DataTableDirective} from "angular-datatables";

@Component({
  selector: 'app-eventos-table',
  templateUrl: './eventos-table.component.html',
  styleUrls: ['./eventos-table.component.css']
})
export class EventosTableComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('dataTable', { static: false }) table: ElementRef;
  @ViewChild(DataTableDirective, { static: false }) dirDataTable: DataTableDirective;
  eventos: any;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any;
  dtTable: DataTables.Api;
  constructor(private eventoService: EventosService) {
  }
  ngOnInit() {
    this.dtOptions = {
      paging: true,
      searching: true,
      ordering: true,
      info: true,
      destroy: true
    };
    // @ts-ignore
    this.dtTrigger.next();
    this.eventoService.getAllEventos().subscribe((data) => {
      this.eventos = data;
      console.log("EVENTOS:", this.eventos);
      this.cargarTabla();
    })
  }

  ngAfterViewInit() {
  }
  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
    if (this.dtTable) {
      this.dtTable.destroy()
    }
  }
  cargarTabla() {
      $(this.table.nativeElement).DataTable().destroy();
      this.dtOptions = {
        paging: true,
        searching: true,
        ordering: true,
        info: true,
        destroy: true
      };
      setTimeout(() => {
        $(this.table.nativeElement).DataTable(this.dtOptions);
        // @ts-ignore
        this.dtTrigger.next();
      }, 1);
    }
}
