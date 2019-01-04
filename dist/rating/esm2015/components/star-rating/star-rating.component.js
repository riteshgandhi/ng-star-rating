/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
export class StarRatingComponent {
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
if (false) {
    /**
     * @type {?}
     * @private
     */
    StarRatingComponent.VAR_CHECKED_COLOR;
    /**
     * @type {?}
     * @private
     */
    StarRatingComponent.VAR_UNCHECKED_COLOR;
    /**
     * @type {?}
     * @private
     */
    StarRatingComponent.VAR_SIZE;
    /**
     * @type {?}
     * @private
     */
    StarRatingComponent.VAR_HALF_WIDTH;
    /**
     * @type {?}
     * @private
     */
    StarRatingComponent.VAR_HALF_MARGIN;
    /**
     * @type {?}
     * @private
     */
    StarRatingComponent.CLS_CHECKED_STAR;
    /**
     * @type {?}
     * @private
     */
    StarRatingComponent.CLS_DEFAULT_STAR;
    /**
     * @type {?}
     * @private
     */
    StarRatingComponent.CLS_HALF_STAR;
    /**
     * @type {?}
     * @private
     */
    StarRatingComponent.INP_CHECKED_COLOR;
    /**
     * @type {?}
     * @private
     */
    StarRatingComponent.INP_UNCHECKED_COLOR;
    /**
     * @type {?}
     * @private
     */
    StarRatingComponent.INP_VALUE;
    /**
     * @type {?}
     * @private
     */
    StarRatingComponent.INP_SIZE;
    /**
     * @type {?}
     * @private
     */
    StarRatingComponent.INP_READONLY;
    /**
     * @type {?}
     * @private
     */
    StarRatingComponent.prototype.stars;
    /**
     * @type {?}
     * @private
     */
    StarRatingComponent.prototype._checkedColor;
    /**
     * @type {?}
     * @private
     */
    StarRatingComponent.prototype._unCheckedColor;
    /**
     * @type {?}
     * @private
     */
    StarRatingComponent.prototype._value;
    /**
     * @type {?}
     * @private
     */
    StarRatingComponent.prototype._size;
    /**
     * @type {?}
     * @private
     */
    StarRatingComponent.prototype._readOnly;
    /**
     * @type {?}
     * @private
     */
    StarRatingComponent.prototype.onValueChange;
    /**
     * @type {?}
     * @private
     */
    StarRatingComponent.prototype.onCheckedColorChange;
    /**
     * @type {?}
     * @private
     */
    StarRatingComponent.prototype.onUnCheckedColorChange;
    /**
     * @type {?}
     * @private
     */
    StarRatingComponent.prototype.onSizeChange;
    /**
     * @type {?}
     * @private
     */
    StarRatingComponent.prototype.onReadOnlyChange;
    /**
     * @type {?}
     * @private
     */
    StarRatingComponent.prototype.mainElement;
    /**
     * @type {?}
     * @private
     */
    StarRatingComponent.prototype.star1Element;
    /**
     * @type {?}
     * @private
     */
    StarRatingComponent.prototype.star2Element;
    /**
     * @type {?}
     * @private
     */
    StarRatingComponent.prototype.star3Element;
    /**
     * @type {?}
     * @private
     */
    StarRatingComponent.prototype.star4Element;
    /**
     * @type {?}
     * @private
     */
    StarRatingComponent.prototype.star5Element;
    /** @type {?} */
    StarRatingComponent.prototype.rate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rhci1yYXRpbmcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctc3RhcnJhdGluZy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc3Rhci1yYXRpbmcvc3Rhci1yYXRpbmcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUYsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQWdEL0IsTUFBTTtJQW1DSjtRQWxDUSxVQUFLLEdBQXNCLEVBQUUsQ0FBQztRQUs5QixjQUFTLEdBQVksS0FBSyxDQUFDO1FBdUZ6QixTQUFJLEdBQXFGLElBQUksWUFBWSxFQUFFLENBQUM7UUF6RHBILElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUNuQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2hDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDM0IsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUU7WUFDOUIsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7WUFDMUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7Z0JBQ3ZDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyQyxDQUFDLENBQUMsQ0FBQztTQUNKO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRTtZQUNoQyxJQUFJLENBQUMsc0JBQXNCLEdBQUcs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LE9BQU87MkJBQ2pCLFNBQVMsU0FBQyxPQUFPO21CQTREakIsTUFBTTsyQkFFTixLQUFLLFNBQUMsbUJBQW1CLENBQUMsaUJBQWlCOzZCQU8zQyxLQUFLLFNBQUMsbUJBQW1CLENBQUMsbUJBQW1CO29CQU83QyxLQUFLLFNBQUMsbUJBQW1CLENBQUMsU0FBUzttQkFnQm5DLEtBQUssU0FBQyxtQkFBbUIsQ0FBQyxRQUFRO3VCQVFsQyxLQUFLLFNBQUMsbUJBQW1CLENBQUMsWUFBWTs7Ozs7OztJQXZIdkMsc0NBQXFFOzs7OztJQUNyRSx3Q0FBeUU7Ozs7O0lBQ3pFLDZCQUFvRDs7Ozs7SUFDcEQsbUNBQStEOzs7OztJQUMvRCxvQ0FBaUU7Ozs7O0lBQ2pFLHFDQUF3RDs7Ozs7SUFDeEQscUNBQTBEOzs7OztJQUMxRCxrQ0FBdUQ7Ozs7O0lBQ3ZELHNDQUFtRTs7Ozs7SUFDbkUsd0NBQXVFOzs7OztJQUN2RSw4QkFBb0Q7Ozs7O0lBQ3BELDZCQUFrRDs7Ozs7SUFDbEQsaUNBQTBEOzs7OztJQXpCMUQsb0NBQXNDOzs7OztJQUN0Qyw0Q0FBOEI7Ozs7O0lBQzlCLDhDQUFnQzs7Ozs7SUFDaEMscUNBQXVCOzs7OztJQUN2QixvQ0FBc0I7Ozs7O0lBQ3RCLHdDQUFtQzs7Ozs7SUFFbkMsNENBQXVDOzs7OztJQUN2QyxtREFBOEM7Ozs7O0lBQzlDLHFEQUFnRDs7Ozs7SUFDaEQsMkNBQXNDOzs7OztJQUN0QywrQ0FBMkM7Ozs7O0lBZ0IzQywwQ0FBdUQ7Ozs7O0lBQ3ZELDJDQUFxRDs7Ozs7SUFDckQsMkNBQXFEOzs7OztJQUNyRCwyQ0FBcUQ7Ozs7O0lBQ3JELDJDQUFxRDs7Ozs7SUFDckQsMkNBQXFEOztJQTREckQsbUNBQXNIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzdGFyLXJhdGluZycsXG4gIHRlbXBsYXRlOiBgXG4gIDxkaXYgI3N0YXJNYWluPlxuICAgIDxzcGFuIGRhdGEtaW5kZXg9XCIxXCIgdGl0bGU9XCIxXCIgI3N0YXIxPjwvc3Bhbj5cbiAgICA8c3BhbiBkYXRhLWluZGV4PVwiMlwiIHRpdGxlPVwiMlwiICNzdGFyMj48L3NwYW4+XG4gICAgPHNwYW4gZGF0YS1pbmRleD1cIjNcIiB0aXRsZT1cIjNcIiAjc3RhcjM+PC9zcGFuPlxuICAgIDxzcGFuIGRhdGEtaW5kZXg9XCI0XCIgdGl0bGU9XCI0XCIgI3N0YXI0Pjwvc3Bhbj5cbiAgICA8c3BhbiBkYXRhLWluZGV4PVwiNVwiIHRpdGxlPVwiNVwiICNzdGFyNT48L3NwYW4+XG4gIDwvZGl2PlxuICA8c3R5bGU+XG4gICAgOnJvb3Qge1xuICAgICAgLS1jaGVja2VkQ29sb3I6IGdvbGQ7XG4gICAgICAtLXVuQ2hlY2tlZENvbG9yOiBncmF5O1xuICAgICAgLS1zaXplOiAyNHB4O1xuICAgICAgLS1oYWxmV2lkdGg6IDEwcHg7XG4gICAgICAtLWhhbGZNYXJnaW46IC0yMHB4O1xuICAgIH0gIFxuICAgIC5zdGFyIHtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIGNvbG9yOiB2YXIoLS11bkNoZWNrZWRDb2xvcik7XG4gICAgICBmb250LXNpemU6IHZhcigtLXNpemUpO1xuICAgICAgd2lkdGg6IHZhcigtLXNpemUpO1xuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIH1cbiAgICAuc3RhcjpsYXN0LWNoaWxkIHtcbiAgICAgIG1hcmdpbi1yaWdodDogMDtcbiAgICB9XG4gICAgLnN0YXI6YmVmb3JlIHtcbiAgICAgIGNvbnRlbnQ6J1xcXFwyNjA1JztcbiAgICB9XG4gICAgLnN0YXIub24ge1xuICAgICAgY29sb3I6IHZhcigtLWNoZWNrZWRDb2xvcik7XG4gICAgfVxuICAgIC5zdGFyLmhhbGY6YWZ0ZXIge1xuICAgICAgY29udGVudDonXFxcXDI2MDUnO1xuICAgICAgY29sb3I6IHZhcigtLWNoZWNrZWRDb2xvcik7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICBtYXJnaW4tbGVmdDogdmFyKC0taGFsZk1hcmdpbik7XG4gICAgICB3aWR0aDogdmFyKC0taGFsZldpZHRoKTtcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgfVxuICA8L3N0eWxlPlxuICAgYFxufSlcblxuZXhwb3J0IGNsYXNzIFN0YXJSYXRpbmdDb21wb25lbnQge1xuICBwcml2YXRlIHN0YXJzOiBBcnJheTxFbGVtZW50UmVmPiA9IFtdO1xuICBwcml2YXRlIF9jaGVja2VkQ29sb3I6IHN0cmluZztcbiAgcHJpdmF0ZSBfdW5DaGVja2VkQ29sb3I6IHN0cmluZztcbiAgcHJpdmF0ZSBfdmFsdWU6IG51bWJlcjtcbiAgcHJpdmF0ZSBfc2l6ZTogc3RyaW5nO1xuICBwcml2YXRlIF9yZWFkT25seTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHByaXZhdGUgb25WYWx1ZUNoYW5nZTogU3ViamVjdDxudW1iZXI+O1xuICBwcml2YXRlIG9uQ2hlY2tlZENvbG9yQ2hhbmdlOiBTdWJqZWN0PHN0cmluZz47XG4gIHByaXZhdGUgb25VbkNoZWNrZWRDb2xvckNoYW5nZTogU3ViamVjdDxzdHJpbmc+O1xuICBwcml2YXRlIG9uU2l6ZUNoYW5nZTogU3ViamVjdDxzdHJpbmc+O1xuICBwcml2YXRlIG9uUmVhZE9ubHlDaGFuZ2U6IFN1YmplY3Q8Ym9vbGVhbj47XG5cbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgVkFSX0NIRUNLRURfQ09MT1I6IHN0cmluZyA9ICctLWNoZWNrZWRDb2xvcic7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFZBUl9VTkNIRUNLRURfQ09MT1I6IHN0cmluZyA9ICctLXVuQ2hlY2tlZENvbG9yJztcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgVkFSX1NJWkU6IHN0cmluZyA9ICctLXNpemUnO1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBWQVJfSEFMRl9XSURUSDogc3RyaW5nID0gJy0taGFsZldpZHRoJztcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgVkFSX0hBTEZfTUFSR0lOOiBzdHJpbmcgPSAnLS1oYWxmTWFyZ2luJztcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgQ0xTX0NIRUNLRURfU1RBUjogc3RyaW5nID0gJ29uJztcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgQ0xTX0RFRkFVTFRfU1RBUjogc3RyaW5nID0gJ3N0YXInO1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBDTFNfSEFMRl9TVEFSOiBzdHJpbmcgPSAnaGFsZic7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IElOUF9DSEVDS0VEX0NPTE9SOiBzdHJpbmcgPSAnY2hlY2tlZGNvbG9yJztcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSU5QX1VOQ0hFQ0tFRF9DT0xPUjogc3RyaW5nID0gJ3VuY2hlY2tlZGNvbG9yJztcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSU5QX1ZBTFVFOiBzdHJpbmcgPSAndmFsdWUnO1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBJTlBfU0laRTogc3RyaW5nID0gJ3NpemUnO1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBJTlBfUkVBRE9OTFk6IHN0cmluZyA9ICdyZWFkb25seSc7XG5cbiAgQFZpZXdDaGlsZCgnc3Rhck1haW4nKSBwcml2YXRlIG1haW5FbGVtZW50OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdzdGFyMScpIHByaXZhdGUgc3RhcjFFbGVtZW50OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdzdGFyMicpIHByaXZhdGUgc3RhcjJFbGVtZW50OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdzdGFyMycpIHByaXZhdGUgc3RhcjNFbGVtZW50OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdzdGFyNCcpIHByaXZhdGUgc3RhcjRFbGVtZW50OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdzdGFyNScpIHByaXZhdGUgc3RhcjVFbGVtZW50OiBFbGVtZW50UmVmO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGlmICghdGhpcy5vblZhbHVlQ2hhbmdlKSB7XG4gICAgICB0aGlzLm9uVmFsdWVDaGFuZ2UgPSBuZXcgU3ViamVjdCgpO1xuICAgICAgdGhpcy5vblZhbHVlQ2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVSYXRpbmcoKTtcbiAgICAgICAgdGhpcy5hcHBseVNpemVBbGxTdGFycygpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLm9uQ2hlY2tlZENvbG9yQ2hhbmdlKSB7XG4gICAgICB0aGlzLm9uQ2hlY2tlZENvbG9yQ2hhbmdlID0gbmV3IFN1YmplY3QoKTtcbiAgICAgIHRoaXMub25DaGVja2VkQ29sb3JDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5hcHBseUNvbG9yU3R5bGVBbGxTdGFycyh0cnVlKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5vblVuQ2hlY2tlZENvbG9yQ2hhbmdlKSB7XG4gICAgICB0aGlzLm9uVW5DaGVja2VkQ29sb3JDaGFuZ2UgPSBuZXcgU3ViamVjdCgpO1xuICAgICAgdGhpcy5vblVuQ2hlY2tlZENvbG9yQ2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuYXBwbHlDb2xvclN0eWxlQWxsU3RhcnMoZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLm9uU2l6ZUNoYW5nZSkge1xuICAgICAgdGhpcy5vblNpemVDaGFuZ2UgPSBuZXcgU3ViamVjdCgpO1xuICAgICAgdGhpcy5vblNpemVDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5hcHBseVNpemVBbGxTdGFycygpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLm9uUmVhZE9ubHlDaGFuZ2UpIHtcbiAgICAgIHRoaXMub25SZWFkT25seUNoYW5nZSA9IG5ldyBTdWJqZWN0KCk7XG4gICAgICB0aGlzLm9uUmVhZE9ubHlDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5hZGRSZW1vdmVFdmVudHMoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGdldCBjaGVja2VkY29sb3IoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fY2hlY2tlZENvbG9yO1xuICB9XG5cbiAgZ2V0IHVuY2hlY2tlZGNvbG9yKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3VuQ2hlY2tlZENvbG9yO1xuICB9XG5cbiAgZ2V0IHZhbHVlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgZ2V0IHNpemUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fc2l6ZS5jb25jYXQoKCF0aGlzLl9zaXplLmluY2x1ZGVzKFwicHhcIikgPyBcInB4XCIgOiBcIlwiKSk7XG4gIH1cblxuICBnZXQgcmVhZG9ubHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIFN0cmluZyh0aGlzLl9yZWFkT25seSkgPT09IFwidHJ1ZVwiO1xuICB9XG5cbiAgQE91dHB1dCgpIHJhdGU6IEV2ZW50RW1pdHRlcjx7b2xkVmFsdWU6bnVtYmVyLCBuZXdWYWx1ZTpudW1iZXIsIHN0YXJSYXRpbmc6U3RhclJhdGluZ0NvbXBvbmVudH0+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBJbnB1dChTdGFyUmF0aW5nQ29tcG9uZW50LklOUF9DSEVDS0VEX0NPTE9SKSBzZXQgY2hlY2tlZGNvbG9yKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9jaGVja2VkQ29sb3IgPSB2YWx1ZTtcbiAgICBpZiAodGhpcy5fY2hlY2tlZENvbG9yKSB7XG4gICAgICB0aGlzLm9uQ2hlY2tlZENvbG9yQ2hhbmdlLm5leHQodGhpcy5fY2hlY2tlZENvbG9yKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoU3RhclJhdGluZ0NvbXBvbmVudC5JTlBfVU5DSEVDS0VEX0NPTE9SKSBzZXQgdW5jaGVja2VkY29sb3IodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX3VuQ2hlY2tlZENvbG9yID0gdmFsdWU7XG4gICAgaWYgKHRoaXMuX3VuQ2hlY2tlZENvbG9yKSB7XG4gICAgICB0aGlzLm9uVW5DaGVja2VkQ29sb3JDaGFuZ2UubmV4dCh0aGlzLl91bkNoZWNrZWRDb2xvcik7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KFN0YXJSYXRpbmdDb21wb25lbnQuSU5QX1ZBTFVFKSBzZXQgdmFsdWUodmFsdWU6IG51bWJlcikge1xuICAgIGlmICghdmFsdWUgfHwgdmFsdWUgPT0gbnVsbCkge1xuICAgICAgdmFsdWUgPSAwO1xuICAgIH1cblxuICAgIGlmICh2YWx1ZSA+IDUpIHtcbiAgICAgIHZhbHVlID0gNTtcbiAgICB9XG5cbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuXG4gICAgaWYgKHRoaXMuX3ZhbHVlID49IDApIHtcbiAgICAgIHRoaXMub25WYWx1ZUNoYW5nZS5uZXh0KHRoaXMuX3ZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoU3RhclJhdGluZ0NvbXBvbmVudC5JTlBfU0laRSkgc2V0IHNpemUodmFsdWU6IHN0cmluZykge1xuICAgIGlmICghdmFsdWUgfHwgdmFsdWUgPT0gbnVsbCB8fCB2YWx1ZSA9PSBcIjBweFwiKSB7XG4gICAgICB2YWx1ZSA9IFwiMjRweFwiO1xuICAgIH1cbiAgICB0aGlzLl9zaXplID0gdmFsdWU7XG4gICAgdGhpcy5vblNpemVDaGFuZ2UubmV4dCh0aGlzLl9zaXplKTtcbiAgfVxuXG4gIEBJbnB1dChTdGFyUmF0aW5nQ29tcG9uZW50LklOUF9SRUFET05MWSkgc2V0IHJlYWRvbmx5KHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fcmVhZE9ubHkgPSB2YWx1ZTtcbiAgICB0aGlzLm9uUmVhZE9ubHlDaGFuZ2UubmV4dCh2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIG1ha2VFZGl0YWJsZSgpIHtcbiAgICB0aGlzLm1haW5FbGVtZW50Lm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMub2ZmU3Rhci5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLm1haW5FbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XG4gICAgdGhpcy5tYWluRWxlbWVudC5uYXRpdmVFbGVtZW50LnRpdGxlID0gdGhpcy52YWx1ZTtcbiAgICB0aGlzLnN0YXJzLmZvckVhY2goKHN0YXI6IEVsZW1lbnRSZWYpID0+IHtcbiAgICAgIHN0YXIubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25SYXRlLmJpbmQodGhpcykpO1xuICAgICAgc3Rhci5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0aGlzLm9uU3Rhci5iaW5kKHRoaXMpKTtcbiAgICAgIHN0YXIubmF0aXZlRWxlbWVudC5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcbiAgICAgIHN0YXIubmF0aXZlRWxlbWVudC50aXRsZSA9IHN0YXIubmF0aXZlRWxlbWVudC5kYXRhc2V0LmluZGV4O1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBtYWtlUmVhZE9ubHkoKSB7XG4gICAgdGhpcy5tYWluRWxlbWVudC5uYXRpdmVFbGVtZW50Ll9fem9uZV9zeW1ib2xfX21vdXNlbGVhdmVmYWxzZSA9IG51bGw7XG4gICAgdGhpcy5tYWluRWxlbWVudC5uYXRpdmVFbGVtZW50LnN0eWxlLmN1cnNvciA9IFwiZGVmYXVsdFwiO1xuICAgIHRoaXMubWFpbkVsZW1lbnQubmF0aXZlRWxlbWVudC50aXRsZSA9IHRoaXMudmFsdWU7XG4gICAgdGhpcy5zdGFycy5mb3JFYWNoKChzdGFyOiBFbGVtZW50UmVmKSA9PiB7XG4gICAgICBzdGFyLm5hdGl2ZUVsZW1lbnQuX196b25lX3N5bWJvbF9fY2xpY2tmYWxzZSA9IG51bGw7XG4gICAgICBzdGFyLm5hdGl2ZUVsZW1lbnQuX196b25lX3N5bWJvbF9fbW91c2VlbnRlcmZhbHNlID0gbnVsbDtcbiAgICAgIHN0YXIubmF0aXZlRWxlbWVudC5zdHlsZS5jdXJzb3IgPSBcImRlZmF1bHRcIjtcbiAgICAgIHN0YXIubmF0aXZlRWxlbWVudC50aXRsZSA9IFwiXCI7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFkZFJlbW92ZUV2ZW50cygpIHtcbiAgICBpZiAodGhpcy5yZWFkb25seSkge1xuICAgICAgdGhpcy5tYWtlUmVhZE9ubHkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tYWtlRWRpdGFibGUoKTtcbiAgICAgIHRoaXMub25WYWx1ZUNoYW5nZS5uZXh0KHRoaXMudmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbmdBZnRlclZpZXdJbml0KCkge1xuICB9XG5cbiAgcHJpdmF0ZSBvblJhdGUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBsZXQgc3RhcjogSFRNTEVsZW1lbnQgPSA8SFRNTEVsZW1lbnQ+ZXZlbnQuc3JjRWxlbWVudDtcbiAgICBsZXQgb2xkVmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgIHRoaXMudmFsdWUgPSBwYXJzZUludChzdGFyLmRhdGFzZXQuaW5kZXgpO1xuICAgIGlmICh0aGlzLnZhbHVlID09IDApIHtcbiAgICAgIHRoaXMudmFsdWUgPSAxO1xuICAgIH1cbiAgICBsZXQgcmF0ZVZhbHVlcyA9IHtvbGRWYWx1ZTpvbGRWYWx1ZSwgbmV3VmFsdWU6dGhpcy52YWx1ZSwgc3RhclJhdGluZzp0aGlzfTtcbiAgICB0aGlzLnJhdGUuZW1pdChyYXRlVmFsdWVzKTtcbiAgfVxuXG4gIHByaXZhdGUgb25TdGFyKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgbGV0IHN0YXI6IEhUTUxFbGVtZW50ID0gPEhUTUxFbGVtZW50PmV2ZW50LnNyY0VsZW1lbnQ7XG4gICAgbGV0IGN1cnJlbnRJbmRleCA9IHBhcnNlSW50KHN0YXIuZGF0YXNldC5pbmRleCk7XG5cbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgY3VycmVudEluZGV4OyBpbmRleCsrKSB7XG4gICAgICB0aGlzLnN0YXJzW2luZGV4XS5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdCA9IFtdO1xuICAgICAgdGhpcy5hZGREZWZhdWx0Q2xhc3ModGhpcy5zdGFyc1tpbmRleF0ubmF0aXZlRWxlbWVudCk7XG4gICAgICB0aGlzLmFkZENoZWNrZWRTdGFyQ2xhc3ModGhpcy5zdGFyc1tpbmRleF0ubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaW5kZXggPSBjdXJyZW50SW5kZXg7IGluZGV4IDwgdGhpcy5zdGFycy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIHRoaXMuc3RhcnNbaW5kZXhdLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0ID0gW107XG4gICAgICB0aGlzLmFkZERlZmF1bHRDbGFzcyh0aGlzLnN0YXJzW2luZGV4XS5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG9mZlN0YXIoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICB0aGlzLmdlbmVyYXRlUmF0aW5nKCk7XG4gIH1cblxuICBwcml2YXRlIGFkZERlZmF1bHRDbGFzcyhzdGFyOiBIVE1MU3BhbkVsZW1lbnQpIHtcbiAgICBzdGFyLmNsYXNzTGlzdC5hZGQoU3RhclJhdGluZ0NvbXBvbmVudC5DTFNfREVGQVVMVF9TVEFSKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkQ2hlY2tlZFN0YXJDbGFzcyhzdGFyOiBIVE1MU3BhbkVsZW1lbnQpIHtcbiAgICBzdGFyLmNsYXNzTGlzdC5hZGQoU3RhclJhdGluZ0NvbXBvbmVudC5DTFNfQ0hFQ0tFRF9TVEFSKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkSGFsZlN0YXJDbGFzcyhzdGFyOiBIVE1MU3BhbkVsZW1lbnQpIHtcbiAgICBzdGFyLmNsYXNzTGlzdC5hZGQoU3RhclJhdGluZ0NvbXBvbmVudC5DTFNfSEFMRl9TVEFSKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0U3RhcnMoKSB7XG4gICAgaWYgKHRoaXMuc3RhcnMubGVuZ3RoID09IDApIHtcbiAgICAgIHRoaXMuc3RhcnMucHVzaCh0aGlzLnN0YXIxRWxlbWVudCk7XG4gICAgICB0aGlzLnN0YXJzLnB1c2godGhpcy5zdGFyMkVsZW1lbnQpO1xuICAgICAgdGhpcy5zdGFycy5wdXNoKHRoaXMuc3RhcjNFbGVtZW50KTtcbiAgICAgIHRoaXMuc3RhcnMucHVzaCh0aGlzLnN0YXI0RWxlbWVudCk7XG4gICAgICB0aGlzLnN0YXJzLnB1c2godGhpcy5zdGFyNUVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlTaXplQWxsU3RhcnMoKSB7XG4gICAgaWYgKHRoaXMuX3NpemUpIHtcbiAgICAgIHRoaXMuc3RhcnMuZm9yRWFjaCgoc3RhcjogRWxlbWVudFJlZikgPT4ge1xuICAgICAgICBsZXQgbmV3U2l6ZSA9IHRoaXMuc2l6ZS5tYXRjaCgvXFxkKy8pWzBdO1xuICAgICAgICBsZXQgaGFsZlNpemUgPSAocGFyc2VJbnQobmV3U2l6ZSkgKiAxMCkgLyAyNDtcbiAgICAgICAgbGV0IGhhbGZNYXJnaW4gPSAwIC0gKChwYXJzZUludChuZXdTaXplKSAqIDIwKSAvIDI0KTtcbiAgICAgICAgc3Rhci5uYXRpdmVFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFN0YXJSYXRpbmdDb21wb25lbnQuVkFSX1NJWkUsIHRoaXMuc2l6ZSk7XG4gICAgICAgIGlmIChzdGFyLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFN0YXJSYXRpbmdDb21wb25lbnQuQ0xTX0hBTEZfU1RBUikpIHtcbiAgICAgICAgICBzdGFyLm5hdGl2ZUVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoU3RhclJhdGluZ0NvbXBvbmVudC5WQVJfSEFMRl9XSURUSCwgYCR7aGFsZlNpemV9cHhgKTtcbiAgICAgICAgICBzdGFyLm5hdGl2ZUVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoU3RhclJhdGluZ0NvbXBvbmVudC5WQVJfSEFMRl9NQVJHSU4sIGAke2hhbGZNYXJnaW59cHhgKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhcHBseUNvbG9yU3R5bGVBbGxTdGFycyhzZXRDaGVja2VkOiBib29sZWFuKSB7XG4gICAgdGhpcy5zdGFycy5mb3JFYWNoKChzdGFyOiBFbGVtZW50UmVmKSA9PiB7XG4gICAgICBpZiAoc2V0Q2hlY2tlZCkge1xuICAgICAgICB0aGlzLmFwcGx5Q2hlY2tlZENvbG9yU3R5bGUoc3Rhci5uYXRpdmVFbGVtZW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYXBwbHlVbkNoZWNrZWRDb2xvclN0eWxlKHN0YXIubmF0aXZlRWxlbWVudCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFwcGx5Q29sb3JTdHlsZShzdGFyRWxlbWVudDogSFRNTFNwYW5FbGVtZW50KSB7XG4gICAgdGhpcy5hcHBseUNoZWNrZWRDb2xvclN0eWxlKHN0YXJFbGVtZW50KTtcbiAgICB0aGlzLmFwcGx5VW5DaGVja2VkQ29sb3JTdHlsZShzdGFyRWxlbWVudCk7XG4gIH1cblxuICBwcml2YXRlIGFwcGx5Q2hlY2tlZENvbG9yU3R5bGUoc3RhckVsZW1lbnQ6IEhUTUxTcGFuRWxlbWVudCkge1xuICAgIHN0YXJFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFN0YXJSYXRpbmdDb21wb25lbnQuVkFSX0NIRUNLRURfQ09MT1IsIHRoaXMuY2hlY2tlZGNvbG9yKTtcbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlVbkNoZWNrZWRDb2xvclN0eWxlKHN0YXJFbGVtZW50OiBIVE1MU3BhbkVsZW1lbnQpIHtcbiAgICBzdGFyRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShTdGFyUmF0aW5nQ29tcG9uZW50LlZBUl9VTkNIRUNLRURfQ09MT1IsIHRoaXMudW5jaGVja2VkY29sb3IpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZW5lcmF0ZVJhdGluZygpIHtcbiAgICBpZiAodGhpcy5yZWFkb25seSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXJzKCk7XG4gICAgaWYgKHRoaXMudmFsdWUgPj0gMCkge1xuICAgICAgdGhpcy5tYWluRWxlbWVudC5uYXRpdmVFbGVtZW50LnRpdGxlID0gdGhpcy52YWx1ZTtcblxuICAgICAgbGV0IGhhc0RlY2ltYWxzOiBib29sZWFuID1cbiAgICAgICAgKChOdW1iZXIucGFyc2VGbG9hdCh0aGlzLnZhbHVlLnRvU3RyaW5nKCkpICUgMSlcbiAgICAgICAgICAudG9TdHJpbmcoKVxuICAgICAgICAgIC5zdWJzdHJpbmcoMywgMikpID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgICBsZXQgaSA9IDE7XG4gICAgICB0aGlzLnN0YXJzLmZvckVhY2goKHN0YXI6IEVsZW1lbnRSZWYpID0+IHtcbiAgICAgICAgc3Rhci5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdCA9IFtdO1xuICAgICAgICB0aGlzLmFwcGx5Q29sb3JTdHlsZShzdGFyLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB0aGlzLmFkZERlZmF1bHRDbGFzcyhzdGFyLm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgIGlmICh0aGlzLnZhbHVlID49IGkpIHtcbiAgICAgICAgICAvLyBzdGFyIG9uXG4gICAgICAgICAgdGhpcy5hZGRDaGVja2VkU3RhckNsYXNzKHN0YXIubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gaGFsZiBzdGFyXG4gICAgICAgICAgaWYgKGhhc0RlY2ltYWxzKSB7XG4gICAgICAgICAgICB0aGlzLmFkZEhhbGZTdGFyQ2xhc3Moc3Rhci5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgIGhhc0RlY2ltYWxzID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGkrKztcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19