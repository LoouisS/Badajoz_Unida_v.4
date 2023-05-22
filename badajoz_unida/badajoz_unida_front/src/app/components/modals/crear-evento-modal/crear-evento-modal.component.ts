import {Component, OnInit} from '@angular/core';
import * as L from "leaflet";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModelNewEvent} from "../../../models/model-new-event";
import {CategoriasService} from "../../../services/categorias.service";
import {EventosService} from "../../../services/eventos.service";

@Component({
  selector: 'app-crear-evento-modal',
  templateUrl: './crear-evento-modal.component.html',
  styleUrls: ['./crear-evento-modal.component.css']
})
export class CrearEventoModalComponent implements OnInit{
  map: any;
  marker: any;
  formCreateEvent!: FormGroup;
  categorias: any;
  lat: number | undefined;
  long: number | undefined
  preview: boolean;
  imgPreview:string;
  constructor(private formBuilder: FormBuilder, private catService: CategoriasService, private eventoService: EventosService) { }

  ngOnInit() {
    this.catService.getCategorias().subscribe((data) => {
      this.categorias = data;
    });
    this.initForm();
    this.initMap();
  }

  initMap() {
    const defaultLatLng = L.latLng([38.87945, -6.97065]); // Latitud y longitud de Badajoz

    this.map = L.map('map').setView(defaultLatLng, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.marker = L.marker(defaultLatLng).addTo(this.map);

    this.map.on('click', (e: any) => {
      const latlng = e.latlng;
      this.marker.setLatLng(latlng);
      this.lat = latlng.lat;
      this.long = latlng.lng;
    });
  }

  buscarUbi($event: Event) {
    // @ts-ignore
    const query = $event.target.value;

    if (query.trim() !== '') {
      this.geocodeLocation(query);
    }
  }

  geocodeLocation(query: string) {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=1`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const result = data[0];
          const latlng = L.latLng(result.lat, result.lon);

          this.marker.setLatLng(latlng);
          this.map.setView(latlng, 13);

          console.log("Latitud:", result.lat);
          console.log("Longitud:", result.lon);
        }
      })
      .catch(error => {
        console.error('Error al geocodificar la ubicación:', error);
      });
  }

  private initForm() {
    this.formCreateEvent = this.formBuilder.group({
      nombreEvento:['',Validators.required],
      fecha:['',Validators.required],
      descripcion:['',Validators.required],
      tlf:['',Validators.required],
      localizacion:['',Validators.required],
      intereses:[],
      detalle:['',Validators.required]
    })
  }
  validar(campo1: string) {
    let campo: any = this.formCreateEvent.get(campo1);
    return !(campo.invalid && campo.touched);
  }

  sendEvent() {
    if (this.formCreateEvent.invalid || this.formCreateEvent.pending) {
      Object.values(this.formCreateEvent.controls).forEach((control) => {
        if (control instanceof FormGroup)
        control.markAsTouched();
      });
      return;
    }
    const inter = parseInt(this.formCreateEvent.get('intereses').value);

    const formData = new FormData();
    formData.append('nombre', this.formCreateEvent.get('nombreEvento').value);
    formData.append('descripcion', this.formCreateEvent.get('descripcion').value);
    formData.append('detalles', this.formCreateEvent.get('detalle').value);
    formData.append('localizacion', this.formCreateEvent.get('localizacion').value);
    formData.append('fechaHora', new Date(this.formCreateEvent.get('fecha').value).toISOString());
    formData.append('telefonoContacto', this.formCreateEvent.get('tlf').value.toString());
    formData.append('latitud', this.lat.toString());
    formData.append('longitud', this.long.toString());
    formData.append('imagen', this.getImg());
    formData.append('intereses', JSON.stringify(inter));
    this.eventoService.createEvento(formData).subscribe((data) => {
      console.log("DATA", data);
    })

  }
  getImg(){
    // @ts-ignore
    const file = (document.getElementById('imgPortada') as HTMLInputElement).files[0];
    if (file!=null || file != undefined)
      return file;
    return null;
  }

  previewImg($event) {
    const file = $event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.preview = true
        this.imgPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.preview = false
      this.imgPreview = null;
    }
  }
}
