import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { WeatherData } from 'src/app/interfaces/weather-data';

@Component({
  selector: 'weather-map',
  templateUrl: './weather-map.component.html',
  styleUrls: ['./weather-map.component.css'],
})
export class WeatherMapComponent implements OnInit {
  @Input() weatherData: WeatherData | undefined;

  constructor() {}

  ngOnInit(): void {}
}
