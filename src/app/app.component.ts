import { Component, SimpleChanges } from '@angular/core';
import { WeatherData } from './interfaces/weather-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'OpenWeatherMap API';

  weatherData: WeatherData | undefined;

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  setWeatherData(event: any): void {
    console.log(event);
    this.weatherData = event;
  }

}
