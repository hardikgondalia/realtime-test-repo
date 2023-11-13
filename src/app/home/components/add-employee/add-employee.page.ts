import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../service/api-calls.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomDatepickerComponent } from '../../shared/custom-datepicker/custom-datepicker.component';
import * as moment from 'moment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomDropdownComponent } from '../../shared/bottom-dropdown/bottom-dropdown.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.page.html',
  styleUrls: ['./add-employee.page.scss'],
})
export class AddEmployeePage implements OnInit {
  public startPicker = false;
  public endPicker = false;
  public today = new Date();
  public employeeForm!: FormGroup ;

  constructor(public apiCall : ApiCallsService,public dialog: MatDialog,private _bottomSheet: MatBottomSheet,private router: Router) {
    this.setForm();
   }

   setForm(){
    this.employeeForm = new FormGroup({
      personName: new FormControl('' , [Validators.required]),
      personRole: new FormControl('' , [Validators.required]),
      jobStartDate: new FormControl('' , [Validators.required]),
      jobEndDate: new FormControl('')
    })
   }

  ngOnInit() {
    // console.log(new Date())
  }

  openBottomSheet(): void {
    const bottomSheetRef = this._bottomSheet.open(BottomDropdownComponent,{
      data :{
        dropdownData : [
        {label:'Product Designer',value:'Product Designer'},
        {label:'Flutter Developer',value:'Flutter Developer'},
        {label:'QA Tester',value:'QA Tester'},
        {label:'Product Owner',value:'Product Owner'},
        ]}
    });

    bottomSheetRef.afterDismissed().subscribe((dataFromChild:any) => {
      if(dataFromChild){
        this.employeeForm.get('personRole')?.setValue(dataFromChild);
      }
    });
  }

  clickedOutside(){
    this.startPicker = false
  }

