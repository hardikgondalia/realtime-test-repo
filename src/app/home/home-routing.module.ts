import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { AddEmployeePage } from './components/add-employee/add-employee.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'add-employee',
    component: AddEmployeePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
