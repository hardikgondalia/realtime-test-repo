import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { AddEmployeePage } from './components/add-employee/add-employee.page';
import { ApiCallsService } from './service/api-calls.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import { ClickOutsideDirective } from './directive/click-outside.directive';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconTestingModule} from '@angular/material/icon/testing';
import { CustomDatepickerComponent } from './shared/custom-datepicker/custom-datepicker.component';
import { MatIconModule } from '@angular/material/icon'
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { BottomDropdownComponent } from './shared/bottom-dropdown/bottom-dropdown.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,  
    ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatCardModule,
    MatNativeDateModule,
    MatDialogModule,
    MatIconTestingModule,
    MatIconModule,
    MatBottomSheetModule
  ],
  declarations: [HomePage,AddEmployeePage,ClickOutsideDirective,CustomDatepickerComponent,BottomDropdownComponent],
  providers: [ApiCallsService,MatNativeDateModule],
  exports : [ClickOutsideDirective]
})
export class HomePageModule {}
