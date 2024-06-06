import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import * as L from 'leaflet';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ModelNewEvent } from '../../../models/model-new-event';
import { CategoriasService } from '../../../services/categorias.service';
import { EventosService } from '../../../services/eventos.service';
import Swal from 'sweetalert2';
import { ValidadoresService } from '../../../services/validadores.service';
import { AngularMultiSelect } from 'angular2-multiselect-dropdown';
import { LocalizedComponent } from 'src/app/config/localize.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-editar-evento-modal',
  templateUrl: './editar-evento-modal.component.html',
  styleUrls: ['./editar-evento-modal.component.css'],
})

/**
 Vista del modal para la creación de eventos
 **/
export class EditarEventoModalComponent
  extends LocalizedComponent
  implements OnInit {
  @ViewChild('multiselectIntereses', { static: false })
  multiselect: AngularMultiSelect;
  @Output() cerrarModalEventos: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('buscadorMap') buscadorMap: ElementRef<HTMLInputElement>;
  eventoEdit: any;
  map: any;
  marker: any;
  formCreateEvent!: FormGroup;
  categorias: any[] = [];
  selectedCat: any;
  lat: number | undefined;
  long: number | undefined;
  preview: boolean;
  imgPreview: string;
  multiselectSettings!: any;
  alert = Swal.mixin({
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    stopKeydownPropagation: true,
    customClass: {
      confirmButton: 'btn btn-danger',
      cancelButton: 'btn btn-light',
    },
    buttonsStyling: false,
  });
  loading: boolean;

  /**
   Constructor de la clase
   @param formBuilder {FormBuilder} Clase para contruir un formulario reactivo
   @param catService {CategoriasService} Servicio que gestiona los datos de las categorías
   @param eventoService {EventosService} Servicio que gestiona los datos de los eventos
   **/
  constructor(
    private formBuilder: FormBuilder,
    private catService: CategoriasService,
    private messageService: MessageService,
    private eventoService: EventosService,
    private validador: ValidadoresService,
  ) {
    super();
    this.initMultiselect();
  }

  /**
   Método que inicializa la vista
   **/
  ngOnInit() {
    this.catService.getIntereses().subscribe((data: any[]) => {
      this.categorias = data;
    });
    this.initForm();
    this.initMap();
    this.eventoService.getEditEvent().subscribe((data) => {
      this.eventoEdit = data;
      this.selectedCat = this.eventoEdit?.intereses;
      if (this.eventoEdit?.img != null) {
        this.imgPreview = this.eventoEdit?.img;
        this.preview = true;
      }
      if (this.eventoEdit != null) {
        setTimeout(() => {
          this.setFormEdit(this.eventoEdit);
        }, 1000);
      } else {
        this.resetForm();
      }
    });
  }
  /**
   Método que carga el mapa interactivo
   **/
  initMap(latitud: number = 38.87945, longitud: number = -6.97065) {
    const defaultLatLng = L.latLng([latitud, longitud]); // Latitud y longitud de Badajoz

    this.map = L.map('map').setView(defaultLatLng, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    this.marker = L.marker(defaultLatLng).addTo(this.map);

    this.map.on('click', (e: any) => {
      const latlng = e.latlng;
      this.marker.setLatLng(latlng);
      this.lat = latlng.lat;
      this.long = latlng.lng;
      this.obtenerDireccion(latlng.lat, latlng.lng);
    });
  }

  obtenerDireccion(lat, lng) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.address.road !== undefined) {
          this.buscadorMap.nativeElement.value = `${data.address.road} - ${data.address.province}, ${data.address.country}`;
        } else {
          this.buscadorMap.nativeElement.value = `${data.address.postcode} - ${data.address.province}, ${data.address.country}`;
        }
      })
      .catch((error) => console.error('Error:', error));
  }

  /**
   Método que envia datos para la búsqueda de una ubicación segun los parametros introducidos
   @param $event {Event} Evento que trae los valores introducidos por el usuario en el campo
   **/
  buscarUbi($event: Event) {
    // @ts-ignore
    const query = $event.target.value;

    if (query.trim() !== '') {
      this.geocodeLocation(query);
    }
  }

  /**
   Método que busca la localización según el parametro introducido por el usuario
   @param query {string} Valor de búsqueda introducido por el usuario
   **/
  geocodeLocation(query: string) {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=1`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          const result = data[0];
          const latlng = L.latLng(result.lat, result.lon);

          this.marker.setLatLng(latlng);
          this.map.setView(latlng, 13);
        }
      })
      .catch((error) => {
        console.error('Error al geocodificar la ubicación:', error);
      });
  }

  /**
   Método que inicializa el formulario reactivo
   **/
  private initForm() {
    this.formCreateEvent = this.formBuilder.group({
      nombreEvento: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(100),
        ],
      ],
      fecha: ['', [Validators.required, this.validador.validateFecha]],
      descripcion: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(500),
        ],
      ],
      tlf: [
    '',
    [
        Validators.required,
        Validators.pattern(/^\d{9}$/)  // Asegura que solo hay 9 dígitos y nada más
    ],
],
      localizacion: [
        '',
        [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(100),
        ],
      ],
      intereses: [],
      detalle: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ],
      ],
      // img: ['', this.validador.validateImgExtension]
    });
  }

  /**
   Método que valida los campos del formulario de forma general
   @param campo1 {string} Nombre asignado al campo del formulario que se quiere validar
   **/
  validar(campo: string): string | null {
    const control = this.formCreateEvent.get(campo);

    if (control.invalid && control.touched) {
      if (control.errors?.['required']) {
        return `${this.resources.categoryRequired}`;
      }

      if (control.errors?.['minlength']) {
        const minLength = control.errors['minlength']['requiredLength'];
        return `${this.resources.minChar} ${minLength}`;
      }

      if (control.errors?.['maxlength']) {
        const maxLength = control.errors['maxlength']['requiredLength'];
        return `${this.resources.maxChar} ${maxLength}}`;
      }

      // Validación adicional para el campo de fecha
      if (campo === 'fecha' && control.errors?.['invalidFecha']) {
        return `${this.resources.dateRequired}`;
      }

      // Validación adicional para el campo de teléfono
      if (campo === 'tlf' && control.errors?.['pattern']) {
        return `${this.resources.phoneInvalid}`;
      }

      // Validación adicional para el campo de localización
      if (campo === 'localizacion' && control.errors?.['minlength']) {
        const minLength = control.errors['minlength']['requiredLength'];
        return `${this.resources.minChar} ${minLength}`;
      }

      // Validación adicional para el campo de imagen
      if (campo === 'imagen' && control.errors?.['extension']) {
        return `${this.resources.imageRequired}`;
      }

      // Si no se encuentra ningún error específico, devuelve el mensaje genérico
      return `${this.resources.notValidValue}`;
    }

    return null;
  }
    sendEvent() {
    if (this.formCreateEvent.invalid || this.formCreateEvent.pending) {
      Object.values(this.formCreateEvent.controls).forEach((control) => {
        if (control instanceof FormGroup) control.markAsTouched();
      });
      return;
    }
    this.alert.fire({
  icon: 'question',
  title: this.resources.editEventTitle,
  html: `
    <ul class="list-group list-group-flush d-flex">
      <li class="list-group-item text-left">${this.resources.title}: ${this.formCreateEvent.get('nombreEvento')?.value}</li>
      <li class="list-group-item text-left">${this.resources.description}: ${this.formCreateEvent.get('descripcion')?.value}</li>
      <li class="list-group-item text-left">${this.resources.details}: ${this.formCreateEvent.get('detalle')?.value}</li>
      <li class="list-group-item text-left">${this.resources.location}: ${this.formCreateEvent.get('localizacion')?.value}</li>
      <li class="list-group-item text-left">${this.resources.date}: ${this.formCreateEvent.get('fecha')?.value}</li>
      <li class="list-group-item text-left">${this.resources.phone}: ${this.formCreateEvent.get('tlf')?.value}</li>
    </ul>`,
  showConfirmButton: true,
  showCancelButton: true,
}).then((result) => {
        if (result.isConfirmed) {
          const interesesAll = this.formCreateEvent.get('intereses').value;
          const inter = [];
          for (let int of interesesAll) {
            inter.push(parseInt(int.interesId));
          }
          const formData = new FormData();
          if (this.eventoEdit != null) {
            formData.append('eventosId', this.eventoEdit.eventosId);
          }
          formData.append(
            'nombre',
            this.formCreateEvent.get('nombreEvento').value,
          );
          formData.append(
            'descripcion',
            this.formCreateEvent.get('descripcion').value,
          );
          formData.append(
            'detalles',
            this.formCreateEvent.get('detalle').value,
          );
          formData.append(
            'localizacion',
            this.formCreateEvent.get('localizacion').value,
          );
          formData.append(
            'fechaHora',
            new Date(this.formCreateEvent.get('fecha').value).toISOString(),
          );
          formData.append(
            'telefonoContacto',
            this.formCreateEvent.get('tlf').value.toString(),
          );
          formData.append('latitud', this.lat.toString());
          formData.append('longitud', this.long.toString());
          if (this.getImg() != null) {
            formData.append('imagen', this.getImg());
          }
          formData.append('intereses', inter.join(','));
          formData.forEach((value, key) => { });

          this.eventoService.createEvento(formData).subscribe(
            (data) => {
                                  this.messageService.add({
          severity: 'success',
          summary:`${this.resources.eventEdited}`,
          detail:`${this.resources.eventEditedDetail}`,
        }),

              this.cerrarModal();
            },
            (error) => {
              this.messageService.add({
            severity: 'error',
            summary:`${this.resources.errorEditEvent}`,
            detail:`${this.resources.errorEditEventDetail}`
          });
            },
          );
        } else {
                        this.messageService.add({
            severity: 'info',
            summary:`${this.resources.eventEditionCancelled}`,
            detail:`${this.resources.eventEditionCancelledDetail}`,
          });
        }
      });
  }

  /**
   Método que guarda la imagen seleccionada por el usuario
   **/
  getImg() {
    const file = (document.getElementById('imgPortada') as HTMLInputElement)
      .files[0];
    if (file != null || file != undefined) {
      return file;
    }
    return null;
  }

  /**
   * Método para la carga dinámica de la imagen seleccionada a subir
   * @param $event
   */
  previewImg($event) {
    const file = $event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.preview = true;
        this.imgPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.preview = false;
      this.imgPreview = null;
    }
  }

  /**
   * Método para el cierre del modal desarrollado en el template
   */
  cerrarModal() {
    this.cerrarModalEventos.emit();
    this.eventoService.deleteEditEvent();
  }

  /**
   * Método para el seteo de valores en el formulario para la edición de un evento
   * @param evento
   */
  setFormEdit(evento: any) {
    let intereses = [];
    this.eventoEdit = evento;
    this.obtenerDireccion(evento.latitud, evento.longitud);
    let fecha = new Date(evento.fechaHora);
    this.formCreateEvent.setValue({
      nombreEvento: evento?.nombre,
      fecha: `${fecha.getFullYear()}-${this.padZero(fecha.getMonth() + 1)}-${this.padZero(fecha.getDate())}T${this.padZero(fecha.getHours())}:${this.padZero(fecha.getMinutes())}`,
      descripcion: evento?.descripcion,
      tlf: evento?.telefonoContacto,
      localizacion: evento?.localizacion,
      detalle: evento?.detalles,
      intereses: evento?.intereses,
    });
    this.marker.setLatLng(L.latLng([evento?.latitud, evento?.longitud]));
    this.map.setView(L.latLng([evento?.latitud, evento?.longitud]), 13);

    this.lat = evento?.latitud;
    this.long = evento?.longitud;
  }

  padZero(num) {
    return num.toString().padStart(2, '0');
  }

  /**
   * Método para el reinicio del formulario a valores en blanco
   */
  resetForm() {
    this.eventoEdit = null;
    this.formCreateEvent.reset();
  }

  /**
   * Método para el instanciamiento de ajustes del módulo AngularMultiselectModule
   * @private
   */
  private initMultiselect() {
    this.multiselectSettings = {
      singleSelection: false,
      text: 'Seleccione intereses relacionados',
      searchPlaceHolder: 'Buscar',
      textField: 'titulo',
      labelKey: 'titulo',
      idField: 'interesId',
      enableSearchFilter: true,
      badgeShowLimit: 6,
      primaryKey: 'interesId',
      searchBy: 'titulo',
      tagToBody: true,
      noDataLabel: 'No disponibles',
    };
  }
}
