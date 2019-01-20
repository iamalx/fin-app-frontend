import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(public _http: HttpClient) { }
  
  url: string=  "https://summer-2018-alex-phortonssf.c9users.io:8080/api/finUsers";
  displayLogin: boolean = false
  
  loginFavorite: string = 'Login to add to favorites' 
  // call function when user creates an account / post used info to mongo
  postSign(newUser) {
    return this._http.post("https://summer-2018-alex-phortonssf.c9users.io:8080/api/finUsers", newUser)
  }
  // call function when user logs in / post password and email
  getLogin(useData){
    return this._http.post(this.url + '/login', useData)
  }
  //User/logout/// why sending {}
  logOut(token) {
    return this._http.post(this.url + '/logout' + '?access_token'+ token , {})
  }
  //usser/{id} ????
  getUser(id: any, token: any) {
    console.log("user>name", id, token)
    return this._http.get(this.url + "/" + id + "?access_token=" + token)
  }
 // POST /finUsers/{id}/favorites
  saveFavorite(data: any, token: any, id: any ) {
    return this._http.post(this.url + "/" + id + '/favorites?access_token=' + token, data)
  }
  
  getFavoritesData(token: any, id: any) {
    return this._http.get('https://summer-2018-alex-phortonssf.c9users.io:8080/api/finUsers/'+ id +'/favorites?access_token=' + token)
  };
  //DELETE /finUsers/{id}/favorites/{fk}
  //http://summer-2018-alex-phortonssf.c9users.io:8080/api/finUsers/5b62691b88106e9d9db0a66d/favorites/5b62784f3027359ff7119639?access_token=bJj6XqxHafpMvhlEcOI24N1L80NsE6gCDQkBli1dExkfExhqs0ZHkv6vC5oru504
  deleteFavUser(token: any, id: any, finUserId: any) {
    console.log('in service', token, id, finUserId)
    return this._http.delete('https://summer-2018-alex-phortonssf.c9users.io:8080/api/finUsers/' + finUserId + '/favorites/' + id + '?access_token=' + token)
  };
  //call in constructor
  showUserNav(id: any, token: any) {
    console.log(window.sessionStorage.getItem('token'), "Service-logout-getItem");
    console.log(window.sessionStorage.getItem('userId'), "Service-logout-getItem2");
    if(id !== '' && token !== "") {
      
      this.displayLogin = true;
    }
  }
  
}
