import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor( private _user:UserService,
                private _router: Router) { }

  ngOnInit() {
  }
  //logs out by calling logOut in user.service and sending token
  onLogout() {
    this._user.displayLogin = false;
    this._user.logOut(window.sessionStorage.getItem('token'));
    console.log(this._user.logOut(window.sessionStorage.getItem('token')), "logout-getItem");
    window.sessionStorage.clear();
    this._router.navigateByUrl('/login');
    this._user.loginFavorite = 'Login to add to favorites';
  }
}
