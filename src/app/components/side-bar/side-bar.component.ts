import { Component, Output, EventEmitter} from '@angular/core';
// import { SharedService } from '../../shared.service';
// import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})

export class SideBarComponent{


  // clickEventsubscription:Subscription;

  isSideBarOpen : boolean = false;

  // constructor(private sharedService: SharedService) {
  //     this.clickEventsubscription = this.sharedService.getClickEvent().subscribe(()=>{
  //       this.toggleSideBar();
  //     })
  // }

  toggleSideBar() {
    this.isSideBarOpen = !this.isSideBarOpen;
  }
    
}

