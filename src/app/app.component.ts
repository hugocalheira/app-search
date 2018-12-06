import { Component, OnInit, EventEmitter } from '@angular/core';
import { SearchService } from './search/search.service';
import { Search } from './search/search';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public title = 'AppSearch';
  public session: UserSession;

  public profileStyle = {};

  searchResult: EventEmitter<[string, Search[]]> = new EventEmitter();

  constructor(private _service: SearchService) { }

  ngOnInit() {

    this._service.session().subscribe(dados => {
      this.session = dados;
      this.profileStyle = { 'background-image': 'url(' + this.session.pic + ')' };
    }, erro => console.log(erro));

  }

  receiveData($event) {
    this.searchResult.emit($event);
  }

}

export interface UserSession {
  user: string;
  pic: string;
}
