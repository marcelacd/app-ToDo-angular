import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit {

  @Output() newItemEvent = new EventEmitter<string>();
  tarea!: string;

  constructor() { }

  ngOnInit(): void {
    console.log()
  }

  saveValue() {
    if(this.tarea){
      this.newItemEvent.emit(this.tarea.trim());
      this.tarea = ''
    }
  }

}
