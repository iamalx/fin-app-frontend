import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NewsApiService {

  constructor(public _http: HttpClient) { }
  

  newsAPI1: string = 'https://api.iextrading.com/1.0/stock/';
  newsAPI2: string = '/news/last/5';
  
  stockNewsCall(tickerSymbol: string) {
    return this._http.get(`${this.newsAPI1}${tickerSymbol}${this.newsAPI2}`)
  }

}
