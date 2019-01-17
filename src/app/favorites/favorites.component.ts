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
  };
  
  favoriteList: array = [];
  favoriteData: any = {};
  stockArray: array = [];
  stockData: any = {};
  //idAndSymbol: any = {};
  
 // step 2) for each index send the ticker symbol to obtain an obj with the price and stock symbol (metadata), place those 2 in an obj and then push them in an array.
 // (side note: the ticker symbol is send in the order they appear in the 'stockArray', but are not received in order(FavoriteList), therefore, it is not easy to link price, symbol and id in the same obj in order)
  getIntraPrice(symbolArray: any) {
    symbolArray.map( index => {
      this._stock.serviceIntraDay(index.symbol)
        .subscribe( response => {
          console.log(response, "#2")
          this.favoriteData.symbol = response['Meta Data']['2. Symbol']
          let priceKey = Object.keys(response["Time Series (15min)"])[0]
          this.favoriteData.price = response["Time Series (15min)"][priceKey]["4. close"]
          this.favoriteList.push(this.favoriteData)
          this.favoriteData = {}
        })
      })
  }
// 1st step) Get all favorite stock symbols from backend and place corresponding instance ID and symbol in an obj and push it in array; invoke getIntraPrice to get the price from the API   
  getFav() {
    this._user.getFavoritesData(window.sessionStorage.getItem('token'), window.sessionStorage.getItem('userId'))
    .subscribe((response: any) => {
      console.log(response, "#3.1")
      response.forEach( each => {
        this.stockData.id = each.id;
        this.stockData.symbol = each.symbol;
        this.stockArray.push(this.stockData)
        this.stockData = {}
      })

      console.log(this.stockArray, '#3.2')
      this.getIntraPrice(response);
    })  
  }

//adds a stock to fav by posting list obj, unique id and token of user 
  addFavorite() {
    let list = {
      symbol: ''
    }
    list.symbol = this._stock.stockSymbol;
    this._user.saveFavorite(list, window.sessionStorage.getItem('token'), window.sessionStorage.getItem('userId'))
      .subscribe((response: any) => {
        this.getFav();
      })
  };
  
  deleteAvail() {}
  // delete favorite stock symbol by sending token, and userId to banckend
  deleteFavorite(id) {
    console.log('presed')
    this._user.deleteFavUser(window.sessionStorage.getItem('token'), id , window.sessionStorage.getItem('userId'))
      .subscribe( (response: any) => {
        console.log(response)
        this.getFav();
      })
  }
}
