import { Component, OnInit } from '@angular/core';
import { StockApiService } from '../stock-api.service';
import { DataService } from '../data.service';

// import { ChartComponent } from '../chart/chart.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {

  constructor( private _stock: StockApiService,
                private _data: DataService
              // private _chart: ChartComponent 
              ) { }

  ngOnInit() {
  }

  //different api-point to request different data 
  getDailyyData(symbol) {
    console.log(symbol, "day")
    this._stock.stockUrl1= 'TIME_SERIES_DAILY&symbol=';
    this._stock.stockUrl2= '&apikey=ARCGC8U9ZSC7IA7V';
    this._stock.mainPropertyKey= 'Time Series (Daily)';
    this.isButtonActive = 'daily';
    if(symbol) {
     this._data.onApi(symbol)
    }
    else return 
  };

  isButtonActive: string = 'daily'
  getWeeklyData(symbol) {
    console.log(symbol, "week")
    this._stock.stockUrl1 = 'TIME_SERIES_WEEKLY&symbol=';
    this._stock.stockUrl2 = '&apikey=ARCGC8U9ZSC7IA7V';
    this._stock.mainPropertyKey = 'Weekly Time Series';
    this.isButtonActive = 'weekly';
    if(symbol) {
      this._data.onApi(symbol)
    }
    else return 
  }; 
  
  getMonthlyData(symbol) {
    console.log(symbol, "month")
    this._stock.stockUrl1 = 'TIME_SERIES_MONTHLY&symbol=';
    this._stock.stockUrl2 = '&apikey=ARCGC8U9ZSC7IA7V';
    this._stock.mainPropertyKey = 'Monthly Time Series';
    this.isButtonActive = 'monthly';
    if(symbol) {
      this._data.onApi(symbol)
    }
    else return 
  };
  
  getIntraDayData(symbol) {
    console.log(symbol, "intra")
    this._stock.stockUrl1 = 'TIME_SERIES_INTRADAY&symbol=';
    this._stock.stockUrl2= '&interval=30min&apikey=ARCGC8U9ZSC7IA7V';
    this._stock.mainPropertyKey= 'Time Series (30min)'
    this.isButtonActive = 'intraDay';
    if(symbol) {
      this._data.onApi(symbol)
    }
    else return 
  };

}
