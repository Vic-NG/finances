import { Component, OnInit } from '@angular/core';

import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';

@Component({
  selector: 'app-categorie-list',
  templateUrl: './categorie-list.component.html',
  styleUrls: ['./categorie-list.component.css']
})
export class CategorieListComponent implements OnInit {

  entries: Entry[] = [];

  constructor(private service: EntryService) { }

  ngOnInit() {
    this.service.getAll().subscribe(
      entries => this.entries = entries,
      error => console.log('Erro ao carregar lista', error)
    )
  }

  deleteEntry(entry) {
    const mustDelete = confirm('Deseja realmente excluir este item?');

    if(mustDelete) {
      this.service.delete(entry.id).subscribe(
        () => this.entries = this.entries.filter(element => element != entry),
        (error) => console.log('Erro ao tentar exlcuir', error)
      )
    }
  }


}
