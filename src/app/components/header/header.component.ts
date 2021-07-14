import { Component,  OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { SideBarComponent } from '../side-bar/side-bar.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  isSideBarOpen: boolean = false;

  constructor(private sharedService:SharedService) {
 
   }

  ngOnInit(): void {
  }

  toggleSideBar(){
    this.sharedService.sendClickEvent();
    
  }
  onToggleEvent(valueEmitted: boolean){
    this.isSideBarOpen = valueEmitted;
  }


}
