import { Component, OnInit } from '@angular/core';
import { StockApiService } from '../stock-api.service';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { UserService } from '../user.service';
import { ChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  constructor(  private _stock: StockApiService, 
                private _sidebar: SideBarComponent,
                private _user: UserService ) {}

  ngOnInit() {
    this._user.getUser(sessionStorage.getItem("userId"), sessionStorage.getItem('token'))
    .subscribe((response: any) => {
      this.user = response;
    });
  }

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
    },
    scaleLabel: {
      display: false,
      labelString: "Date"
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
  //-----------------------------------------------------------------------------------------------------------------   
  dog: string;
  finalClosingDataArray: any [] = [];
  finalLineChartArray: any [] = [];    
  stockPricesObj: any;
  //------------------------------
  dateLabelsArray: any = [];
  user: any;
  // subscribe for stock API; turn ng2 data into a single array and = lineChartData
  //----------------------------------------------------------------------------------------- fav list stock price
  setLineChartLabels() {
    this.dateLabelsArray = Object.keys(this.stockPricesObj)
      .reverse().slice(this._stock.sliceNum1);
    if(this._stock.stockUrl1 == 'TIME_SERIES_INTRADAY&symbol=') {
      this.dateLabelsArray = this.dateLabelsArray.map( elem => {
        return elem.split(' ')[1]
      })
    }
    this.lineChartLabels = this.dateLabelsArray
    console.log(this.lineChartLabels, "#2")
  }

  onApi(symbol) {
    console.log(symbol, "onAPI")
    this._stock.getStockData(symbol)
      .subscribe((response) =>  {
        console.log(response, "onApiSubs")
        if( Object.keys(response)[0] == "Meta Data" ) {
          console.log(symbol, "#4.2")
          this._stock.stockSymbol = symbol;
          this.stockPricesObj = response[this._stock.mainPropertyKey];
          this.lineChartLabels = [];
          console.log(this.stockPricesObj,  "#4.3")
          for(let property in this.stockPricesObj) {
            this.finalClosingDataArray.push(parseFloat(this.stockPricesObj[property]['4. close']));
          };
          console.log(this.finalClosingDataArray,  "#4.4")
          this.finalLineChartArray = [ 
            {
              data: (this.finalClosingDataArray.reverse().slice(this._stock.sliceNum1)),
              label: 'Stock Price'
            }
          ];
          console.log(this.finalLineChartArray,  "#4.5")
          this.lineChartData =  this.finalLineChartArray;
          console.log(this.lineChartData,  "#4.5")
          this.setLineChartLabels()
          this._sidebar.setCurrentData(response)
          this._sidebar.getNews()
        } else {
          this._stock.stockSymbol = '';
          alert(`Sorry "${symbol}" could not be found \nPlease try a different stock`)
        }
        console.log(this.lineChartData, this.lineChartLabels, "#3")
        this.dog = 'dsdsdsd'
        console.log(this.dog)
      });
    // un-comment if you want to show all of ur searches (bellow)
    //this.lineChartData = [];
    this.finalLineChartArray = [];
  };

}
