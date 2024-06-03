import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrganizedEventsService {
  
  private BASE_URL = "http://localhost/event_backend/";
  // private BASE_URL = "https://eventapp.laundryholic.com/event_backend/";

  constructor(private http:HttpClient) { }

  getEventData(){
    return this.http.get(this.BASE_URL+"getEvent.php");
  }

  getAllEventData(){
    return this.http.get(this.BASE_URL+"getAllEvent.php");
  }
  postEventData(ob:any){
    return this.http.post(this.BASE_URL+"addEvent.php",ob);
  }

  updateEventData(ob:any){
    return this.http.post(this.BASE_URL+"updateEvent.php",ob);
  }

  deleteEventData(ob:any){
    return this.http.post(this.BASE_URL+"deleteEvent.php",ob);
  }

  getEventDataById(ob:any){
    return this.http.post(this.BASE_URL+"getEventDataById.php",ob);
  }

  getEventById(ob:any){
    return this.http.post(this.BASE_URL+"getEventById.php",ob);
  }
}
