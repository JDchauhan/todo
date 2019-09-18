import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private homeService: HomeService, private router: Router) { }

  ngOnInit() {
    if (!localStorage.getItem('auth')) {
      this.router.navigate(['/login'])
    }
  }

  updateForm = new FormGroup({
    name: new FormControl(''),
    password: new FormControl(''),
  });

  logout() {
    localStorage.removeItem("auth")
    alert("SuccessFully logged out")
    this.router.navigate(['/login'])
  }

  list() {
    this.router.navigate(['/list'])
  }

  updateUser() {
    this.updateForm.value.name === "" ? this.updateForm.value.name = undefined : ""  
    this.updateForm.value.password === "" ? this.updateForm.value.password = undefined : ""  
    
    this.homeService
      .updateUser(this.updateForm.value)
      .subscribe(
        data => {
          alert("You are successfully updated profile")
          // this.router.navigate(['/'])
        },
        err => {
          if (err === 400) {
            alert("Please enter valid data")
          }
          if (err === 500) {
            alert("Some error has occured")
          }
        }
      );
  }


}
