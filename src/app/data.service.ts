import { Injectable } from '@angular/core';
import { StockApiService } from './stock-api.service'
import { NewsApiService } from './news-api.service';

@Injectable()
export class DataService {

  constructor( private _stock: StockApiService,
                private _newsService: NewsApiService ) { }

  //logic for the the chart from ng2Charts ==================================
  // linechartData is the main array that displays the graph
  public lineChartData: Array<any> = [
    {},
  ];
  //  lineChartLabels is the main array to display the dates
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true,
    legend: {
      display: true,
      labels: {
      }, 
      title: {
        display: true,
        position: "top", 
        text: "Up-to-date prices"
      }
    }
  };
  //public data: number[] = [6];
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
  //-------------------------------------------------------------------------------------------------------
  finalClosingDataArray: any [] = [];
  finalLineChartArray: any [] = [];    
  stockPricesObj: any;
  dateLabelsArray: any = [];

  dailyProp: any;
  arrayOfDailyDates: any[] = [];
  objofDailyData: any = {};
  sideStockData: any = {};
 
  newsData: any;
  newsArray: any[] = [];

  // subscribe for stock API; turn ng2 data into a single array and = lineChartData
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
    this._newsService.stockNewsCall(this._stock.stockSymbol)
      .subscribe((response: any) => {
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
  
  setLineChartLabels() {
    this.dateLabelsArray = Object.keys(this.stockPricesObj)
      .reverse().slice(this._stock.sliceNum1);
    if(this._stock.stockUrl1 == 'TIME_SERIES_INTRADAY&symbol=') {
      this.dateLabelsArray = this.dateLabelsArray.map( elem => {
        return elem.split(' ')[1].slice(0,5)
      })
    }
    this.lineChartLabels = this.dateLabelsArray
  }

  onApi(symbol) {
    console.log(symbol, "onAPI")
    this.finalLineChartArray = [];
    this._stock.getStockData(symbol)
      .subscribe((response: any) =>  {
        if( Object.keys(response)[0] == "Meta Data" ) {
          this._stock.stockSymbol = symbol;
          this.stockPricesObj = response[this._stock.mainPropertyKey];
          for(let property in this.stockPricesObj) {
            this.finalClosingDataArray.push(parseFloat(this.stockPricesObj[property]['4. close']));
          };
          this.finalLineChartArray = [ 
            {
              data: (this.finalClosingDataArray.reverse().slice(this._stock.sliceNum1)),
              label: this._stock.stockSymbol
            }
          ];
          this.lineChartData =  this.finalLineChartArray;
          this.setLineChartLabels()
          this.setCurrentData(response)
          this.getNews()
        } else {
          this._stock.stockSymbol = '';
          alert(`Sorry "${symbol}" could not be found \nPlease try a different stock`)
        }
      });
    // un-comment if you want to show all of ur searches (bellow)
    //this.lineChartData = [];
    
  };
}
