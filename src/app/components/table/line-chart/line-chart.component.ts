import { Component, Input, OnInit } from '@angular/core';
import { HourlyForecast } from 'src/app/models/hourly-forecast.model';
import { HourlyForecastService } from 'src/app/services/hourly-forecast.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  @Input() item = '';
  public forecastArray: HourlyForecast[] = [];
  basicData: any;
  basicOptions: any;
  constructor(private hourlyForecastService: HourlyForecastService) { }

  ngOnInit(): void {

    this.hourlyForecastService.getMeteoForecast()
    .subscribe((data) => {this.forecastArray = data;
    }
   );


    this.basicData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'Temperature Dataset',
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: false,
              borderColor: '#42A5F5',
              tension: .4
          },
          {
              label: 'Time Dataset',
              data: [28, 48, 40, 19, 86, 27, 90],
              fill: false,
              borderColor: '#FFA726',
              tension: .4
          }
      ]
  };

  }

}
