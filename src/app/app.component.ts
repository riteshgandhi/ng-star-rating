import { Component, ViewChild, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { StarRatingComponent } from 'rating';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rg-rating';
  private _checkedColor: string;
  private _unCheckedColor: string;
  private _size: number;
  private _value: number;
  private onValueChange:Subject<number>;
  private onCheckedColorChange:Subject<string>;
  private onUnCheckedColorChange:Subject<string>;
  private onSizeChange:Subject<number>;

  @ViewChild('starRating') starRating: StarRatingComponent;

  get checkedColor(): string {
    return this._checkedColor;
  }

  get unCheckedColor(): string {
    return this._unCheckedColor;
  }

  get value(): number {
    return this._value;
  }

  get size(): number {
    return this._size;
  }

  @Input('checkedColor') set checkedColor(value: string) {
    this._checkedColor = value;
    if (this._checkedColor) {
      this.onCheckedColorChange.next(this._checkedColor);
    }
  }

  @Input('unCheckedColor') set unCheckedColor(value: string) {
    this._unCheckedColor = value;
    if (this._unCheckedColor) {
      this.onUnCheckedColorChange.next(this._unCheckedColor);
    }
  }

  @Input('value') set value(value: number) {
    this._value = value;
    this.onValueChange.next(this._value);
  }

  @Input('size') set size(value: number) {
    if (!value || value == null) {
      value = 24;
    }

    this._size = value;
    this.onSizeChange.next(this._size);
  }

  constructor() { }

  ngOnInit() {
    if (!this.onValueChange) {
      this.onValueChange = new Subject();
      this.onValueChange.subscribe(newValue => {
        this.starRating.value = this._value;
      });
    }

    if (!this.onCheckedColorChange) {
      this.onCheckedColorChange = new Subject();
      this.onCheckedColorChange.subscribe(newValue => {
        this.starRating.checkedColor = this._checkedColor;
      });
    }

    if (!this.onUnCheckedColorChange) {
      this.onUnCheckedColorChange = new Subject();
      this.onUnCheckedColorChange.subscribe(newValue => {
        this.starRating.unCheckedColor = this._unCheckedColor;
      });
    }

    if (!this.onSizeChange) {
      this.onSizeChange = new Subject();
      this.onSizeChange.subscribe(newValue => {
        this.starRating.size = `${this._size}px`;
      });
    }

    this.checkedColor="gold";
    this.unCheckedColor="gray";
    this.value=3.5;
    this.size = 24;
  }

  // private applyChanges() {
  //   this.starRating.checkedColor = this._checkedColor;
  //   this.starRating.unCheckedColor = this._unCheckedColor;
  //   this.starRating.value = this._value;
  // }
}
