/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Router ,ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  constructor(  private _user: UserService,
                private _data: DataService ) {}

  ngOnInit() {

  this._user.getUser(sessionStorage.getItem("userId"), sessionStorage.getItem('token'))
    .subscribe((response: any) => {
      this.user = response;
    });
  };

  user: any;
  
}


