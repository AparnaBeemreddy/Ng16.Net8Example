import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { WeatherData } from '../models/weather.model';
import { CommonModule, Time } from '@angular/common';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent implements OnInit {
  weatherData?: WeatherData;
  sunsetTime?: Date;
  currentDate?: Date;

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit(): void {
    this.weatherService.getWeatherData('Edison').subscribe(
      (response) => {
        this.weatherData = response;
        this.sunsetTime = new Date(this.weatherData.sys.sunset * 1000);
        this.weatherData.sunset_time = this.sunsetTime.toLocaleTimeString();
        this.currentDate = new Date();
        this.weatherData.isDay = this.currentDate.getTime() < this.sunsetTime.getTime();
      });
  }
}
