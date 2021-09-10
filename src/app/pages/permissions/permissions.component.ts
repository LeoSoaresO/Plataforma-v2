import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionsService } from 'src/app/services/permissions.service';
@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {

//Variables
menus: any

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private permissionsService: PermissionsService
    ) { }

  ngOnInit(): void {
    this.getMenus();
  }

  async getMenus(){
    const response = await this.permissionsService.getMenus()
    this.menus = response  
  }
}