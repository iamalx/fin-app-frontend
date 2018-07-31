import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(private _router: Router,
              private _user: UserService) { }

  ngOnInit() {
  }
  img1: string="../images/russiapic.jpg";
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
  
  putFunct() {
   this._user.postSign(this.newUser)
  .subscribe((response: any) => {
           console.log(response);
   window.sessionStorage.setItem('token', response.token);
   window.sessionStorage.setItem('userId', response.userId);
    this._router.navigate([`/home`])
  
      })
     
    };
    alertFunct() {
     alert(`Account succesfully created
    First Name: ${this.newUser.firstName}
    Last Name: ${this.newUser.lastName}
    email: ${this.newUser.email}`);
  };
  
  signFunct(first:string, last:string, email:string, pass:string, repassword: string) {
    
  if (first != '' && last !='' && email!= '' && pass != '' && repassword !='' ) {
    this.fillmessage = '';
    if(pass == repassword) {
       this.passwordError = '';
      //console.log(first, last, email, pass)
      this.setnewUser(first, last,email, pass);
      // console.log(this.newUser)
      this.putFunct();
   // this.alertFunct();
    this._router.navigate([`/login`])
    } else { 
      this.passwordError = 'password did not match'
    }
     
  } else {
      this.fillmessage = 'please fill all spaces'
    }
  };
  
  
  logFunct() {
  this._router.navigate([`/login`])
  }
}