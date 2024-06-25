import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { IUser } from '../../interfaces/user/user.interface';
import { UserFormController } from './user-form-controller';
import { CountriesService } from '../../services/countries.service';
import { take } from 'rxjs';
import { CountriesList } from '../../types/countries-list';
import { StatesService } from '../../services/states.service';
import { StatesList } from '../../types/states-list';

@Component({
  selector: 'app-user-informations-container',
  templateUrl: './user-informations-container.component.html',
  styleUrl: './user-informations-container.component.scss'
})
export class UserInformationsContainerComponent extends UserFormController implements OnChanges, OnInit {
  @Input({ required: true }) userSelected: IUser | undefined = {} as IUser;
  @Input({ required: true }) isInEditMode: boolean = false;

  private readonly _countriesService = inject(CountriesService);
  private readonly _statesService = inject(StatesService);

  public currentTabIndex: number = 0;
  public countriesList: CountriesList = [];
  public statesList: StatesList = [];

  ngOnInit(): void {
    this.getCountriesList();
  }

  ngOnChanges(_: SimpleChanges): void {
    console.log(this.isInEditMode)
    this.currentTabIndex = 0;

    if (this.userSelected) {
      this.fulfillUserForm(this.userSelected);

      this.getStatesList(this.userSelected.country);
    }
  }

  onCountrySelected(countryName: string) {
    this.getStatesList(countryName);
  }

  private getStatesList(country: string) {
    this._statesService.getStates(country)
    .pipe(
      take(1)
    )
    .subscribe({
      next: (statesList: StatesList) => {
        this.statesList = statesList;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  private getCountriesList(): void {
    this._countriesService.getCountries()
      .pipe(
        take(1)
      )
      .subscribe({
        next: (countriesList: CountriesList) => {
          this.countriesList = countriesList;
        },
        error: (error) => {
          console.error(error);
        }
      })
  }
}
