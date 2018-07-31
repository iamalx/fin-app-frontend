import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StockApiService {

  constructor( private _http: HttpClient) { }
  
    stockUrl: string = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=';
    stockSymbol: string = 'FB';
    stockUrl2: string = '&outputsize=compact&apikey=ARCGC8U9ZSC7IA7V'
    //https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&outputsize=full&apikey=demo
    getStockData( symbol: string) {
      this.stockSymbol  = symbol;
      console.log(this.stockSymbol, "#1");
      return this._http.get( this.stockUrl + this.stockSymbol + this.stockUrl2) 
    }


}
