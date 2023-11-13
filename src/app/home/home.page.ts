import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from './service/api-calls.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  employeeData:any = [];
  currentEmployeeData : any = [];
  previousEmployeeData : any = [];
  constructor(public apiCall : ApiCallsService,private router: Router) {}


  ngOnInit(): void {

   setInterval(() => {
    this.getData()
   },1000)
  }

  getData(){
    this.apiCall.getAll().then((res:any)=>{
      if(res){
        this.employeeData = res;
        this.currentEmployeeData = this.employeeData.filter((date:any)=>!date.jobEnddate)
        this.previousEmployeeData = this.employeeData.filter((date:any)=>date.jobEnddate)
      }
      })
  }

  removeItem(data:any){
   console.log(data)
   this.apiCall.delete(data.tempId).then((res:any)=>{
    if(res){
      this.getData();
    }
    })
  }

  navigateTo(url: string) {
    this.router.navigate([url]);
  }



}
