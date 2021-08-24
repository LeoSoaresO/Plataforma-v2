import { Component, OnInit } from '@angular/core';
import { faImage } from '@fortawesome/pro-light-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

//Icons
faImage = faImage

  constructor() { }

  ngOnInit(): void {
  }

}
