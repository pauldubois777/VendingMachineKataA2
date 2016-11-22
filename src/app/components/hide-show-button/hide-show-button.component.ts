import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'vmk-hide-show-button',
  template: `<button class='btn btn-xs btn-info' (click)='toggleHideShow()'>{{butonText()}}</button>`,
  styles: []
})
export class HideShowButtonComponent implements OnInit {
  @Input() show: boolean = true;
  @Output() stateChanged = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  butonText(): string {
    return this.show ? 'Hide' : 'Show';
  }

  toggleHideShow(){
    this.show = !this.show
    this.stateChanged.emit(this.show);
  }
}
