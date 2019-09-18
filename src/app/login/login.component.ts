import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  registerForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  config: any
  email: any
  password: any
  // showConfig() {
  //   this.loginService.getConfig()
  //     .subscribe((data: LoginService) => {
  //       this.config = {
  //         heroesUrl: data['heroesUrl'],
  //         textfile:  data['textfile']
  //       };
  //       console.log(this.config)
  //   });
  // }

  login() {
    this.loginService
      .login(this.loginForm.value)
      .subscribe(
        data => {
          localStorage.setItem('auth', data.results.token);
          this.router.navigate(['/'])
        },
        err => {
          if (err === 400) {
            alert("Please enter valid data")
          }
          if (err === 404 || err === 401) {
            alert("Incorrect email or password")
          }
          if (err === 409) {
            alert("User already exists")
          }
          if (err === 500) {
            alert("Some error has occured")
          }
        }
      );
  }

  register() {
    this.loginService
      .register(this.registerForm.value)
      .subscribe(
        data => {
          alert("You are successfully registered")
          // this.router.navigate(['/'])
        },
        err => {
          if (err === 400) {
            alert("Please enter valid data")
          }
          if (err === 409) {
            alert("User already exists")
          }
          if (err === 500) {
            alert("Some error has occured")
          }
        }
      );
  }

  ngOnInit() {
    if (localStorage.getItem('auth')) {
      this.router.navigate(['/'])
    }
  }

}
