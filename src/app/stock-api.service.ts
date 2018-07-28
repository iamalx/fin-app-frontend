import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StockApiService {

  constructor( private _http: HttpClient) { }
    stockUrl: string = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='
    stockSymbol: string = 'MSFT'
    stockUrl2: string = '&outputsize=compact&apikey=ARCGC8U9ZSC7IA7V'
    //https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&outputsize=full&apikey=demo
    getStockData() {
        return this._http.get( this.stockUrl + this.stockSymbol + this.stockUrl2) 
        
    }


}
