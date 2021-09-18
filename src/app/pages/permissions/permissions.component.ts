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
  groupActive: any;
  buttonEnabled: boolean;

  //Icons
  faPlus = faPlus
  faTimes = faTimes

  constructor(
      private router: Router,
      private FormBuilder: FormBuilder, 
      private permissionsService: PermissionsService,
    ) { }

  ngOnInit(): void {
    this.getGroups();
    this.createRoleForm();
  }

  //functions
  selectGroup(group: any) {
    this.buttonEnabled = false;
    this.groupActive = group;
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
    if(this.groupActive){
      this.selectGroup(this.groupActive);
    }else{
      this.selectGroup(this.groups[0]);
    }
  }

  async getActions(){
    const response = await this.permissionsService.getActions(this.groupActive.id);
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
    }, {
      external_id: 'delete',
      name: 'Remover',
    }, {
      external_id: 'delete',
      name: 'Remover',
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
          changed: false,
        });
      });
      this.formFields.push(line);
    });
  }

  changeValue(item){
    item.changed = !item.changed;
    this.buttonEnabled = false;
    this.formFields.forEach(row => {
      row.forEach(column => {
        if(this.buttonEnabled || column.changed){
          this.buttonEnabled = true;
          return;
        }
      });
    });
  }

  cancelChanges(){
    this.buttonEnabled = false;
    this.formFields.forEach(row => {
      row.forEach(column => {
        if(column.changed){
          column.changed = false;
          column.value = !column.value;
        }
      });
    });
  }

  async postRole(){
    let role = this.roleForm.controls.roleName.value
    let externalId = this.roleForm.controls.externalId.value

    const params = {
      "name": role,
      "guard_name": 'web',
      "external_id": externalId,
    }
    await this.permissionsService.postRole(JSON.stringify(params))
    this.getGroups();
    this.showModal = false
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
    await this.permissionsService.putPermissions(this.groupActive.id, JSON.stringify(params))
    this.selectGroup(this.groupActive);
  }

  createRoleForm(){
    this.roleForm = this.FormBuilder.group({
      roleName: ['', [Validators.required]],
      externalId: ['', [Validators.required]],
    });
  }
}