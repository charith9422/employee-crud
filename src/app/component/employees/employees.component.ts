import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee.service';
import { Employee } from 'src/app/model/employee';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/layout/confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  constructor(
    private employeeService: EmployeeService, private dialog: MatDialog, private router: Router
  ) { }

  employees: Employee[];
  // editEmployee: Employee;
  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.employeeService.getEmployees().subscribe(employees => this.employees = employees);
  }
  deleteEmployee(employee: Employee) {
    this.employees = this.employees.filter(c => c !== employee);
    this.employeeService.deleteEmployee(employee.id).subscribe();
  }
  edit(employee) {
    this.employeeService.empId = employee.id;
    this.router.navigate(['/employee']);
  }
  openDialog(employee: Employee) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, ({
      data: {
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    }));
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        // console.log('Deleted');
        this.deleteEmployee(employee);
      }
    });
  }
}
