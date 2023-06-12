/**
 @file Contiene la vista de editar los intereses de un usuario
 @author Daniel García <danielgarciarasero.guadalupe@alumnado.fundacionloyola.net>
 @author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
 **/

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

  /**
   Método que inicializa la vista
   **/
  ngOnInit() {
    this._categoriasService.getCategorias().subscribe((data: any) => {
      this.cargarIntereses(data);
    })
  }

  /**
   Método que carga la lista de intereses
   @param categorias {any} Lista de categorias con sus intereses
   **/
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
            interes.emoji = '🎵';
            break;
          case 4:
            interes.emoji = '🍲';
            break;
          case 5:
            interes.emoji = '📚';
            break;
          default:
            interes.emoji = '🔥';
        }
        this.interesesList.push(interes);
      }
    }
    this.loading = false;
  }

  /**
   Método que marca los intereses que ya estan asociados al usuario
   **/
  comprobarInteresUsuario(interes: any){
    for(let interesUsuario of this.interesesUsuario){
      if(interesUsuario.interesId == interes.interesId){
        return true;
      }
    }
    return false;
  }

  /**
   Método que cierra el modal
   **/
  cerrarModal(){
    this.cerrar.emit();
  }

  /**
   Método que selecciona o deselecciona un interes
   **/
  seleccionarInteres(interes: any){
    if(interes.seleccionado){
      this.interesesUsuario.splice(this.interesesUsuario.map(e => e.interesId).indexOf(interes.interesId), 1);
    } else{
      this.interesesUsuario.push(interes)
    }
    console.log(this.interesesUsuario);
    interes.seleccionado = interes.seleccionado ? false : true;
  }

  /**
   Método que envia los datos de los nuevos intereses del usuario
   **/
  changeIntereses(){
    this.loading = true;
    this._usuariosService.changeIntereses(this.interesesUsuario).subscribe((data: any) => {
      this.loading = false;
      this.cerrar.emit();
    });
  }

}
