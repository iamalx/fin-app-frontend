import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StockApiService {

constructor( private _http: HttpClient) { }

    mainPropertyKey: string = 'Time Series (Daily)';
    sliceNum1: number= -12;
    // sliceNum2: number= 0;   
    baseUrl: string = 'https://www.alphavantage.co/query?function=';
    stockUrl1: string = 'TIME_SERIES_DAILY&symbol=';
    stockSymbol: string = '';
    stockUrl2: string = '&apikey=ARCGC8U9ZSC7IA7V';
    completeURL: string =  `${this.baseUrl}${this.stockUrl1}${this.stockSymbol}${this.stockUrl2}`;

    //gets stock data by search
    getStockData( symbol: string) {
        // console.log(this.stockUrl2, this.mainPropertyKey, "onservice");
        // console.log(this.stockUrl1, "onservice2");
        this.stockSymbol = symbol;
        //console.log(this.stockSymbol, "#1");
        this.completeURL= `${this.baseUrl}${this.stockUrl1}${symbol}${this.stockUrl2}`;
        // this.mainPropertyKey = 'Time Series (Daily)'
        return this._http.get(this.completeURL) 
        };
        
    //Api for Favorites price
    serviceIntraDay(symbol: string) {
        this.stockUrl2 = '&apikey=ARCGC8U9ZSC7IA7V';
        return this._http.get(`${this.baseUrl}TIME_SERIES_INTRADAY&symbol=${symbol}&interval=15min${this.stockUrl2}`)
    }

}
