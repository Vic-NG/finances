import { Component, OnInit } from '@angular/core';

import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-categorie-list',
  templateUrl: './categorie-list.component.html',
  styleUrls: ['./categorie-list.component.css']
})
export class CategorieListComponent implements OnInit {

  categories: Category[] = [];

  constructor(private service: CategoryService) { }

  ngOnInit() {
    this.service.getAll().subscribe(
      categories => this.categories = categories,
      error => console.log('Erro ao carregar lista', error)
    )
  }

  deleteCategory(category) {
    const mustDelete = confirm('Deseja realmente excluir este item?');

    if(mustDelete) {
      this.service.delete(category.id).subscribe(
        () => this.categories = this.categories.filter(element => element != category),
        (error) => console.log('Erro ao tentar exlcuir', error)
      )
    }
  }


}
