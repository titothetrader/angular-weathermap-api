import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ForecastData } from 'src/app/interfaces/forecast-data';
import { WeatherData } from 'src/app/interfaces/weather-data';

@Component({
  selector: 'weather-map',
  templateUrl: './weather-map.component.html',
  styleUrls: ['./weather-map.component.css'],
})
export class WeatherMapComponent implements OnInit {
  @Input() weatherData: WeatherData | undefined;
  @Input() forecastData: WeatherData[] | undefined;

  constructor() {}

  ngOnInit(): void {
  }

  
}
