import { Component, OnInit } from '@angular/core';
import { CountriesService } from './services/countries.service';
import { StatesService } from './services/states.service';
import { CitiesService } from './services/cities.service';
import { UsersService } from './services/users.service';
import { UsersListResponse } from './types/users-list-response';
import { take } from 'rxjs';
import { IUser } from './interfaces/user/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public isInEditMode: boolean = false;
  public enableSaveButton: boolean = false;
  public userFormUpdated: boolean = false;

  public userSelectedIndex!: number | undefined;
  public userSelected: IUser = {} as IUser;
  public usersList: UsersListResponse = [];

  constructor(
    private readonly _countriesService: CountriesService,
    private readonly _statesService: StatesService,
    private readonly _citiesService: CitiesService,
    private readonly _usersService: UsersService,
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  onEditButton(): void {
    this.isInEditMode = true;
  }

  onFormStatusChange(formStatus: boolean) {
    setTimeout(() =>  this.enableSaveButton = formStatus, 0);
  }

  onUserFormFirstChange(): void {
    this.userFormUpdated = true;
  }

  onCancelButton(): void {
    this.isInEditMode = false;
  }

  onUserSelected(userIndex: number): void {
    const userFound = this.usersList[userIndex];

    if (userFound) {
      this.userSelectedIndex = userIndex;
      this.userSelected = structuredClone(userFound);
    }
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
