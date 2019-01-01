/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
var StarRatingComponent = /** @class */ (function () {
    function StarRatingComponent() {
        var _this = this;
        this.stars = [];
        this._readOnly = false;
        if (!this.onValueChange) {
            this.onValueChange = new Subject();
            this.onValueChange.subscribe(function () {
                _this.generateRating();
                _this.applySizeAllStars();
            });
        }
        if (!this.onCheckedColorChange) {
            this.onCheckedColorChange = new Subject();
            this.onCheckedColorChange.subscribe(function () {
                _this.applyColorStyleAllStars(true);
            });
        }
        if (!this.onUnCheckedColorChange) {
            this.onUnCheckedColorChange = new Subject();
            this.onUnCheckedColorChange.subscribe(function () {
                _this.applyColorStyleAllStars(false);
            });
        }
        if (!this.onSizeChange) {
            this.onSizeChange = new Subject();
            this.onSizeChange.subscribe(function () {
                _this.applySizeAllStars();
            });
        }
        if (!this.onReadOnlyChange) {
            this.onReadOnlyChange = new Subject();
            this.onReadOnlyChange.subscribe(function () {
                _this.addRemoveEvents();
            });
        }
    }
    Object.defineProperty(StarRatingComponent.prototype, "checkedcolor", {
        get: /**
         * @return {?}
         */
        function () {
            return this._checkedColor;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._checkedColor = value;
            if (this._checkedColor) {
                this.onCheckedColorChange.next(this._checkedColor);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StarRatingComponent.prototype, "uncheckedcolor", {
        get: /**
         * @return {?}
         */
        function () {
            return this._unCheckedColor;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._unCheckedColor = value;
            if (this._unCheckedColor) {
                this.onUnCheckedColorChange.next(this._unCheckedColor);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StarRatingComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this._value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StarRatingComponent.prototype, "size", {
        get: /**
         * @return {?}
         */
        function () {
            return this._size.concat((!this._size.includes("px") ? "px" : ""));
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!value || value == null || value == "0px") {
                value = "24px";
            }
            this._size = value;
            this.onSizeChange.next(this._size);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StarRatingComponent.prototype, "readonly", {
        get: /**
         * @return {?}
         */
        function () {
            return String(this._readOnly) === "true";
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._readOnly = value;
            this.onReadOnlyChange.next(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @return {?}
     */
    StarRatingComponent.prototype.makeEditable = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.mainElement.nativeElement.addEventListener('mouseleave', this.offStar.bind(this));
        this.mainElement.nativeElement.style.cursor = "pointer";
        this.mainElement.nativeElement.title = this.value;
        this.stars.forEach(function (star) {
            star.nativeElement.addEventListener('click', _this.rate.bind(_this));
            star.nativeElement.addEventListener('mouseenter', _this.onStar.bind(_this));
            star.nativeElement.style.cursor = "pointer";
            star.nativeElement.title = star.nativeElement.dataset.index;
        });
    };
    /**
     * @private
     * @return {?}
     */
    StarRatingComponent.prototype.makeReadOnly = /**
     * @private
     * @return {?}
     */
    function () {
        this.mainElement.nativeElement.__zone_symbol__mouseleavefalse = null;
        this.mainElement.nativeElement.style.cursor = "default";
        this.mainElement.nativeElement.title = this.value;
        this.stars.forEach(function (star) {
            star.nativeElement.__zone_symbol__clickfalse = null;
            star.nativeElement.__zone_symbol__mouseenterfalse = null;
            star.nativeElement.style.cursor = "default";
            star.nativeElement.title = "";
        });
    };
    /**
     * @private
     * @return {?}
     */
    StarRatingComponent.prototype.addRemoveEvents = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.readonly) {
            this.makeReadOnly();
        }
        else {
            this.makeEditable();
            this.onValueChange.next(this.value);
        }
    };
    /**
     * @private
     * @return {?}
     */
    StarRatingComponent.prototype.ngAfterViewInit = /**
     * @private
     * @return {?}
     */
    function () {
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    StarRatingComponent.prototype.rate = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var star = (/** @type {?} */ (event.srcElement));
        this.value = parseInt(star.dataset.index);
        if (this.value == 0) {
            this.value = 1;
        }
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    StarRatingComponent.prototype.onStar = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var star = (/** @type {?} */ (event.srcElement));
        /** @type {?} */
        var currentIndex = parseInt(star.dataset.index);
        for (var index = 0; index < currentIndex; index++) {
            this.stars[index].nativeElement.classList = [];
            this.addDefaultClass(this.stars[index].nativeElement);
            this.addCheckedStarClass(this.stars[index].nativeElement);
        }
        for (var index = currentIndex; index < this.stars.length; index++) {
            this.stars[index].nativeElement.classList = [];
            this.addDefaultClass(this.stars[index].nativeElement);
        }
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    StarRatingComponent.prototype.offStar = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.generateRating();
    };
    /**
     * @private
     * @param {?} star
     * @return {?}
     */
    StarRatingComponent.prototype.addDefaultClass = /**
     * @private
     * @param {?} star
     * @return {?}
     */
    function (star) {
        star.classList.add(StarRatingComponent.CLS_DEFAULT_STAR);
    };
    /**
     * @private
     * @param {?} star
     * @return {?}
     */
    StarRatingComponent.prototype.addCheckedStarClass = /**
     * @private
     * @param {?} star
     * @return {?}
     */
    function (star) {
        star.classList.add(StarRatingComponent.CLS_CHECKED_STAR);
    };
    /**
     * @private
     * @param {?} star
     * @return {?}
     */
    StarRatingComponent.prototype.addHalfStarClass = /**
     * @private
     * @param {?} star
     * @return {?}
     */
    function (star) {
        star.classList.add(StarRatingComponent.CLS_HALF_STAR);
    };
    /**
     * @private
     * @return {?}
     */
    StarRatingComponent.prototype.setStars = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.stars.length == 0) {
            this.stars.push(this.star1Element);
            this.stars.push(this.star2Element);
            this.stars.push(this.star3Element);
            this.stars.push(this.star4Element);
            this.stars.push(this.star5Element);
        }
    };
    /**
     * @private
     * @return {?}
     */
    StarRatingComponent.prototype.applySizeAllStars = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._size) {
            this.stars.forEach(function (star) {
                /** @type {?} */
                var newSize = _this.size.match(/\d+/)[0];
                /** @type {?} */
                var halfSize = (parseInt(newSize) * 10) / 24;
                /** @type {?} */
                var halfMargin = 0 - ((parseInt(newSize) * 20) / 24);
                star.nativeElement.style.setProperty(StarRatingComponent.VAR_SIZE, _this.size);
                if (star.nativeElement.classList.contains(StarRatingComponent.CLS_HALF_STAR)) {
                    star.nativeElement.style.setProperty(StarRatingComponent.VAR_HALF_WIDTH, halfSize + "px");
                    star.nativeElement.style.setProperty(StarRatingComponent.VAR_HALF_MARGIN, halfMargin + "px");
                }
            });
        }
    };
    /**
     * @private
     * @param {?} setChecked
     * @return {?}
     */
    StarRatingComponent.prototype.applyColorStyleAllStars = /**
     * @private
     * @param {?} setChecked
     * @return {?}
     */
    function (setChecked) {
        var _this = this;
        this.stars.forEach(function (star) {
            if (setChecked) {
                _this.applyCheckedColorStyle(star.nativeElement);
            }
            else {
                _this.applyUnCheckedColorStyle(star.nativeElement);
            }
        });
    };
    /**
     * @private
     * @param {?} starElement
     * @return {?}
     */
    StarRatingComponent.prototype.applyColorStyle = /**
     * @private
     * @param {?} starElement
     * @return {?}
     */
    function (starElement) {
        this.applyCheckedColorStyle(starElement);
        this.applyUnCheckedColorStyle(starElement);
    };
    /**
     * @private
     * @param {?} starElement
     * @return {?}
     */
    StarRatingComponent.prototype.applyCheckedColorStyle = /**
     * @private
     * @param {?} starElement
     * @return {?}
     */
    function (starElement) {
        starElement.style.setProperty(StarRatingComponent.VAR_CHECKED_COLOR, this.checkedcolor);
    };
    /**
     * @private
     * @param {?} starElement
     * @return {?}
     */
    StarRatingComponent.prototype.applyUnCheckedColorStyle = /**
     * @private
     * @param {?} starElement
     * @return {?}
     */
    function (starElement) {
        starElement.style.setProperty(StarRatingComponent.VAR_UNCHECKED_COLOR, this.uncheckedcolor);
    };
    /**
     * @private
     * @return {?}
     */
    StarRatingComponent.prototype.generateRating = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.readonly) {
            return;
        }
        this.setStars();
        if (this.value >= 0) {
            this.mainElement.nativeElement.title = this.value;
            /** @type {?} */
            var hasDecimals_1 = ((Number.parseFloat(this.value.toString()) % 1)
                .toString()
                .substring(3, 2)) ? true : false;
            /** @type {?} */
            var i_1 = 1;
            this.stars.forEach(function (star) {
                star.nativeElement.classList = [];
                _this.applyColorStyle(star.nativeElement);
                _this.addDefaultClass(star.nativeElement);
                if (_this.value >= i_1) {
                    // star on
                    _this.addCheckedStarClass(star.nativeElement);
                }
                else {
                    // half star
                    if (hasDecimals_1) {
                        _this.addHalfStarClass(star.nativeElement);
                        hasDecimals_1 = false;
                    }
                }
                i_1++;
            });
        }
    };
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
                    template: "\n  <div #starMain>\n    <span data-index=\"1\" title=\"1\" #star1></span>\n    <span data-index=\"2\" title=\"2\" #star2></span>\n    <span data-index=\"3\" title=\"3\" #star3></span>\n    <span data-index=\"4\" title=\"4\" #star4></span>\n    <span data-index=\"5\" title=\"5\" #star5></span>\n  </div>\n  <style>\n    :root {\n      --checkedColor: gold;\n      --unCheckedColor: gray;\n      --size: 24px;\n      --halfWidth: 10px;\n      --halfMargin: -20px;\n    }  \n    .star {\n      cursor: pointer;\n      color: var(--unCheckedColor);\n      font-size: var(--size);\n      width: var(--size);\n      display: inline-block;\n    }\n    .star:last-child {\n      margin-right: 0;\n    }\n    .star:before {\n      content:'\\2605';\n    }\n    .star.on {\n      color: var(--checkedColor);\n    }\n    .star.half:after {\n      content:'\\2605';\n      color: var(--checkedColor);\n      position: absolute;\n      margin-left: var(--halfMargin);\n      width: var(--halfWidth);\n      overflow: hidden;\n    }\n  </style>\n   "
                }] }
    ];
    StarRatingComponent.ctorParameters = function () { return []; };
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
    return StarRatingComponent;
}());
export { StarRatingComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rhci1yYXRpbmcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctc3RhcnJhdGluZy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc3Rhci1yYXRpbmcvc3Rhci1yYXRpbmcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFL0I7SUFpRkU7UUFBQSxpQkFvQ0M7UUF0RU8sVUFBSyxHQUFzQixFQUFFLENBQUM7UUFLOUIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQThCakMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQ25DLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDO2dCQUMzQixLQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3RCLEtBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQzNCLENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFO1lBQzlCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQzFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLENBQUM7Z0JBQ2xDLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyQyxDQUFDLENBQUMsQ0FBQztTQUNKO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRTtZQUNoQyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUM1QyxJQUFJLENBQUMsc0JBQXNCLENBQUMsU0FBUyxDQUFDO2dCQUNwQyxLQUFJLENB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LG1CQUFtQixDQUFDLFNBQVM7dUJBZ0JuQyxLQUFLLFNBQUMsbUJBQW1CLENBQUMsUUFBUTsyQkFRbEMsS0FBSyxTQUFDLG1CQUFtQixDQUFDLFlBQVk7O0lBa0t6QywwQkFBQztDQUFBLEFBblZELElBbVZDO1NBclNZLG1CQUFtQjs7Ozs7O0lBYzlCLHNDQUFxRTs7Ozs7SUFDckUsd0NBQXlFOzs7OztJQUN6RSw2QkFBb0Q7Ozs7O0lBQ3BELG1DQUErRDs7Ozs7SUFDL0Qsb0NBQWlFOzs7OztJQUNqRSxxQ0FBd0Q7Ozs7O0lBQ3hELHFDQUEwRDs7Ozs7SUFDMUQsa0NBQXVEOzs7OztJQUN2RCxzQ0FBbUU7Ozs7O0lBQ25FLHdDQUF1RTs7Ozs7SUFDdkUsOEJBQW9EOzs7OztJQUNwRCw2QkFBa0Q7Ozs7O0lBQ2xELGlDQUEwRDs7Ozs7SUF6QjFELG9DQUFzQzs7Ozs7SUFDdEMsNENBQThCOzs7OztJQUM5Qiw4Q0FBZ0M7Ozs7O0lBQ2hDLHFDQUF1Qjs7Ozs7SUFDdkIsb0NBQXNCOzs7OztJQUN0Qix3Q0FBbUM7Ozs7O0lBRW5DLDRDQUF1Qzs7Ozs7SUFDdkMsbURBQThDOzs7OztJQUM5QyxxREFBZ0Q7Ozs7O0lBQ2hELDJDQUFzQzs7Ozs7SUFDdEMsK0NBQTJDOzs7OztJQWdCM0MsMENBQXVEOzs7OztJQUN2RCwyQ0FBcUQ7Ozs7O0lBQ3JELDJDQUFxRDs7Ozs7SUFDckQsMkNBQXFEOzs7OztJQUNyRCwyQ0FBcUQ7Ozs7O0lBQ3JELDJDQUFxRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzdGFyLXJhdGluZycsXG4gIHRlbXBsYXRlOiBgXG4gIDxkaXYgI3N0YXJNYWluPlxuICAgIDxzcGFuIGRhdGEtaW5kZXg9XCIxXCIgdGl0bGU9XCIxXCIgI3N0YXIxPjwvc3Bhbj5cbiAgICA8c3BhbiBkYXRhLWluZGV4PVwiMlwiIHRpdGxlPVwiMlwiICNzdGFyMj48L3NwYW4+XG4gICAgPHNwYW4gZGF0YS1pbmRleD1cIjNcIiB0aXRsZT1cIjNcIiAjc3RhcjM+PC9zcGFuPlxuICAgIDxzcGFuIGRhdGEtaW5kZXg9XCI0XCIgdGl0bGU9XCI0XCIgI3N0YXI0Pjwvc3Bhbj5cbiAgICA8c3BhbiBkYXRhLWluZGV4PVwiNVwiIHRpdGxlPVwiNVwiICNzdGFyNT48L3NwYW4+XG4gIDwvZGl2PlxuICA8c3R5bGU+XG4gICAgOnJvb3Qge1xuICAgICAgLS1jaGVja2VkQ29sb3I6IGdvbGQ7XG4gICAgICAtLXVuQ2hlY2tlZENvbG9yOiBncmF5O1xuICAgICAgLS1zaXplOiAyNHB4O1xuICAgICAgLS1oYWxmV2lkdGg6IDEwcHg7XG4gICAgICAtLWhhbGZNYXJnaW46IC0yMHB4O1xuICAgIH0gIFxuICAgIC5zdGFyIHtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIGNvbG9yOiB2YXIoLS11bkNoZWNrZWRDb2xvcik7XG4gICAgICBmb250LXNpemU6IHZhcigtLXNpemUpO1xuICAgICAgd2lkdGg6IHZhcigtLXNpemUpO1xuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIH1cbiAgICAuc3RhcjpsYXN0LWNoaWxkIHtcbiAgICAgIG1hcmdpbi1yaWdodDogMDtcbiAgICB9XG4gICAgLnN0YXI6YmVmb3JlIHtcbiAgICAgIGNvbnRlbnQ6J1xcXFwyNjA1JztcbiAgICB9XG4gICAgLnN0YXIub24ge1xuICAgICAgY29sb3I6IHZhcigtLWNoZWNrZWRDb2xvcik7XG4gICAgfVxuICAgIC5zdGFyLmhhbGY6YWZ0ZXIge1xuICAgICAgY29udGVudDonXFxcXDI2MDUnO1xuICAgICAgY29sb3I6IHZhcigtLWNoZWNrZWRDb2xvcik7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICBtYXJnaW4tbGVmdDogdmFyKC0taGFsZk1hcmdpbik7XG4gICAgICB3aWR0aDogdmFyKC0taGFsZldpZHRoKTtcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgfVxuICA8L3N0eWxlPlxuICAgYFxufSlcblxuZXhwb3J0IGNsYXNzIFN0YXJSYXRpbmdDb21wb25lbnQge1xuICBwcml2YXRlIHN0YXJzOiBBcnJheTxFbGVtZW50UmVmPiA9IFtdO1xuICBwcml2YXRlIF9jaGVja2VkQ29sb3I6IHN0cmluZztcbiAgcHJpdmF0ZSBfdW5DaGVja2VkQ29sb3I6IHN0cmluZztcbiAgcHJpdmF0ZSBfdmFsdWU6IG51bWJlcjtcbiAgcHJpdmF0ZSBfc2l6ZTogc3RyaW5nO1xuICBwcml2YXRlIF9yZWFkT25seTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHByaXZhdGUgb25WYWx1ZUNoYW5nZTogU3ViamVjdDxudW1iZXI+O1xuICBwcml2YXRlIG9uQ2hlY2tlZENvbG9yQ2hhbmdlOiBTdWJqZWN0PHN0cmluZz47XG4gIHByaXZhdGUgb25VbkNoZWNrZWRDb2xvckNoYW5nZTogU3ViamVjdDxzdHJpbmc+O1xuICBwcml2YXRlIG9uU2l6ZUNoYW5nZTogU3ViamVjdDxzdHJpbmc+O1xuICBwcml2YXRlIG9uUmVhZE9ubHlDaGFuZ2U6IFN1YmplY3Q8Ym9vbGVhbj47XG5cbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgVkFSX0NIRUNLRURfQ09MT1I6IHN0cmluZyA9ICctLWNoZWNrZWRDb2xvcic7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFZBUl9VTkNIRUNLRURfQ09MT1I6IHN0cmluZyA9ICctLXVuQ2hlY2tlZENvbG9yJztcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgVkFSX1NJWkU6IHN0cmluZyA9ICctLXNpemUnO1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBWQVJfSEFMRl9XSURUSDogc3RyaW5nID0gJy0taGFsZldpZHRoJztcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgVkFSX0hBTEZfTUFSR0lOOiBzdHJpbmcgPSAnLS1oYWxmTWFyZ2luJztcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgQ0xTX0NIRUNLRURfU1RBUjogc3RyaW5nID0gJ29uJztcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgQ0xTX0RFRkFVTFRfU1RBUjogc3RyaW5nID0gJ3N0YXInO1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBDTFNfSEFMRl9TVEFSOiBzdHJpbmcgPSAnaGFsZic7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IElOUF9DSEVDS0VEX0NPTE9SOiBzdHJpbmcgPSAnY2hlY2tlZGNvbG9yJztcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSU5QX1VOQ0hFQ0tFRF9DT0xPUjogc3RyaW5nID0gJ3VuY2hlY2tlZGNvbG9yJztcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSU5QX1ZBTFVFOiBzdHJpbmcgPSAndmFsdWUnO1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBJTlBfU0laRTogc3RyaW5nID0gJ3NpemUnO1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBJTlBfUkVBRE9OTFk6IHN0cmluZyA9ICdyZWFkb25seSc7XG5cbiAgQFZpZXdDaGlsZCgnc3Rhck1haW4nKSBwcml2YXRlIG1haW5FbGVtZW50OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdzdGFyMScpIHByaXZhdGUgc3RhcjFFbGVtZW50OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdzdGFyMicpIHByaXZhdGUgc3RhcjJFbGVtZW50OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdzdGFyMycpIHByaXZhdGUgc3RhcjNFbGVtZW50OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdzdGFyNCcpIHByaXZhdGUgc3RhcjRFbGVtZW50OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdzdGFyNScpIHByaXZhdGUgc3RhcjVFbGVtZW50OiBFbGVtZW50UmVmO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGlmICghdGhpcy5vblZhbHVlQ2hhbmdlKSB7XG4gICAgICB0aGlzLm9uVmFsdWVDaGFuZ2UgPSBuZXcgU3ViamVjdCgpO1xuICAgICAgdGhpcy5vblZhbHVlQ2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVSYXRpbmcoKTtcbiAgICAgICAgdGhpcy5hcHBseVNpemVBbGxTdGFycygpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLm9uQ2hlY2tlZENvbG9yQ2hhbmdlKSB7XG4gICAgICB0aGlzLm9uQ2hlY2tlZENvbG9yQ2hhbmdlID0gbmV3IFN1YmplY3QoKTtcbiAgICAgIHRoaXMub25DaGVja2VkQ29sb3JDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5hcHBseUNvbG9yU3R5bGVBbGxTdGFycyh0cnVlKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5vblVuQ2hlY2tlZENvbG9yQ2hhbmdlKSB7XG4gICAgICB0aGlzLm9uVW5DaGVja2VkQ29sb3JDaGFuZ2UgPSBuZXcgU3ViamVjdCgpO1xuICAgICAgdGhpcy5vblVuQ2hlY2tlZENvbG9yQ2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuYXBwbHlDb2xvclN0eWxlQWxsU3RhcnMoZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLm9uU2l6ZUNoYW5nZSkge1xuICAgICAgdGhpcy5vblNpemVDaGFuZ2UgPSBuZXcgU3ViamVjdCgpO1xuICAgICAgdGhpcy5vblNpemVDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5hcHBseVNpemVBbGxTdGFycygpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLm9uUmVhZE9ubHlDaGFuZ2UpIHtcbiAgICAgIHRoaXMub25SZWFkT25seUNoYW5nZSA9IG5ldyBTdWJqZWN0KCk7XG4gICAgICB0aGlzLm9uUmVhZE9ubHlDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5hZGRSZW1vdmVFdmVudHMoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGdldCBjaGVja2VkY29sb3IoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fY2hlY2tlZENvbG9yO1xuICB9XG5cbiAgZ2V0IHVuY2hlY2tlZGNvbG9yKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3VuQ2hlY2tlZENvbG9yO1xuICB9XG5cbiAgZ2V0IHZhbHVlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgZ2V0IHNpemUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fc2l6ZS5jb25jYXQoKCF0aGlzLl9zaXplLmluY2x1ZGVzKFwicHhcIikgPyBcInB4XCIgOiBcIlwiKSk7XG4gIH1cblxuICBnZXQgcmVhZG9ubHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIFN0cmluZyh0aGlzLl9yZWFkT25seSkgPT09IFwidHJ1ZVwiO1xuICB9XG5cbiAgQElucHV0KFN0YXJSYXRpbmdDb21wb25lbnQuSU5QX0NIRUNLRURfQ09MT1IpIHNldCBjaGVja2VkY29sb3IodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX2NoZWNrZWRDb2xvciA9IHZhbHVlO1xuICAgIGlmICh0aGlzLl9jaGVja2VkQ29sb3IpIHtcbiAgICAgIHRoaXMub25DaGVja2VkQ29sb3JDaGFuZ2UubmV4dCh0aGlzLl9jaGVja2VkQ29sb3IpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dChTdGFyUmF0aW5nQ29tcG9uZW50LklOUF9VTkNIRUNLRURfQ09MT1IpIHNldCB1bmNoZWNrZWRjb2xvcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fdW5DaGVja2VkQ29sb3IgPSB2YWx1ZTtcbiAgICBpZiAodGhpcy5fdW5DaGVja2VkQ29sb3IpIHtcbiAgICAgIHRoaXMub25VbkNoZWNrZWRDb2xvckNoYW5nZS5uZXh0KHRoaXMuX3VuQ2hlY2tlZENvbG9yKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoU3RhclJhdGluZ0NvbXBvbmVudC5JTlBfVkFMVUUpIHNldCB2YWx1ZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKCF2YWx1ZSB8fCB2YWx1ZSA9PSBudWxsKSB7XG4gICAgICB2YWx1ZSA9IDA7XG4gICAgfVxuXG4gICAgaWYgKHZhbHVlID4gNSkge1xuICAgICAgdmFsdWUgPSA1O1xuICAgIH1cblxuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG5cbiAgICBpZiAodGhpcy5fdmFsdWUgPj0gMCkge1xuICAgICAgdGhpcy5vblZhbHVlQ2hhbmdlLm5leHQodGhpcy5fdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dChTdGFyUmF0aW5nQ29tcG9uZW50LklOUF9TSVpFKSBzZXQgc2l6ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKCF2YWx1ZSB8fCB2YWx1ZSA9PSBudWxsIHx8IHZhbHVlID09IFwiMHB4XCIpIHtcbiAgICAgIHZhbHVlID0gXCIyNHB4XCI7XG4gICAgfVxuICAgIHRoaXMuX3NpemUgPSB2YWx1ZTtcbiAgICB0aGlzLm9uU2l6ZUNoYW5nZS5uZXh0KHRoaXMuX3NpemUpO1xuICB9XG5cbiAgQElucHV0KFN0YXJSYXRpbmdDb21wb25lbnQuSU5QX1JFQURPTkxZKSBzZXQgcmVhZG9ubHkodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9yZWFkT25seSA9IHZhbHVlO1xuICAgIHRoaXMub25SZWFkT25seUNoYW5nZS5uZXh0KHZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgbWFrZUVkaXRhYmxlKCkge1xuICAgIHRoaXMubWFpbkVsZW1lbnQubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5vZmZTdGFyLmJpbmQodGhpcykpO1xuICAgIHRoaXMubWFpbkVsZW1lbnQubmF0aXZlRWxlbWVudC5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcbiAgICB0aGlzLm1haW5FbGVtZW50Lm5hdGl2ZUVsZW1lbnQudGl0bGUgPSB0aGlzLnZhbHVlO1xuICAgIHRoaXMuc3RhcnMuZm9yRWFjaCgoc3RhcjogRWxlbWVudFJlZikgPT4ge1xuICAgICAgc3Rhci5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5yYXRlLmJpbmQodGhpcykpO1xuICAgICAgc3Rhci5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0aGlzLm9uU3Rhci5iaW5kKHRoaXMpKTtcbiAgICAgIHN0YXIubmF0aXZlRWxlbWVudC5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcbiAgICAgIHN0YXIubmF0aXZlRWxlbWVudC50aXRsZSA9IHN0YXIubmF0aXZlRWxlbWVudC5kYXRhc2V0LmluZGV4O1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBtYWtlUmVhZE9ubHkoKSB7XG4gICAgdGhpcy5tYWluRWxlbWVudC5uYXRpdmVFbGVtZW50Ll9fem9uZV9zeW1ib2xfX21vdXNlbGVhdmVmYWxzZSA9IG51bGw7XG4gICAgdGhpcy5tYWluRWxlbWVudC5uYXRpdmVFbGVtZW50LnN0eWxlLmN1cnNvciA9IFwiZGVmYXVsdFwiO1xuICAgIHRoaXMubWFpbkVsZW1lbnQubmF0aXZlRWxlbWVudC50aXRsZSA9IHRoaXMudmFsdWU7XG4gICAgdGhpcy5zdGFycy5mb3JFYWNoKChzdGFyOiBFbGVtZW50UmVmKSA9PiB7XG4gICAgICBzdGFyLm5hdGl2ZUVsZW1lbnQuX196b25lX3N5bWJvbF9fY2xpY2tmYWxzZSA9IG51bGw7XG4gICAgICBzdGFyLm5hdGl2ZUVsZW1lbnQuX196b25lX3N5bWJvbF9fbW91c2VlbnRlcmZhbHNlID0gbnVsbDtcbiAgICAgIHN0YXIubmF0aXZlRWxlbWVudC5zdHlsZS5jdXJzb3IgPSBcImRlZmF1bHRcIjtcbiAgICAgIHN0YXIubmF0aXZlRWxlbWVudC50aXRsZSA9IFwiXCI7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFkZFJlbW92ZUV2ZW50cygpIHtcbiAgICBpZiAodGhpcy5yZWFkb25seSkge1xuICAgICAgdGhpcy5tYWtlUmVhZE9ubHkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tYWtlRWRpdGFibGUoKTtcbiAgICAgIHRoaXMub25WYWx1ZUNoYW5nZS5uZXh0KHRoaXMudmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbmdBZnRlclZpZXdJbml0KCkge1xuICB9XG5cbiAgcHJpdmF0ZSByYXRlKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgbGV0IHN0YXI6IEhUTUxFbGVtZW50ID0gPEhUTUxFbGVtZW50PmV2ZW50LnNyY0VsZW1lbnQ7XG4gICAgdGhpcy52YWx1ZSA9IHBhcnNlSW50KHN0YXIuZGF0YXNldC5pbmRleCk7XG4gICAgaWYgKHRoaXMudmFsdWUgPT0gMCkge1xuICAgICAgdGhpcy52YWx1ZSA9IDE7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBvblN0YXIoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBsZXQgc3RhcjogSFRNTEVsZW1lbnQgPSA8SFRNTEVsZW1lbnQ+ZXZlbnQuc3JjRWxlbWVudDtcbiAgICBsZXQgY3VycmVudEluZGV4ID0gcGFyc2VJbnQoc3Rhci5kYXRhc2V0LmluZGV4KTtcblxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBjdXJyZW50SW5kZXg7IGluZGV4KyspIHtcbiAgICAgIHRoaXMuc3RhcnNbaW5kZXhdLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0ID0gW107XG4gICAgICB0aGlzLmFkZERlZmF1bHRDbGFzcyh0aGlzLnN0YXJzW2luZGV4XS5uYXRpdmVFbGVtZW50KTtcbiAgICAgIHRoaXMuYWRkQ2hlY2tlZFN0YXJDbGFzcyh0aGlzLnN0YXJzW2luZGV4XS5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpbmRleCA9IGN1cnJlbnRJbmRleDsgaW5kZXggPCB0aGlzLnN0YXJzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgdGhpcy5zdGFyc1tpbmRleF0ubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QgPSBbXTtcbiAgICAgIHRoaXMuYWRkRGVmYXVsdENsYXNzKHRoaXMuc3RhcnNbaW5kZXhdLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb2ZmU3RhcihldmVudDogTW91c2VFdmVudCkge1xuICAgIHRoaXMuZ2VuZXJhdGVSYXRpbmcoKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkRGVmYXVsdENsYXNzKHN0YXI6IEhUTUxTcGFuRWxlbWVudCkge1xuICAgIHN0YXIuY2xhc3NMaXN0LmFkZChTdGFyUmF0aW5nQ29tcG9uZW50LkNMU19ERUZBVUxUX1NUQVIpO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRDaGVja2VkU3RhckNsYXNzKHN0YXI6IEhUTUxTcGFuRWxlbWVudCkge1xuICAgIHN0YXIuY2xhc3NMaXN0LmFkZChTdGFyUmF0aW5nQ29tcG9uZW50LkNMU19DSEVDS0VEX1NUQVIpO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRIYWxmU3RhckNsYXNzKHN0YXI6IEhUTUxTcGFuRWxlbWVudCkge1xuICAgIHN0YXIuY2xhc3NMaXN0LmFkZChTdGFyUmF0aW5nQ29tcG9uZW50LkNMU19IQUxGX1NUQVIpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRTdGFycygpIHtcbiAgICBpZiAodGhpcy5zdGFycy5sZW5ndGggPT0gMCkge1xuICAgICAgdGhpcy5zdGFycy5wdXNoKHRoaXMuc3RhcjFFbGVtZW50KTtcbiAgICAgIHRoaXMuc3RhcnMucHVzaCh0aGlzLnN0YXIyRWxlbWVudCk7XG4gICAgICB0aGlzLnN0YXJzLnB1c2godGhpcy5zdGFyM0VsZW1lbnQpO1xuICAgICAgdGhpcy5zdGFycy5wdXNoKHRoaXMuc3RhcjRFbGVtZW50KTtcbiAgICAgIHRoaXMuc3RhcnMucHVzaCh0aGlzLnN0YXI1RWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhcHBseVNpemVBbGxTdGFycygpIHtcbiAgICBpZiAodGhpcy5fc2l6ZSkge1xuICAgICAgdGhpcy5zdGFycy5mb3JFYWNoKChzdGFyOiBFbGVtZW50UmVmKSA9PiB7XG4gICAgICAgIGxldCBuZXdTaXplID0gdGhpcy5zaXplLm1hdGNoKC9cXGQrLylbMF07XG4gICAgICAgIGxldCBoYWxmU2l6ZSA9IChwYXJzZUludChuZXdTaXplKSAqIDEwKSAvIDI0O1xuICAgICAgICBsZXQgaGFsZk1hcmdpbiA9IDAgLSAoKHBhcnNlSW50KG5ld1NpemUpICogMjApIC8gMjQpO1xuICAgICAgICBzdGFyLm5hdGl2ZUVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoU3RhclJhdGluZ0NvbXBvbmVudC5WQVJfU0laRSwgdGhpcy5zaXplKTtcbiAgICAgICAgaWYgKHN0YXIubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoU3RhclJhdGluZ0NvbXBvbmVudC5DTFNfSEFMRl9TVEFSKSkge1xuICAgICAgICAgIHN0YXIubmF0aXZlRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShTdGFyUmF0aW5nQ29tcG9uZW50LlZBUl9IQUxGX1dJRFRILCBgJHtoYWxmU2l6ZX1weGApO1xuICAgICAgICAgIHN0YXIubmF0aXZlRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShTdGFyUmF0aW5nQ29tcG9uZW50LlZBUl9IQUxGX01BUkdJTiwgYCR7aGFsZk1hcmdpbn1weGApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFwcGx5Q29sb3JTdHlsZUFsbFN0YXJzKHNldENoZWNrZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLnN0YXJzLmZvckVhY2goKHN0YXI6IEVsZW1lbnRSZWYpID0+IHtcbiAgICAgIGlmIChzZXRDaGVja2VkKSB7XG4gICAgICAgIHRoaXMuYXBwbHlDaGVja2VkQ29sb3JTdHlsZShzdGFyLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hcHBseVVuQ2hlY2tlZENvbG9yU3R5bGUoc3Rhci5uYXRpdmVFbGVtZW50KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlDb2xvclN0eWxlKHN0YXJFbGVtZW50OiBIVE1MU3BhbkVsZW1lbnQpIHtcbiAgICB0aGlzLmFwcGx5Q2hlY2tlZENvbG9yU3R5bGUoc3RhckVsZW1lbnQpO1xuICAgIHRoaXMuYXBwbHlVbkNoZWNrZWRDb2xvclN0eWxlKHN0YXJFbGVtZW50KTtcbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlDaGVja2VkQ29sb3JTdHlsZShzdGFyRWxlbWVudDogSFRNTFNwYW5FbGVtZW50KSB7XG4gICAgc3RhckVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoU3RhclJhdGluZ0NvbXBvbmVudC5WQVJfQ0hFQ0tFRF9DT0xPUiwgdGhpcy5jaGVja2VkY29sb3IpO1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBseVVuQ2hlY2tlZENvbG9yU3R5bGUoc3RhckVsZW1lbnQ6IEhUTUxTcGFuRWxlbWVudCkge1xuICAgIHN0YXJFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFN0YXJSYXRpbmdDb21wb25lbnQuVkFSX1VOQ0hFQ0tFRF9DT0xPUiwgdGhpcy51bmNoZWNrZWRjb2xvcik7XG4gIH1cblxuICBwcml2YXRlIGdlbmVyYXRlUmF0aW5nKCkge1xuICAgIGlmICh0aGlzLnJlYWRvbmx5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhcnMoKTtcbiAgICBpZiAodGhpcy52YWx1ZSA+PSAwKSB7XG4gICAgICB0aGlzLm1haW5FbGVtZW50Lm5hdGl2ZUVsZW1lbnQudGl0bGUgPSB0aGlzLnZhbHVlO1xuXG4gICAgICBsZXQgaGFzRGVjaW1hbHM6IGJvb2xlYW4gPVxuICAgICAgICAoKE51bWJlci5wYXJzZUZsb2F0KHRoaXMudmFsdWUudG9TdHJpbmcoKSkgJSAxKVxuICAgICAgICAgIC50b1N0cmluZygpXG4gICAgICAgICAgLnN1YnN0cmluZygzLCAyKSkgPyB0cnVlIDogZmFsc2U7XG5cbiAgICAgIGxldCBpID0gMTtcbiAgICAgIHRoaXMuc3RhcnMuZm9yRWFjaCgoc3RhcjogRWxlbWVudFJlZikgPT4ge1xuICAgICAgICBzdGFyLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0ID0gW107XG4gICAgICAgIHRoaXMuYXBwbHlDb2xvclN0eWxlKHN0YXIubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIHRoaXMuYWRkRGVmYXVsdENsYXNzKHN0YXIubmF0aXZlRWxlbWVudCk7XG5cbiAgICAgICAgaWYgKHRoaXMudmFsdWUgPj0gaSkge1xuICAgICAgICAgIC8vIHN0YXIgb25cbiAgICAgICAgICB0aGlzLmFkZENoZWNrZWRTdGFyQ2xhc3Moc3Rhci5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBoYWxmIHN0YXJcbiAgICAgICAgICBpZiAoaGFzRGVjaW1hbHMpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkSGFsZlN0YXJDbGFzcyhzdGFyLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgICAgaGFzRGVjaW1hbHMgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaSsrO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=