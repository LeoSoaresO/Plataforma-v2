import { Component, OnInit } from '@angular/core';
import { faEllipsisV } from '@fortawesome/pro-light-svg-icons';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  // Variables
  isOpen: boolean;
  nome: string;
  open: boolean;

  // Icons
  faEllipisisV = faEllipsisV

  constructor() { }

  ngOnInit(): void {
    this.teste();
  }

  toogle () {
    this.isOpen = false
    this.open = false
  }
  

  teste() {
    let name = "Diego";
    let lastname = "Soek";
    let initials = name.charAt(0)+""+lastname.charAt(0);
    this.nome = initials;
  }

}
