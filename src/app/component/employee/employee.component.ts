import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/service/employee.service';
import { Employee } from 'src/app/model/employee';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
  }
  newEmployee = this.fb.group({
    name: ['', Validators.required],
    role: ['', Validators.required],
  });
  employee: Employee;
  employeeIdToUpdate = null;
  requestProcessing = false;
  processValidation = false;
  isUpdateEmployee = false;
  ngOnInit(): void {
    this.updateEmployee();
  }

  addEmployee() {
    this.processValidation = true;
    if (this.newEmployee.invalid) {
      return;
    }
    this.preProcessConfiguration();
    const employeee = this.newEmployee.value;
    if (this.employeeIdToUpdate === null) {
      if (this.newEmployee.valid) {
        this.employeeService.addEmployee(this.newEmployee.value).subscribe(
          data => {
            this.employee = data;
            this.newEmployee.reset();
            this.router.navigate(['/employees']);
          }
        );
      }
    } else {
      employeee.id = this.employeeIdToUpdate;
      this.employeeService.updateEmployee(employeee)
        .subscribe(data => {
          this.employee = data;
          this.newEmployee.reset();
          this.router.navigate(['/employees']);
        });
    }
  }
  updateEmployee() {
    if (this.employeeService.empId) {
      this.loadEmployeeToEdit(this.employeeService.empId);
      this.employeeService.empId = null;
    }
  }
  loadEmployeeToEdit(id: number) {
    this.preProcessConfiguration();
    this.employeeService.getEmployeeById(id)
      .subscribe(employee => {
        this.employeeIdToUpdate = employee.id;
        this.newEmployee.setValue({ name: employee.name, role: employee.role });
        this.processValidation = true;
        this.isUpdateEmployee = true;
        this.requestProcessing = false;
      });
  }

  preProcessConfiguration() {
    this.requestProcessing = true;
  }
  get name() {
    return this.newEmployee.get('name');
  }

  get role() {
    return this.newEmployee.get('role');
  }

  /* route.queryParams.subscribe(x => {
    if (x.empId) {
      this.loadEmployeeToEdit(x.empId);
      console.log(x);
    }
  }); */

}
