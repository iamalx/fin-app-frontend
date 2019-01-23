import { Component, OnInit } from '@angular/core';
import { StockApiService } from '../stock-api.service';
import { NewsApiService } from '../news-api.service';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';



@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  constructor(  private _user: UserService,
    private _stock: StockApiService,
    private _newsService: NewsApiService,
    private _data: DataService
  ) {}

  ngOnInit() {
  }
  
  

}
