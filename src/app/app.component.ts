import { Component, OnInit } from '@angular/core';
import { CountriesService } from './services/countries.service';
import { StatesService } from './services/states.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(
    private readonly _countriesService: CountriesService,
    private readonly _statesService: StatesService
  ) {}

  ngOnInit(): void {
    this._countriesService.getCountries().subscribe((value: any) => console.log(value));
    this._statesService.getStates('Brazil').subscribe((value: any) => console.log(value));
  }
}
