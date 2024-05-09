import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { WeatherModel } from '../models/weather.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent implements OnInit {
  weatherModel?: WeatherModel;
  sunsetTime?: Date;
  currentDate?: Date;
  iconURL: string = '';

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit(): void {
    this.weatherService.getWeatherData('Edison').subscribe(
      (response) => {
        this.weatherModel = response;
        this.sunsetTime = new Date(this.weatherModel.sys.sunset * 1000);
        this.weatherModel.sunset_time = this.sunsetTime.toLocaleTimeString();
        this.currentDate = new Date();
        this.weatherModel.isDay = this.currentDate.getTime() < this.sunsetTime.getTime();
        this.weatherModel.sunrise_time = new Date(this.weatherModel.sys.sunrise * 1000).toLocaleTimeString();
        this.iconURL = 'https://openweathermap.org/img/wn/' + this.weatherModel.weather[0].icon + '@2x.png';
      });
  }
}
