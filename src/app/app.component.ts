import { Component, SimpleChanges } from '@angular/core';
import { ForecastData } from './interfaces/forecast-data';
import { WeatherData } from './interfaces/weather-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'OpenWeatherMap API';

  weatherData: WeatherData | undefined;
  forecastData: WeatherData[] | undefined;

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  setWeatherData(event: any): void {
    this.weatherData = event;
  }

  setForecastData(event: any): void {
    this.forecastData = event;
  }
}
