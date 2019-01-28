import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

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
    userData = {
        email: '',
        password: ''
    }

    getDataVerification() {
        this._user.getUser(sessionStorage.getItem('userId'), sessionStorage.getItem('token'))
            .subscribe( (data: any) => { 
            this._router.navigate([`/home`]);
            this._user.userLoginData.firstName = data.firstName;
            this._user.userLoginData.lastName = data.lastName; 
            alert(`Welcome ${this._user.userLoginData.firstName}!`);
            this._user.loginFavorite = "My Favorites";
            })
    };

// subscribes a user and gives a token 
    subscribeFunt() {
        this._user.onLogin(this.userData)
            .subscribe((response: any) => {
                console.log(response, 'onLogin')
                window.sessionStorage.setItem('token', response.token);
                window.sessionStorage.setItem('userId', response.userId);
                this._user.isLogIn = true;
                this.getDataVerification()
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
