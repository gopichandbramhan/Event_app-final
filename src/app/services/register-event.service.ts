import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterEventService {
  
  private BASE_URL = "http://localhost/event_backend/";
  // private BASE_URL = "https://eventapp.laundryholic.com/event_backend/";

  constructor(private http:HttpClient) { }

  registerEvent(ob:any){
   return this.http.post(this.BASE_URL+"registerEvent.php",ob);
  }

  registerEventUser(){
    return this.http.get(this.BASE_URL+"getRegisterEventUser.php");
  }

  
}
