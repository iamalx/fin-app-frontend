import { Component, OnInit } from '@angular/core';
import { StockApiService } from '../stock-api.service';
// import { SideBarComponent } from '../side-bar/side-bar.component';
import { UserService } from '../user.service';
import { ChartsModule } from 'ng2-charts';
import { DataService } from '../data.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  constructor(  private _stock: StockApiService, 
                // private _sidebar: SideBarComponent,
                private _user: UserService, 
                private _data: DataService) {}

  ngOnInit() {
    this._user.getUser(sessionStorage.getItem("userId"), sessionStorage.getItem('token'))
    .subscribe((response: any) => {
      //this.user = response;
    });
  }
}
