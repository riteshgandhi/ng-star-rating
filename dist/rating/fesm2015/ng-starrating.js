import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, Input, Output, ViewChild, EventEmitter, NgModule } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
//import { StarRatingComponent } from '../components/star-rating/star-rating.component'
class RatingComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
RatingComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-rating',
                template: `
    <p>
      rating works!
    </p>
  `
            }] }
];
RatingComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class StarRatingComponent {
    constructor() {
        this.stars = [];
        this._readOnly = false;
        this.rate = new EventEmitter();
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
    /**
     * @return {?}
     */
    get checkedcolor() {
        return this._checkedColor;
    }
    /**
     * @return {?}
     */
    get uncheckedcolor() {
        return this._unCheckedColor;
    }
    /**
     * @return {?}
     */
    get value() {
        return this._value;
    }
    /**
     * @return {?}
     */
    get size() {
        return this._size.concat((!this._size.includes("px") ? "px" : ""));
    }
    /**
     * @return {?}
     */
    get readonly() {
        return String(this._readOnly) === "true";
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set checkedcolor(value) {
        this._checkedColor = value;
        if (this._checkedColor) {
            this.onCheckedColorChange.next(this._checkedColor);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set uncheckedcolor(value) {
        this._unCheckedColor = value;
        if (this._unCheckedColor) {
            this.onUnCheckedColorChange.next(this._unCheckedColor);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
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
    /**
     * @param {?} value
     * @return {?}
     */
    set size(value) {
        if (!value || value == null || value == "0px") {
            value = "24px";
        }
        this._size = value;
        this.onSizeChange.next(this._size);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set readonly(value) {
        this._readOnly = value;
        this.onReadOnlyChange.next(value);
    }
    /**
     * @private
     * @return {?}
     */
    makeEditable() {
        this.mainElement.nativeElement.addEventListener('mouseleave', this.offStar.bind(this));
        this.mainElement.nativeElement.style.cursor = "pointer";
        this.mainElement.nativeElement.title = this.value;
        this.stars.forEach((star) => {
            star.nativeElement.addEventListener('click', this.onRate.bind(this));
            star.nativeElement.addEventListener('mouseenter', this.onStar.bind(this));
            star.nativeElement.style.cursor = "pointer";
            star.nativeElement.title = star.nativeElement.dataset.index;
        });
    }
    /**
     * @private
     * @return {?}
     */
    makeReadOnly() {
        this.mainElement.nativeElement.__zone_symbol__mouseleavefalse = null;
        this.mainElement.nativeElement.style.cursor = "default";
        this.mainElement.nativeElement.title = this.value;
        this.stars.forEach((star) => {
            star.nativeElement.__zone_symbol__clickfalse = null;
            star.nativeElement.__zone_symbol__mouseenterfalse = null;
            star.nativeElement.style.cursor = "default";
            star.nativeElement.title = "";
        });
    }
    /**
     * @private
     * @return {?}
     */
    addRemoveEvents() {
        if (this.readonly) {
            this.makeReadOnly();
        }
        else {
            this.makeEditable();
            this.onValueChange.next(this.value);
        }
    }
    /**
     * @private
     * @return {?}
     */
    ngAfterViewInit() {
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    onRate(event) {
        /** @type {?} */
        let star = (/** @type {?} */ (event.srcElement));
        /** @type {?} */
        let oldValue = this.value;
        this.value = parseInt(star.dataset.index);
        if (this.value == 0) {
            this.value = 1;
        }
        /** @type {?} */
        let rateValues = { oldValue: oldValue, newValue: this.value, starRating: this };
        this.rate.emit(rateValues);
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    onStar(event) {
        /** @type {?} */
        let star = (/** @type {?} */ (event.srcElement));
        /** @type {?} */
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
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    offStar(event) {
        this.generateRating();
    }
    /**
     * @private
     * @param {?} star
     * @return {?}
     */
    addDefaultClass(star) {
        star.classList.add(StarRatingComponent.CLS_DEFAULT_STAR);
    }
    /**
     * @private
     * @param {?} star
     * @return {?}
     */
    addCheckedStarClass(star) {
        star.classList.add(StarRatingComponent.CLS_CHECKED_STAR);
    }
    /**
     * @private
     * @param {?} star
     * @return {?}
     */
    addHalfStarClass(star) {
        star.classList.add(StarRatingComponent.CLS_HALF_STAR);
    }
    /**
     * @private
     * @return {?}
     */
    setStars() {
        if (this.stars.length == 0) {
            this.stars.push(this.star1Element);
            this.stars.push(this.star2Element);
            this.stars.push(this.star3Element);
            this.stars.push(this.star4Element);
            this.stars.push(this.star5Element);
        }
    }
    /**
     * @private
     * @return {?}
     */
    applySizeAllStars() {
        if (this._size) {
            this.stars.forEach((star) => {
                /** @type {?} */
                let newSize = this.size.match(/\d+/)[0];
                /** @type {?} */
                let halfSize = (parseInt(newSize) * 10) / 24;
                /** @type {?} */
                let halfMargin = 0 - ((parseInt(newSize) * 20) / 24);
                star.nativeElement.style.setProperty(StarRatingComponent.VAR_SIZE, this.size);
                if (star.nativeElement.classList.contains(StarRatingComponent.CLS_HALF_STAR)) {
                    star.nativeElement.style.setProperty(StarRatingComponent.VAR_HALF_WIDTH, `${halfSize}px`);
                    star.nativeElement.style.setProperty(StarRatingComponent.VAR_HALF_MARGIN, `${halfMargin}px`);
                }
            });
        }
    }
    /**
     * @private
     * @param {?} setChecked
     * @return {?}
     */
    applyColorStyleAllStars(setChecked) {
        this.stars.forEach((star) => {
            if (setChecked) {
                this.applyCheckedColorStyle(star.nativeElement);
            }
            else {
                this.applyUnCheckedColorStyle(star.nativeElement);
            }
        });
    }
    /**
     * @private
     * @param {?} starElement
     * @return {?}
     */
    applyColorStyle(starElement) {
        this.applyCheckedColorStyle(starElement);
        this.applyUnCheckedColorStyle(starElement);
    }
    /**
     * @private
     * @param {?} starElement
     * @return {?}
     */
    applyCheckedColorStyle(starElement) {
        starElement.style.setProperty(StarRatingComponent.VAR_CHECKED_COLOR, this.checkedcolor);
    }
    /**
     * @private
     * @param {?} starElement
     * @return {?}
     */
    applyUnCheckedColorStyle(starElement) {
        starElement.style.setProperty(StarRatingComponent.VAR_UNCHECKED_COLOR, this.uncheckedcolor);
    }
    /**
     * @private
     * @return {?}
     */
    generateRating() {
        if (this.readonly) {
            return;
        }
        this.setStars();
        if (this.value >= 0) {
            this.mainElement.nativeElement.title = this.value;
            /** @type {?} */
            let hasDecimals = ((Number.parseFloat(this.value.toString()) % 1)
                .toString()
                .substring(3, 2)) ? true : false;
            /** @type {?} */
            let i = 1;
            this.stars.forEach((star) => {
                star.nativeElement.classList = [];
                this.applyColorStyle(star.nativeElement);
                this.addDefaultClass(star.nativeElement);
                if (this.value >= i) {
                    // star on
                    this.addCheckedStarClass(star.nativeElement);
                }
                else {
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
StarRatingComponent.VAR_CHECKED_COLOR = '--checkedColor';
StarRatingComponent.VAR_UNCHECKED_COLOR = '--unCheckedColor';
StarRatingComponent.VAR_SIZE = '--size';
StarRatingComponent.VAR_HALF_WIDTH = '--halfWidth';
StarRatingComponent.VAR_HALF_MARGIN = '--halfMargin';
StarRatingComponent.CLS_CHECKED_STAR = 'on';
StarRatingComponent.CLS_DEFAULT_STAR = 'star';
StarRatingComponent.CLS_HALF_STAR = 'half';
StarRatingComponent.INP_CHECKED_COLOR = 'checkedcolor';
StarRatingComponent.INP_UNCHECKED_COLOR = 'uncheckedcolor';
StarRatingComponent.INP_VALUE = 'value';
StarRatingComponent.INP_SIZE = 'size';
StarRatingComponent.INP_READONLY = 'readonly';
StarRatingComponent.decorators = [
    { type: Component, args: [{
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
            }] }
];
StarRatingComponent.ctorParameters = () => [];
StarRatingComponent.propDecorators = {
    mainElement: [{ type: ViewChild, args: ['starMain',] }],
    star1Element: [{ type: ViewChild, args: ['star1',] }],
    star2Element: [{ type: ViewChild, args: ['star2',] }],
    star3Element: [{ type: ViewChild, args: ['star3',] }],
    star4Element: [{ type: ViewChild, args: ['star4',] }],
    star5Element: [{ type: ViewChild, args: ['star5',] }],
    rate: [{ type: Output }],
    checkedcolor: [{ type: Input, args: [StarRatingComponent.INP_CHECKED_COLOR,] }],
    uncheckedcolor: [{ type: Input, args: [StarRatingComponent.INP_UNCHECKED_COLOR,] }],
    value: [{ type: Input, args: [StarRatingComponent.INP_VALUE,] }],
    size: [{ type: Input, args: [StarRatingComponent.INP_SIZE,] }],
    readonly: [{ type: Input, args: [StarRatingComponent.INP_READONLY,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class RatingModule {
    /**
     * @return {?}
     */
    ngDoBootstrap() { }
}
RatingModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    FormsModule,
                    CommonModule
                ],
                declarations: [
                    RatingComponent,
                    StarRatingComponent
                ],
                exports: [StarRatingComponent],
                entryComponents: [StarRatingComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { RatingModule, StarRatingComponent, RatingComponent as ɵa };

//# sourceMappingURL=ng-starrating.js.map