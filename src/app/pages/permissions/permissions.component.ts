import { Component, OnInit } from '@angular/core';
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

//Icons
faPlus = faPlus
faTimes = faTimes

  constructor(
      private router: Router,
      private permissionsService: PermissionsService,
    ) { }

  ngOnInit(): void {
    this.getMenus();
  }

  //functions
  getNameClick(name: any, id: any) {
    this.name = name;        
  }

  //requests
  async getMenus(){
    const response = await this.permissionsService.getMenus()
    this.menus = response
    console.log(this.menus);
    this.getNameClick(this.menus[0].menuName, this.menus.id)
  }
   
}