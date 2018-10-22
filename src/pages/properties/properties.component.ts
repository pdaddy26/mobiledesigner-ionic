import { Component, OnInit, Input, KeyValueDiffers, Output, KeyValueChangeRecord, EventEmitter } from '@angular/core';
import { Style } from '../../models/style';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html'
})

export class PropertiesComponent implements OnInit {

  @Input() style : Style;
  @Output() styleChanged = new EventEmitter<KeyValueChangeRecord<string, string>>();

  differ: any;

  constructor(differs:  KeyValueDiffers) { 
    this.differ = differs.find([]).create();
  }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    // console.log(changes)
  }

  ngDoCheck() {
    var changes = this.differ.diff(this.style);

    if (changes) {
      changes.forEachChangedItem((elt) => {
        this.styleChanged.emit(elt);
      });
    }
  }
}
