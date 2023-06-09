import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EventosService} from "../../../services/eventos.service";
import {CategoriasService} from "../../../services/categorias.service";
import {UsuariosService} from "../../../services/usuarios.service";

@Component({
  selector: 'app-editar-intereses',
  templateUrl: './editar-intereses.component.html',
  styleUrls: ['./editar-intereses.component.css']
})
export class EditarInteresesComponent implements OnInit{

  @Input() interesesUsuario: any[];
  @Output() cerrar: EventEmitter<any> = new EventEmitter<any>();
  interesesList: any[] = [];
  loading: boolean = true;

  constructor(private _categoriasService: CategoriasService, private _usuariosService: UsuariosService) {
  }

  ngOnInit() {
    this._categoriasService.getCategorias().subscribe((data: any) => {
      this.cargarIntereses(data);
    })
  }

  cargarIntereses(categorias: any){
    for(let categoria of categorias){
      for(let interes of categoria.intereses){
        interes.categoria_id = categoria.categoriaId
        interes.seleccionado = this.comprobarInteresUsuario(interes);
        switch (interes.categoria_id){
          case 1:
            interes.emoji = '⚽';
            break;
          case 2:
            interes.emoji = '🎭';
            break;
          case 3:
            interes.emoji = '📚';
            break;
          case 4:
            interes.emoji = '🎵';
            break;
          case 5:
            interes.emoji = '🍲';
            break;
          default:
            interes.emoji = '🔥';
        }
        this.interesesList.push(interes);
      }
    }
    this.loading = false;
  }

  comprobarInteresUsuario(interes: any){
    for(let interesUsuario of this.interesesUsuario){
      if(interesUsuario.interesId == interes.interesId){
        return true;
      }
    }
    return false;
  }

  cerrarModal(){
    this.cerrar.emit();
  }

  seleccionarInteres(interes: any){
    if(interes.seleccionado){
      this.interesesUsuario.splice(this.interesesUsuario.map(e => e.interesId).indexOf(interes.interesId), 1);
    } else{
      this.interesesUsuario.push(interes)
    }
    console.log(this.interesesUsuario);
    interes.seleccionado = interes.seleccionado ? false : true;
  }

  changeIntereses(){
    this.loading = true;
    this._usuariosService.changeIntereses(this.interesesUsuario).subscribe((data: any) => {
      this.loading = false;
      this.cerrar.emit();
    });
  }

}
