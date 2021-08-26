import { Component, Input, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { PermissionsService } from 'src/app/services/permissions.service';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
//Variables
roles: any
actions: any
@Input() menuName: any;
showModal: boolean;
roleForm: FormGroup
show: boolean

//icons
faPlus = faPlus

  constructor(
  private permissionsService: PermissionsService,
  private FormBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getRoles();
    this.getActions();
    this.createRoleForm();  
  }

  createRoleForm(){
    this.roleForm = this.FormBuilder.group({
      roleName: ['', [Validators.required]],
      roleType: ['', [Validators.required]]
    })
  }

  toggle(){
    this.showModal = false;
  }

  reload() {
    setTimeout(function(){
      window.location.reload();
   },500);
  }

  async getRoles(){
    const response = await this.permissionsService.getRoles()
    console.log(response);  
    this.roles = response  
  }

  async getActions(){
    const response = await this.permissionsService.getActions()
    console.log(response);
    this.actions = response
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
