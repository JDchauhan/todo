import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.status);
  }

  updateUser(data: HomeService) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + localStorage.getItem('auth')
      })
    };
    return this.http.put<HomeService>('http://localhost:3000/user', data, httpOptions)
      .pipe(
        catchError((err: any) => this.handleError(err))
      );
  }

}
