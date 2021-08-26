import { Component, OnInit } from '@angular/core';
import { faImage, faUserHeadset } from '@fortawesome/pro-light-svg-icons';
import { faQuestionCircle } from '@fortawesome/pro-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

//Icons
faImage = faImage
faQuestionCircle = faQuestionCircle
faUserHeadset = faUserHeadset

//variables 
show = false
cont = false

  constructor() { }

  ngOnInit(): void {
  }

  toggle(){
    this.show = false;
  }
  next() {
    this.show = false;
    this.cont = true
  }

}
