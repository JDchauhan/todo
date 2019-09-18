import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ListeditService } from './listedit.service';

@Component({
  selector: 'app-listedit',
  templateUrl: './listedit.component.html',
  styleUrls: ['./listedit.component.css']
})
export class ListeditComponent implements OnInit {

  constructor(private listeditService: ListeditService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {

    if (!localStorage.getItem('auth')) {
      this.router.navigate(['/login'])
    }

    this.route.paramMap.subscribe(params => {
      this.id = this.route.snapshot.params.id
    });

    this.get(this.id)
    // this.list()
  }

  tasks: any
  id: any

  updatedTask = new FormGroup({
    title: new FormControl(''),
    status: new FormControl(''),
    date: new FormControl(new Date()),
  });

  get(id) {
    this.listeditService.get(id)
      .subscribe((data: any) => {
        this.tasks = data.results;

        let date = new Date(this.tasks.date)
        this.tasks.date = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear()  

        console.log(new Date(date).toISOString().substr(0, 10))
        this.updatedTask.setValue({
          title: this.tasks.title,
          date: new Date(date).toISOString().substr(0, 10),
          status: this.tasks.status,
        })

      });

  }

  updateTask() {
    this.updatedTask.value._id = this.id
    this.listeditService
      .update(this.updatedTask.value)
      .subscribe(
        data => {
          alert("successfully updated task")
          this.router.navigate(['/list'])
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
