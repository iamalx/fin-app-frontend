import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(public _http: HttpClient) { }
  
  url: string=  "http://localhost:3000/api/finUsers";
  displayLogin: boolean = false;
  loginFavorite: string = 'Login to add to favorites';
  // call function when user creates an account / post used info to mongodb
  postSign(newUser: any) {
    return this._http.post(this.url, newUser)
  }
  // call function when user logs in / post password and email
  onLogin(useData: any){
    return this._http.post(this.url + '/login', useData)
  }
  //User/logout//
  onLogOut(token: string) {
    return this._http.post(this.url + '/logout' + '?access_token'+ token , {})
  }
  //usser/{id} 
  getUser(id: string, token: string) {
    return this._http.get( this.url + "/" + id + "?access_token=" + token)
  }
 // POST /finUsers/{id}/favorites
  saveFavorite(data: any, token: string, id: string ) {
    return this._http.post( this.url + "/" + id + '/favorites?access_token=' + token, data)
  } 
  getFavoritesData(token: string, id: string) {
    return this._http.get( this.url + '/'+ id +'/favorites?access_token=' + token)
  };
  //DELETE /finUsers/{id}/favorites/{fk}
  deleteFavUser(token: string, id: string, finUserId: string) {
    return this._http.delete( this.url + '/' + finUserId + '/favorites/' + id + '?access_token=' + token)
  };
  //called in constructor
  showUserNav(id: string, token: string) {
    console.log(window.sessionStorage.getItem('token'), "Service-logout-getItem");
    console.log(window.sessionStorage.getItem('userId'), "Service-logout-getItem2");
    if(id !== '' && token !== "") {
      this.displayLogin = true;
    }
  }
  
}
