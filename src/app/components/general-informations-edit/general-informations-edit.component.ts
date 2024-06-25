import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CountriesList } from '../../types/countries-list';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { StatesList } from '../../types/states-list';
import { maritalStatusArray } from '../../utils/marital-status-description-map';

@Component({
  selector: 'app-general-informations-edit',
  templateUrl: './general-informations-edit.component.html',
  styleUrl: './general-informations-edit.component.scss',
})
export class GeneralInformationsEditComponent implements OnInit, OnChanges{
  @Input({required: true}) userForm!: FormGroup;
  @Input({required: true}) countriesList: CountriesList = [];
  @Input({required: true}) statesList: StatesList = [];

  @Output('onCountrySelected') onCountrySelectedEmitter = new EventEmitter<string>();

  public countriesListFiltered: CountriesList = [];
  public statesListFiltered: StatesList = [];

  ngOnInit(): void {
    this.watchCountryFormChangesAndFilter();
    this.watchStateFormChangesAndFilter();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.countriesListFiltered = this.countriesList;
    this.statesListFiltered = this.statesList;
  }

  get maritalStatusArray(){
    return maritalStatusArray;
  }

  get emailControl(): FormControl {
    return this.userForm.get('generalInformations.email') as FormControl;
  }

  get countryControl(): FormControl {
    return this.userForm.get('generalInformations.country') as FormControl;
  }

  get stateControl(): FormControl {
    return this.userForm.get('generalInformations.state') as FormControl;
  }

  onCountrySelected(event: MatAutocompleteSelectedEvent): void {
    this.onCountrySelectedEmitter.emit(event.option.value);
  }

  onStateSelected(event: MatAutocompleteSelectedEvent) {
    console.log(event.option.value);
  }

  private watchStateFormChangesAndFilter(): void {
    this.stateControl.valueChanges.subscribe(this.filteredStateList.bind(this));
  }

  private filteredStateList(searchTerm: string): void {
    this.statesListFiltered = this.statesList?.filter((state) => {
      return state.name.toLocaleLowerCase().includes(searchTerm?.toLocaleLowerCase().trim());
    })
  }

  private watchCountryFormChangesAndFilter(): void {
    this.countryControl?.valueChanges.subscribe(this.filterCountriesList.bind(this));
  }

  private filterCountriesList(searchTerm: string): void {
    this.countriesListFiltered = this.countriesList?.filter((country) => {
      return country.name.toLocaleLowerCase().includes(searchTerm?.toLocaleLowerCase().trim());
    })
  }
}
