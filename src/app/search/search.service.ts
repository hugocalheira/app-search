import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Search } from './search';
import { UserSession } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private readonly API = 'http://localhost:3000';
  public result: boolean;

  constructor(private http: HttpClient) { }

  session() {
    return this.http.get<UserSession>(this.API + '/session');
  }

  search(input) {
    this.result = true;
    return this.http.get<Search[]>(this.API + input);
  }
}
