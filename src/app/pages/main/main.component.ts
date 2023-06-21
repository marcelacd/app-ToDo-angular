import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/interfaces/task';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {

  newValor: string = ''
  idTask: string = ''
  listTasks: Task[] = []
  params: any

  constructor(private _storageService: StorageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.params = params
    })
    this._storageService.getValue().subscribe(value => {
      this.listTasks = value
      this.filterTasks(this.params)
    })
  }

  handleDoubleClick(task: Task) {
    this.newValor = task.title
    this.idTask = task.id
  }

  handleChangeOfCompleted() {
    this._storageService.setItem(this.listTasks)
  }

  saveValue(task: Task) {
    const index = this.listTasks.findIndex(obj => obj.id === task.id);
    if (index !== -1 && this.newValor) {
      this.listTasks[index].title = this.newValor.trim()
      this._storageService.setItem(this.listTasks)
      this.idTask = ''
    }
  }

  handleEscapeKey(): void {
    this.idTask = ''
  }

  delete(task: Task) {
    this.listTasks = this.listTasks.filter(obj => obj.id !== task.id)
    this._storageService.setItem(this.listTasks)
  }

  filterTasks(params: any) {
    let filtered!: boolean
    if (params.completed === 'pending') {
      filtered = false
    }
    if (params.completed === 'completed') {
      filtered = true
    }
    this.listTasks = this._storageService.filterValue(filtered)
  }

}
