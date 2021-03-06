import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, filter, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';

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
  readonly FIELDS = 'name,description,filename,version,homepage';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.results$ = this.queryField.valueChanges
    .pipe (
      map(value => value.trim()),
      filter(value => value.length > 1),
      debounceTime(200),
      distinctUntilChanged(),
      // tap(value => console.log(value)),
      switchMap(value => this.http.get(this.SEARCH_URL, {
        params: {
          search: value,
          fields: this.FIELDS
        }
      })),
      tap((res: any) => this.total = res.total),
      map((res: any) => res.results
      )
    );
  }

  onSearch() {
    let valuePesquisa = this.queryField.value;
    if (valuePesquisa && (valuePesquisa = valuePesquisa.trim()) !== '') {

      // forma n?o elegante
      const params_ = {
        search: valuePesquisa,
        fields: this.FIELDS
      };

      // forma elegante
      let params = new HttpParams();
      params = params.set('search', valuePesquisa);
      params = params.set('fields', this.FIELDS);

      this.results$ = this.http
        .get(this.SEARCH_URL, { params })
        .pipe(
          tap((res: any) => (this.total = res.total)),
          map((res: any) => res.results)
        );
    }
  }

}
