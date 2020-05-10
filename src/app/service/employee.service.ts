import { Injectable } from '@angular/core';
import * as configuration from '../../assets/configuration.json';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private empIdToEdit;

  constructor(private http: HttpClient) { }

  host = configuration.host;
  employees = configuration.endpoints.employees;

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.host}${this.employees}`);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.host}${this.employees}`, employee);
  }

  deleteEmployee(id: number): Observable<{}> {
    return this.http.delete(`${this.host}${this.employees}/${id}`);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>((`${this.host}${this.employees}/${employee.id}`), employee);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.host}${this.employees}/${id}`);
  }

  get empId() {
    return this.empIdToEdit;
  }

  set empId(id: number) {
    this.empIdToEdit = id;
  }
}
