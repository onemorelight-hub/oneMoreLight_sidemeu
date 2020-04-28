import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Facebook } from '@ionic-native/facebook/ngx';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { apiGatewayUrl } from '../shared/baseUrl';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  public isLoggedIn = new BehaviorSubject(false);
  public socialUser = new BehaviorSubject(null);
  private token: any;

  constructor( public fb: Facebook,
    public loadingController: LoadingController,
    private router: Router,
    private nativeStorage: NativeStorage,
    private googlePlus: GooglePlus,
    private httpClient: HttpClient) { }


  async doFbLogin(){
		const loading = await this.loadingController.create({
			message: 'Please wait...'
		});
		this.presentLoading(loading);
	//	let permissions = new Array<string>();

		//the permissions your facebook app needs from the user
    const permissions = ["public_profile", "email"];

		this.fb.login(permissions)
		.then(response =>{
			let userId = response.authResponse.userID;

			//Getting name and gender properties
			this.fb.api("/me?fields=name,email", permissions)
			.then(user =>{
        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large"; 
        this.setUserDetails(user);
        //now we have the users info, let's save it in the NativeStorage
				this.nativeStorage.setItem('facebook_user',
				{
					name: user.name,
					email: user.email,
					picture: user.picture
				})
				.then(() =>{
          console.log("Faceebook login data stored");
				}, error =>{
					console.log(error);
					loading.dismiss();  
				})
        
        // Facebook authentication sucessful. now create token from the service
        let url = apiGatewayUrl + "/api/mobile/createToken";
        this.httpClient.post(url, user).subscribe(
        data => { 
          this.isLoggedIn.next(true);
          this.nativeStorage.setItem('oneToken', data)
          this.setToken(data);
          this.router.navigate(["/news/India"]);
          loading.dismiss();
        },
        error => {
          this.isLoggedIn.next(false);
        });
			
			})
		}, error =>{
			console.log(error);
			loading.dismiss();
		});
	}
/** Not used */
  doFbLogout(){
		this.fb.logout()
		.then(res =>{
			//user logged out so we will remove him from the NativeStorage
			this.nativeStorage.remove('facebook_user');
			this.router.navigate(["/login"]);
		}, error =>{
			console.log(error);
		});
  }
  
	async presentLoading(loading) {
		return await loading.present();
	}

  //** Google Login code */
  
  async doGoogleLogin(){
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);
  // 'scopes': 'profile email', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.

    this.googlePlus.login({
      'webClientId': '757430345489-b54t7cubp6ocpfpokqa900hvcmpgcqa6.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
      'offline': true // Optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
    })
    .then(user =>{
      user.name = user.displayName;
      user.picture = user.imageUrl;
      this.setUserDetails(user);
      loading.dismiss();
      this.nativeStorage.setItem('google_user', {
        name: user.displayName,
        email: user.email,
        picture: user.imageUrl
      })
      .then(() =>{
        console.log("Data stored from google")
      //  alert("Google data store")
      }, error =>{
        console.log(error);
       // alert("Google data failed store")
      })


      let url = apiGatewayUrl + "/api/mobile/createToken";
      this.httpClient.post(url, user).subscribe(
      data => { 
        this.isLoggedIn.next(true);
       // alert("token received "+JSON.stringify(data))
        this.nativeStorage.setItem('oneToken', data)
        this.setToken(data);
        this.router.navigate(["/news/India"]);
        loading.dismiss();
      },
      error => {
        this.isLoggedIn.next(false);
      });
      loading.dismiss();
    }, err =>{
      console.log(err)
      loading.dismiss();
    });

    
  }

  //**  Not used  */
  doGoogleLogout(){
    this.googlePlus.logout()
    .then(res =>{
      //user logged out so we will remove him from the NativeStorage
      this.nativeStorage.remove('google_user');
      this.router.navigate(["/login"]);
    }, err =>{
      console.log(err);
    })
  }

  logout(){
    this.nativeStorage.remove('oneToken');
    this.nativeStorage.remove('google_user');
    this.nativeStorage.remove('facebook_user');
    this.token = null;
    this.router.navigate(["/login"]);
  }
  setUserDetails(user){
    this.socialUser.next(user);
  }
  setToken(data): boolean{
    this.token = data.token;
    return true;
  }
  getToken(): string{
    return this.token;
  }
}
