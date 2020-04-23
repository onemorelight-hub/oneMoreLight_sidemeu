import { Injectable } from '@angular/core';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';


@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor( private spinnerDialog: SpinnerDialog) { }

  showLoading(){
    this.spinnerDialog.show();
  }
  stopLoadin(){
    this.spinnerDialog.hide();
  }
}
