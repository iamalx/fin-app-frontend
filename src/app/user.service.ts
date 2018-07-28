import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(public _http: HttpClient) { }
  
  url: string=  "https://summer-2018-alex-phortonssf.c9users.io:8080/api/finUsers";
  
  postSign(newUser) {
    return this._http.post("https://summer-2018-alex-phortonssf.c9users.io:8080/api/finUsers", newUser)
  }
  
  getLogin(useData){
    return this._http.post(this.url + '/login', useData)
  }
  
  //User/logout
  logOut(token) {
    return this._http.post(this.url + '/logout' + '?access_token'+ token , {})
  }
  //usser/{id}
  getUser(id, token) {
    return this._http.get(this.url + "/" + id + "?acess_token" )
  }

}
