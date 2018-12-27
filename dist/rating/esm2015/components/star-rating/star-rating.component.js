/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
     * @return {?}
     */
    makeEditable() {
        this.stars.forEach(star => {
            star.nativeElement.addEventListener('click', this.rate.bind(this));
            star.nativeElement.addEventListener('mouseover', this.rate.bind(this));
        });
    }
    /**
     * @return {?}
     */
    makeReadOnly() {
        this.stars.forEach((star) => {
            star.nativeElement.__zone_symbol__clickfalse = null;
            star.nativeElement.__zone_symbol__mouseoverfalse = null;
        });
    }
    /**
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
     * @return {?}
     */
    ngAfterViewInit() {
    }
    /**
     * @param {?} event
     * @return {?}
     */
    rate(event) {
        /** @type {?} */
        let star = /** @type {?} */ (event.srcElement);
        this.value = parseInt(star.dataset["index"]);
        if (this.value == 0) {
            this.value = 1;
        }
    }
    /**
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
                star.nativeElement.style.setProperty('--size', this.size);
                if (star.nativeElement.classList.contains("half")) {
                    star.nativeElement.style.setProperty('--halfWidth', `${halfSize}px`);
                    star.nativeElement.style.setProperty('--halfMargin', `${halfMargin}px`);
                }
            });
        }
    }
    /**
     * @param {?} setChecked
     * @return {?}
     */
    applyColorStyleAllStars(setChecked) {
        this.stars.forEach(star => {
            if (setChecked) {
                this.applyCheckedColorStyle(star.nativeElement);
            }
            else {
                this.applyUnCheckedColorStyle(star.nativeElement);
            }
        });
    }
    /**
     * @param {?} starElement
     * @return {?}
     */
    applyColorStyle(starElement) {
        this.applyCheckedColorStyle(starElement);
        this.applyUnCheckedColorStyle(starElement);
    }
    /**
     * @param {?} starElement
     * @return {?}
     */
    applyCheckedColorStyle(starElement) {
        starElement.style.setProperty('--checkedColor', this.checkedcolor);
    }
    /**
     * @param {?} starElement
     * @return {?}
     */
    applyUnCheckedColorStyle(starElement) {
        starElement.style.setProperty('--unCheckedColor', this.uncheckedcolor);
    }
    /**
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
            this.stars.forEach(star => {
                star.nativeElement.classList = [];
                this.applyColorStyle(star.nativeElement);
                star.nativeElement.classList.add("star");
                if (this.value >= i) {
                    // star on
                    star.nativeElement.classList.add("on");
                }
                else {
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
StarRatingComponent.decorators = [
    { type: Component, args: [{
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
            }] }
];
/** @nocollapse */
StarRatingComponent.ctorParameters = () => [];
StarRatingComponent.propDecorators = {
    mainElement: [{ type: ViewChild, args: ['starMain',] }],
    star1Element: [{ type: ViewChild, args: ['star1',] }],
    star2Element: [{ type: ViewChild, args: ['star2',] }],
    star3Element: [{ type: ViewChild, args: ['star3',] }],
    star4Element: [{ type: ViewChild, args: ['star4',] }],
    star5Element: [{ type: ViewChild, args: ['star5',] }],
    checkedcolor: [{ type: Input, args: ['checkedcolor',] }],
    uncheckedcolor: [{ type: Input, args: ['uncheckedcolor',] }],
    value: [{ type: Input, args: ['value',] }],
    size: [{ type: Input, args: ['size',] }],
    readonly: [{ type: Input, args: ['readonly',] }]
};
if (false) {
    /** @type {?} */
    StarRatingComponent.prototype.stars;
    /** @type {?} */
    StarRatingComponent.prototype._checkedColor;
    /** @type {?} */
    StarRatingComponent.prototype._unCheckedColor;
    /** @type {?} */
    StarRatingComponent.prototype._value;
    /** @type {?} */
    StarRatingComponent.prototype._size;
    /** @type {?} */
    StarRatingComponent.prototype._readOnly;
    /** @type {?} */
    StarRatingComponent.prototype.onValueChange;
    /** @type {?} */
    StarRatingComponent.prototype.onCheckedColorChange;
    /** @type {?} */
    StarRatingComponent.prototype.onUnCheckedColorChange;
    /** @type {?} */
    StarRatingComponent.prototype.onSizeChange;
    /** @type {?} */
    StarRatingComponent.prototype.onReadOnlyChange;
    /** @type {?} */
    StarRatingComponent.prototype.mainElement;
    /** @type {?} */
    StarRatingComponent.prototype.star1Element;
    /** @type {?} */
    StarRatingComponent.prototype.star2Element;
    /** @type {?} */
    StarRatingComponent.prototype.star3Element;
    /** @type {?} */
    StarRatingComponent.prototype.star4Element;
    /** @type {?} */
    StarRatingComponent.prototype.star5Element;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rhci1yYXRpbmcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctc3RhcnJhdGluZy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc3Rhci1yYXRpbmcvc3Rhci1yYXRpbmcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFnRC9CLE1BQU07SUFxQko7cUJBcEJnQixFQUFFO3lCQUtXLEtBQUs7UUFnQmhDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUNuQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2hDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7YUFDMUIsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFO1lBQzlCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQzFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO2dCQUN2QyxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDcEMsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFO1lBQ2hDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQzVDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO2dCQUN6QyxJQUFJLENBQUMsdUJBQXVCLENBQUMs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cEIsU0FBUyxTQUFDLE9BQU87MkJBQ2pCLFNBQVMsU0FBQyxPQUFPOzJCQUNqQixTQUFTLFNBQUMsT0FBTzsyQkFDakIsU0FBUyxTQUFDLE9BQU87MkJBQ2pCLFNBQVMsU0FBQyxPQUFPOzJCQTREakIsS0FBSyxTQUFDLGNBQWM7NkJBT3BCLEtBQUssU0FBQyxnQkFBZ0I7b0JBT3RCLEtBQUssU0FBQyxPQUFPO21CQWdCYixLQUFLLFNBQUMsTUFBTTt1QkFRWixLQUFLLFNBQUMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzdGFyLXJhdGluZycsXG4gIHRlbXBsYXRlOiBgXG4gIDxkaXYgI3N0YXJNYWluPlxuICAgIDxzcGFuIGRhdGEtaW5kZXg9XCIxXCIgI3N0YXIxPjwvc3Bhbj5cbiAgICA8c3BhbiBkYXRhLWluZGV4PVwiMlwiICNzdGFyMj48L3NwYW4+XG4gICAgPHNwYW4gZGF0YS1pbmRleD1cIjNcIiAjc3RhcjM+PC9zcGFuPlxuICAgIDxzcGFuIGRhdGEtaW5kZXg9XCI0XCIgI3N0YXI0Pjwvc3Bhbj5cbiAgICA8c3BhbiBkYXRhLWluZGV4PVwiNVwiICNzdGFyNT48L3NwYW4+XG4gIDwvZGl2PlxuICA8c3R5bGU+XG4gICAgOnJvb3Qge1xuICAgICAgLS1jaGVja2VkQ29sb3I6IGdvbGQ7XG4gICAgICAtLXVuQ2hlY2tlZENvbG9yOiBncmF5O1xuICAgICAgLS1zaXplOiAyNHB4O1xuICAgICAgLS1oYWxmV2lkdGg6IDEwcHg7XG4gICAgICAtLWhhbGZNYXJnaW46IC0yMHB4O1xuICAgIH0gIFxuICAgIC5zdGFyIHtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIGNvbG9yOiB2YXIoLS11bkNoZWNrZWRDb2xvcik7XG4gICAgICBmb250LXNpemU6IHZhcigtLXNpemUpO1xuICAgICAgd2lkdGg6IHZhcigtLXNpemUpO1xuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIH1cbiAgICAuc3RhcjpsYXN0LWNoaWxkIHtcbiAgICAgIG1hcmdpbi1yaWdodDogMDtcbiAgICB9XG4gICAgLnN0YXI6YmVmb3JlIHtcbiAgICAgIGNvbnRlbnQ6J1xcXFwyNjA1JztcbiAgICB9XG4gICAgLnN0YXIub24ge1xuICAgICAgY29sb3I6IHZhcigtLWNoZWNrZWRDb2xvcik7XG4gICAgfVxuICAgIC5zdGFyLmhhbGY6YWZ0ZXIge1xuICAgICAgY29udGVudDonXFxcXDI2MDUnO1xuICAgICAgY29sb3I6IHZhcigtLWNoZWNrZWRDb2xvcik7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICBtYXJnaW4tbGVmdDogdmFyKC0taGFsZk1hcmdpbik7XG4gICAgICB3aWR0aDogdmFyKC0taGFsZldpZHRoKTtcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgfVxuICA8L3N0eWxlPlxuICAgYFxufSlcblxuZXhwb3J0IGNsYXNzIFN0YXJSYXRpbmdDb21wb25lbnQge1xuICBwcml2YXRlIHN0YXJzID0gW107XG4gIHByaXZhdGUgX2NoZWNrZWRDb2xvcjogc3RyaW5nO1xuICBwcml2YXRlIF91bkNoZWNrZWRDb2xvcjogc3RyaW5nO1xuICBwcml2YXRlIF92YWx1ZTogbnVtYmVyO1xuICBwcml2YXRlIF9zaXplOiBzdHJpbmc7XG4gIHByaXZhdGUgX3JlYWRPbmx5OiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBvblZhbHVlQ2hhbmdlOiBTdWJqZWN0PG51bWJlcj47XG4gIHByaXZhdGUgb25DaGVja2VkQ29sb3JDaGFuZ2U6IFN1YmplY3Q8c3RyaW5nPjtcbiAgcHJpdmF0ZSBvblVuQ2hlY2tlZENvbG9yQ2hhbmdlOiBTdWJqZWN0PHN0cmluZz47XG4gIHByaXZhdGUgb25TaXplQ2hhbmdlOiBTdWJqZWN0PHN0cmluZz47XG4gIHByaXZhdGUgb25SZWFkT25seUNoYW5nZTogU3ViamVjdDxib29sZWFuPjtcblxuICBAVmlld0NoaWxkKCdzdGFyTWFpbicpIHByaXZhdGUgbWFpbkVsZW1lbnQ6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ3N0YXIxJykgcHJpdmF0ZSBzdGFyMUVsZW1lbnQ6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ3N0YXIyJykgcHJpdmF0ZSBzdGFyMkVsZW1lbnQ6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ3N0YXIzJykgcHJpdmF0ZSBzdGFyM0VsZW1lbnQ6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ3N0YXI0JykgcHJpdmF0ZSBzdGFyNEVsZW1lbnQ6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ3N0YXI1JykgcHJpdmF0ZSBzdGFyNUVsZW1lbnQ6IEVsZW1lbnRSZWY7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgaWYgKCF0aGlzLm9uVmFsdWVDaGFuZ2UpIHtcbiAgICAgIHRoaXMub25WYWx1ZUNoYW5nZSA9IG5ldyBTdWJqZWN0KCk7XG4gICAgICB0aGlzLm9uVmFsdWVDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZVJhdGluZygpO1xuICAgICAgICB0aGlzLmFwcGx5U2l6ZUFsbFN0YXJzKCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMub25DaGVja2VkQ29sb3JDaGFuZ2UpIHtcbiAgICAgIHRoaXMub25DaGVja2VkQ29sb3JDaGFuZ2UgPSBuZXcgU3ViamVjdCgpO1xuICAgICAgdGhpcy5vbkNoZWNrZWRDb2xvckNoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmFwcGx5Q29sb3JTdHlsZUFsbFN0YXJzKHRydWUpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLm9uVW5DaGVja2VkQ29sb3JDaGFuZ2UpIHtcbiAgICAgIHRoaXMub25VbkNoZWNrZWRDb2xvckNoYW5nZSA9IG5ldyBTdWJqZWN0KCk7XG4gICAgICB0aGlzLm9uVW5DaGVja2VkQ29sb3JDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5hcHBseUNvbG9yU3R5bGVBbGxTdGFycyhmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMub25TaXplQ2hhbmdlKSB7XG4gICAgICB0aGlzLm9uU2l6ZUNoYW5nZSA9IG5ldyBTdWJqZWN0KCk7XG4gICAgICB0aGlzLm9uU2l6ZUNoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmFwcGx5U2l6ZUFsbFN0YXJzKCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMub25SZWFkT25seUNoYW5nZSkge1xuICAgICAgdGhpcy5vblJlYWRPbmx5Q2hhbmdlID0gbmV3IFN1YmplY3QoKTtcbiAgICAgIHRoaXMub25SZWFkT25seUNoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmFkZFJlbW92ZUV2ZW50cygpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGNoZWNrZWRjb2xvcigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9jaGVja2VkQ29sb3I7XG4gIH1cblxuICBnZXQgdW5jaGVja2VkY29sb3IoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fdW5DaGVja2VkQ29sb3I7XG4gIH1cblxuICBnZXQgdmFsdWUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICBnZXQgc2l6ZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9zaXplLmNvbmNhdCgoIXRoaXMuX3NpemUuaW5jbHVkZXMoXCJweFwiKSA/IFwicHhcIiA6IFwiXCIpKTtcbiAgfVxuXG4gIGdldCByZWFkb25seSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gU3RyaW5nKHRoaXMuX3JlYWRPbmx5KSA9PT0gXCJ0cnVlXCI7XG4gIH1cblxuICBASW5wdXQoJ2NoZWNrZWRjb2xvcicpIHNldCBjaGVja2VkY29sb3IodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX2NoZWNrZWRDb2xvciA9IHZhbHVlO1xuICAgIGlmICh0aGlzLl9jaGVja2VkQ29sb3IpIHtcbiAgICAgIHRoaXMub25DaGVja2VkQ29sb3JDaGFuZ2UubmV4dCh0aGlzLl9jaGVja2VkQ29sb3IpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgndW5jaGVja2VkY29sb3InKSBzZXQgdW5jaGVja2VkY29sb3IodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX3VuQ2hlY2tlZENvbG9yID0gdmFsdWU7XG4gICAgaWYgKHRoaXMuX3VuQ2hlY2tlZENvbG9yKSB7XG4gICAgICB0aGlzLm9uVW5DaGVja2VkQ29sb3JDaGFuZ2UubmV4dCh0aGlzLl91bkNoZWNrZWRDb2xvcik7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCd2YWx1ZScpIHNldCB2YWx1ZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKCF2YWx1ZSB8fCB2YWx1ZSA9PSBudWxsKSB7XG4gICAgICB2YWx1ZSA9IDA7XG4gICAgfVxuXG4gICAgaWYgKHZhbHVlID4gNSkge1xuICAgICAgdmFsdWUgPSA1O1xuICAgIH1cblxuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG5cbiAgICBpZiAodGhpcy5fdmFsdWUgPj0gMCkge1xuICAgICAgdGhpcy5vblZhbHVlQ2hhbmdlLm5leHQodGhpcy5fdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgnc2l6ZScpIHNldCBzaXplKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAoIXZhbHVlIHx8IHZhbHVlID09IG51bGwgfHwgdmFsdWUgPT0gXCIwcHhcIikge1xuICAgICAgdmFsdWUgPSBcIjI0cHhcIjtcbiAgICB9XG4gICAgdGhpcy5fc2l6ZSA9IHZhbHVlO1xuICAgIHRoaXMub25TaXplQ2hhbmdlLm5leHQodGhpcy5fc2l6ZSk7XG4gIH1cblxuICBASW5wdXQoJ3JlYWRvbmx5Jykgc2V0IHJlYWRvbmx5KHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fcmVhZE9ubHkgPSB2YWx1ZTtcbiAgICB0aGlzLm9uUmVhZE9ubHlDaGFuZ2UubmV4dCh2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIG1ha2VFZGl0YWJsZSgpIHtcbiAgICB0aGlzLnN0YXJzLmZvckVhY2goc3RhciA9PiB7XG4gICAgICBzdGFyLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnJhdGUuYmluZCh0aGlzKSk7XG4gICAgICBzdGFyLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgdGhpcy5yYXRlLmJpbmQodGhpcykpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBtYWtlUmVhZE9ubHkoKSB7XG4gICAgdGhpcy5zdGFycy5mb3JFYWNoKChzdGFyOkVsZW1lbnRSZWYpID0+IHtcbiAgICAgIHN0YXIubmF0aXZlRWxlbWVudC5fX3pvbmVfc3ltYm9sX19jbGlja2ZhbHNlID0gbnVsbDtcbiAgICAgIHN0YXIubmF0aXZlRWxlbWVudC5fX3pvbmVfc3ltYm9sX19tb3VzZW92ZXJmYWxzZSA9IG51bGw7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFkZFJlbW92ZUV2ZW50cygpIHtcbiAgICBpZiAodGhpcy5yZWFkb25seSkge1xuICAgICAgdGhpcy5tYWtlUmVhZE9ubHkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tYWtlRWRpdGFibGUoKTtcbiAgICAgIHRoaXMub25WYWx1ZUNoYW5nZS5uZXh0KHRoaXMudmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbmdBZnRlclZpZXdJbml0KCkge1xuICB9XG5cbiAgcHJpdmF0ZSByYXRlKGV2ZW50Ok1vdXNlRXZlbnQpIHtcbiAgICBsZXQgc3RhcjpIVE1MRWxlbWVudCA9IDxIVE1MRWxlbWVudD4gZXZlbnQuc3JjRWxlbWVudDtcbiAgICB0aGlzLnZhbHVlID0gcGFyc2VJbnQoc3Rhci5kYXRhc2V0LmluZGV4KTtcbiAgICBpZiAodGhpcy52YWx1ZSA9PSAwKSB7XG4gICAgICB0aGlzLnZhbHVlID0gMTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldFN0YXJzKCkge1xuICAgIGlmICh0aGlzLnN0YXJzLmxlbmd0aCA9PSAwKSB7XG4gICAgICB0aGlzLnN0YXJzLnB1c2godGhpcy5zdGFyMUVsZW1lbnQpO1xuICAgICAgdGhpcy5zdGFycy5wdXNoKHRoaXMuc3RhcjJFbGVtZW50KTtcbiAgICAgIHRoaXMuc3RhcnMucHVzaCh0aGlzLnN0YXIzRWxlbWVudCk7XG4gICAgICB0aGlzLnN0YXJzLnB1c2godGhpcy5zdGFyNEVsZW1lbnQpO1xuICAgICAgdGhpcy5zdGFycy5wdXNoKHRoaXMuc3RhcjVFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFwcGx5U2l6ZUFsbFN0YXJzKCkge1xuICAgIGlmICh0aGlzLl9zaXplKSB7XG4gICAgICB0aGlzLnN0YXJzLmZvckVhY2goKHN0YXI6RWxlbWVudFJlZikgPT4ge1xuICAgICAgICBsZXQgbmV3U2l6ZSA9IHRoaXMuc2l6ZS5tYXRjaCgvXFxkKy8pWzBdO1xuICAgICAgICBsZXQgaGFsZlNpemUgPSAocGFyc2VJbnQobmV3U2l6ZSkgKiAxMCkgLyAyNDtcbiAgICAgICAgbGV0IGhhbGZNYXJnaW4gPSAwIC0gKChwYXJzZUludChuZXdTaXplKSAqIDIwKSAvIDI0KTtcbiAgICAgICAgc3Rhci5uYXRpdmVFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLXNpemUnLCB0aGlzLnNpemUpO1xuICAgICAgICBpZiAoc3Rhci5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImhhbGZcIikpIHtcbiAgICAgICAgICBzdGFyLm5hdGl2ZUVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0taGFsZldpZHRoJywgYCR7aGFsZlNpemV9cHhgKTtcbiAgICAgICAgICBzdGFyLm5hdGl2ZUVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0taGFsZk1hcmdpbicsIGAke2hhbGZNYXJnaW59cHhgKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhcHBseUNvbG9yU3R5bGVBbGxTdGFycyhzZXRDaGVja2VkOiBib29sZWFuKSB7XG4gICAgdGhpcy5zdGFycy5mb3JFYWNoKHN0YXIgPT4ge1xuICAgICAgaWYgKHNldENoZWNrZWQpIHtcbiAgICAgICAgdGhpcy5hcHBseUNoZWNrZWRDb2xvclN0eWxlKHN0YXIubmF0aXZlRWxlbWVudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFwcGx5VW5DaGVja2VkQ29sb3JTdHlsZShzdGFyLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBseUNvbG9yU3R5bGUoc3RhckVsZW1lbnQ6IEhUTUxTcGFuRWxlbWVudCkge1xuICAgIHRoaXMuYXBwbHlDaGVja2VkQ29sb3JTdHlsZShzdGFyRWxlbWVudCk7XG4gICAgdGhpcy5hcHBseVVuQ2hlY2tlZENvbG9yU3R5bGUoc3RhckVsZW1lbnQpO1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBseUNoZWNrZWRDb2xvclN0eWxlKHN0YXJFbGVtZW50OiBIVE1MU3BhbkVsZW1lbnQpIHtcbiAgICBzdGFyRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1jaGVja2VkQ29sb3InLCB0aGlzLmNoZWNrZWRjb2xvcik7XG4gIH1cblxuICBwcml2YXRlIGFwcGx5VW5DaGVja2VkQ29sb3JTdHlsZShzdGFyRWxlbWVudDogSFRNTFNwYW5FbGVtZW50KSB7XG4gICAgc3RhckVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tdW5DaGVja2VkQ29sb3InLCB0aGlzLnVuY2hlY2tlZGNvbG9yKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2VuZXJhdGVSYXRpbmcoKSB7XG4gICAgaWYgKHRoaXMucmVhZG9ubHkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGFycygpO1xuICAgIGlmICh0aGlzLnZhbHVlID49IDApIHtcbiAgICAgIHRoaXMubWFpbkVsZW1lbnQubmF0aXZlRWxlbWVudC50aXRsZSA9IHRoaXMudmFsdWU7XG5cbiAgICAgIGxldCBoYXNEZWNpbWFsczogYm9vbGVhbiA9XG4gICAgICAgICgoTnVtYmVyLnBhcnNlRmxvYXQodGhpcy52YWx1ZS50b1N0cmluZygpKSAlIDEpXG4gICAgICAgICAgLnRvU3RyaW5nKClcbiAgICAgICAgICAuc3Vic3RyaW5nKDMsIDIpKSA/IHRydWUgOiBmYWxzZTtcblxuICAgICAgbGV0IGkgPSAxO1xuICAgICAgdGhpcy5zdGFycy5mb3JFYWNoKHN0YXIgPT4ge1xuICAgICAgICBzdGFyLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0ID0gW107XG4gICAgICAgIHRoaXMuYXBwbHlDb2xvclN0eWxlKHN0YXIubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIHN0YXIubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic3RhclwiKTtcblxuICAgICAgICBpZiAodGhpcy52YWx1ZSA+PSBpKSB7XG4gICAgICAgICAgLy8gc3RhciBvblxuICAgICAgICAgIHN0YXIubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwib25cIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gaGFsZCBzdGFyXG4gICAgICAgICAgaWYgKGhhc0RlY2ltYWxzKSB7XG4gICAgICAgICAgICBzdGFyLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImhhbGZcIik7XG4gICAgICAgICAgICBoYXNEZWNpbWFscyA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpKys7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==