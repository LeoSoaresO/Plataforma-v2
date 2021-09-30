import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/pro-light-svg-icons'
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from "jwt-decode";
import {GoogleDrivePickerService} from 'src/app/services/google-drive-picker-service.service';
import { UploadService } from 'src/app/services/upload.service'; 
import { ReadFile, ReadMode } from 'ngx-file-helpers';

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
googleData: any
user
token
public readMode = ReadMode.dataURL;
public picked: ReadFile | null = null;
public status: string | null = null;

  constructor(
    private googleDrivePickerService: GoogleDrivePickerService,
    private cookieService: CookieService,
    private uploadService: UploadService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  showModal(){
    this.show = false
  }

  //Functions

	getUser(){
		if(this.cookieService.check('userNormal') && !this.cookieService.check('userGoogle')){
			let data = this.cookieService.get('userNormal')
			this.token = data
			console.log(this.token);
			this.user = jwt_decode(data);
			console.log(this.user);      
		}
		if(!this.cookieService.check('userNormal') && this.cookieService.check('userGoogle')){
			let data = this.cookieService.get('userGoogle')
			this.token = data
			console.log(this.token);      
			this.user = jwt_decode(data);
			console.log(this.user);  
		}
	}

	onReadStart(fileCount: number) {
		this.status = `Reading ${fileCount} file(s)...`;
	}

	onFilePicked(file: ReadFile) {
		this.picked = file;
		console.log(this.picked);		
	}

	//Requests

	openGoogleDrivePicker(): void {
		this.googleDrivePickerService.open((data) => {
		  if (data.action === 'picked') {
			console.log('Picked', data.docs);
			this.googleData = data.docs
			this.uploadFile();
		  }
		});
	  }

  	uploadFile(){
    
		const googleFiles: any = []
		for (let i = 0; i < this.googleData.length; i++) {
			const element = this.googleData[i];
				console.log(element.id);	
				googleFiles.push(element.id)	
		}
		console.log(googleFiles);
	
		const params = {
			"provider": "GOOGLE",
			"id": googleFiles,
			"token": this.token
		}
		this.uploadService.uploadFile(params).subscribe((response:any )=>{
			console.log(response)
		})
	}

}
