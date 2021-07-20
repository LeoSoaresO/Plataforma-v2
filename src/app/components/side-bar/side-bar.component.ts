import { Component } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})

export class SideBarComponent{

  isSideBarOpen : boolean = false;

  toggleSideBar() {
    this.isSideBarOpen = !this.isSideBarOpen;
  }

    mouseHover(div : boolean){
      this.isSideBarOpen = div;
   }

   mouseLeave(div : boolean){
     this.isSideBarOpen = div;
   }
    
}

