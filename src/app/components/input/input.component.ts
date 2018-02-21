import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'su-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {

  constructor() { }

  @Input() model: string;
  @Output() handleChange = new EventEmitter();

}
