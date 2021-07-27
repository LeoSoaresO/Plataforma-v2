import { Component, OnInit } from '@angular/core';
import { faEllipsisV, faPlus, faTimes } from '@fortawesome/pro-light-svg-icons';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  // Variables
  isOpen: boolean;
  name: any;
  open: boolean;
  showModal: boolean;
  users: any
  initials: any

  // Icons
  faEllipisisV = faEllipsisV
  faPlus = faPlus
  faTimes = faTimes

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    // this.letter();
    this.getUsers();
  }

  toogle () {
    this.isOpen = false
    this.open = false
    this.showModal = false;
  }

  async getUsers(){ 
    const response = await this.usersService.getUsers()
    console.log(response)   
    this.users = response
    this.letter()
  }  

  letter() {
      let users = this.users;
      users = users.map((i: any) => {
        let name = i.first_name;      
        let lastname = i.last_name;
        let ini = name.charAt(0)+""+lastname.charAt(0);
        i.ini = ini;
      })
      console.log(this.users)

  }

}
