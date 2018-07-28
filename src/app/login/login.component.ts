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
  
  ngOnInit() {
  }
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

subscribeFunt() {
   this._user.getLogin(this.userData)
    .subscribe((response: any) => {
  console.log(response);
   window.sessionStorage.setItem('token', response.token);
   window.sessionStorage.setItem('userId', response.userId);
    this._router.navigate([`/home`]);
    })
};

loginFunct(email:string, password: string) {
  if(email !='' &&  password != '') {
    this.userData.email = email;
    this.userData.password = password;
     this.noFillMessage ='';
     this.subscribeFunt();
    // if(email == this.userData.email && password == this.userData.password ) {
      
    //   this._router.navigate([`/`])
    // }else {
    //   alert( `Email and password do not match
    // Please try again`)
    // }
  } else {
    this.noFillMessage ='Please fill in all spaces'
  }
};
}
