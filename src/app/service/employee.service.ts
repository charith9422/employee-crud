import { Injectable } from '@angular/core';
import * as configuration from '../../assets/configuration.json';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorService, HandleError } from './http-error.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private empIdToEdit;
  private handleError: HandleError;

  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorService) {
    this.handleError = httpErrorHandler.createHandleError('EmployeeService');
  }

  host = configuration.host;
  employees = configuration.endpoints.employees;

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.host}${this.employees}`)
      .pipe(
        retry(3),
        catchError(this.handleError('getEmployees', []))
      );
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.host}${this.employees}`, employee)
      .pipe(
        catchError(this.handleError('addEmployee', employee))
      );
  }

  deleteEmployee(id: number): Observable<{}> {
    return this.http.delete(`${this.host}${this.employees}/${id}`)
      .pipe(
        catchError(this.handleError('deleteEmployee'))
      );
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>((`${this.host}${this.employees}/${employee.id}`), employee)
      .pipe(
        catchError(this.handleError('updateEmployee', employee))
      );
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.host}${this.employees}/${id}`)
      .pipe(
        retry(3)
      );
  }

  get empId() {
    return this.empIdToEdit;
  }

  set empId(id: number) {
    this.empIdToEdit = id;
  }
}
