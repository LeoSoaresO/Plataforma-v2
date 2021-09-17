import { Component, OnInit } from '@angular/core';
import { faCloudUpload } from '@fortawesome/pro-light-svg-icons'
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

//Icons
faCloudUpload = faCloudUpload

  constructor() { }

  ngOnInit(): void {
  }

}
