import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WeatherData } from 'src/app/interfaces/weather-data';
import { CallWeatherAPIService } from 'src/app/services/call-weather-api.service';

@Component({
  selector: 'search-location',
  templateUrl: './search-location.component.html',
  styleUrls: ['./search-location.component.css'],
})
export class SearchLocationComponent implements OnInit {
  weatherData: WeatherData;
  @Output() emitWeather = new EventEmitter<WeatherData>();

  listFilter: boolean = true;

  searchZip: string = '';

  blankWeatherData: WeatherData = {
    cityName: '',
    description: '',
    currentTemperature: 0,
    minTemperature: 0,
    maxTemperature: 0,
    feelsLike: 0,
    humidity: 0,
    icon: '',
    time: '',
  };

  constructor(private callWeatherAPI: CallWeatherAPIService) {
    this.weatherData = this.blankWeatherData;
  }

  ngOnInit(): void {}

  getWeather(): void {
    this.callWeatherAPI.getWeather(this.searchZip).subscribe((res) => {
      this.weatherData.cityName = res.name;
      this.weatherData.description = res.weather[0].description;
      this.weatherData.currentTemperature = res.main.temp;
      this.weatherData.minTemperature = res.main.temp_min;
      this.weatherData.maxTemperature = res.main.temp_max;
      this.weatherData.feelsLike = res.main.feels_like;
      this.weatherData.humidity = res.main.humidity;
      this.weatherData.icon = res.weather[0].icon;
      let unixTime: number = res.dt;
      let date: Date = new Date(unixTime * 1000); // miliseconds, not seconds
      let hours = date.getHours();
      let minutes = '' + date.getMinutes();
      minutes.length < 2 ? (minutes = '0' + minutes) : minutes;
      let seconds = '' + date.getSeconds();
      seconds.length < 2 ? (seconds = '0' + seconds) : seconds;

      let formattedTime: string = hours + ':' + minutes + ':' + seconds;
      this.weatherData.time = formattedTime;
    });
    this.emitWeather.emit(this.weatherData);
  }

  getForecast(): void {
    this.callWeatherAPI.getForecast(this.searchZip).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log('Could not fetch Weather - Error: ' + error);
      }
    );
  }

  clearSearch(): void {
    this.searchZip = '';
    this.weatherData = {
      cityName: '',
      description: '',
      currentTemperature: 0,
      minTemperature: 0,
      maxTemperature: 0,
      feelsLike: 0,
      humidity: 0,
      icon: '',
      time: '',
    };
    this.emitWeather.emit(this.weatherData);
  }
}
