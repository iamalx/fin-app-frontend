/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { RegistrationComponent } from '../registration/registration.component';
import { Router ,ActivatedRoute } from '@angular/router';
import { LogoutComponent } from '../logout/logout.component';
import { UserService } from '../user.service';
import { Component, OnInit } from '@angular/core';
import { StockApiService } from '../stock-api.service';
import { NewsApiService } from '../news-api.service';
import { resolve } from 'path';


@Component({
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  constructor(  private _user: UserService,
                private _apiService: StockApiService,
                private _newsService: NewsApiService ) {}

  ngOnInit() {
  this._user.getUser(sessionStorage.getItem("userId"), sessionStorage.getItem('token'))
    .subscribe((response: any) => {
      this.user = response;
    });
  };
  //logic for the the chart from ng2Charts ==================================
  // linechartData is the main array that displays the graph
  public lineChartData: Array<any> = [
    {},
  ];
  //  lineChartLabels is the main array to display the dates
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: false
  };
  public data: number[] = [6];
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgb(66, 134, 244)',
      pointBackgroundColor: 'rgb(66, 134, 244)',
      pointBorderColor: 'rgb(66, 134, 244)',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
  // events
  public chartClicked(e:any):void {
  }

  public chartHovered(e:any):void {
  }
  //-----------------------------------------------------------------------------------------------------------------   
  user: any;
  finalClosingDataArray: any [] = [];
  finalLineChartArray: any [] = [];    
  stockPricesObj: any;
  //------------------------------
  dateLabelsArray: any = [];
  //------------------------------
  dailyProp: any;
  arrayOfDailyDates: any[] = [];
  objofDailyData: any = {};
  sideStockData: any = {};
  //---------------------------
  newsData: any;
  newsArray: any[] = [];
  // subscribe for stock API; turn ng2 data into a single array and = lineChartData
  onApi(symbol) {
    this._apiService.getStockData(symbol)
      .subscribe((response) =>  {
        if( Object.keys(response)[0] == "Meta Data" ) {
          this._apiService.stockSymbol = symbol;
          this.stockPricesObj = response[this._apiService.mainPropertyKey];
          for(let property in this.stockPricesObj) {
            this.finalClosingDataArray.push(parseFloat(this.stockPricesObj[property]['4. close']));
          };
          this.finalLineChartArray = [ 
            {
              data: (this.finalClosingDataArray.reverse().slice(this._apiService.sliceNum1)),
              label: 'Series A'
            }
          ];
          this.lineChartData =  this.finalLineChartArray;
          this.setLineChartLabels()
          this.setCurrentData(response)
          this.getNews()
        } else {
          this._apiService.stockSymbol = '';
          alert(`Sorry "${symbol}" could not be found \nPlease try a different stock`)
        }
      });
    // un-comment if you want to show all of ur searches (bellow)
    //this.lineChartData = [];
    this.finalClosingDataArray = [];
  };
  //----------------------------------------------------------------------------------------- fav list stock price
  setLineChartLabels() {
    this.dateLabelsArray = [];
    this.dateLabelsArray = Object.keys(this.stockPricesObj)
      .reverse().slice(this._apiService.sliceNum1);
    if(this._apiService.stockUrl1 == 'TIME_SERIES_INTRADAY&symbol=') {
      this.dateLabelsArray = this.dateLabelsArray.map( elem => {
        return elem.split(' ')[1]
      })
      this.lineChartLabels = this.dateLabelsArray;
    } 
    else {
      this.lineChartLabels = this.dateLabelsArray
    }
  }

  setCurrentData(response: any) {
    this.dailyProp = response[Object.keys(response)[1]];
      this.arrayOfDailyDates = []
      for(let prop in this.dailyProp) {
        this.arrayOfDailyDates.push(this.dailyProp[prop]); 
      };
      this.objofDailyData = this.arrayOfDailyDates[0];
      this.sideStockData.date = Object.keys(this.dailyProp)[0];
      this.sideStockData.open = this.objofDailyData["1. open"].slice(0,6);
      this.sideStockData.high = this.objofDailyData["2. high"].slice(0,6);
      this.sideStockData.low = this.objofDailyData["3. low"].slice(0,6); 
      this.sideStockData.close = this.objofDailyData["4. close"].slice(0,6);
  }
  
  getNews() {
    this._newsService.stockNewsCall(this._apiService.stockSymbol)
      .subscribe( (response: any) => {
        this.newsArray = [];
        response.forEach( each => {
          this.newsData = {
            title: `${each.headline.slice(0,70)}...`,
            imgs: each.image,
            source: each.source,
            summary: `${each.summary.slice(0,148)}...` ,
            url: each.url
          };
          this.newsArray.push(this.newsData)
          this.newsData = {};

        })
      })
  }
  //different api-point to request different data 
  getDailyyData(symbol) {
    this._apiService.stockUrl1= 'TIME_SERIES_DAILY&symbol=';
    this._apiService.stockUrl2= '&apikey=ARCGC8U9ZSC7IA7V';
    this._apiService.mainPropertyKey= 'Time Series (Daily)';
    this.isButtonActive = 'daily';
    if(symbol) this.onApi(symbol);
    else return 
  };

  isButtonActive: string = 'daily'
  getWeeklyData(symbol) {
    this._apiService.stockUrl1 = 'TIME_SERIES_WEEKLY&symbol=';
    this._apiService.stockUrl2 = '&apikey=ARCGC8U9ZSC7IA7V';
    this._apiService.mainPropertyKey = 'Weekly Time Series';
    this.isButtonActive = 'weekly';
    if(symbol) this.onApi(symbol);
    else return 
  }; 
  
  getMonthlyData(symbol) {
    this._apiService.stockUrl1 = 'TIME_SERIES_MONTHLY&symbol=';
    this._apiService.stockUrl2 = '&apikey=ARCGC8U9ZSC7IA7V';
    this._apiService.mainPropertyKey = 'Monthly Time Series';
    this.isButtonActive = 'monthly';
    if(symbol) this.onApi(symbol);
    else return 
  };
  
  getIntraDayData(symbol) {
    this._apiService.stockUrl1 = 'TIME_SERIES_INTRADAY&symbol=';
    this._apiService.stockUrl2= '&interval=30min&apikey=ARCGC8U9ZSC7IA7V';
    this._apiService.mainPropertyKey= 'Time Series (30min)'
    this.isButtonActive = 'intraDay';
    if(symbol) this.onApi(symbol);
    else return 
  };

}


