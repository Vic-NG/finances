import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategorieListComponent } from './categorie-list/categorie-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CategorieListComponent, CategoryFormComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    ReactiveFormsModule
  ]
})
export class CategoriesModule { }
