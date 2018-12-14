import { Component, Input, ViewChild } from '@angular/core';
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

  private onValueChange:Subject<number>;
  private onCheckedColorChange:Subject<string>;
  private onUnCheckedColorChange:Subject<string>;
  private onSizeChange:Subject<string>;

  @ViewChild('starMain') private mainElement: any;
  @ViewChild('star1') private star1Element: any;
  @ViewChild('star2') private star2Element: any;
  @ViewChild('star3') private star3Element: any;
  @ViewChild('star4') private star4Element: any;
  @ViewChild('star5') private star5Element: any;

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

    // this.setStars();
  }
  
  get checkedColor(): string {
    return this._checkedColor;
  }

  get unCheckedColor(): string {
    return this._unCheckedColor;
  }

  get value(): number {
    return this._value;
  }

  get size(): string {
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
    if (!value || value == null) {
      value = 0;
    }

    if (value > 5) {
      value = 5;
    }
    
    this._value = value;

    if (this._value >=0) {
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

  private ngAfterViewInit() {
    this.stars.forEach(star => {
      star.nativeElement.addEventListener('click', this.rate.bind(this));
      star.nativeElement.addEventListener('mouseover', this.rate.bind(this));
    });
  }

  private rate(event) {
    let star = event.srcElement;
    this.value = star.dataset.index;
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
      this.stars.forEach(star => {
        let newSize = this.size.match(/\d+/)[0];
        let halfSize = (parseInt(newSize) * 10)/24;
        let halfMargin = 0-((parseInt(newSize) * 20)/24);
        star.nativeElement.style.setProperty('--size', this.size);
        if (star.nativeElement.classList.contains("half")){
          star.nativeElement.style.setProperty('--halfWidth', `${halfSize}px`);
          star.nativeElement.style.setProperty('--halfMargin', `${halfMargin}px`);
        }
      });
    }
  }

  private applyColorStyleAllStars(setChecked:boolean) {
    this.stars.forEach(star => {
      if (setChecked) {
        this.applyCheckedColorStyle(star.nativeElement);
      } else {
        this.applyUnCheckedColorStyle(star.nativeElement);
      }
    });
  }

  private applyColorStyle(starElement: any) {
    this.applyCheckedColorStyle(starElement);
    this.applyUnCheckedColorStyle(starElement);
  }

  private applyCheckedColorStyle(starElement: any) {
    starElement.style.setProperty('--checkedColor', this.checkedColor);
  }

  private applyUnCheckedColorStyle(starElement: any) {
    starElement.style.setProperty('--unCheckedColor', this.unCheckedColor);
  }

  private generateRating() {
    this.setStars();
    if (this.value >=0) {
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
