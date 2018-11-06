import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor( private _user: UserService, 
               private _router: Router) { }
  
    ngOnInit() {}
  
    noMatchMessage: string = '';
    noFillMessage: string = '';
    userData: any = {
      email: '',
      password: ''
    }

// getdataberification() {
//   return this._user.getLogin()
//   .subscribe(
//     data => { this.userData = data}
//     )
// };
//subscribes a user and gives a token 
    subscribeFunt() {
        this._user.getLogin(this.userData)
            .subscribe((response: any) => {
              //console.log(response);
                window.sessionStorage.setItem('token', response.token);
                window.sessionStorage.setItem('userId', response.userId);
                console.log(window.sessionStorage.setItem('token', response.token), "login1");
                console.log(window.sessionStorage.setItem('userId', response.userId), "log2");
                this._user.showUserNav(window.sessionStorage.getItem('token'), window.sessionStorage.getItem('userId'));
                this._router.navigate([`/home`]);
                this._user.loginFavorite = "My Favorites";
            })
    };
//called when buttton is clicked and sets the user input values to Userdata obj
    loginFunct(email:string, password: string) {
        if(email !='' &&  password != '') {
            this.userData.email = email;
            this.userData.password = password;
            this.noFillMessage ='';
            this.subscribeFunt();
        } else {
            this.noFillMessage ='Please fill in all spaces'
         }
    };
}
