export class NuevoUsuario {
  nombre: string;
  apellidos: string;
  nombreUsuario: string;
  email: string;
  password: string;
  tlf: string;
  fchNacimiento: Date;
  idioma: any;
  roles: any[] = [{titulo: "user"}];
  intereses: any[] = [];
  constructor(nombre: string, apellidos: string, nombreUsuario: string, email: string, password: string, tlf: string, fchNacimiento: Date, idioma: string) {
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.nombreUsuario = nombreUsuario;
    this.email = email;
    this.password = password;
    this.tlf = tlf;
    this.fchNacimiento = fchNacimiento;
    this.idioma = {idiomaId: idioma}
  }

}