  openStartDialog() {
    const dialogRef = this.dialog.open(CustomDatepickerComponent,{
      data :{date :'',buttonsData : [
        {label:'Today',value:'today'},
        {label:'Yesterday',value:'yesterday'},
        {label:'This Week Start',value:'thisWeekStartdate'},
        {label:'Last Week Start',value:'lastWeekStartdate'},
        ]}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result?.data){
        this.employeeForm.get('jobStartDate')?.setValue(result?.data);
      }
      // console.log(`Dialog result: ${result?.data}`);
    });
  }

  openEndDialog() {
    const dialogRef = this.dialog.open(CustomDatepickerComponent,{
      data :{date :'' ,minDate:this.today ,buttonsData : [
        {label:'Today',value:'today'},
        {label:'Yesterday',value:'yesterday'},
      ]}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result?.data){
        this.employeeForm.get('jobEndDate')?.setValue(result?.data);
      }
      // console.log(`Dialog result: ${result?.data}`);
    });
  }


  saveEmployee(){
    const tempId = "employee"+new Date().getTime();
    let model = {
      tempId : tempId,
      personName : this.employeeForm.get('personName')?.value,
      personRole:this.employeeForm.get('personRole')?.value,
      jobStartDate:this.employeeForm.get('jobStartDate')?.value,
      jobEnddate:this.employeeForm.get('jobEndDate')?.value,
    }
    this.apiCall.add(tempId,model).then(res=>{

      if(res){
        this.employeeForm.reset();
        this.navigateTo('/home')

      }
      })
  }

  navigateTo(url: string) {
    this.router.navigate([url]);
  }


  public filterByDropdown = (value:any) => {
    switch(value) {
      case 'today' : {
       return new Date();
      }
      case 'yesterday' : {
       let currentDate = new Date();
       currentDate.setDate(currentDate.getDate()-1);
       return currentDate
      }
      case 'thisWeekStartdate' : {
       let currentDate = new Date();
       let weekData = this.getWholeWeekByDate(currentDate);
       return weekData[0].date
      }
      case 'thisWeekEndDate' : {
       let currentDate = new Date();
       let weekData = this.getWholeWeekByDate(currentDate);
       return weekData[6].date;
      }
      case 'lastWeekStartdate' : {
       let currentDate = new Date();
       let previousMonday = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7);
       let weekData = this.getWholeWeekByDate(previousMonday);
      return weekData[0].date;
      }
      case 'lastWeekEndDate' : {
       let currentDate = new Date();
       let previousMonday = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7);
       let weekData = this.getWholeWeekByDate(previousMonday);
       return weekData[6].date;
      }
      case 'thisMonthStartdate' : {
       const date = new Date();
       const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
       return firstDay;
      }
      case 'thisMonthEndDate' : {
       const date = new Date();
       const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
       return lastDay;
      }
      case 'lastMonthStartdate' : {
       const date = new Date();
       const firstDayPrevMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
       return firstDayPrevMonth;
      }
      case 'lastMonthEndDate' : {
       const date = new Date();
       const lastDayPrevMonth = new Date(date.getFullYear(), date.getMonth(), 0);
       return lastDayPrevMonth;
      }
      case 'lastMonthEndDate' : {
       const date = new Date();
       const lastDayPrevMonth = new Date(date.getFullYear(), date.getMonth(), 0);
       return lastDayPrevMonth;
      }
      case 'thisQuarterStartDate' : {
        const thisQuarterStartDate= moment().startOf('quarter').toDate();
        return thisQuarterStartDate;
       }
       case 'thisQuarterEndDate' : {
        const thisQuarterEndDate= moment().endOf('quarter').toDate();
        return thisQuarterEndDate;
       }
      case 'lastQuarterStartDate' : {
       const quarterAdjustment= (moment().month() % 3) + 1;
       const lastQuarterEndDate = moment().subtract({ months: quarterAdjustment }).endOf('month');
       const lastQuarterStartDate = lastQuarterEndDate.clone().subtract({ months: 3 }).startOf('month').toDate();
       return lastQuarterStartDate;
      }
      case 'lastQuarterEndDate' : {
        const quarterAdjustment= (moment().month() % 3) + 1;
        const lastQuarterEndDate = moment().subtract({ months: quarterAdjustment }).endOf('month').toDate();
        return lastQuarterEndDate;
       }
      case 'thisSemesterStartDate' : {
       let date = new Date();
       let getSemester:any;
       if(date.getMonth()+1>6){
        getSemester = `07/01/${date.getFullYear()}`
       }else if(date.getMonth()+1<7){
        getSemester = `01/01/${date.getFullYear()}`
       }
       const thisSemesterStartDate= new Date(getSemester) ;
       return thisSemesterStartDate;
      }
      case 'thisSemesterEndDate' : {
        let date = new Date();
        let getSemester:any;
        if(date.getMonth()+1>6){
         getSemester = `12/31/${date.getFullYear()}`
        }else if(date.getMonth()+1<7){
         getSemester = `06/30/${date.getFullYear()}`
        }
        const thisSemesterEndDate = new Date(getSemester) ;
       return thisSemesterEndDate;
      }
      case 'lastSemesterStartDate' : {
        let date = new Date();
        let getSemester:any;
        if(date.getMonth()+1>6){
         getSemester = `01/01/${date.getFullYear()}`
        }else if(date.getMonth()+1<7){
         getSemester = `07/01/${date.getFullYear()-1}`
        }
        const lastSemesterStartDate = new Date(getSemester) ;
      return lastSemesterStartDate;
      }
      case 'lastSemesterEndDate' : {
        let date = new Date();
        let getSemester:any;
        if(date.getMonth()+1>6){
         getSemester = `06/30/${date.getFullYear()}`
        }else if(date.getMonth()+1<7){
         getSemester = `12/31/${date.getFullYear()-1}`
        }
        const lastSemesterEndDate = new Date(getSemester) ;
      return lastSemesterEndDate;
      }
      case 'thisYearStartDate' : {
       const date = new Date();
       const thisYearStartDate = new Date(`01/01/${date.getFullYear()}`);
       return thisYearStartDate;
      }
      case 'thisYearEndDate' : {
        const date = new Date();
        const thisYearEndDate = new Date(`12/31/${date.getFullYear()}`);;
        return thisYearEndDate;
       }
      case 'lastYearStartDate' : {
       const date = new Date();
       const lastYearStartDate = new Date(`01/01/${date.getFullYear()-1}`);;
       return lastYearStartDate;
      }
      case 'lastYearEndDate' : {
        const date = new Date();
        const lastYearEndDate = new Date(`12/31/${date.getFullYear()-1}`);;
        return lastYearEndDate;
       }
      default: {
        return new Date();
      }
    }
   }

   public getWholeWeekByDate = (startDate:any) => {
    var curr = (startDate);
    let model = [];
        for(let i=0;i<7;i++){
          model.push({
            date : new Date(curr.setDate(curr.getDate() - curr.getDay()+i))
          })
        }
        return model
    }

}
