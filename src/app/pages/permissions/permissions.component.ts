import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faThinkPeaks } from '@fortawesome/free-brands-svg-icons';
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
    console.log(this.menus);
    this.getNameClick(this.menus[0].menuName)
  }

  getNameClick(name: any) {
    this.name = name 
  }
   
}