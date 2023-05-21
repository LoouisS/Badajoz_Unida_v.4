import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {

  @Input() evento: any;

  constructor(private router: Router) {
  }

  showEvent(id: number){
    this.router.navigate(['/eventos', id]);
  }

}
