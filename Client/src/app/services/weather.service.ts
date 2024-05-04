import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WeatherData } from '../models/weather.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  XRapidAPIRequestUri = 'https://open-weather13.p.rapidapi.com/city/';
  XRapidAPIKeyHeaderName = 'X-RapidAPI-Key';
  XRapidAPIKeyHeaderValue = '918c886b48mshd96044bf4a50511p131b4fjsn6ab8b0633a13';
  XRapidAPIHostHeaderName = 'X-RapidAPI-Host';
  XRapidAPIHostHeaderValue = 'open-weather13.p.rapidapi.com';

  constructor(private http: HttpClient) { }

  getWeatherData(cityName: string): Observable<WeatherData> {
    return this.http.get<WeatherData>(this.XRapidAPIRequestUri+cityName+'/EN', {
      headers: new HttpHeaders()
        .set(this.XRapidAPIKeyHeaderName, this.XRapidAPIKeyHeaderValue)
        .set(this.XRapidAPIHostHeaderName, this.XRapidAPIHostHeaderValue),
    })
  };
}
