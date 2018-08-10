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


@Component({
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  
  //logic for the the chart from ng2Charts ==================================
  // linechartData is the main array that displays the graph
   public lineChartData: Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];
//  lineChartLabels is the main array to display the dates
  public lineChartLabels:Array<any> = ['Jun','Jul',"Aug",'Sep','Oct','Nov',"Dec",'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
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
 
  // public randomize():void {
  //   let _lineChartData:Array<any> = new Array(this.lineChartData.length);
  //   for (let i = 0; i < this.lineChartData.length; i++) {
  //     _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
  //     for (let j = 0; j < this.lineChartData[i].data.length; j++) {
  //       _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
  //     }
  //   }
  //   this.lineChartData = _lineChartData;
  // }
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
    tickersymbolSearch: string ='';
    arrayOfDailyDates: any[] = []
    objofDailyData: any = {}
    date: string = ''
    open: string =''
    high: string =''
    low: string =''
    close: string =''
    volume: string =''
    
    //----------------------------------------------
   
    
    constructor(private _user:UserService,
                private _apiService: StockApiService) {}
    //subscribe for mlab & loopback
    ngOnInit() {
     this._user.getUser(sessionStorage.getItem("userId"), sessionStorage.getItem('token'))
        .subscribe((response: any) => {
          console.log('hello')
          console.log(response, 'ngoit home subs');
          this.user = response;
        });
   // this.onApi();
     };
    // subscribe for stock API; turn ng2 data into a single array and = lineChartData
    onApi(symbol) {
      this.tickersymbolSearch = symbol;
      //this.lineChartData = [];
      //this._apiService.stockSymbol = '';
      this._apiService.getStockData(symbol)
        .subscribe((response) =>  {
          //this._apiService.stockSymbol = '';
          this.mainProperty = response[this._apiService.mainPropertyKey];
          for (let property in this.mainProperty) {
              this.finalClosingDataArray.push(parseFloat(this.mainProperty[property]['4. close']));
          };
          this.finalClosingDataArray = this.finalClosingDataArray.reverse().slice(this._apiService.sliceNum1);
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
         // console.log(this.mainProperty, 'mainprop>')
          this.finalMonthChartArray = Object.keys(this.mainProperty);
         // console.log(this.finalMonthChartArray, 'dates in an array?');
          this.finalMonthChartArray = this.finalMonthChartArray.reverse().slice(this._apiService.sliceNum1);
         // console.log(this.finalMonthChartArray, "reversed & sliced?");
          this.lineChartLabels = this.finalMonthChartArray;
          //this.finalMonthTableArray = this.lineChartLabels.slice(88,102);
          //this.finalMonthChartArray[0].forEach(item => console.log(item));
          // for(let i = 0; i < this.finalMonthChartArray.length ; i++) {
          // console.log(this.finalMonthChartArray[0][i]);
          // };
          
          this.dailyProp = response["Time Series (Daily)"];
          console.log(this.dailyProp, "dailyProp");
          for(let prop in this.dailyProp) {
            this.arrayOfDailyDates.push(this.dailyProp[prop]);
            
          };
          console.log(this.arrayOfDailyDates, 'arrayOfDailyDates');
          this.objofDailyData = this.arrayOfDailyDates[0];
          this.date = Object.keys(this.dailyProp)[0];
          
          console.log(this.objofDailyData, 'objofDailyData');
          this.open = this.objofDailyData["1. open"];
         
          this.high = this.objofDailyData["2. high"];
          this.low = this.objofDailyData["3. low"]; 
          this.close = this.objofDailyData["4. close"]; 
          this.volume = this.objofDailyData["5. volume"]; 
          
        });
      // un-comment if you want to show all of ur searches (bellow)
      //this.lineChartData = [];
      this.finalClosingDataArray =[];
      //this._apiService.stockSymbol = '';
    };
    
     //----------------------------------------------------------------------------------------- fav list stock price

  getDailyyData(symbol) {
    this._apiService.stockUrl= 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=';
    this._apiService.stockUrl2 = '&outputsize=compact&apikey=ARCGC8U9ZSC7IA7V';
    this._apiService.mainPropertyKey = 'Time Series (Daily)';
    this.onApi(symbol);
  };

  getWeeklyData(symbol) {
    
  }; 
  
  getMonthlyData(symbol) {
   
    this._apiService.stockUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=';
    this._apiService.stockUrl2= '&apikey=ARCGC8U9ZSC7IA7V';
    this._apiService.mainPropertyKey = 'Monthly Time Series';
    this.onApi(symbol);
  };
  
  getYearlyData(symbol) {
    
  }  
 //------------------------------------------------------------------------------------------------------------------------------   
    
 }
