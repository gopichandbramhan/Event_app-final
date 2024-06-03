import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { sha256 } from 'js-sha256';

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.css']
})
export class Header2Component {
  user_type:any;
  user_id: any;
  name:any="";

  flag:boolean = true;

  constructor(private router:Router, private auth:AuthService){}

  ngOnInit(){
    this.user_type = sessionStorage.getItem("user_type");
    this.user_id = sessionStorage.getItem("email");
    this.name = sessionStorage.getItem("full_name")
    // alert(this.user_type)
  }

  logout(){
      sessionStorage.clear()
      this.router.navigate(['/'])
  }

}