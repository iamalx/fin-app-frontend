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
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];
//  lineChartLabels is the main array to display the dates
  public lineChartLabels: Array<any> = ['Jun','Jul',"Aug",'Sep','Oct','Nov',"Dec",'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  public lineChartOptions: any = {
    responsive: true
  };
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
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
//-----------------------------------------------------------------------------------------------------------------   
  user: any;
  finalClosingDataArray: any [] = [];
  finalLineChartArray: any [] = [];
  
  arrayWithDates: any[] = [];    
  finalMonthChartArray: any [] = [];
  finalMonthTableArray: any [] = [];
  mainProperty: any;
  //------------------------------
  dailyProp: any;
  arrayOfDailyDates: any[] = [];
  objofDailyData: any = {};
  date: string = '';
  open: string = '';
  high: string = '';
  low: string = '';
  close: string = '';
  volume: string = '';
  //---------------------------
  newsData: any;
  newsArray: any[] = [];
  // subscribe for stock API; turn ng2 data into a single array and = lineChartData
  onApi(symbol) {
    //this.tickersymbolSearch = '';
    //this.lineChartData = [];
    //this._apiService.stockSymbol = '';
    this._apiService.getStockData(symbol)
      .subscribe((response) =>  {
        //this._apiService.stockSymbol = '';
        //console.log(response, '#2')
        if( Object.keys(response)[0] == "Meta Data" ) {
          this._apiService.stockSymbol = symbol;
          this.mainProperty = response[this._apiService.mainPropertyKey];
          for(let property in this.mainProperty) {
            this.finalClosingDataArray.push(parseFloat(this.mainProperty[property]['4. close']));
          };
          this.finalClosingDataArray = this.finalClosingDataArray.reverse()
            .slice(this._apiService.sliceNum1);
          //this.finalMonthChartArray.push(Object.keys(response['Time Series (Daily)']));
          //console.log(this.finalMonthChartArray, "finalMonth");
          this.finalLineChartArray = [ 
            {
              data: (this.finalClosingDataArray),
              label: 'Series A'
            }
          ];
          this.lineChartData =  this.finalLineChartArray;
          //-------------------------------------------------------------------------------- side bar info
          //------------------------------------------------------------------------------- graph & table dates 
          this.lineChartLabels = [];
          console.log(this.mainProperty, Object.keys(this.mainProperty), '#3')
          this.finalMonthChartArray = Object.keys(this.mainProperty);
          this.finalMonthChartArray = this.finalMonthChartArray.reverse().slice(this._apiService.sliceNum1);
          this.lineChartLabels = this.finalMonthChartArray;
          //this.finalMonthTableArray = this.lineChartLabels.slice(88,102);
          //this.finalMonthChartArray[0].forEach(item => console.log(item));
          // for(let i = 0; i < this.finalMonthChartArray.length ; i++) {
          // };
          //------------------------------------------------------------------------------- set stock prices to global property 
          this.dailyProp = response["Time Series (Daily)"];
          for(let prop in this.dailyProp) {
            this.arrayOfDailyDates.push(this.dailyProp[prop]); 
          };
          this.objofDailyData = this.arrayOfDailyDates[0];
          this.date = Object.keys(this.dailyProp)[0];
          this.open = this.objofDailyData["1. open"].slice(0,6);
          this.high = this.objofDailyData["2. high"].slice(0,6);
          this.low = this.objofDailyData["3. low"].slice(0,6); 
          this.close = this.objofDailyData["4. close"].slice(0,6); 

          this._newsService.stockNewsCall(this._apiService.stockSymbol)
            .subscribe( (response: any) => {
              console.log(response, "inSubscribe#") 
              response.forEach( each => {
                this.newsData = {
                title: each.headline,
                imgs: each.image,
                source: each.source,
                summary: `${each.summary.slice(0,148)}...` ,
                url: each.url
                };
                
                this.newsArray.push(this.newsData)
                this.newsData = {};

              })
              //console.log(this.newsArray[1].summary, "#7")
              console.log(this.newsData, this.newsArray)
            })
        } else {
          this._apiService.stockSymbol = '';
          alert(`Sorry "${symbol}" could not be found \nPlease try a different stock`)
        }
        console.log(this._apiService.stockSymbol)
      });
    // un-comment if you want to show all of ur searches (bellow)
    //this.lineChartData = [];
    this.finalClosingDataArray = [];
    //this._apiService.stockSymbol = '';
  };
  //----------------------------------------------------------------------------------------- fav list stock price

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
  }
 
}


