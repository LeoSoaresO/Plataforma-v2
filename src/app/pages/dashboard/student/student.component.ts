import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from "jwt-decode";
import { DashboardService } from 'src/app/services/dashboard.service';
import { Router } from '@angular/router';
import { faBookOpen } from '@fortawesome/pro-light-svg-icons';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

//Variables
name
user
dash
feedName

//Icons
faBookOpen = faBookOpen

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.getUser()
    this.getDashInfo()
  }

  //Funtions

  getUser(){
    if(this.cookieService.check('userNormal') && !this.cookieService.check('userGoogle')){
      let data = this.cookieService.get('userNormal')
      this.user = jwt_decode(data);
      this.letter()
    }
    if(!this.cookieService.check('userNormal') && this.cookieService.check('userGoogle')){
      let data = this.cookieService.get('userGoogle')
      this.user = jwt_decode(data);
      this.letter()
    }
  }

  letter() {
    let name = this.user.name;
    let initials = name.charAt(0);
    this.name = initials;
  }

  //Requests

  async getDashInfo(){
    const response = await this.dashboardService.getDash()
    this.dash = response
    for (const iterator of this.dash.feed) {     
      let n = iterator.user.name;
        let initials = n.charAt(0);
        this.feedName = initials;    
    }
  }

}
