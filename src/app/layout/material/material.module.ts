import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';



const components = [
  MatButtonModule,
  MatDialogModule
];

@NgModule({
  declarations: [],
  imports: [components],
  exports: [components]
})
export class MaterialModule { }
