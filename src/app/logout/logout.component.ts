import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(  private _user: UserService,
                private _router: Router) { }

  ngOnInit() {
    console.log('onlogout')
  }
  //logs out by calling logOut in user.service and sending token
  onLogout() {
    // this._user.displayLogin = false;
    this._user.onLogOut(window.sessionStorage.getItem('token'))
      .subscribe( res => {
        alert("Logout successfully");
        this._user.isLogIn = true;
        window.sessionStorage.clear();
        this._router.navigateByUrl('/login');
      })
    
  }
}
