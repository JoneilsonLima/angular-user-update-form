import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CountriesList } from '../../types/countries-list';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-general-informations-edit',
  templateUrl: './general-informations-edit.component.html',
  styleUrl: './general-informations-edit.component.scss',
})
export class GeneralInformationsEditComponent implements OnInit, OnChanges{
  @Input({required: true}) userForm!: FormGroup;
  @Input({required: true}) countriesList: CountriesList = [];

  public countriesListFiltered: CountriesList = [];

  ngOnInit(): void {
    this.watchCountryFormChangesAndFilter();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.countriesListFiltered = this.countriesList;
  }

  get emailControl(): FormControl {
    return this.userForm.get('generalInformations.email') as FormControl;
  }

  get countryControl(): FormControl {
    return this.userForm.get('generalInformations.country') as FormControl;
  }

  onCountrySelected(event: MatAutocompleteSelectedEvent) {
    console.log(event.option.value);
  }

  private watchCountryFormChangesAndFilter(): void {
    this.countryControl?.valueChanges.subscribe(this.filterCountriesList.bind(this));
  }

  private filterCountriesList(searchTerm: string) {
    this.countriesListFiltered = this.countriesList.filter((country) => {
      return country.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase().trim());
    })
  }
}
