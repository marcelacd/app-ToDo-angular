import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/interfaces/task';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  // idCounter: number = 1;
  listTasks: Task[] = []

  constructor(private _storageService: StorageService) { }

  ngOnInit(): void {
    this._storageService.getValue().subscribe(value => {
      this.listTasks = value
    })
  }

  addTarea(newItem: string) {
    const task = {
      id: this.generarRandom().toString(),
      // id: this.idCounter.toString(),
      title: newItem,
      completed: false
    }
    // this.idCounter++;
    this.listTasks.push(task)
    this._storageService.setItem(this.listTasks)
  }

  generarRandom(): number {
    return Math.floor(Math.random() * (999 - 1 + 1)) + 1;
  }

}
