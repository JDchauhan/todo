import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.status);
  }

  createTask(data: ListService) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + localStorage.getItem('auth')
      })
    };
    return this.http.post<ListService>('http://localhost:3000/todo', data, httpOptions)
      .pipe(
        catchError((err: any) => this.handleError(err))
      );
  }
  
  deleteTask(data: ListService) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + localStorage.getItem('auth')
      })
    };
    return this.http.delete<ListService>('http://localhost:3000/todo/' + data, httpOptions)
      .pipe(
        catchError((err: any) => this.handleError(err))
      );
  }
  
  getList() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + localStorage.getItem('auth')
      })
    };
    
    return this.http.get<ListService>('http://localhost:3000/todo', httpOptions)
    .pipe(
      catchError((err: any) => this.handleError(err))
    );
  }

}
