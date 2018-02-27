import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'su-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  constructor() { }

  @Input() buttonText: string;
  @Input() isDisabled: boolean;
  @Input() type: string;

  @Output() handleClick = new EventEmitter();

}
