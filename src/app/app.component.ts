import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Router,ActivatedRoute } from '@angular/router'
// import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    
    constructor( public _user: UserService) {}
    
    ngOnInit() {
    }
}
