import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { WeatherData } from '../interfaces/weather-data';

@Injectable({
  providedIn: 'root',
})
export class CallWeatherAPIService {
  weatherURL: string = '';
  forecastURL: string = '';

  searchValue: string = '';
  @Output() search = new EventEmitter();

  headers: object;

  constructor(private http: HttpClient) {
    this.headers = {
      headers: {
        params: {
          q: '',
          APPID: environment.openWeatherMapKey,
        },
      },
    };
  }

  getWeather(searchZip: string): Observable<any> {
    let response = this.http.get(
      environment.baseURL +
        'weather?zip=' +
        searchZip +
        ',us&APPID=' +
        environment.openWeatherMapKey +
        '&units=imperial'
    );
    return response;
  }

  getForecast(searchZip: string): Observable<any> {
    let response = this.http.get(
      environment.baseURL +
        'forecast?zip=' +
        searchZip +
        ',us&APPID=' +
        environment.openWeatherMapKey +
        '&units=imperial'
    );
    return response;
  }
}
