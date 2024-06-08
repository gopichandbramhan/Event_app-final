import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BannerImagesService {

  private apiUrl = 'https://api.slingacademy.com/v1/sample-data/photos';

  constructor(private http: HttpClient) {}

  getPhotos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
