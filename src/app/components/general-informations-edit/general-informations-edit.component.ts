import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CountriesList } from '../../types/countries-list';

@Component({
  selector: 'app-general-informations-edit',
  templateUrl: './general-informations-edit.component.html',
  styleUrl: './general-informations-edit.component.scss',
})
export class GeneralInformationsEditComponent {
  @Input({required: true}) userForm!: FormGroup;
  @Input({required: true}) countriesList: CountriesList = [];

  get emailControl(): FormControl {
    return this.userForm.get('generalInformations.email') as FormControl;
  }
}
