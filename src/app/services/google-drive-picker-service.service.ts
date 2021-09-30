import {Injectable} from '@angular/core';


declare const gapi: any;
declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleDrivePickerService {

  private clientId = '927911156726-grkvus8d17384sukkn4h743ue1mcq94s.apps.googleusercontent.com';
  private apiKey = 'AIzaSyAOaa8jLCmwdnyeXY9Iib3PJRdFPnL7Dps';
  private appId = '927911156726';
  private scope = 'https://www.googleapis.com/auth/drive.file';

  private oauthAccessToken = null;
  private pickerApiLoaded = false;
  private pickerCallback = null;

  public open(callback): void {
    this.pickerCallback = callback;
    gapi.load('auth', {'callback': this.onAuthApiLoad.bind(this)});
    gapi.load('picker', {'callback': this.onPickerApiLoad.bind(this)});
  }

  private onAuthApiLoad(): void {
    gapi.auth.authorize({
      'client_id': this.clientId,
      'scope': this.scope,
      'immediate': false,
    }, this.handleAuthResult.bind(this));
  }

  private onPickerApiLoad(): void {
    this.pickerApiLoaded = true;
    this.createPicker();
  }

  private handleAuthResult(authResult): void {
    if (authResult && !authResult.error) {
      this.oauthAccessToken = authResult.access_token;
      this.createPicker();
    }
  }

  private createPicker(): void {
    if (this.pickerApiLoaded && this.oauthAccessToken) {
      let view = new google.picker.View(google.picker.ViewId.DOCS);
      let picker = new google.picker.PickerBuilder()
        .enableFeature(google.picker.Feature.NAV_HIDDEN)
        .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
        .setAppId(this.appId)
        .setOAuthToken(this.oauthAccessToken)
        .addView(view)
        .addView(new google.picker.DocsUploadView())
        .setDeveloperKey(this.apiKey)
        .setCallback(this.pickerCallback)
        .build();
      picker.setVisible(true);
    }
  }
}