import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { faEllipsisV, faPlus, faTimes } from '@fortawesome/pro-light-svg-icons';
import { UsersService } from 'src/app/services/users.service';
import { PermissionsService } from 'src/app/services/permissions.service';
import { OrgUnitsService } from 'src/app/services/org-units.service';

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
  users: any;
  initials: any;
  userForm: FormGroup;
  userSelected: any;
  success = false;
  number: any;
  filterTerm: string;
  p: number = 1;
  isSelected: boolean = false;
  masterSelected = false;
  checkedList: any;
  roles: any;
  orgunits: any;
  enrollments: any;
  newEnrollment: any;

  // Icons
  faEllipisisV = faEllipsisV;
  faPlus = faPlus;
  faTimes = faTimes;
  

  constructor(
    private usersService: UsersService,
    private permissionsService: PermissionsService,
    private orgUnitsService: OrgUnitsService,
    private FormBuilder: FormBuilder,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.createUserForm();
    this.getNumber();
    this.loadRoles();
    this.loadOrgunits();
  }

  //Forms
  createUserForm(){
    this.userForm = this.FormBuilder.group({
      email: ['', [Validators.required]],
      name: ['', [Validators.required]],
      userCode: ['', [Validators.required]]
    });
    this.newEnrollment = {
      'role_external_id': null,
      'user_external_id': null,
      'enrollable_external_id': null,
      'enrollable_type': 'OU',
    };
  }

  //Functions
  toogle () {
    this.isOpen = false
    this.open = false
    this.showModal = false;
  }

  letter() {
    let users = this.users;
    users = users.map((i: any) => {
      let name = i.name;
      let ini = name.charAt(0);
      i.ini = ini;
    })
    console.log(this.users)
  }

  select(){
    let test = this.users;
    test = test.map((i: any)=>{
      i.isSelected = this.isSelected;
    })
  }

  checkUncheckAll() {
    for (var i = 0; i < this.users.length; i++) {
      this.users[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }

  isAllSelected() {
    this.masterSelected = this.users.every(function(i :any) {
        return i.isSelected == true;
      })
    this.getCheckedItemList();
  }

  getCheckedItemList(){
    this.checkedList = [];
    for (var i = 0; i < this.users.length; i++) {
      if(this.users[i].isSelected)
      this.checkedList.push(this.users[i]);
    }
    this.checkedList = JSON.stringify(this.checkedList);
  }
  
  getNumber(){
    this.number = (<HTMLInputElement>document.getElementById('number')).value;    
  }

  show(user: any) {
    this.users.forEach(tmp => {
      tmp.show = false;
    });
    user.show = true;
  }

  //Requests
  async getUsers(){ 
    const response = await this.usersService.getUsers();
    this.users = response;
    this.letter();
    this.select();
  }

  async loadRoles(){
    const response = await this.permissionsService.getGroups();
    this.roles = response.roles;
  }

  async loadOrgunits(){
    const response = await this.orgUnitsService.getOrgUnits().subscribe((response) => {
      this.orgunits = response;
    });
  }

  async postUser(){
    this.showModal = false;
    let name = this.userForm.controls.name.value;
    let email = this.userForm.controls.email.value;
    let userCode = this.userForm.controls.userCode.value;
    let role = null;
    // let role = this.userForm.controls.role.value
    const params = {
      "name": name,
      "email": email,
      "username": userCode,
      "status": "1",
      "role": [
        role
      ],
    }

    const response = await this.usersService.postUser(JSON.stringify(params))
    if(response){
      this.success = true;
      if (this.success == true) {
        this.showModal = false;
      }
    }
  }
  
  async editUser(user: any){
    this.userForm = this.FormBuilder.group({
      email: [user.email, [Validators.required]],
      name: [user.name, [Validators.required]],
      userCode: [user.external_id, [Validators.required]]
    });
    this.enrollments = user.organizational_units;
    this.newEnrollment = {
      'role_external_id': null,
      'user_external_id': user.external_id,
      'enrollable_external_id': null,
      'enrollable_type': 'OU',
    };
    this.showModal = true;
    console.log(this.roles);
  }

  async addEnrollment(roleExternal, userExternal, enrollable, type){
    const params = {
      'role_external_id': roleExternal,
      'user_external_id': userExternal,
      'enrollable_external_id': enrollable,
      'enrollable_type': type
    }
    const response = await this.usersService.addEnrollment(params);
  }

  async removeEnrollment(roleExternal, userExternal, enrollable, type){
    const params = {
      'role_external_id': roleExternal,
      'user_external_id': userExternal,
      'enrollable_external_id': enrollable,
      'enrollable_type': type
    }
    const response = await this.usersService.removeEnrollment(params);
  }

  async delUser(id: any){
    const response = await this.usersService.delUser(id)
    this.ngOnInit();
  }
}
