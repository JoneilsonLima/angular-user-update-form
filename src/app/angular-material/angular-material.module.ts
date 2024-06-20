import { NgModule } from "@angular/core";
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from "@angular/material/core";

const allModules = [
  MatCardModule,
  MatTabsModule,
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule,
  MatRadioModule,
  MatDatepickerModule
]

@NgModule({
    imports: allModules,
    exports: allModules,
    providers: [
      provideNativeDateAdapter(),
      {
        provide: MAT_DATE_LOCALE,
        useValue: 'pt-BR'
      }],
})
export class AngularMaterialModule {

}
