export class ModelNewEvent{
  eventosId:number | undefined;
  nombre: string;
  descripcion: string;
  localizacion: string;
  detalles: string;
  fechaHora: string;
  telefonoContacto: number;
  latitud: number;
  longitud: number;
  imagen: any;
  intereses: any[] ;

  constructor(nombre: string, descripcion: string, detalles: string, fechaHora: string, telefonoContacto: number,
              latitud: number, longitud: number, imagen: any, localizacion:string, intereses: any[]) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.detalles = detalles;
    this.fechaHora = fechaHora;
    this.telefonoContacto = telefonoContacto;
    this.latitud = latitud;
    this.longitud = longitud;
    this.imagen = imagen;
    this.intereses = intereses;
    this.localizacion = localizacion;
  }
  transformToFormData(): FormData {
    const formData = new FormData();
    formData.append('nombre', this.nombre);
    formData.append('descripcion', this.descripcion);
    formData.append('detalles', this.detalles);
    formData.append('localizacion', this.localizacion);
    formData.append('fechaHora', new Date(this.fechaHora).toISOString());
    formData.append('telefonoContacto', String(this.telefonoContacto));
    formData.append('latitud', String(this.latitud));
    formData.append('longitud', String(this.longitud));
    formData.append('imagen', this.imagen);
    formData.append('intereses', JSON.stringify(this.intereses));
    return formData;
  }



}
