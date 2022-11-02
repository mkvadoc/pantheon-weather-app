import { Component, OnInit, ViewChild } from '@angular/core';
import { HourlyForecastService } from 'src/app/services/hourly-forecast.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface TableData {
  id: number;
  time: string;
  temperature: number;
  humidity: number;
  pressure: number;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  forecastArray: any;
  displayedColumns: string[] = ['id', 'time', 'temperature', 'presure', 'code'];
  dataSource!: MatTableDataSource<TableData>
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private hourlyForecastService: HourlyForecastService) {
  }

  ngOnInit(): void {
    this.hourlyForecastService.getMeteoForecast()
      .subscribe((data) => {
        this.forecastArray = data;
        this.dataSource = new MatTableDataSource(this.forecastArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }
}

