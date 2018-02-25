import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'su-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {

  constructor() { }

  @Input() buttonText;
  @Input() isDisabled;
  @Output() handleClick = new EventEmitter();

}
