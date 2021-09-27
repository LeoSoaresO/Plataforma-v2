import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/pro-light-svg-icons'

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

//Icons
faTimes = faTimes

//Variables
show = false

  constructor() { }

  ngOnInit(): void {
  }

  showModal(){
    this.show = false
  }

}
