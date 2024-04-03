import { Component, OnInit } from '@angular/core';
import { CountriesService } from './services/countries.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(
    private readonly _countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this._countriesService.getCountries().subscribe((value: any) => console.log(value));
  }
}
