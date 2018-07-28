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
  
onLogout() {
  this._user.logOut(window.sessionStorage.getItem('token'));
  window.sessionStorage.clear();
  this._router.navigateByUrl('/login');
}
}
