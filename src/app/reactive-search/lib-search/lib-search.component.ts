import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.scss']
})
export class LibSearchComponent implements OnInit {

  queryField = new FormControl();
  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';
  results$: Observable<any>;
  total: number;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onSearch() {
    const fields = 'name,description,filename,version,homepage';
    let valuePesquisa = this.queryField.value;
    if (valuePesquisa && (valuePesquisa = valuePesquisa.trim()) !== '') {

      // forma n?o elegante
      const params_ = {
        search: valuePesquisa,
        fields: fields
      };

      // forma elegante
      let params = new HttpParams();
      params = params.set('search', valuePesquisa);
      params = params.set('fields', fields);

      this.results$ = this.http
        .get(this.SEARCH_URL, { params })
        .pipe(
          tap((res: any) => (this.total = res.total)),
          map((res: any) => res.results)
        );
    }
  }

}
