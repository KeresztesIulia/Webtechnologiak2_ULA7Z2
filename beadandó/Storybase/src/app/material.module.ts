import { NgModule } from '@angular/core';

//Angular Material Components
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { MatLabel } from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatLabel,
    MatGridListModule,
    MatFormFieldModule
  ],
  exports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatLabel,
    MatGridListModule,
    MatFormFieldModule
  ]
})

export class MaterialModule { }