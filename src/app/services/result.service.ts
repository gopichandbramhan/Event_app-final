import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  private BASE_URL:string = "http://localhost/event_backend/";
  // private BASE_URL = "https://eventapp.laundryholic.com/event_backend/";

  constructor(private http:HttpClient) { }

  getResult(){
    return this.http.get(this.BASE_URL+"getResult.php");
  }
  postResult(ob:any){
   return this.http.post(this.BASE_URL+"addResult.php",ob);
  }
  updateResult(ob:any){
    return this.http.post(this.BASE_URL+"updateResult.php",ob);
  }
  deleteResult(ob:any){
    return this.http.post(this.BASE_URL+"deleteResult.php",ob);
  }

  getUserHistory(ob:any){
    return this.http.post(this.BASE_URL+"user_history.php",ob);
  }
}
