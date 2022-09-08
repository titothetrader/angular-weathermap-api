import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ForecastData } from 'src/app/interfaces/forecast-data';
import { WeatherData } from 'src/app/interfaces/weather-data';
import { CallWeatherAPIService } from 'src/app/services/call-weather-api.service';

@Component({
  selector: 'search-location',
  templateUrl: './search-location.component.html',
  styleUrls: ['./search-location.component.css'],
})
export class SearchLocationComponent implements OnInit {
  weatherData: WeatherData;
  forecastData: WeatherData[] = [];
  isWeatherView: boolean = false;
  @Output() emitWeather = new EventEmitter<WeatherData>();
  @Output() emitForecast = new EventEmitter<WeatherData[]>();

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
    this.forecastData.push(this.blankWeatherData);
  }

  ngOnInit(): void {}

  getWeather(): void {
    this.callWeatherAPI.getWeather(this.searchZip).subscribe(
      (res) => {
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
      },
      (error) => {
        console.log('Error: ' + error);
      }
    );
    this.emitWeather.emit(this.weatherData);
  }

  getForecast(): void {
    this.forecastData.splice(0, this.forecastData.length);
    this.callWeatherAPI.getForecast(this.searchZip).subscribe(
      (res) => {
        console.log(res);
        let city: string = res.city.name;
        res.list.forEach((element: any) => {
          let dateText = element.dt_txt;
          let spaceIndex = dateText.indexOf(' ');
          dateText = dateText.slice(0, spaceIndex);
          // console.log(element);
          let weatherDay: WeatherData = {
            cityName: city,
            description: element.weather[0].description,
            currentTemperature: element.main.temp,
            minTemperature: element.main.temp_min,
            maxTemperature: element.main.temp_max,
            feelsLike: element.main.feels_like,
            humidity: element.main.humidity,
            icon: element.weather[0].icon,
            time: element.dt_txt,
          };
          this.forecastData.push(weatherDay);
        });
        // this.forecastData.details = res.list;
      },
      (error) => {
        console.log('Could not fetch Weather - Error: ' + error);
      }
    );
    this.emitForecast.emit(this.forecastData);
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
    this.forecastData.splice(0, this.forecastData.length);
    this.emitWeather.emit(this.weatherData);
    this.emitForecast.emit(this.forecastData);
  }
}
