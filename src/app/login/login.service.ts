import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  // configUrl = 'assets/config.json';

  // getConfig() {
  //   // now returns an Observable of Config
  //   return this.http.get<LoginService>(this.configUrl);
  // }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.status);
  }

  login(data: LoginService) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': 'my-auth-token'
      })
    };
    return this.http.post<LoginService>('http://localhost:3000/login', data, httpOptions)
      .pipe(
        catchError((err: any) => this.handleError(err))
      );
  }

  register(data: LoginService) {
    console.log(data)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': 'my-auth-token'
      })
    };
    return this.http.post<LoginService>('http://localhost:3000/register', data, httpOptions)
      .pipe(
        catchError((err: any) => this.handleError(err))
      );
  }
}
