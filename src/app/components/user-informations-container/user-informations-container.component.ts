import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { IUser } from '../../interfaces/user/user.interface';
import { UserFormController } from './user-form-controller';
import { CountriesService } from '../../services/countries.service';
import { take } from 'rxjs';
import { CountriesList } from '../../types/countries-list';

@Component({
  selector: 'app-user-informations-container',
  templateUrl: './user-informations-container.component.html',
  styleUrl: './user-informations-container.component.scss'
})
export class UserInformationsContainerComponent extends UserFormController implements OnChanges, OnInit {
  @Input({ required: true }) userSelected: IUser | undefined = {} as IUser;
  @Input({ required: true }) isInEditMode: boolean = false;

  private readonly _countriesService = inject(CountriesService);

  public currentTabIndex: number = 0;
  public countriesList: CountriesList = [];

  ngOnInit(): void {
    this.getCountriesList();
  }

  ngOnChanges(_: SimpleChanges): void {
    this.currentTabIndex = 0;

    if (this.userSelected) {
      this.fulfillUserForm(this.userSelected);
    }
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
