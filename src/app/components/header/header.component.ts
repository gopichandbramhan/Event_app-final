import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  user_type:any = ""
  constructor(private router:Router){}

  ngOnInit(){
    this.user_type = sessionStorage.getItem("user_type")
  }

  logout(){
    sessionStorage.clear()
    this.router.navigate(['/'])
  }

}
