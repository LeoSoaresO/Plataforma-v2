import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/pro-light-svg-icons'
import {GoogleDrivePickerService} from '../../services/google-drive-picker-service.service';

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

  constructor(
    private googleDrivePickerService: GoogleDrivePickerService
  ) { }

  ngOnInit(): void {
  }

  showModal(){
    this.show = false
  }

  openGoogleDrivePicker(): void {
    this.googleDrivePickerService.open((data) => {
      if (data.action === 'picked') {
        console.log('Picked', data.docs);
      }
    });
  }

}
