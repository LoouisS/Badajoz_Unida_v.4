import { Component, Input } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
  constructor(private languageService: LanguageService) { }

  @Input() clima: any;
  temperature = 10;
  language = 'en-US';
  location = 'Copenhagen';
  condition = 'Rain';
  high = 11;
  low = 10;
  date = 'Sunday';
  time = '12:39:22 PM';
  icon = '../../../assets/weatherIcons/clear-day.svg';

  ngOnChanges() { // This is a lifecycle hook that gets called when the input value changes
    if (this.clima) {
      this.icon = `../../../assets/weatherIcons/${this.clima.days[0].icon}.svg`;
}
  }

  getDayOfWeek(dateString: string): string {
    this.languageService.language$.subscribe((lang) => {
      this.language = lang === 'es' ? 'es-ES' : lang === 'fr' ? 'fr-FR' : 'en-US';
    });
  const date = new Date(dateString);
  return date.toLocaleDateString(this.language, { weekday: 'long' }).charAt(0).toUpperCase() + date.toLocaleDateString(this.language, { weekday: 'long' }).slice(1);
}
}
