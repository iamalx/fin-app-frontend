import { Component, OnInit } from '@angular/core';
import { StockApiService } from '../stock-api.service';
import { NewsApiService } from '../news-api.service';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  constructor(  private _user: UserService,
    private _stock: StockApiService,
    private _newsService: NewsApiService,
  ) {}

  ngOnInit() {
  }
  
  dailyProp: any;
  arrayOfDailyDates: any[] = [];
  objofDailyData: any = {};
  sideStockData: any = {};
  //---------------------------
  newsData: any;
  newsArray: any[] = [];

  setCurrentData(response: any) {
    setTimeout( _ => { 
      console.log("oneSetCurrentDate", "#3.1")
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
        console.log(this.sideStockData, "#3.2")
    }, 300 )
 
  }
  
  getNews() {
    console.log("onGetNews", "#4.1")
    this._newsService.stockNewsCall(this._stock.stockSymbol)
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
        console.log(this.newsArray, "#4.2")
      })
      
  }

}
