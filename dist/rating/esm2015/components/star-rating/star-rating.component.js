/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
export class StarRatingComponent {
    constructor() {
        this.stars = [];
        this._readOnly = false;
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
            star.nativeElement.addEventListener('click', this.rate.bind(this));
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
    rate(event) {
        /** @type {?} */
        let star = (/** @type {?} */ (event.srcElement));
        this.value = parseInt(star.dataset.index);
        if (this.value == 0) {
            this.value = 1;
        }
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rhci1yYXRpbmcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctc3RhcnJhdGluZy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc3Rhci1yYXRpbmcvc3Rhci1yYXRpbmcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFnRC9CLE1BQU07SUFtQ0o7UUFsQ1EsVUFBSyxHQUFzQixFQUFFLENBQUM7UUFLOUIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQThCakMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQ25DLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtnQkFDaEMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN0QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUMzQixDQUFDLENBQUMsQ0FBQztTQUNKO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtZQUM5QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUMxQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtnQkFDdkMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JDLENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFO1lBQ2hDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQzVDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUMs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LHdDQUF5RTs7Ozs7SUFDekUsNkJBQW9EOzs7OztJQUNwRCxtQ0FBK0Q7Ozs7O0lBQy9ELG9DQUFpRTs7Ozs7SUFDakUscUNBQXdEOzs7OztJQUN4RCxxQ0FBMEQ7Ozs7O0lBQzFELGtDQUF1RDs7Ozs7SUFDdkQsc0NBQW1FOzs7OztJQUNuRSx3Q0FBdUU7Ozs7O0lBQ3ZFLDhCQUFvRDs7Ozs7SUFDcEQsNkJBQWtEOzs7OztJQUNsRCxpQ0FBMEQ7Ozs7O0lBekIxRCxvQ0FBc0M7Ozs7O0lBQ3RDLDRDQUE4Qjs7Ozs7SUFDOUIsOENBQWdDOzs7OztJQUNoQyxxQ0FBdUI7Ozs7O0lBQ3ZCLG9DQUFzQjs7Ozs7SUFDdEIsd0NBQW1DOzs7OztJQUVuQyw0Q0FBdUM7Ozs7O0lBQ3ZDLG1EQUE4Qzs7Ozs7SUFDOUMscURBQWdEOzs7OztJQUNoRCwyQ0FBc0M7Ozs7O0lBQ3RDLCtDQUEyQzs7Ozs7SUFnQjNDLDBDQUF1RDs7Ozs7SUFDdkQsMkNBQXFEOzs7OztJQUNyRCwyQ0FBcUQ7Ozs7O0lBQ3JELDJDQUFxRDs7Ozs7SUFDckQsMkNBQXFEOzs7OztJQUNyRCwyQ0FBcUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc3Rhci1yYXRpbmcnLFxuICB0ZW1wbGF0ZTogYFxuICA8ZGl2ICNzdGFyTWFpbj5cbiAgICA8c3BhbiBkYXRhLWluZGV4PVwiMVwiIHRpdGxlPVwiMVwiICNzdGFyMT48L3NwYW4+XG4gICAgPHNwYW4gZGF0YS1pbmRleD1cIjJcIiB0aXRsZT1cIjJcIiAjc3RhcjI+PC9zcGFuPlxuICAgIDxzcGFuIGRhdGEtaW5kZXg9XCIzXCIgdGl0bGU9XCIzXCIgI3N0YXIzPjwvc3Bhbj5cbiAgICA8c3BhbiBkYXRhLWluZGV4PVwiNFwiIHRpdGxlPVwiNFwiICNzdGFyND48L3NwYW4+XG4gICAgPHNwYW4gZGF0YS1pbmRleD1cIjVcIiB0aXRsZT1cIjVcIiAjc3RhcjU+PC9zcGFuPlxuICA8L2Rpdj5cbiAgPHN0eWxlPlxuICAgIDpyb290IHtcbiAgICAgIC0tY2hlY2tlZENvbG9yOiBnb2xkO1xuICAgICAgLS11bkNoZWNrZWRDb2xvcjogZ3JheTtcbiAgICAgIC0tc2l6ZTogMjRweDtcbiAgICAgIC0taGFsZldpZHRoOiAxMHB4O1xuICAgICAgLS1oYWxmTWFyZ2luOiAtMjBweDtcbiAgICB9ICBcbiAgICAuc3RhciB7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICBjb2xvcjogdmFyKC0tdW5DaGVja2VkQ29sb3IpO1xuICAgICAgZm9udC1zaXplOiB2YXIoLS1zaXplKTtcbiAgICAgIHdpZHRoOiB2YXIoLS1zaXplKTtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICB9XG4gICAgLnN0YXI6bGFzdC1jaGlsZCB7XG4gICAgICBtYXJnaW4tcmlnaHQ6IDA7XG4gICAgfVxuICAgIC5zdGFyOmJlZm9yZSB7XG4gICAgICBjb250ZW50OidcXFxcMjYwNSc7XG4gICAgfVxuICAgIC5zdGFyLm9uIHtcbiAgICAgIGNvbG9yOiB2YXIoLS1jaGVja2VkQ29sb3IpO1xuICAgIH1cbiAgICAuc3Rhci5oYWxmOmFmdGVyIHtcbiAgICAgIGNvbnRlbnQ6J1xcXFwyNjA1JztcbiAgICAgIGNvbG9yOiB2YXIoLS1jaGVja2VkQ29sb3IpO1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgbWFyZ2luLWxlZnQ6IHZhcigtLWhhbGZNYXJnaW4pO1xuICAgICAgd2lkdGg6IHZhcigtLWhhbGZXaWR0aCk7XG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIH1cbiAgPC9zdHlsZT5cbiAgIGBcbn0pXG5cbmV4cG9ydCBjbGFzcyBTdGFyUmF0aW5nQ29tcG9uZW50IHtcbiAgcHJpdmF0ZSBzdGFyczogQXJyYXk8RWxlbWVudFJlZj4gPSBbXTtcbiAgcHJpdmF0ZSBfY2hlY2tlZENvbG9yOiBzdHJpbmc7XG4gIHByaXZhdGUgX3VuQ2hlY2tlZENvbG9yOiBzdHJpbmc7XG4gIHByaXZhdGUgX3ZhbHVlOiBudW1iZXI7XG4gIHByaXZhdGUgX3NpemU6IHN0cmluZztcbiAgcHJpdmF0ZSBfcmVhZE9ubHk6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwcml2YXRlIG9uVmFsdWVDaGFuZ2U6IFN1YmplY3Q8bnVtYmVyPjtcbiAgcHJpdmF0ZSBvbkNoZWNrZWRDb2xvckNoYW5nZTogU3ViamVjdDxzdHJpbmc+O1xuICBwcml2YXRlIG9uVW5DaGVja2VkQ29sb3JDaGFuZ2U6IFN1YmplY3Q8c3RyaW5nPjtcbiAgcHJpdmF0ZSBvblNpemVDaGFuZ2U6IFN1YmplY3Q8c3RyaW5nPjtcbiAgcHJpdmF0ZSBvblJlYWRPbmx5Q2hhbmdlOiBTdWJqZWN0PGJvb2xlYW4+O1xuXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFZBUl9DSEVDS0VEX0NPTE9SOiBzdHJpbmcgPSAnLS1jaGVja2VkQ29sb3InO1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBWQVJfVU5DSEVDS0VEX0NPTE9SOiBzdHJpbmcgPSAnLS11bkNoZWNrZWRDb2xvcic7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFZBUl9TSVpFOiBzdHJpbmcgPSAnLS1zaXplJztcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgVkFSX0hBTEZfV0lEVEg6IHN0cmluZyA9ICctLWhhbGZXaWR0aCc7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFZBUl9IQUxGX01BUkdJTjogc3RyaW5nID0gJy0taGFsZk1hcmdpbic7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IENMU19DSEVDS0VEX1NUQVI6IHN0cmluZyA9ICdvbic7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IENMU19ERUZBVUxUX1NUQVI6IHN0cmluZyA9ICdzdGFyJztcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgQ0xTX0hBTEZfU1RBUjogc3RyaW5nID0gJ2hhbGYnO1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBJTlBfQ0hFQ0tFRF9DT0xPUjogc3RyaW5nID0gJ2NoZWNrZWRjb2xvcic7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IElOUF9VTkNIRUNLRURfQ09MT1I6IHN0cmluZyA9ICd1bmNoZWNrZWRjb2xvcic7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IElOUF9WQUxVRTogc3RyaW5nID0gJ3ZhbHVlJztcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSU5QX1NJWkU6IHN0cmluZyA9ICdzaXplJztcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSU5QX1JFQURPTkxZOiBzdHJpbmcgPSAncmVhZG9ubHknO1xuXG4gIEBWaWV3Q2hpbGQoJ3N0YXJNYWluJykgcHJpdmF0ZSBtYWluRWxlbWVudDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnc3RhcjEnKSBwcml2YXRlIHN0YXIxRWxlbWVudDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnc3RhcjInKSBwcml2YXRlIHN0YXIyRWxlbWVudDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnc3RhcjMnKSBwcml2YXRlIHN0YXIzRWxlbWVudDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnc3RhcjQnKSBwcml2YXRlIHN0YXI0RWxlbWVudDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnc3RhcjUnKSBwcml2YXRlIHN0YXI1RWxlbWVudDogRWxlbWVudFJlZjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBpZiAoIXRoaXMub25WYWx1ZUNoYW5nZSkge1xuICAgICAgdGhpcy5vblZhbHVlQ2hhbmdlID0gbmV3IFN1YmplY3QoKTtcbiAgICAgIHRoaXMub25WYWx1ZUNoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmdlbmVyYXRlUmF0aW5nKCk7XG4gICAgICAgIHRoaXMuYXBwbHlTaXplQWxsU3RhcnMoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5vbkNoZWNrZWRDb2xvckNoYW5nZSkge1xuICAgICAgdGhpcy5vbkNoZWNrZWRDb2xvckNoYW5nZSA9IG5ldyBTdWJqZWN0KCk7XG4gICAgICB0aGlzLm9uQ2hlY2tlZENvbG9yQ2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuYXBwbHlDb2xvclN0eWxlQWxsU3RhcnModHJ1ZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMub25VbkNoZWNrZWRDb2xvckNoYW5nZSkge1xuICAgICAgdGhpcy5vblVuQ2hlY2tlZENvbG9yQ2hhbmdlID0gbmV3IFN1YmplY3QoKTtcbiAgICAgIHRoaXMub25VbkNoZWNrZWRDb2xvckNoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmFwcGx5Q29sb3JTdHlsZUFsbFN0YXJzKGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5vblNpemVDaGFuZ2UpIHtcbiAgICAgIHRoaXMub25TaXplQ2hhbmdlID0gbmV3IFN1YmplY3QoKTtcbiAgICAgIHRoaXMub25TaXplQ2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuYXBwbHlTaXplQWxsU3RhcnMoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5vblJlYWRPbmx5Q2hhbmdlKSB7XG4gICAgICB0aGlzLm9uUmVhZE9ubHlDaGFuZ2UgPSBuZXcgU3ViamVjdCgpO1xuICAgICAgdGhpcy5vblJlYWRPbmx5Q2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuYWRkUmVtb3ZlRXZlbnRzKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBnZXQgY2hlY2tlZGNvbG9yKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2NoZWNrZWRDb2xvcjtcbiAgfVxuXG4gIGdldCB1bmNoZWNrZWRjb2xvcigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl91bkNoZWNrZWRDb2xvcjtcbiAgfVxuXG4gIGdldCB2YWx1ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIGdldCBzaXplKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3NpemUuY29uY2F0KCghdGhpcy5fc2l6ZS5pbmNsdWRlcyhcInB4XCIpID8gXCJweFwiIDogXCJcIikpO1xuICB9XG5cbiAgZ2V0IHJlYWRvbmx5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBTdHJpbmcodGhpcy5fcmVhZE9ubHkpID09PSBcInRydWVcIjtcbiAgfVxuXG4gIEBJbnB1dChTdGFyUmF0aW5nQ29tcG9uZW50LklOUF9DSEVDS0VEX0NPTE9SKSBzZXQgY2hlY2tlZGNvbG9yKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9jaGVja2VkQ29sb3IgPSB2YWx1ZTtcbiAgICBpZiAodGhpcy5fY2hlY2tlZENvbG9yKSB7XG4gICAgICB0aGlzLm9uQ2hlY2tlZENvbG9yQ2hhbmdlLm5leHQodGhpcy5fY2hlY2tlZENvbG9yKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoU3RhclJhdGluZ0NvbXBvbmVudC5JTlBfVU5DSEVDS0VEX0NPTE9SKSBzZXQgdW5jaGVja2VkY29sb3IodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX3VuQ2hlY2tlZENvbG9yID0gdmFsdWU7XG4gICAgaWYgKHRoaXMuX3VuQ2hlY2tlZENvbG9yKSB7XG4gICAgICB0aGlzLm9uVW5DaGVja2VkQ29sb3JDaGFuZ2UubmV4dCh0aGlzLl91bkNoZWNrZWRDb2xvcik7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KFN0YXJSYXRpbmdDb21wb25lbnQuSU5QX1ZBTFVFKSBzZXQgdmFsdWUodmFsdWU6IG51bWJlcikge1xuICAgIGlmICghdmFsdWUgfHwgdmFsdWUgPT0gbnVsbCkge1xuICAgICAgdmFsdWUgPSAwO1xuICAgIH1cblxuICAgIGlmICh2YWx1ZSA+IDUpIHtcbiAgICAgIHZhbHVlID0gNTtcbiAgICB9XG5cbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuXG4gICAgaWYgKHRoaXMuX3ZhbHVlID49IDApIHtcbiAgICAgIHRoaXMub25WYWx1ZUNoYW5nZS5uZXh0KHRoaXMuX3ZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoU3RhclJhdGluZ0NvbXBvbmVudC5JTlBfU0laRSkgc2V0IHNpemUodmFsdWU6IHN0cmluZykge1xuICAgIGlmICghdmFsdWUgfHwgdmFsdWUgPT0gbnVsbCB8fCB2YWx1ZSA9PSBcIjBweFwiKSB7XG4gICAgICB2YWx1ZSA9IFwiMjRweFwiO1xuICAgIH1cbiAgICB0aGlzLl9zaXplID0gdmFsdWU7XG4gICAgdGhpcy5vblNpemVDaGFuZ2UubmV4dCh0aGlzLl9zaXplKTtcbiAgfVxuXG4gIEBJbnB1dChTdGFyUmF0aW5nQ29tcG9uZW50LklOUF9SRUFET05MWSkgc2V0IHJlYWRvbmx5KHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fcmVhZE9ubHkgPSB2YWx1ZTtcbiAgICB0aGlzLm9uUmVhZE9ubHlDaGFuZ2UubmV4dCh2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIG1ha2VFZGl0YWJsZSgpIHtcbiAgICB0aGlzLm1haW5FbGVtZW50Lm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMub2ZmU3Rhci5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLm1haW5FbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XG4gICAgdGhpcy5tYWluRWxlbWVudC5uYXRpdmVFbGVtZW50LnRpdGxlID0gdGhpcy52YWx1ZTtcbiAgICB0aGlzLnN0YXJzLmZvckVhY2goKHN0YXI6IEVsZW1lbnRSZWYpID0+IHtcbiAgICAgIHN0YXIubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMucmF0ZS5iaW5kKHRoaXMpKTtcbiAgICAgIHN0YXIubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgdGhpcy5vblN0YXIuYmluZCh0aGlzKSk7XG4gICAgICBzdGFyLm5hdGl2ZUVsZW1lbnQuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XG4gICAgICBzdGFyLm5hdGl2ZUVsZW1lbnQudGl0bGUgPSBzdGFyLm5hdGl2ZUVsZW1lbnQuZGF0YXNldC5pbmRleDtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgbWFrZVJlYWRPbmx5KCkge1xuICAgIHRoaXMubWFpbkVsZW1lbnQubmF0aXZlRWxlbWVudC5fX3pvbmVfc3ltYm9sX19tb3VzZWxlYXZlZmFsc2UgPSBudWxsO1xuICAgIHRoaXMubWFpbkVsZW1lbnQubmF0aXZlRWxlbWVudC5zdHlsZS5jdXJzb3IgPSBcImRlZmF1bHRcIjtcbiAgICB0aGlzLm1haW5FbGVtZW50Lm5hdGl2ZUVsZW1lbnQudGl0bGUgPSB0aGlzLnZhbHVlO1xuICAgIHRoaXMuc3RhcnMuZm9yRWFjaCgoc3RhcjogRWxlbWVudFJlZikgPT4ge1xuICAgICAgc3Rhci5uYXRpdmVFbGVtZW50Ll9fem9uZV9zeW1ib2xfX2NsaWNrZmFsc2UgPSBudWxsO1xuICAgICAgc3Rhci5uYXRpdmVFbGVtZW50Ll9fem9uZV9zeW1ib2xfX21vdXNlZW50ZXJmYWxzZSA9IG51bGw7XG4gICAgICBzdGFyLm5hdGl2ZUVsZW1lbnQuc3R5bGUuY3Vyc29yID0gXCJkZWZhdWx0XCI7XG4gICAgICBzdGFyLm5hdGl2ZUVsZW1lbnQudGl0bGUgPSBcIlwiO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRSZW1vdmVFdmVudHMoKSB7XG4gICAgaWYgKHRoaXMucmVhZG9ubHkpIHtcbiAgICAgIHRoaXMubWFrZVJlYWRPbmx5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubWFrZUVkaXRhYmxlKCk7XG4gICAgICB0aGlzLm9uVmFsdWVDaGFuZ2UubmV4dCh0aGlzLnZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgfVxuXG4gIHByaXZhdGUgcmF0ZShldmVudDogTW91c2VFdmVudCkge1xuICAgIGxldCBzdGFyOiBIVE1MRWxlbWVudCA9IDxIVE1MRWxlbWVudD5ldmVudC5zcmNFbGVtZW50O1xuICAgIHRoaXMudmFsdWUgPSBwYXJzZUludChzdGFyLmRhdGFzZXQuaW5kZXgpO1xuICAgIGlmICh0aGlzLnZhbHVlID09IDApIHtcbiAgICAgIHRoaXMudmFsdWUgPSAxO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb25TdGFyKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgbGV0IHN0YXI6IEhUTUxFbGVtZW50ID0gPEhUTUxFbGVtZW50PmV2ZW50LnNyY0VsZW1lbnQ7XG4gICAgbGV0IGN1cnJlbnRJbmRleCA9IHBhcnNlSW50KHN0YXIuZGF0YXNldC5pbmRleCk7XG5cbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgY3VycmVudEluZGV4OyBpbmRleCsrKSB7XG4gICAgICB0aGlzLnN0YXJzW2luZGV4XS5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdCA9IFtdO1xuICAgICAgdGhpcy5hZGREZWZhdWx0Q2xhc3ModGhpcy5zdGFyc1tpbmRleF0ubmF0aXZlRWxlbWVudCk7XG4gICAgICB0aGlzLmFkZENoZWNrZWRTdGFyQ2xhc3ModGhpcy5zdGFyc1tpbmRleF0ubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaW5kZXggPSBjdXJyZW50SW5kZXg7IGluZGV4IDwgdGhpcy5zdGFycy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIHRoaXMuc3RhcnNbaW5kZXhdLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0ID0gW107XG4gICAgICB0aGlzLmFkZERlZmF1bHRDbGFzcyh0aGlzLnN0YXJzW2luZGV4XS5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG9mZlN0YXIoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICB0aGlzLmdlbmVyYXRlUmF0aW5nKCk7XG4gIH1cblxuICBwcml2YXRlIGFkZERlZmF1bHRDbGFzcyhzdGFyOiBIVE1MU3BhbkVsZW1lbnQpIHtcbiAgICBzdGFyLmNsYXNzTGlzdC5hZGQoU3RhclJhdGluZ0NvbXBvbmVudC5DTFNfREVGQVVMVF9TVEFSKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkQ2hlY2tlZFN0YXJDbGFzcyhzdGFyOiBIVE1MU3BhbkVsZW1lbnQpIHtcbiAgICBzdGFyLmNsYXNzTGlzdC5hZGQoU3RhclJhdGluZ0NvbXBvbmVudC5DTFNfQ0hFQ0tFRF9TVEFSKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkSGFsZlN0YXJDbGFzcyhzdGFyOiBIVE1MU3BhbkVsZW1lbnQpIHtcbiAgICBzdGFyLmNsYXNzTGlzdC5hZGQoU3RhclJhdGluZ0NvbXBvbmVudC5DTFNfSEFMRl9TVEFSKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0U3RhcnMoKSB7XG4gICAgaWYgKHRoaXMuc3RhcnMubGVuZ3RoID09IDApIHtcbiAgICAgIHRoaXMuc3RhcnMucHVzaCh0aGlzLnN0YXIxRWxlbWVudCk7XG4gICAgICB0aGlzLnN0YXJzLnB1c2godGhpcy5zdGFyMkVsZW1lbnQpO1xuICAgICAgdGhpcy5zdGFycy5wdXNoKHRoaXMuc3RhcjNFbGVtZW50KTtcbiAgICAgIHRoaXMuc3RhcnMucHVzaCh0aGlzLnN0YXI0RWxlbWVudCk7XG4gICAgICB0aGlzLnN0YXJzLnB1c2godGhpcy5zdGFyNUVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlTaXplQWxsU3RhcnMoKSB7XG4gICAgaWYgKHRoaXMuX3NpemUpIHtcbiAgICAgIHRoaXMuc3RhcnMuZm9yRWFjaCgoc3RhcjogRWxlbWVudFJlZikgPT4ge1xuICAgICAgICBsZXQgbmV3U2l6ZSA9IHRoaXMuc2l6ZS5tYXRjaCgvXFxkKy8pWzBdO1xuICAgICAgICBsZXQgaGFsZlNpemUgPSAocGFyc2VJbnQobmV3U2l6ZSkgKiAxMCkgLyAyNDtcbiAgICAgICAgbGV0IGhhbGZNYXJnaW4gPSAwIC0gKChwYXJzZUludChuZXdTaXplKSAqIDIwKSAvIDI0KTtcbiAgICAgICAgc3Rhci5uYXRpdmVFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFN0YXJSYXRpbmdDb21wb25lbnQuVkFSX1NJWkUsIHRoaXMuc2l6ZSk7XG4gICAgICAgIGlmIChzdGFyLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFN0YXJSYXRpbmdDb21wb25lbnQuQ0xTX0hBTEZfU1RBUikpIHtcbiAgICAgICAgICBzdGFyLm5hdGl2ZUVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoU3RhclJhdGluZ0NvbXBvbmVudC5WQVJfSEFMRl9XSURUSCwgYCR7aGFsZlNpemV9cHhgKTtcbiAgICAgICAgICBzdGFyLm5hdGl2ZUVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoU3RhclJhdGluZ0NvbXBvbmVudC5WQVJfSEFMRl9NQVJHSU4sIGAke2hhbGZNYXJnaW59cHhgKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhcHBseUNvbG9yU3R5bGVBbGxTdGFycyhzZXRDaGVja2VkOiBib29sZWFuKSB7XG4gICAgdGhpcy5zdGFycy5mb3JFYWNoKChzdGFyOiBFbGVtZW50UmVmKSA9PiB7XG4gICAgICBpZiAoc2V0Q2hlY2tlZCkge1xuICAgICAgICB0aGlzLmFwcGx5Q2hlY2tlZENvbG9yU3R5bGUoc3Rhci5uYXRpdmVFbGVtZW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYXBwbHlVbkNoZWNrZWRDb2xvclN0eWxlKHN0YXIubmF0aXZlRWxlbWVudCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFwcGx5Q29sb3JTdHlsZShzdGFyRWxlbWVudDogSFRNTFNwYW5FbGVtZW50KSB7XG4gICAgdGhpcy5hcHBseUNoZWNrZWRDb2xvclN0eWxlKHN0YXJFbGVtZW50KTtcbiAgICB0aGlzLmFwcGx5VW5DaGVja2VkQ29sb3JTdHlsZShzdGFyRWxlbWVudCk7XG4gIH1cblxuICBwcml2YXRlIGFwcGx5Q2hlY2tlZENvbG9yU3R5bGUoc3RhckVsZW1lbnQ6IEhUTUxTcGFuRWxlbWVudCkge1xuICAgIHN0YXJFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFN0YXJSYXRpbmdDb21wb25lbnQuVkFSX0NIRUNLRURfQ09MT1IsIHRoaXMuY2hlY2tlZGNvbG9yKTtcbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlVbkNoZWNrZWRDb2xvclN0eWxlKHN0YXJFbGVtZW50OiBIVE1MU3BhbkVsZW1lbnQpIHtcbiAgICBzdGFyRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShTdGFyUmF0aW5nQ29tcG9uZW50LlZBUl9VTkNIRUNLRURfQ09MT1IsIHRoaXMudW5jaGVja2VkY29sb3IpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZW5lcmF0ZVJhdGluZygpIHtcbiAgICBpZiAodGhpcy5yZWFkb25seSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXJzKCk7XG4gICAgaWYgKHRoaXMudmFsdWUgPj0gMCkge1xuICAgICAgdGhpcy5tYWluRWxlbWVudC5uYXRpdmVFbGVtZW50LnRpdGxlID0gdGhpcy52YWx1ZTtcblxuICAgICAgbGV0IGhhc0RlY2ltYWxzOiBib29sZWFuID1cbiAgICAgICAgKChOdW1iZXIucGFyc2VGbG9hdCh0aGlzLnZhbHVlLnRvU3RyaW5nKCkpICUgMSlcbiAgICAgICAgICAudG9TdHJpbmcoKVxuICAgICAgICAgIC5zdWJzdHJpbmcoMywgMikpID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgICBsZXQgaSA9IDE7XG4gICAgICB0aGlzLnN0YXJzLmZvckVhY2goKHN0YXI6IEVsZW1lbnRSZWYpID0+IHtcbiAgICAgICAgc3Rhci5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdCA9IFtdO1xuICAgICAgICB0aGlzLmFwcGx5Q29sb3JTdHlsZShzdGFyLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB0aGlzLmFkZERlZmF1bHRDbGFzcyhzdGFyLm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgIGlmICh0aGlzLnZhbHVlID49IGkpIHtcbiAgICAgICAgICAvLyBzdGFyIG9uXG4gICAgICAgICAgdGhpcy5hZGRDaGVja2VkU3RhckNsYXNzKHN0YXIubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gaGFsZiBzdGFyXG4gICAgICAgICAgaWYgKGhhc0RlY2ltYWxzKSB7XG4gICAgICAgICAgICB0aGlzLmFkZEhhbGZTdGFyQ2xhc3Moc3Rhci5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgIGhhc0RlY2ltYWxzID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGkrKztcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19