import { Component } from '@angular/core';
import { ResultService } from 'src/app/services/result.service';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent {

  history:any;
  user_id:any="";
  dtOptions: DataTables.Settings = {};
  constructor(private resultService:ResultService){}

  ngOnInit(){
    this.user_id = sessionStorage.getItem("email");
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };

    this.getUserHistory()
  }

  getUserHistory(){
    const formData = new FormData();
    formData.append("user_id",this.user_id)
    this.resultService.getUserHistory(formData).subscribe((data:any)=>{
      this.history = data;
    })
  }
}
