import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/interfaces/task';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  selectedOption!: string;
  listTask: Task[] = []

  clientsMap = {
    // '=0': 'items',
    '=1': 'item',
    'other': 'items',
  }

  constructor(private _storageService: StorageService) { }

  ngOnInit(): void {
    this._storageService.getValue().subscribe(value => {
      this.listTask = value
    })
  }

  totalItemsIncompleted(): Task[] {
    return this.listTask.filter(Task => Task.completed === false)
  }

  clearCompleted() {
    let task = this.listTask.filter(Task => Task.completed === false)
    this._storageService.setItem(task)
  }

  isTasksCompleted() {
    return this.listTask.some((task: Task) => task.completed)
  }

}
