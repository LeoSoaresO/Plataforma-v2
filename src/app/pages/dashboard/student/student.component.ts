import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from "jwt-decode";
import { DashboardService } from 'src/app/services/dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

//Variables
name
user

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.letter()
    this.getUser()
    this.getDashInfo()
  }

  //Funtions

  getUser(){
    let data = this.cookieService.get('userNormal')
    let decoded = JSON.parse(data)
    this.user = jwt_decode(decoded);
    console.log(this.user);
    
  }

  letter() {
    let name = "Diego";
    let initials = name.charAt(0);
    this.name = initials;
  }

  //Requests

  async getDashInfo(){
    const response = await this.dashboardService.getDash()
    console.log(response);    
  }

}
