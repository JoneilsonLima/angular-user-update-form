import { Component, OnInit } from '@angular/core';
import { CountriesService } from './services/countries.service';
import { StatesService } from './services/states.service';
import { CitiesService } from './services/cities.service';
import { UsersService } from './services/users.service';
import { UsersListResponse } from './types/users-list-response';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public usersList: UsersListResponse = [];
  public currentTabIndex: number = 0;

  constructor(
    private readonly _countriesService: CountriesService,
    private readonly _statesService: StatesService,
    private readonly _citiesService: CitiesService,
    private readonly _usersService: UsersService,
  ) {}

  ngOnInit(): void {
    // this._countriesService.getCountries().subscribe((value: any) => console.log(value));

    // this._statesService.getStates('Brazil').subscribe((value: any) => console.log(value));

    // this._citiesService.getCities('Brazil', 'Maranhão').subscribe((value: any) => console.log(value));

    this.getUsers();
  }

  getUsers(): void {
    this._usersService.getUsers()
    .pipe(
      take(1)
    )
    .subscribe({
      next: (users: UsersListResponse) => {
        this.usersList = users;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
