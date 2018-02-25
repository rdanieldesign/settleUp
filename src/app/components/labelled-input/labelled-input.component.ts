import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "su-labelled-input",
  templateUrl: "./labelled-input.component.html",
  styleUrls: ["./labelled-input.component.css"]
})
export class LabelledInputComponent implements OnInit {

  constructor() { }

  @Input() label: string;
  @Input() identifier: string;
  @Input() model: string;
  @Input() inputType: string;

  @Output() handleChange = new EventEmitter();

  ngOnInit() {
  }

}
