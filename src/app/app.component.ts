import { Component } from '@angular/core';
import { UserService } from './user.service';
import { OnInit } from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    
    constructor( private _user: UserService ) {
    }
    
    ngOnInit() {
        this._user.showUserNav(window.sessionStorage.getItem('token'), window.sessionStorage.getItem('userId'));
    }
    
    isdisable: boolean= true;
    signUp() {
        this.isdisable = false;
    }
    // change logic above 'onSigUp'
}
