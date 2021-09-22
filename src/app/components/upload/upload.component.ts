import { Component, OnInit } from '@angular/core';
import { faCloudUpload } from '@fortawesome/pro-light-svg-icons'
import { faCloudUploadAlt } from '@fortawesome/pro-solid-svg-icons';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

//Variables
show = false

//Icons
faCloudUpload = faCloudUpload
faCloudUploadAlt = faCloudUploadAlt

  constructor() { }

  ngOnInit(): void {
  }

  showModal(){
    this.show = false
  }

}
