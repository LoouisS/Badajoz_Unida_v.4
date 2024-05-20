import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,map } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

    getWeatherData(latitude: number, longitude: number, date : string): Observable<any> {
    const url = `/api/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}/${date}?key=${environment.api.apikey}`;

    return this.http.get(url).pipe(
      map(data => this.convertToFahrenheitToCelsius(data))
    );
  }

  private convertToFahrenheitToCelsius(data: any): any {
    const tempInCelsius = Math.round((data.days[0].temp - 32) * 5 / 9);;
    return { ...data, temperature: tempInCelsius };
  }
}
