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
  
  favoriteList: any = [];
  favoriteData: any = {};

  
  getIntraPrice(symbolArray: any) {
    symbolArray.map( index => {
      this._stock.serviceIntraDay(index.symbol)
        .subscribe( response => {
          this.favoriteData.symbol = response['Meta Data']['2. Symbol']
          let priceKey = Object.keys(response["Time Series (15min)"])[0]
          this.favoriteData.price = response["Time Series (15min)"][priceKey]["4. close"]
          this.favoriteList.push(this.favoriteData)
          this.favoriteData = {}
        })
      })
  }

  getFav() {
    this._user.getFavoritesData(window.sessionStorage.getItem('token'), window.sessionStorage.getItem('userId'))
    .subscribe((response: any) => {
      this.finalClosingPrice =[];
      this.getIntraPrice(response);
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
    this._user.deleteFavUser(window.sessionStorage.getItem('token'), id , finUserId)
      .subscribe( (response: any) => {
        this.getFav();
      })
  }
}
