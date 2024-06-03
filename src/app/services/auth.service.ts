import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private BASE_URL = "http://localhost/event_backend/";
  // private BASE_URL = "https://eventapp.laundryholic.com/event_backend/";
  
  constructor(private http:HttpClient) { }

  loginService(ob:any){
    return this.http.post(this.BASE_URL+"api.php",ob);
  }

  registerUser(ob:any){
    return this.http.post(this.BASE_URL+"registerUser.php",ob);
  }

  changepass(ob:any){
    return this.http.post(this.BASE_URL+"apidata.php",ob);
  }

  updateProfile(ob:any){
    return this.http.post(this.BASE_URL+"updateProfile.php",ob);
  }

  captcha(){
    return this.http.get(this.BASE_URL+"captcha.php");
  }
}
