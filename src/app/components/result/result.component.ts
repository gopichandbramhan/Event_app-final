import { Component } from '@angular/core';
import { CommonDataService } from 'src/app/services/common-data.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {
email:any="";
resultData:any;
dtOptions: DataTables.Settings = {};
  constructor(private cms:CommonDataService){

  }

  ngOnInit(){
    this.getResult()
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
  }

  getResult(){
     this.email = sessionStorage.getItem("email")
    const formData = new FormData();
    formData.append("email",this.email)
    this.cms.getResult(formData).subscribe((data:any)=>{
      console.log(data)
      this.resultData=data
    })
  }

}
