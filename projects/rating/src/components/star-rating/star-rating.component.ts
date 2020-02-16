import {
  Component, Input, Output, ViewChild, ElementRef,
  EventEmitter, ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})

export class StarRatingComponent {
  private stars: Array<Element> = [];

  private _checkedColor: string;
  private _unCheckedColor: string;
  private _value: number;
  private _size: string;
  private _readOnly: boolean = false;

  private _totalStars: number = 5;
  private onStarsCountChange: Subject<number>;
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
  private static readonly INP_TOTALSTARS: string = 'totalstars';

  @ViewChild('starMain', { static: true }) private mainElement: ElementRef;

  constructor() {
    this.onStarsCountChange = new Subject();
    this.onStarsCountChange.subscribe(() => {
      this.setStars();
      this.generateRating(true);
      this.applySizeAllStars();
      this.applyColorStyleAllStars(false);
      this.addEvents();
    });

    this.onValueChange = new Subject();
    this.onValueChange.subscribe(() => {
      this.generateRating();
      this.applySizeAllStars();
    });

    this.onCheckedColorChange = new Subject();
    this.onCheckedColorChange.subscribe(() => {
      this.applyColorStyleAllStars(true);
    });

    this.onUnCheckedColorChange = new Subject();
    this.onUnCheckedColorChange.subscribe(() => {
      this.applyColorStyleAllStars(false);
    });

    this.onSizeChange = new Subject();
    this.onSizeChange.subscribe(() => {
      this.applySizeAllStars();
    });

    this.onReadOnlyChange = new Subject();
    this.onReadOnlyChange.subscribe(() => {
      this.readonly ? this.makeReadOnly() : this.makeEditable();
    });
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

  get totalstars(): number {
    return this._totalStars;
  }

  @Output() rate: EventEmitter<{ oldValue: number, newValue: number, starRating: StarRatingComponent }> = new EventEmitter();

  @Input(StarRatingComponent.INP_CHECKED_COLOR) set checkedcolor(value: string) {
    this._checkedColor = value;
    this._checkedColor && this.onCheckedColorChange.next(this._checkedColor);
  }

  @Input(StarRatingComponent.INP_UNCHECKED_COLOR) set uncheckedcolor(value: string) {
    this._unCheckedColor = value;
    this._unCheckedColor && this.onUnCheckedColorChange.next(this._unCheckedColor);
  }

  @Input(StarRatingComponent.INP_VALUE) set value(value: number) {
    value = (!value || value == null) ? 0 : value;
    this._value = value;
    this._value >= 0 && this.onValueChange.next(this._value);
  }

  @Input(StarRatingComponent.INP_SIZE) set size(value: string) {
    value = (!value || value == null || value == "0px") ? "24px" : value;
    this._size = value;
    this.onSizeChange.next(this._size);
  }

  @Input(StarRatingComponent.INP_READONLY) set readonly(value: boolean) {
    this._readOnly = value;
    this.onReadOnlyChange.next(value);
  }

  @Input(StarRatingComponent.INP_TOTALSTARS) set totalstars(value: number) {
    this._totalStars = value <= 0 ? 5 : Math.round(value);
    this.onStarsCountChange.next(this._totalStars);
  }

  private makeEditable() {
    if (!this.mainElement) return;
    this.mainElement.nativeElement.style.cursor = "pointer";
    this.mainElement.nativeElement.title = this.value;
    this.stars.forEach((star: any) => {
      star.style.cursor = "pointer";
      star.title = star.dataset.index;
    });
  }

  private makeReadOnly() {
    if (!this.mainElement) return;
    this.mainElement.nativeElement.style.cursor = "default";
    this.mainElement.nativeElement.title = this.value;
    this.stars.forEach((star: any) => {
      star.style.cursor = "default";
      star.title = "";
    });
  }

  private addEvents() {
    if (!this.mainElement) return;
    this.mainElement.nativeElement.addEventListener('mouseleave', this.offStar.bind(this));
    this.mainElement.nativeElement.style.cursor = "pointer";
    this.mainElement.nativeElement.title = this.value;
    this.stars.forEach((star: any) => {
      star.addEventListener('click', this.onRate.bind(this));
      star.addEventListener('mouseenter', this.onStar.bind(this));
      star.style.cursor = "pointer";
      star.title = star.dataset.index;
    });
  }


  private ngAfterViewInit() {
  }

  private onRate(event: MouseEvent) {
    if (this.readonly) return;
    let star: HTMLElement = <HTMLElement>event.srcElement;
    let oldValue = this.value;
    this.value = parseInt(star.dataset.index);
    // if (this.value == 0) {
    //   this.value = 1;
    // }
    let rateValues = { oldValue: oldValue, newValue: this.value, starRating: this };
    this.rate.emit(rateValues);
  }

  private onStar(event: MouseEvent) {
    if (this.readonly) return;
    let star: HTMLElement = <HTMLElement>event.srcElement;
    let currentIndex = parseInt(star.dataset.index);

    for (let index = 0; index < currentIndex; index++) {
      this.stars[index].className = "";
      this.addDefaultClass(this.stars[index]);
      this.addCheckedStarClass(this.stars[index]);
    }

    for (let index = currentIndex; index < this.stars.length; index++) {
      this.stars[index].className = "";
      this.addDefaultClass(this.stars[index]);
    }
  }

  private offStar(event: MouseEvent) {
    this.generateRating();
  }

  private addDefaultClass(star: any) {
    star.classList.add(StarRatingComponent.CLS_DEFAULT_STAR);
  }

  private addCheckedStarClass(star: any) {
    star.classList.add(StarRatingComponent.CLS_CHECKED_STAR);
  }

  private addHalfStarClass(star: any) {
    star.classList.add(StarRatingComponent.CLS_HALF_STAR);
  }

  private setStars() {
    if (!this.mainElement) return;
    let starContainer: HTMLDivElement = this.mainElement.nativeElement;
    let maxStars = [...Array(Number(this.totalstars)).keys()];
    this.stars.length = 0;
    starContainer.innerHTML = "";
    maxStars.forEach(starNumber => {
      let starElement: HTMLSpanElement = document.createElement("span");
      starElement.dataset.index = (starNumber + 1).toString();
      starElement.title = starElement.dataset.index;
      starContainer.appendChild(starElement);
      this.stars.push(starElement);
    });
  }

  private applySizeAllStars() {
    if (this._size) {
      this.stars.length == 0 && this.setStars();
      this.stars.forEach((star: any) => {
        let newSize = this.size.match(/\d+/)[0];
        let halfSize = (parseInt(newSize) * 10) / 24;
        let halfMargin = 0 - ((parseInt(newSize) * 20) / 24);
        star.style.setProperty(StarRatingComponent.VAR_SIZE, this.size);
        if (star.classList.contains(StarRatingComponent.CLS_HALF_STAR)) {
          star.style.setProperty(StarRatingComponent.VAR_HALF_WIDTH, `${halfSize}px`);
          star.style.setProperty(StarRatingComponent.VAR_HALF_MARGIN, `${halfMargin}px`);
        }
      });
    }
  }

  private applyColorStyleAllStars(setChecked: boolean) {
    this.stars.length == 0 && this.setStars();
    this.stars.forEach((star: any) => {
      if (setChecked) {
        this.applyCheckedColorStyle(star);
      } else {
        this.applyUnCheckedColorStyle(star);
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

  private generateRating(forceGenerate: boolean = false) {
    if (!this.mainElement) return;
    if (this.readonly && !forceGenerate) return;

    //if (this.value >= 0) {
    this.stars.length == 0 && this.setStars();
    this.mainElement.nativeElement.title = this.value;

    let hasDecimals: boolean =
      ((Number.parseFloat(this.value.toString()) % 1)
        .toString()
        .substring(3, 2)) ? true : false;

    let i = 1;
    this.stars.forEach((star: any) => {
      star.className = "";
      this.applyColorStyle(star);
      this.addDefaultClass(star);

      if (this.value >= i) {
        // star on
        this.addCheckedStarClass(star);
      } else {
        // half star
        if (hasDecimals) {
          this.addHalfStarClass(star);
          hasDecimals = false;
        }
      }
      i++;
    });
    //}
  }
}
