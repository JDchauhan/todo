import { Component, OnInit } from '@angular/core';
import { ListService } from './list.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  constructor(private listService: ListService, private router: Router) { }

  ngOnInit() {

    if (!localStorage.getItem('auth')) {
      this.router.navigate(['/login'])
    }

    this.list()
  }

  tasks: any[] = []

  newTask = new FormGroup({
    title: new FormControl(''),
    status: new FormControl(''),
    date: new FormControl(new Date()),
  });

  create() {
    this.listService
      .createTask(this.newTask.value)
      .subscribe(
        data => {
          alert("Successfully inserted task")
          this.list()
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

  list() {
    this.listService.getList()
      .subscribe((data: any) => {
        this.tasks = data.results;
        for(let i = 0; i < this.tasks.length; i++){
          let date = new Date(this.tasks[i].date)
          this.tasks[i].date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
        }
      });
  }

  delete(id: any) {
    this.listService
      .deleteTask(id)
      .subscribe(
        data => {
          alert("Successfully deleted task")
          this.list()
        },
        err => {
          if (err === 400) {
            alert("Please enter valid data")
          }
          if (err === 404) {
            alert("Task not found")
          }
          if (err === 409) {
            alert("Data already exists")
          }
          if (err === 500) {
            alert("Some error has occured")
          }
        }
      );
  }

  logout() {
    localStorage.removeItem("auth")
    alert("SuccessFully logged out")
    this.router.navigate(['/login'])
  }

}
