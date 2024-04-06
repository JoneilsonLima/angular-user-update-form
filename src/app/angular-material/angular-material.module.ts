import { NgModule } from "@angular/core";
import { MatCardModule } from '@angular/material/card';

const allModules = [
  MatCardModule
]

@NgModule({
    imports: allModules,
    exports: allModules
})
export class AngularMaterialModule {

}
