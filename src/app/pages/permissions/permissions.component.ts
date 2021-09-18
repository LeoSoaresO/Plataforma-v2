import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlus, faTimes } from '@fortawesome/pro-light-svg-icons';
import { PermissionsService } from 'src/app/services/permissions.service';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {

  //Variables
  groups: any;
  roles: any;
  actions: any;
  permissionRoles: any;
  formFields: any;
  name: any;
  showModal: boolean;
  roleForm: FormGroup;
  show: boolean;
  roleActive: any;
  buttonEnabled: boolean;

  //Icons
  faPlus = faPlus
  faTimes = faTimes

  constructor(
      private router: Router,
      private permissionsService: PermissionsService,
    ) { }

  ngOnInit(): void {
    this.getGroups();
  }

  //functions
  selectGroup(role: any) {
    this.buttonEnabled = false;
    this.roleActive = role;
    this.getActions();
  }

  //requests
  async getGroups(){
    const response = await this.permissionsService.getGroups()
    /*
    this.groups = response.groups;
    */
    // HARDCODED
    this.groups = [{
      id: 'discipline',
      groupName: 'Disciplina',
    }, {
      id: 'contents',
      groupName: 'Conteúdos',
    }];
    this.roles = response.roles;
    this.selectGroup(this.groups[0])
  }

  async getActions(){
    const response = await this.permissionsService.getActions(this.roleActive.id);
    // this.actions = response.actions;
    // HARDCODED
    this.actions = [{
      external_id: 'create',
      name: 'Criar',
    }, {
      external_id: 'edit',
      name: 'Editar',
    }, {
      external_id: 'delete',
      name: 'Remover',
    }];
    this.permissionRoles = response.permission_roles;
    this.mountForm();
  }

  mountForm(){
    this.formFields = [];
    this.roles.forEach(role => {
      const line = [] as any;
      const permissionRole = this.permissionRoles.find(permissionRole => {
        return role.external_id == permissionRole.role_external_id;
      });
      this.actions.forEach(action => {
        line.push({
          role: role.external_id,
          action: action.external_id,
          value: permissionRole.permissions[action.external_id],
        });
      });
      this.formFields.push(line);
    });
  }

  changeValue(item){
    item.changed = true;
    this.buttonEnabled = true;
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
      }
  }

  async savePermissions(){
    const permissionRoles = [] as any;
    this.formFields.forEach(row => {
      let role = {};
      row.forEach(column => {
        role['role_external_id'] = column.role;
        if(!role['permissions']){
          role['permissions'] = {};
        }
        role['permissions'][column.action] = column.value;
      });
      permissionRoles.push(role);
    })
    const params = {
      'permission_roles': permissionRoles,
    }
    console.log(JSON.stringify(params));  
    const response = await this.permissionsService.putPermissions(this.roleActive.id, JSON.stringify(params))
    console.log(response)
      if(response){      
        this.showModal = false
      }
  }
}