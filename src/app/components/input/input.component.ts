import { Component, EventEmitter, Output, Input } from "@angular/core";

@Component({
  selector: "su-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.css"]
})
export class InputComponent {

  constructor() { }

  @Input() model: string;
  @Input() type: string;
  @Input() identifier: string;
  @Output() handleChange = new EventEmitter();

}
