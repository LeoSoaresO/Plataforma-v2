import { Component, OnInit } from '@angular/core';
import { faGoogle, faApple, faMicrosoft } from '@fortawesome/free-brands-svg-icons';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

faGoogle = faGoogle
faApple = faApple
faMicrosoft = faMicrosoft

  constructor() { }

  ngOnInit(): void {
  }

}
