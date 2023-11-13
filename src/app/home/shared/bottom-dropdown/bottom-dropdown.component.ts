import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-bottom-dropdown',
  templateUrl: './bottom-dropdown.component.html',
  styleUrls: ['./bottom-dropdown.component.scss'],
})
export class BottomDropdownComponent  implements OnInit {
  dropdownData : any;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any,private _bottomSheetRef: MatBottomSheetRef<BottomDropdownComponent>) { }

  ngOnInit() {
    if(this.data.dropdownData.length>0){
      this.dropdownData = this.data.dropdownData
    }
  }

  onSelect(data:any){
    this.closeBottomSheet(data.label)
  }

  closeBottomSheet(data:any){
    //  pass the data to parent when bottom sheet closes.
    this._bottomSheetRef.dismiss(data);
  }

}
