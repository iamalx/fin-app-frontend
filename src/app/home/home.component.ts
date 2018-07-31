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
import { StockApiService } from '../stock-api.service'

@Component({
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
   
   public lineChartData: Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];
  public lineChartLabels:Array<any> = ['Jun','Jul',"Aug",'Sep','Oct','Nov',"Dec",'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
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
 
  public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }
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
    mainProperty: any = {};
    
    constructor(private _user:UserService,
                private _apiService: StockApiService) {}
    //subscribe for mlab & loopback
    ngOnInit() {
     this._user.getUser(sessionStorage.getItem("userId"), sessionStorage.getItem('token'))
        .subscribe((response) => {
          console.log(response);
          this.user = response;
            })
   // this.onApi();
     }
    // subscribe for stock API
    onApi(symbol) {
      //this.lineChartData = [];
        //this._apiService.stockSymbol = '';
        this._apiService.getStockData(symbol)
          .subscribe((response) =>  {
            console.log(response, "response");
            this._apiService.stockSymbol = '';
            this.mainProperty = response['Time Series (Daily)'];
            
            for (let property in response['Time Series (Daily)']) {
              this.finalClosingDataArray.push(parseFloat(this.mainProperty[property]['4. close']));
             
           };
            console.log( this.finalClosingDataArray, "pushed, not reversed")
           this.finalClosingDataArray = this.finalClosingDataArray.reverse().slice(88,102);
           console.log(this.finalClosingDataArray, 'reversed numbers');
           
            //this.finalMonthChartArray.push(Object.keys(response['Time Series (Daily)']));
            //console.log(this.finalMonthChartArray, "finalMonth");
            this.finalLineChartArray = [ 
              {
                data: (this.finalClosingDataArray),
                label: 'Series A'
              }
            ];
            this.lineChartData =  this.finalLineChartArray;
            //--------------------------------------------------------------------------------
            //console.log(this.final)
            this.lineChartLabels = [];
            console.log(this.finalMonthChartArray, 'finalMothChartArray');
            this.finalMonthChartArray = Object.keys(this.mainProperty);
            console.log(this.finalMonthChartArray, 'dates in an array?');
            this.finalMonthChartArray = this.finalMonthChartArray.reverse().slice(88,102);
            console.log(this.finalMonthChartArray, "reversed & sliced?");
            this.lineChartLabels = this.finalMonthChartArray;
            //this.finalMonthTableArray = this.lineChartLabels.slice(88,102);
            //this.finalMonthChartArray[0].forEach(item => console.log(item));
            // for(let i = 0; i < this.finalMonthChartArray.length ; i++) {
            // console.log(this.finalMonthChartArray[0][i]);
            // };
          });
          // un-comment if you want to show all of ur searches (bellow)
          //this.lineChartData = [];
          this.finalClosingDataArray =[];
          //this._apiService.stockSymbol = '';
    }
    
   
 //------------------------------------------------------------------------------------------------------------------------------   
    
 }
