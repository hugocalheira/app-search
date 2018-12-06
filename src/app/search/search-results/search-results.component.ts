import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SearchService } from '../search.service';
import { Search } from '../search';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  public result: Search[];
  public inputField: string;
  public searchForm: FormGroup;
  public sortOrder = [
    { key: 'artist', direction: false, selected: false },
    { key: 'style', direction: false, selected: false },
    { key: 'group', direction: false, selected: false },
    { key: 'age', direction: false, selected: false }
  ];

  constructor(
    private _service: SearchService,
    private _formBuilder: FormBuilder,
    private _parent: AppComponent
  ) { }

  ngOnInit() {
    // inicializa formulário
    this.searchForm = this._formBuilder.group({
      searchField: ['', [Validators.required]]
    });

    // recebe dados do componente pai
    this._parent.searchResult.subscribe(d => this.receiveData(d));
  }

  receiveData($event) {
    this.inputField = $event[0];
    this.result = $event[1];
  }

  /**
   * Executa serviço de busca em servidor RESTful
   * @param order
   */
  doSearch(order = null) {
    const sort = (order) ? order : '';
    this._service.search('/search?q=' + this.inputField + sort).subscribe(
      dados => this.result = dados,
      erro => console.log(erro)
    );
  }

  /**
   * Reseta a busca e retorna para tela inicial.
   */
  doClean() {
    this._service.result = this.inputField = this.result = null;
    this.searchForm.reset();
  }

  /**
   * Requisição seguindo critérios de ordenação.
   * @param e
   */
  orderBy(e) {

    for (let i = 0; i < this.sortOrder.length; i++) {
      if (i === e) {
        this.sortOrder[i].direction = !this.sortOrder[i].direction;
        this.sortOrder[i].selected = true;
      } else {
        this.sortOrder[i].direction = this.sortOrder[i].selected = false;
      }
    }

    this.doSearch('&_sort=' + this.sortOrder[e].key + '&_order=' + ((this.sortOrder[e].direction) ? 'asc' : 'desc'));
  }

  /**
   * Executa ação destinada ao click na lista pesquisada.
   * Comumente a navegação ou detalhes do item clicado.
   * Por se tratar de um mockup, apenas exibe no console.
   * @param item
   */
  doAction(item) {
    console.log(item);
  }

}
