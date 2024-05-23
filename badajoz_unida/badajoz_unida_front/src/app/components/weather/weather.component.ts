import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {

  @Input() clima: any;
  temperature = 10;
  location = 'Copenhagen';
  condition = 'Rain';
  high = 11;
  low = 10;
  date = 'Sunday';
  time = '12:39:22 PM';
}
