import { Component, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'star-rating',
  template: `
  <div #starMain>
    <span data-index="1" title="1" #star1></span>
    <span data-index="2" title="2" #star2></span>
    <span data-index="3" title="3" #star3></span>
    <span data-index="4" title="4" #star4></span>
    <span data-index="5" title="5" #star5></span>
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
  private stars: Array<ElementRef> = [];
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

  private static readonly VAR_CHECKED_COLOR: string = '--checkedColor';
  private static readonly VAR_UNCHECKED_COLOR: string = '--unCheckedColor';
  private static readonly VAR_SIZE: string = '--size';
  private static readonly VAR_HALF_WIDTH: string = '--halfWidth';
  private static readonly VAR_HALF_MARGIN: string = '--halfMargin';
  private static readonly CLS_CHECKED_STAR: string = 'on';
  private static readonly CLS_DEFAULT_STAR: string = 'star';
  private static readonly CLS_HALF_STAR: string = 'half';
  private static readonly INP_CHECKED_COLOR: string = 'checkedcolor';
  private static readonly INP_UNCHECKED_COLOR: string = 'uncheckedcolor';
  private static readonly INP_VALUE: string = 'value';
  private static readonly INP_SIZE: string = 'size';
  private static readonly INP_READONLY: string = 'readonly';

  @ViewChild('starMain', { static: true }) private mainElement: ElementRef;
  @ViewChild('star1', { static: true }) private star1Element: ElementRef;
  @ViewChild('star2', { static: true }) private star2Element: ElementRef;
  @ViewChild('star3', { static: true }) private star3Element: ElementRef;
  @ViewChild('star4', { static: true }) private star4Element: ElementRef;
  @ViewChild('star5', { static: true }) private star5Element: ElementRef;

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

  @Output() rate: EventEmitter<{ oldValue: number, newValue: number, starRating: StarRatingComponent }> = new EventEmitter();

  @Input(StarRatingComponent.INP_CHECKED_COLOR) set checkedcolor(value: string) {
    this._checkedColor = value;
    if (this._checkedColor) {
      this.onCheckedColorChange.next(this._checkedColor);
    }
  }

  @Input(StarRatingComponent.INP_UNCHECKED_COLOR) set uncheckedcolor(value: string) {
    this._unCheckedColor = value;
    if (this._unCheckedColor) {
      this.onUnCheckedColorChange.next(this._unCheckedColor);
    }
  }

  @Input(StarRatingComponent.INP_VALUE) set value(value: number) {
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

  @Input(StarRatingComponent.INP_SIZE) set size(value: string) {
    if (!value || value == null || value == "0px") {
      value = "24px";
    }
    this._size = value;
    this.onSizeChange.next(this._size);
  }

  @Input(StarRatingComponent.INP_READONLY) set readonly(value: boolean) {
    this._readOnly = value;
    this.onReadOnlyChange.next(value);
  }

  private makeEditable() {
    this.mainElement.nativeElement.addEventListener('mouseleave', this.offStar.bind(this));
    this.mainElement.nativeElement.style.cursor = "pointer";
    this.mainElement.nativeElement.title = this.value;
    this.stars.forEach((star: ElementRef) => {
      star.nativeElement.addEventListener('click', this.onRate.bind(this));
      star.nativeElement.addEventListener('mouseenter', this.onStar.bind(this));
      star.nativeElement.style.cursor = "pointer";
      star.nativeElement.title = star.nativeElement.dataset.index;
    });
  }

  private makeReadOnly() {
    this.mainElement.nativeElement.__zone_symbol__mouseleavefalse = null;
    this.mainElement.nativeElement.style.cursor = "default";
    this.mainElement.nativeElement.title = this.value;
    this.stars.forEach((star: ElementRef) => {
      star.nativeElement.__zone_symbol__clickfalse = null;
      star.nativeElement.__zone_symbol__mouseenterfalse = null;
      star.nativeElement.style.cursor = "default";
      star.nativeElement.title = "";
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

  private onRate(event: MouseEvent) {
    let star: HTMLElement = <HTMLElement>event.srcElement;
    let oldValue = this.value;
    this.value = parseInt(star.dataset.index);
    if (this.value == 0) {
      this.value = 1;
    }
    let rateValues = { oldValue: oldValue, newValue: this.value, starRating: this };
    this.rate.emit(rateValues);
  }

  private onStar(event: MouseEvent) {
    let star: HTMLElement = <HTMLElement>event.srcElement;
    let currentIndex = parseInt(star.dataset.index);

    for (let index = 0; index < currentIndex; index++) {
      this.stars[index].nativeElement.classList = [];
      this.addDefaultClass(this.stars[index].nativeElement);
      this.addCheckedStarClass(this.stars[index].nativeElement);
    }

    for (let index = currentIndex; index < this.stars.length; index++) {
      this.stars[index].nativeElement.classList = [];
      this.addDefaultClass(this.stars[index].nativeElement);
    }
  }

  private offStar(event: MouseEvent) {
    this.generateRating();
  }

  private addDefaultClass(star: HTMLSpanElement) {
    star.classList.add(StarRatingComponent.CLS_DEFAULT_STAR);
  }

  private addCheckedStarClass(star: HTMLSpanElement) {
    star.classList.add(StarRatingComponent.CLS_CHECKED_STAR);
  }

  private addHalfStarClass(star: HTMLSpanElement) {
    star.classList.add(StarRatingComponent.CLS_HALF_STAR);
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
      this.stars.forEach((star: ElementRef) => {
        let newSize = this.size.match(/\d+/)[0];
        let halfSize = (parseInt(newSize) * 10) / 24;
        let halfMargin = 0 - ((parseInt(newSize) * 20) / 24);
        star.nativeElement.style.setProperty(StarRatingComponent.VAR_SIZE, this.size);
        if (star.nativeElement.classList.contains(StarRatingComponent.CLS_HALF_STAR)) {
          star.nativeElement.style.setProperty(StarRatingComponent.VAR_HALF_WIDTH, `${halfSize}px`);
          star.nativeElement.style.setProperty(StarRatingComponent.VAR_HALF_MARGIN, `${halfMargin}px`);
        }
      });
    }
  }

  private applyColorStyleAllStars(setChecked: boolean) {
    this.stars.forEach((star: ElementRef) => {
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
    starElement.style.setProperty(StarRatingComponent.VAR_CHECKED_COLOR, this.checkedcolor);
  }

  private applyUnCheckedColorStyle(starElement: HTMLSpanElement) {
    starElement.style.setProperty(StarRatingComponent.VAR_UNCHECKED_COLOR, this.uncheckedcolor);
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
      this.stars.forEach((star: ElementRef) => {
        star.nativeElement.classList = [];
        this.applyColorStyle(star.nativeElement);
        this.addDefaultClass(star.nativeElement);

        if (this.value >= i) {
          // star on
          this.addCheckedStarClass(star.nativeElement);
        } else {
          // half star
          if (hasDecimals) {
            this.addHalfStarClass(star.nativeElement);
            hasDecimals = false;
          }
        }
        i++;
      });
    }
  }
}
