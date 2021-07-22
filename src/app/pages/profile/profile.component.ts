import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  nome: string;

  constructor() { }

  ngOnInit(): void {
    this.teste();
  }

  teste() {
    var name = "Adam";
    var lastname = "Sandler";
    var initials = name.charAt(0)+""+lastname.charAt(0);
    this.nome = initials;
  }

}
