import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListeditService {

  constructor(private http: HttpClient) { }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.status);
  }

  update(data: ListeditService) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + localStorage.getItem('auth')
      })
    };
    return this.http.put<ListeditService>('http://localhost:3000/todo', data, httpOptions)
      .pipe(
        catchError((err: any) => this.handleError(err))
      );
  }

  get(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + localStorage.getItem('auth')
      })
    };
    
    return this.http.get<ListeditService>('http://localhost:3000/todo/' + data, httpOptions)
    .pipe(
      catchError((err: any) => this.handleError(err))
    );
  }

}
