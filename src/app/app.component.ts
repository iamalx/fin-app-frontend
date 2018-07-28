import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(private router: Router) {
    }
    
isdisable: boolean= true;
    signUp() {
       // console.log(this.isdisable)
    this.isdisable = false;
    }
}
