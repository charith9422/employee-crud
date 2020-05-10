import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './component/employees/employees.component';
import { EmployeeComponent } from './component/employee/employee.component';


const routes: Routes = [
  { path: 'employees', component: EmployeesComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: '', redirectTo: '/employees', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
