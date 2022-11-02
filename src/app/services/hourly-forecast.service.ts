import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HourlyForecast } from '../models/hourly-forecast.model';

@Injectable({
  providedIn: 'root'
})
export class HourlyForecastService {
  private URL = "https://api.open-meteo.com/v1/forecast?latitude=51.5002&longitude=-0.1262&hourly=temperature_2m,relativehumidity_2m,weathercode,surface_pressure&timezone=Europe%2FLondon&past_days=7";

  constructor(private http: HttpClient) { }
  getMeteoForecast() {
    return this.http.get<HourlyForecast[]>(this.URL)
      .pipe(
        map(data => this.parseMeteoData(data))
      );
  }

  parseMeteoData(data: any) {
    const { hourly = {} } = data
    return hourly.time.map((time: any,id: string | number) => ({
      id,
      time,
      temperature: hourly.temperature_2m[id],
      humidity: hourly?.relativehumidity_2m[id],
      pressure: data.hourly?.surface_pressure[id],
      code: data.hourly?.weathercode[id],
    }))
  }

}
