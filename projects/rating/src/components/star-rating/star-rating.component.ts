import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'star-rating',
  template: `
  <div #starMain>
    <span data-index="1" #star1></span>
    <span data-index="2" #star2></span>
    <span data-index="3" #star3></span>
    <span data-index="4" #star4></span>
    <span data-index="5" #star5></span>
  </div>
  <style>
    :root {
      --checkedColor: gold;
      --unCheckedColor: gray;
      --size: 24px;
      --halfWidth: 10px;
      --halfMargin: -20px;
    }  
    .star {
      cursor: pointer;
      color: var(--unCheckedColor);
      font-size: var(--size);
      width: var(--size);
      display: inline-block;
    }
    .star:last-child {
      margin-right: 0;
    }
    .star:before {
      content:'\\2605';
    }
    .star.on {
      color: var(--checkedColor);
    }
    .star.half:after {
      content:'\\2605';
      color: var(--checkedColor);
      position: absolute;
      margin-left: var(--halfMargin);
      width: var(--halfWidth);
      overflow: hidden;
    }
  </style>
   `
})

export class StarRatingComponent {
  private stars = [];
  private _checkedColor: string;
  private _unCheckedColor: string;
  private _value: number;
  private _size: string;
  private _readOnly: boolean = false;

  private onValueChange: Subject<number>;
  private onCheckedColorChange: Subject<string>;
  private onUnCheckedColorChange: Subject<string>;
  private onSizeChange: Subject<string>;
  private onReadOnlyChange: Subject<boolean>;

  @ViewChild('starMain') private mainElement: ElementRef;
  @ViewChild('star1') private star1Element: ElementRef;
  @ViewChild('star2') private star2Element: ElementRef;
  @ViewChild('star3') private star3Element: ElementRef;
  @ViewChild('star4') private star4Element: ElementRef;
  @ViewChild('star5') private star5Element: ElementRef;

  constructor() {
    if (!this.onValueChange) {
      this.onValueChange = new Subject();
      this.onValueChange.subscribe(() => {
        this.generateRating();
        this.applySizeAllStars();
      });
    }

    if (!this.onCheckedColorChange) {
      this.onCheckedColorChange = new Subject();
      this.onCheckedColorChange.subscribe(() => {
        this.applyColorStyleAllStars(true);
      });
    }

    if (!this.onUnCheckedColorChange) {
      this.onUnCheckedColorChange = new Subject();
      this.onUnCheckedColorChange.subscribe(() => {
        this.applyColorStyleAllStars(false);
      });
    }

    if (!this.onSizeChange) {
      this.onSizeChange = new Subject();
      this.onSizeChange.subscribe(() => {
        this.applySizeAllStars();
      });
    }

    if (!this.onReadOnlyChange) {
      this.onReadOnlyChange = new Subject();
      this.onReadOnlyChange.subscribe(() => {
        this.addRemoveEvents();
      });
    }
  }

  get checkedcolor(): string {
    return this._checkedColor;
  }

  get uncheckedcolor(): string {
    return this._unCheckedColor;
  }

  get value(): number {
    return this._value;
  }

  get size(): string {
    return this._size.concat((!this._size.includes("px") ? "px" : ""));
  }

  get readonly(): boolean {
    return String(this._readOnly) === "true";
  }

  @Input('checkedcolor') set checkedcolor(value: string) {
    this._checkedColor = value;
    if (this._checkedColor) {
      this.onCheckedColorChange.next(this._checkedColor);
    }
  }

  @Input('uncheckedcolor') set uncheckedcolor(value: string) {
    this._unCheckedColor = value;
    if (this._unCheckedColor) {
      this.onUnCheckedColorChange.next(this._unCheckedColor);
    }
  }

  @Input('value') set value(value: number) {
    if (!value || value == null) {
      value = 0;
    }

    if (value > 5) {
      value = 5;
    }

    this._value = value;

    if (this._value >= 0) {
      this.onValueChange.next(this._value);
    }
  }

  @Input('size') set size(value: string) {
    if (!value || value == null || value == "0px") {
      value = "24px";
    }
    this._size = value;
    this.onSizeChange.next(this._size);
  }

  @Input('readonly') set readonly(value: boolean) {
    this._readOnly = value;
    this.onReadOnlyChange.next(value);
  }

  private makeEditable() {
    this.stars.forEach(star => {
      star.nativeElement.addEventListener('click', this.rate.bind(this));
      star.nativeElement.addEventListener('mouseover', this.rate.bind(this));
    });
  }

  private makeReadOnly() {
    this.stars.forEach((star:ElementRef) => {
      star.nativeElement.__zone_symbol__clickfalse = null;
      star.nativeElement.__zone_symbol__mouseoverfalse = null;
    });
  }

  private addRemoveEvents() {
    if (this.readonly) {
      this.makeReadOnly();
    } else {
      this.makeEditable();
      this.onValueChange.next(this.value);
    }
  }

  private ngAfterViewInit() {
  }

  private rate(event:MouseEvent) {
    let star:HTMLElement = <HTMLElement> event.srcElement;
    this.value = parseInt(star.dataset.index);
    if (this.value == 0) {
      this.value = 1;
    }
  }

  private setStars() {
    if (this.stars.length == 0) {
      this.stars.push(this.star1Element);
      this.stars.push(this.star2Element);
      this.stars.push(this.star3Element);
      this.stars.push(this.star4Element);
      this.stars.push(this.star5Element);
    }
  }

  private applySizeAllStars() {
    if (this._size) {
      this.stars.forEach((star:ElementRef) => {
        let newSize = this.size.match(/\d+/)[0];
        let halfSize = (parseInt(newSize) * 10) / 24;
        let halfMargin = 0 - ((parseInt(newSize) * 20) / 24);
        star.nativeElement.style.setProperty('--size', this.size);
        if (star.nativeElement.classList.contains("half")) {
          star.nativeElement.style.setProperty('--halfWidth', `${halfSize}px`);
          star.nativeElement.style.setProperty('--halfMargin', `${halfMargin}px`);
        }
      });
    }
  }

  private applyColorStyleAllStars(setChecked: boolean) {
    this.stars.forEach(star => {
      if (setChecked) {
        this.applyCheckedColorStyle(star.nativeElement);
      } else {
        this.applyUnCheckedColorStyle(star.nativeElement);
      }
    });
  }

  private applyColorStyle(starElement: HTMLSpanElement) {
    this.applyCheckedColorStyle(starElement);
    this.applyUnCheckedColorStyle(starElement);
  }

  private applyCheckedColorStyle(starElement: HTMLSpanElement) {
    starElement.style.setProperty('--checkedColor', this.checkedcolor);
  }

  private applyUnCheckedColorStyle(starElement: HTMLSpanElement) {
    starElement.style.setProperty('--unCheckedColor', this.uncheckedcolor);
  }

  private generateRating() {
    if (this.readonly) {
      return;
    }
    this.setStars();
    if (this.value >= 0) {
      this.mainElement.nativeElement.title = this.value;

      let hasDecimals: boolean =
        ((Number.parseFloat(this.value.toString()) % 1)
          .toString()
          .substring(3, 2)) ? true : false;

      let i = 1;
      this.stars.forEach(star => {
        star.nativeElement.classList = [];
        this.applyColorStyle(star.nativeElement);
        star.nativeElement.classList.add("star");

        if (this.value >= i) {
          // star on
          star.nativeElement.classList.add("on");
        } else {
          // hald star
          if (hasDecimals) {
            star.nativeElement.classList.add("half");
            hasDecimals = false;
          }
        }
        i++;
      });
    }
  }
}
