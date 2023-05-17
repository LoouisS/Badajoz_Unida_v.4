import {Component, EventEmitter, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  @Output() menuOpened = new EventEmitter<number>();
  isOpened: boolean = false;

  toggleMenu(){
    this.isOpened = this.isOpened ? false : true;
    this.isOpened ? this.menuOpened.emit(240) : this.menuOpened.emit(78);
  }

}
