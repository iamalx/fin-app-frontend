import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor( private _router: Router,
              private _user: UserService) { }

  ngOnInit() {
  }

  img1: string = "../images/russiapic.jpg";
  passwordError: string = '';
  fillmessage: string ='';
  newUser: any = {
    firstName: '',
    lastName: '',
    email:'',
    password:'',
  };
  
  setnewUser(first:string, last:string, email:string, pass:string ) {
    this.newUser.firstName = first;
    this.newUser.lastName = last;
    this.newUser.email = email;
    this.newUser.password = pass; 
  };
  
  alertFunct() {
    alert(`Account succesfully created
    First Name: ${this.newUser.firstName}
    Last Name: ${this.newUser.lastName}
    Email: ${this.newUser.email}`);
  };
  
  putFunct() {
    this._user.postSign(this.newUser)
      .subscribe((response: any) => {
        window.sessionStorage.setItem('token', response.token);
        window.sessionStorage.setItem('userId', response.userId);
        this.alertFunct();
        this._router.navigate([`/login`])
      })
  };

  signFunct(first:string, last:string, email:string, pass:string, repassword: string) {
    if (first != '' && last !='' && email!= '' && pass != '' && repassword !='' ) {
      this.fillmessage = '';
      if(pass == repassword) {
        this.passwordError = '';
        this.setnewUser(first, last,email, pass);
        this.putFunct();
        this._router.navigate([`/login`])
      } else { 
      this.passwordError = 'Password did not match'
      }
    } else {
    this.fillmessage = 'Please fill in all spaces'
    }
  };
  
  logFunct() {
    this._router.navigate([`/login`])
  };
}
