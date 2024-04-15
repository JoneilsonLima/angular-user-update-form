import { NgModule } from "@angular/core";
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

const allModules = [
  MatCardModule,
  MatTabsModule,
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule
]

@NgModule({
    imports: allModules,
    exports: allModules
})
export class AngularMaterialModule {

}
