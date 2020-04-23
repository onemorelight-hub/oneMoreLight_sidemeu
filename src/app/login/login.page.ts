import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../service/authenticate.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authSeervice: AuthenticateService) { }
  ngOnInit() {
    this.authSeervice.logout();
  }
  doGoogleLogin(){
    this.authSeervice.doGoogleLogin();
  }
  doFbLogin(){
    this.authSeervice.doFbLogin();
  }
}
