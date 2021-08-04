import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
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
  userForm: FormGroup
  success = false
  number: any
  filterTerm: string
  p: number = 1

  // Icons
  faEllipisisV = faEllipsisV
  faPlus = faPlus
  faTimes = faTimes
  

  constructor(
    private usersService: UsersService,
    private FormBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.createUserForm();
    this.getNumber();
  }

  //Forms
  createUserForm(){
    this.userForm = this.FormBuilder.group({
      email: ['', [Validators.required]],
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      userCode: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    })
  }

  //Functions
  toogle () {
    this.isOpen = false
    this.open = false
    this.showModal = false;
  }

  reload() {
    setTimeout(function(){
      window.location.reload();
   },500);
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
  
   getNumber(){
     this.number = (<HTMLInputElement>document.getElementById('number')).value;
     console.log(this.number);     
   }

  //Requests
  async getUsers(){ 
    const response = await this.usersService.getUsers()  
    this.users = response
    this.letter()
  }  

  async postUsers(){
    let name = this.userForm.controls.name.value
    let last = this.userForm.controls.lastName.value
    let email = this.userForm.controls.email.value
    let role = this.userForm.controls.userCode.value
    const params = {
      "first_name": name,
      "last_name": last,
      "email": email,
      "role": [
        role
      ],
      "status": "1"
    }
      console.log(params);
      console.log(JSON.stringify(params));            
      const response = await this.usersService.postUser(JSON.stringify(params))
      console.log(response)
         if(response){
          this.success = true
         if (this.success == true) {
          this.showModal = false
         }
         }
  }
}
