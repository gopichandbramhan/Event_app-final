import { Component } from '@angular/core';
import { CommonDataService } from 'src/app/services/common-data.service';

@Component({
  selector: 'app-contact-us-view',
  templateUrl: './contact-us-view.component.html',
  styleUrls: ['./contact-us-view.component.css']
})
export class ContactUsViewComponent {
  dataArray:any;
  dtOptions: DataTables.Settings = {};
constructor(private cms:CommonDataService){}

ngOnInit(){
  this.cms.contactusDetails().subscribe((data:any)=>{
    console.log(data)
    this.dataArray = data;
  })
  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 10,
    processing: true
  };
}
}
