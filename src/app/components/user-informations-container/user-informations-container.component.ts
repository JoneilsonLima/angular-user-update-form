import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { IUser } from '../../interfaces/user/user.interface';
import { UserFormController } from './user-form-controller';
import { CountriesService } from '../../services/countries.service';
import { Subscription, distinctUntilChanged, filter, skip, take } from 'rxjs';
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

  @Output('onFormStatusChange') onFormStatusChangeEmitt = new EventEmitter<boolean>();
  @Output('onUserFormFirstChange') onUserFormFirstChangeEmitt = new EventEmitter<void>();

  private readonly _countriesService = inject(CountriesService);
  private readonly _statesService = inject(StatesService);

  public currentTabIndex: number = 0;
  public countriesList: CountriesList = [];
  public statesList: StatesList = [];

  public userFormValueChangesSubs!: Subscription;

  ngOnInit(): void {
    this.getCountriesList();

    this.onUserFormSatusChange();
  }

  ngOnChanges(_: SimpleChanges): void {
    this.currentTabIndex = 0;

    if (this.userSelected) {
      if (this.userFormValueChangesSubs) this.userFormValueChangesSubs.unsubscribe();

      this.fulfillUserForm(this.userSelected);

      this.onUserFormFirstChange();

      this.getStatesList(this.userSelected.country);
    }
  }

  onCountrySelected(countryName: string): void {
    this.getStatesList(countryName);
  }

  private onUserFormFirstChange(): void {
    this.userFormValueChangesSubs = this.userForm.valueChanges
      .pipe(
        filter(() => this.userForm.dirty),
        take(1)
      )
      .subscribe(() => this.onUserFormFirstChangeEmitt.emit());
  }

  private onUserFormSatusChange(): void {
    this.userForm.statusChanges
    .pipe(
      distinctUntilChanged()
    )
    .subscribe(() => this.onFormStatusChangeEmitt.emit(this.userForm.valid));
  }

  private getStatesList(country: string): void {
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
