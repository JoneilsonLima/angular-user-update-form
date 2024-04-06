import { NgModule } from "@angular/core";
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';

const allModules = [
  MatCardModule,
  MatTabsModule
]

@NgModule({
    imports: allModules,
    exports: allModules
})
export class AngularMaterialModule {

}
