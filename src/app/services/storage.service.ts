import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  private subject = new BehaviorSubject<Task[]>([])
  private localStorageKey = 'mydayapp-angular'

  constructor() {
    const storedValue = localStorage.getItem(this.localStorageKey)
    if (storedValue) {
      const parsedValue = JSON.parse(storedValue)
      this.subject.next(parsedValue)
    }
  }

  getValue() {
    console.log(this.subject.asObservable())
    return this.subject.asObservable()
  }

  setItem(value: any): void {
    this.subject.next(value)
    localStorage.setItem(this.localStorageKey, JSON.stringify(value))
  }

  filterValue(filtered: boolean) {
    const currentValue = this.subject.getValue();
    if (filtered === undefined) {
      return currentValue
    }
    const filteredValue = currentValue.filter(item => {
      return item.completed == filtered
    })
    return filteredValue
  }

}