import {Component, OnInit} from '@angular/core';
import * as L from "leaflet";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-crear-evento-modal',
  templateUrl: './crear-evento-modal.component.html',
  styleUrls: ['./crear-evento-modal.component.css']
})
export class CrearEventoModalComponent implements OnInit{
  map: any;
  marker: any;
  formCreateEvent!: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
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

      console.log("Latitud:", latlng.lat);
      console.log("Longitud:", latlng.lng);
      // Puedes almacenar los valores en una variable o enviarlos al servidor
    });

    // Crear una instancia del control de búsqueda


    // Agregar el control de búsqueda al mapa
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
          // Puedes almacenar los valores en una variable o enviarlos al servidor
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
      detalle:['',Validators.required]
    })
  }
  validar(campo1: string) {
    let campo: any = this.formCreateEvent.get(campo1);
    return !(campo.invalid && campo.touched);
  }

}
