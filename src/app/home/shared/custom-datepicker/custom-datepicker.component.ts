import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-custom-datepicker',
  templateUrl: './custom-datepicker.component.html',
  styleUrls: ['./custom-datepicker.component.scss'],
})
export class CustomDatepickerComponent  implements OnInit {
  selected :any ='';
  minDate:any = '1999-12-31';
  maxDate:any = '2099-12-31';
  buttonsArray:any = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<CustomDatepickerComponent>) { }

  ngOnInit() {
    if(this.data.date){
      this.selected = new Date(this.data.date);
    }
    if(this.data.minDate){
      this.minDate = this.data.minDate;
    }
    if(this.data.maxDate){
      this.maxDate = this.data.maxDate
    }
    if(this.data.buttonsData && this.data.buttonsData.length>0){
      this.buttonsArray = this.data.buttonsData;
      this.buttonsArray.forEach((data:any)=>{
        data.Showdate = this.filterByDropdown(data.value);
        data.ORGData = this.filterByDropdown(data.value);
      })
    }
    console.log(this.buttonsArray)
  }

  closeDialog() {
    //Write your stuff here
    this.dialogRef.close(); // <- Closes the dialog
  }

  saveDialog(){
    this.dialogRef.close({data:this.selected}); // <- Closes the dialog
  }

  selectedDate(date:any){
    this.selected = date.ORGData;
    this.saveDialog()
  }

  onSelect(event:any){
  console.log(event)
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
