import { Component, OnInit, Input } from '@angular/core';
import { Router ,ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { StockApiService } from '../stock-api.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  constructor( private _user: UserService,
              private _stock: StockApiService, 
              private _home: HomeComponent) { }

  ngOnInit() {
    this.getFav();
  }
  
  listArray: any = [];
  list: any = {
    symbol: ''
  };
  finalProp: string = ''; 
  realTimeDataProp: string = '';
  finalClosingPrice: any[] = [];
  finalPriceNumber: string = '';
//   onLink(item) {
//   this._home.onApi(item)
//   this._stock.serviceIntraDay(index.symbol)
//     .subscribe( response => {
// }
  getIntraPrice() {
    this.listArray.map( index => {
    this._stock.serviceIntraDay(index.symbol)
      .subscribe( response => {
        this.realTimeDataProp = response["Time Series (15min)"]; 
        this.finalProp = Object.keys(this.realTimeDataProp)[0];
        this.finalClosingPrice.push(this.realTimeDataProp[this.finalProp]["4. close"]);
      })
    })
  };
  // getIntraPrice() {
  //   let finalProp: string = ""; 
  //   console.log(this.listArray, "listArray")
  //   for(let i = 0; i < this.listArray.length; i++ ) {
  //     console.log(this.listArray[i].symbol, "inforLoop");
  //     this._stock.serviceIntraDay(this.listArray[i].symbol) 
  //       .subscribe( response => {
  //       console.log(this.listArray[i].symbol, "subs-symbol");
  //         this.realTimeDataProp = response["Time Series (15min)"]; 
  //         console.log(this.realTimeDataProp);
  //         finalProp = Object.keys(this.realTimeDataProp)[0];
  //         this.finalClosingPrice.push(this.realTimeDataProp[Object.keys(this.realTimeDataProp)[0]]["4. close"]);
  //         console.log(this.finalClosingPrice, "final closign");
  //     })
  //   }
  // };
  getFav() {
    this._user.getFavoritesData(window.sessionStorage.getItem('token'), window.sessionStorage.getItem('userId'))
    .subscribe((response: any) => {
      this.listArray = response;
      this.getIntraPrice();
      this.finalClosingPrice =[];
    })  
  }
//adds a stock to fav by posting list obj and unique id and token of user 
  addFavorite() {
    this.list.symbol = this._stock.stockSymbol;
    this._user.saveFavorite(this.list, window.sessionStorage.getItem('token'), window.sessionStorage.getItem('userId'))
      .subscribe((response: any) => {
        this.getFav();
      })
  };
  deleteAvail() {}
  deleteFavcomp(finUserId, id) {
    this._user.deleteFavUser(window.sessionStorage.getItem('token'), id , finUserId )
    .subscribe( (response: any) => {
      this.getFav();
    })
  }
}
