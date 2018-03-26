import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Component({
  selector: "su-typeahead",
  templateUrl: "./typeahead.component.html",
  styleUrls: ["./typeahead.component.scss"]
})
export class TypeaheadComponent implements OnInit {

  inputValue: string;
  private destroy$: Subject<null> = new Subject();

  constructor() { }

  @Input() option$: BehaviorSubject<any[]>;
  @Input() labelKey: string;
  @Input() model$: BehaviorSubject<string>;

  @Output() selectOption = new EventEmitter();

  ngOnInit() {
    this.model$
      .takeUntil(this.destroy$)
      .subscribe((value: string) => this.inputValue = value);
  } 

  handleOptionClick(option: any): void {
    this.selectOption.emit(option);
  }

  handleTextChange(value: string): void {
    this.model$.next(value);
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

}
