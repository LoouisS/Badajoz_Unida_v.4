import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  menuTamano: number = 78;
  paddingTamano: number = 200;
  paddingRefresh: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  ngOnInit() {
  }

  cambiarTamano(tamano: number){
    this.menuTamano = tamano;
  }

  setTamanoPadding(tamano: number){
    console.log(tamano);
    this.paddingTamano = tamano;
  }

}
