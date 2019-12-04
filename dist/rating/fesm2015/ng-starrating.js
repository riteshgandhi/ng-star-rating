import { Component, EventEmitter, ViewEncapsulation, ViewChild, Output, Input, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
/** @nocollapse */
RatingComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class StarRatingComponent {
    constructor() {
        this.stars = [];
        this._readOnly = false;
        this._totalStars = 5;
        this.rate = new EventEmitter();
        if (!this.onStarsCountChange) {
            this.onStarsCountChange = new Subject();
            this.onStarsCountChange.subscribe((/**
             * @return {?}
             */
            () => {
                this.setStars();
                this.generateRating(true);
                this.applySizeAllStars();
                this.applyColorStyleAllStars(false);
                this.addRemoveEvents();
            }));
        }
        if (!this.onValueChange) {
            this.onValueChange = new Subject();
            this.onValueChange.subscribe((/**
             * @return {?}
             */
            () => {
                this.generateRating();
                this.applySizeAllStars();
            }));
        }
        if (!this.onCheckedColorChange) {
            this.onCheckedColorChange = new Subject();
            this.onCheckedColorChange.subscribe((/**
             * @return {?}
             */
            () => {
                this.applyColorStyleAllStars(true);
            }));
        }
        if (!this.onUnCheckedColorChange) {
            this.onUnCheckedColorChange = new Subject();
            this.onUnCheckedColorChange.subscribe((/**
             * @return {?}
             */
            () => {
                this.applyColorStyleAllStars(false);
            }));
        }
        if (!this.onSizeChange) {
            this.onSizeChange = new Subject();
            this.onSizeChange.subscribe((/**
             * @return {?}
             */
            () => {
                this.applySizeAllStars();
            }));
        }
        if (!this.onReadOnlyChange) {
            this.onReadOnlyChange = new Subject();
            this.onReadOnlyChange.subscribe((/**
             * @return {?}
             */
            () => {
                this.addRemoveEvents();
            }));
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
     * @return {?}
     */
    get totalstars() {
        return this._totalStars;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set checkedcolor(value) {
        this._checkedColor = value;
        this._checkedColor && this.onCheckedColorChange.next(this._checkedColor);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set uncheckedcolor(value) {
        this._unCheckedColor = value;
        this._unCheckedColor && this.onUnCheckedColorChange.next(this._unCheckedColor);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        value = (!value || value == null) ? 0 : value;
        value > this.stars.length && (value = this.stars.length);
        this._value = value;
        this._value >= 0 && this.onValueChange.next(this._value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set size(value) {
        value = (!value || value == null || value == "0px") ? "24px" : value;
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
     * @param {?} value
     * @return {?}
     */
    set totalstars(value) {
        this._totalStars = value <= 0 ? 5 : value;
        this.onStarsCountChange.next(Number(value));
    }
    /**
     * @private
     * @return {?}
     */
    makeEditable() {
        this.mainElement.nativeElement.addEventListener('mouseleave', this.offStar.bind(this));
        this.mainElement.nativeElement.style.cursor = "pointer";
        this.mainElement.nativeElement.title = this.value;
        this.stars.forEach((/**
         * @param {?} star
         * @return {?}
         */
        (star) => {
            star.addEventListener('click', this.onRate.bind(this));
            star.addEventListener('mouseenter', this.onStar.bind(this));
            star.style.cursor = "pointer";
            star.title = star.dataset.index;
        }));
    }
    /**
     * @private
     * @return {?}
     */
    makeReadOnly() {
        this.mainElement.nativeElement.__zone_symbol__mouseleavefalse = null;
        this.mainElement.nativeElement.style.cursor = "default";
        this.mainElement.nativeElement.title = this.value;
        this.stars.forEach((/**
         * @param {?} star
         * @return {?}
         */
        (star) => {
            star.__zone_symbol__clickfalse = null;
            star.__zone_symbol__mouseenterfalse = null;
            star.style.cursor = "default";
            star.title = "";
        }));
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
            this.stars[index].className = "";
            this.addDefaultClass(this.stars[index]);
            this.addCheckedStarClass(this.stars[index]);
        }
        for (let index = currentIndex; index < this.stars.length; index++) {
            this.stars[index].className = "";
            this.addDefaultClass(this.stars[index]);
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
        /** @type {?} */
        let starContainer = this.mainElement.nativeElement;
        /** @type {?} */
        let maxStars = [...Array(Number(this.totalstars)).keys()];
        this.stars.length = 0;
        starContainer.innerHTML = "";
        maxStars.forEach((/**
         * @param {?} starNumber
         * @return {?}
         */
        starNumber => {
            /** @type {?} */
            let starElement = document.createElement("span");
            starElement.dataset.index = (starNumber + 1).toString();
            starElement.title = starElement.dataset.index;
            starContainer.appendChild(starElement);
            this.stars.push(starElement);
        }));
    }
    /**
     * @private
     * @return {?}
     */
    applySizeAllStars() {
        if (this._size) {
            this.stars.length == 0 && this.setStars();
            this.stars.forEach((/**
             * @param {?} star
             * @return {?}
             */
            (star) => {
                /** @type {?} */
                let newSize = this.size.match(/\d+/)[0];
                /** @type {?} */
                let halfSize = (parseInt(newSize) * 10) / 24;
                /** @type {?} */
                let halfMargin = 0 - ((parseInt(newSize) * 20) / 24);
                star.style.setProperty(StarRatingComponent.VAR_SIZE, this.size);
                if (star.classList.contains(StarRatingComponent.CLS_HALF_STAR)) {
                    star.style.setProperty(StarRatingComponent.VAR_HALF_WIDTH, `${halfSize}px`);
                    star.style.setProperty(StarRatingComponent.VAR_HALF_MARGIN, `${halfMargin}px`);
                }
            }));
        }
    }
    /**
     * @private
     * @param {?} setChecked
     * @return {?}
     */
    applyColorStyleAllStars(setChecked) {
        this.stars.length == 0 && this.setStars();
        this.stars.forEach((/**
         * @param {?} star
         * @return {?}
         */
        (star) => {
            if (setChecked) {
                this.applyCheckedColorStyle(star);
            }
            else {
                this.applyUnCheckedColorStyle(star);
            }
        }));
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
     * @param {?=} forceGenerate
     * @return {?}
     */
    generateRating(forceGenerate = false) {
        if (this.readonly && !forceGenerate) {
            return;
        }
        this.stars.length == 0 && this.setStars();
        if (this.value >= 0) {
            this.mainElement.nativeElement.title = this.value;
            /** @type {?} */
            let hasDecimals = ((Number.parseFloat(this.value.toString()) % 1)
                .toString()
                .substring(3, 2)) ? true : false;
            /** @type {?} */
            let i = 1;
            this.stars.forEach((/**
             * @param {?} star
             * @return {?}
             */
            (star) => {
                star.className = "";
                this.applyColorStyle(star);
                this.addDefaultClass(star);
                if (this.value >= i) {
                    // star on
                    this.addCheckedStarClass(star);
                }
                else {
                    // half star
                    if (hasDecimals) {
                        this.addHalfStarClass(star);
                        hasDecimals = false;
                    }
                }
                i++;
            }));
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
StarRatingComponent.INP_TOTALSTARS = 'totalstars';
StarRatingComponent.decorators = [
    { type: Component, args: [{
                selector: 'star-rating',
                template: "<div #starMain>\r\n</div>",
                encapsulation: ViewEncapsulation.None,
                styles: [":root{--checkedColor:gold;--unCheckedColor:gray;--size:24px;--halfWidth:10px;--halfMargin:-20px}.star{cursor:pointer;color:var(--unCheckedColor);font-size:var(--size);width:var(--size);display:inline-block}.star:last-child{margin-right:0}.star:before{content:'\\2605'}.star.on{color:var(--checkedColor)}.star.half:after{content:'\\2605';color:var(--checkedColor);position:absolute;margin-left:var(--halfMargin);width:var(--halfWidth);overflow:hidden}"]
            }] }
];
/** @nocollapse */
StarRatingComponent.ctorParameters = () => [];
StarRatingComponent.propDecorators = {
    mainElement: [{ type: ViewChild, args: ['starMain', { static: true },] }],
    rate: [{ type: Output }],
    checkedcolor: [{ type: Input, args: [StarRatingComponent.INP_CHECKED_COLOR,] }],
    uncheckedcolor: [{ type: Input, args: [StarRatingComponent.INP_UNCHECKED_COLOR,] }],
    value: [{ type: Input, args: [StarRatingComponent.INP_VALUE,] }],
    size: [{ type: Input, args: [StarRatingComponent.INP_SIZE,] }],
    readonly: [{ type: Input, args: [StarRatingComponent.INP_READONLY,] }],
    totalstars: [{ type: Input, args: [StarRatingComponent.INP_TOTALSTARS,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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

export { RatingModule, StarRatingComponent, RatingComponent as ɵa };
//# sourceMappingURL=ng-starrating.js.map
