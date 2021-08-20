import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlus, faTimes } from '@fortawesome/pro-light-svg-icons';
import { PermissionsService } from 'src/app/services/permissions.service';
@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {

//Variables
menus: any;
name: any;
showModal: boolean;
roleForm: FormGroup

//Icons
faPlus = faPlus
faTimes = faTimes

  constructor(
      private router: Router,
      private permissionsService: PermissionsService,
      private FormBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.getMenus();
    this.createRoleForm();
  }

  //forms 
  createRoleForm(){
    this.roleForm = this.FormBuilder.group({
      roleName: ['', [Validators.required]],
      roleType: ['', [Validators.required]]
    })
  }

  //functions
  getNameClick(name: any, id: any) {
    this.name = name;        
  }

  toggle(){
    this.showModal = false;
  }

  reload() {
    setTimeout(function(){
      window.location.reload();
   },500);
  }

  //requests
  async getMenus(){
    const response = await this.permissionsService.getMenus()
    this.menus = response
    console.log(this.menus);
    this.getNameClick(this.menus[0].menuName, this.menus.id)
  }

  async postRoles(){
    let rN = this.roleForm.controls.roleName.value
    let rT = this.roleForm.controls.roleType.value

    const params = {
      "id": '',
      "role": rN,
      "permissions": {
          "create": true,
          "delete": false
      }
    }
    console.log(JSON.stringify(params));  
    const response = await this.permissionsService.postRoles(JSON.stringify(params))
    console.log(response)
      if(response){      
        this.showModal = false
        this.reload();
      }
  }
   
}