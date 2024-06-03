import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {
  private BASE_URL = "http://localhost/event_backend/";
  // private BASE_URL = "https://eventapp.laundryholic.com/event_backend/";
  constructor(private http:HttpClient) { }

  user_data:any = "";

  addBannerImage(ob:any){
    return this.http.post(this.BASE_URL+"addBannerImage.php",ob);
  }

  banner_image(){
    return this.http.get(this.BASE_URL+"banner_image.php");
  }

  deleteBannerImage(ob:any){
    return this.http.post(this.BASE_URL+"deleteBannerImage.php",ob);
  }

  checkUser(ob:any){
    return this.http.post(this.BASE_URL+"checkUser.php",ob);
  }

  forgotpass(ob:any){
    return this.http.post(this.BASE_URL+"apidata.php",ob);
  }

  getFirstWinner(ob:any){
    return this.http.post(this.BASE_URL+"apidata.php",ob);
  }

  getSecondWinner(ob:any){
    return this.http.post(this.BASE_URL+"apidata.php",ob);
  }

  getResult(ob:any){
    return this.http.post(this.BASE_URL+"getResultById.php",ob);
  }

  checkMobile(ob:any){
    return this.http.post(this.BASE_URL+"apidata.php",ob);
  }

  checkEmail(ob:any){
    return this.http.post(this.BASE_URL+"apidata.php",ob);
  }

  getResultById(ob:any){
    return this.http.post(this.BASE_URL+"getResultByIdEdit.php",ob);
  }

  sendContactUsdata(ob:any){
    return this.http.post(this.BASE_URL+"contact_us.php",ob);
  }

  getProfileData(ob:any){
    return this.http.post(this.BASE_URL+"getProfileData.php",ob);
  }

  contactusDetails(){
    return this.http.get(this.BASE_URL+"contactusDetails.php");
  }
}
