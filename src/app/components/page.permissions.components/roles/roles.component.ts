import { Component, OnInit } from '@angular/core';
import { PermissionsService } from 'src/app/services/permissions.service';


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

//Variables
roles: any
actions: any

  constructor(
  private permissionsService: PermissionsService
  ) { }

  ngOnInit(): void {
    this.getRoles();
    this.getActions();
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

}
