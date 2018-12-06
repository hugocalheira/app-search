import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SearchService } from '../search.service';
import { Search } from '../search';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss']
})
export class SearchFieldComponent implements OnInit {
  
  @Input() widthclass: string;
  @Output() searchResult: EventEmitter<[string, Search[]]> = new EventEmitter();

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
  ) {  }

  ngOnInit() {
    // inicializa formulário
    this.searchForm = this._formBuilder.group({
      searchField: ['', [Validators.required]]
    });
  }

  /**
   * Executa serviço de busca em servidor RESTful
   * @param order
   */
  doSearch(order = null) {
    this.inputField = this.searchForm.get('searchField').value;
    const sort = (order) ? order : '';
    this._service.search('/search?q=' + this.inputField + sort).subscribe(
      dados => {
        this.result = dados;
        this.searchResult.emit([this.inputField, dados]);
      },
      erro => console.log(erro)
    );
  }

}
