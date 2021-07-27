import { Component, OnInit } from '@angular/core';
import { faEllipsisV, faPlus, faTimes } from '@fortawesome/pro-light-svg-icons';

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
  showModal: boolean;

  // Icons
  faEllipisisV = faEllipsisV
  faPlus = faPlus
  faTimes = faTimes

  constructor() { }

  ngOnInit(): void {
    this.letter();
  }

  toogle () {
    this.isOpen = false
    this.open = false
    this.showModal = false;
  }
  

  letter() {
    let name = "Diego";
    let lastname = "Soek";
    let initials = name.charAt(0)+""+lastname.charAt(0);
    this.nome = initials;
  }

}
