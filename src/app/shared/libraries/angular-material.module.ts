/** 
* DBR - Dependencias propias de Angular
* */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** 
* DBR - Dependencias propias de Angular Material
* */
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
    declarations: [],
    //Importar los modulos de Prime NG
    imports: [
        CommonModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        MatDividerModule,
        MatListModule,
        MatExpansionModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatAutocompleteModule,
        MatSelectModule,
        ScrollingModule,
        MatDialogModule,
        MatCheckboxModule
    ],
    //Exportamos los modulos de Prime NG
    exports: [
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        MatDividerModule,
        MatListModule,
        MatExpansionModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatAutocompleteModule,
        MatSelectModule,
        ScrollingModule,
        MatDialogModule,
        MatCheckboxModule
    ]
})

export class AngularMaterialModule { }