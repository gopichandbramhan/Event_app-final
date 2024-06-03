import { Component } from '@angular/core';
import { CommonDataService } from 'src/app/services/common-data.service';

@Component({
  selector: 'app-banner-image',
  templateUrl: './banner-image.component.html',
  styleUrls: ['./banner-image.component.css']
})
export class BannerImageComponent {
  file:any= ""
  fileData:any;
  id:string="";
  dtOptions: DataTables.Settings = {};
  constructor(private cms:CommonDataService){
    
  }

  ngOnInit(){
    this.banner_image()
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
  }
  banner_image(){
    this.cms.banner_image().subscribe((data:any)=>{
      console.log(data)
      this.fileData = data
    })
  }

  selectInage(event:any){
    this.file=event.target.files[0];
    console.log(event.target.files[0].name)
  }

  save(){
    if(this.file === undefined || this.file == ""){
      alert("please select Image to upload")
      return;
    }
    const formData = new FormData();
    formData.append("banner_image",this.file)
    this.cms.addBannerImage(formData).subscribe((data:any)=>{
        console.log(data)
        this.banner_image()
    })
  }

  deleteImage(event:any){
    if(confirm("are you sure want to delete this ?")){
      const formData = new FormData();
      formData.append("id",event.target.id)
  
      this.cms.deleteBannerImage(formData).subscribe((data:any)=>{
          console.log(data)
          this.banner_image()
      })
    }
  }

}
