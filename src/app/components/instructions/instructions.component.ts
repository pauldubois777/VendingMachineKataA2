import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vmk-instructions',
  templateUrl: './instructions.component.html',
  styles: []
})
export class InstructionsComponent implements OnInit {
  instructionsVisible: boolean = false;

  constructor() { }

  ngOnInit() {
  }
}
