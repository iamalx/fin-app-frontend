import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { StockApiService } from '../stock-api.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

 addFavorite() {
  // this.
 }

}
