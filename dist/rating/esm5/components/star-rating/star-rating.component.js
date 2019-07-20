/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
var StarRatingComponent = /** @class */ (function () {
    function StarRatingComponent() {
        var _this = this;
        this.stars = [];
        this._readOnly = false;
        this.rate = new EventEmitter();
        if (!this.onValueChange) {
            this.onValueChange = new Subject();
            this.onValueChange.subscribe((/**
             * @return {?}
             */
            function () {
                _this.generateRating();
                _this.applySizeAllStars();
            }));
        }
        if (!this.onCheckedColorChange) {
            this.onCheckedColorChange = new Subject();
            this.onCheckedColorChange.subscribe((/**
             * @return {?}
             */
            function () {
                _this.applyColorStyleAllStars(true);
            }));
        }
        if (!this.onUnCheckedColorChange) {
            this.onUnCheckedColorChange = new Subject();
            this.onUnCheckedColorChange.subscribe((/**
             * @return {?}
             */
            function () {
                _this.applyColorStyleAllStars(false);
            }));
        }
        if (!this.onSizeChange) {
            this.onSizeChange = new Subject();
            this.onSizeChange.subscribe((/**
             * @return {?}
             */
            function () {
                _this.applySizeAllStars();
            }));
        }
        if (!this.onReadOnlyChange) {
            this.onReadOnlyChange = new Subject();
            this.onReadOnlyChange.subscribe((/**
             * @return {?}
             */
            function () {
                _this.addRemoveEvents();
            }));
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
        this.stars.forEach((/**
         * @param {?} star
         * @return {?}
         */
        function (star) {
            star.nativeElement.addEventListener('click', _this.onRate.bind(_this));
            star.nativeElement.addEventListener('mouseenter', _this.onStar.bind(_this));
            star.nativeElement.style.cursor = "pointer";
            star.nativeElement.title = star.nativeElement.dataset.index;
        }));
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
        this.stars.forEach((/**
         * @param {?} star
         * @return {?}
         */
        function (star) {
            star.nativeElement.__zone_symbol__clickfalse = null;
            star.nativeElement.__zone_symbol__mouseenterfalse = null;
            star.nativeElement.style.cursor = "default";
            star.nativeElement.title = "";
        }));
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
    StarRatingComponent.prototype.onRate = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var star = (/** @type {?} */ (event.srcElement));
        /** @type {?} */
        var oldValue = this.value;
        this.value = parseInt(star.dataset.index);
        if (this.value == 0) {
            this.value = 1;
        }
        /** @type {?} */
        var rateValues = { oldValue: oldValue, newValue: this.value, starRating: this };
        this.rate.emit(rateValues);
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
            this.stars.forEach((/**
             * @param {?} star
             * @return {?}
             */
            function (star) {
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
            }));
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
        this.stars.forEach((/**
         * @param {?} star
         * @return {?}
         */
        function (star) {
            if (setChecked) {
                _this.applyCheckedColorStyle(star.nativeElement);
            }
            else {
                _this.applyUnCheckedColorStyle(star.nativeElement);
            }
        }));
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
            this.stars.forEach((/**
             * @param {?} star
             * @return {?}
             */
            function (star) {
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
            }));
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
    /** @nocollapse */
    StarRatingComponent.ctorParameters = function () { return []; };
    StarRatingComponent.propDecorators = {
        mainElement: [{ type: ViewChild, args: ['starMain', { static: true },] }],
        star1Element: [{ type: ViewChild, args: ['star1', { static: true },] }],
        star2Element: [{ type: ViewChild, args: ['star2', { static: true },] }],
        star3Element: [{ type: ViewChild, args: ['star3', { static: true },] }],
        star4Element: [{ type: ViewChild, args: ['star4', { static: true },] }],
        star5Element: [{ type: ViewChild, args: ['star5', { static: true },] }],
        rate: [{ type: Output }],
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
    /** @type {?} */
    StarRatingComponent.prototype.rate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rhci1yYXRpbmcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctc3RhcnJhdGluZy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc3Rhci1yYXRpbmcvc3Rhci1yYXRpbmcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUYsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUvQjtJQWlGRTtRQUFBLGlCQW9DQztRQXRFTyxVQUFLLEdBQXNCLEVBQUUsQ0FBQztRQUs5QixjQUFTLEdBQVksS0FBSyxDQUFDO1FBdUZ6QixTQUFJLEdBQTBGLElBQUksWUFBWSxFQUFFLENBQUM7UUF6RHpILElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUNuQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVM7OztZQUFDO2dCQUMzQixLQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3RCLEtBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQzNCLENBQUMsRUFBQyxDQUFDO1NBQ0o7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFO1lBQzlCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQzFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTOzs7WUFBQztnQkFDbEMsS0FBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JDLENBQUMsRUFBQyxDQUFDO1NBQ0o7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFO1lBQ2hDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLE9BQU8s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Q0FBbUM7Ozs7O0lBRW5DLDRDQUF1Qzs7Ozs7SUFDdkMsbURBQThDOzs7OztJQUM5QyxxREFBZ0Q7Ozs7O0lBQ2hELDJDQUFzQzs7Ozs7SUFDdEMsK0NBQTJDOzs7OztJQWdCM0MsMENBQXlFOzs7OztJQUN6RSwyQ0FBdUU7Ozs7O0lBQ3ZFLDJDQUF1RTs7Ozs7SUFDdkUsMkNBQXVFOzs7OztJQUN2RSwyQ0FBdUU7Ozs7O0lBQ3ZFLDJDQUF1RTs7SUE0RHZFLG1DQUEySCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc3Rhci1yYXRpbmcnLFxuICB0ZW1wbGF0ZTogYFxuICA8ZGl2ICNzdGFyTWFpbj5cbiAgICA8c3BhbiBkYXRhLWluZGV4PVwiMVwiIHRpdGxlPVwiMVwiICNzdGFyMT48L3NwYW4+XG4gICAgPHNwYW4gZGF0YS1pbmRleD1cIjJcIiB0aXRsZT1cIjJcIiAjc3RhcjI+PC9zcGFuPlxuICAgIDxzcGFuIGRhdGEtaW5kZXg9XCIzXCIgdGl0bGU9XCIzXCIgI3N0YXIzPjwvc3Bhbj5cbiAgICA8c3BhbiBkYXRhLWluZGV4PVwiNFwiIHRpdGxlPVwiNFwiICNzdGFyND48L3NwYW4+XG4gICAgPHNwYW4gZGF0YS1pbmRleD1cIjVcIiB0aXRsZT1cIjVcIiAjc3RhcjU+PC9zcGFuPlxuICA8L2Rpdj5cbiAgPHN0eWxlPlxuICAgIDpyb290IHtcbiAgICAgIC0tY2hlY2tlZENvbG9yOiBnb2xkO1xuICAgICAgLS11bkNoZWNrZWRDb2xvcjogZ3JheTtcbiAgICAgIC0tc2l6ZTogMjRweDtcbiAgICAgIC0taGFsZldpZHRoOiAxMHB4O1xuICAgICAgLS1oYWxmTWFyZ2luOiAtMjBweDtcbiAgICB9ICBcbiAgICAuc3RhciB7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICBjb2xvcjogdmFyKC0tdW5DaGVja2VkQ29sb3IpO1xuICAgICAgZm9udC1zaXplOiB2YXIoLS1zaXplKTtcbiAgICAgIHdpZHRoOiB2YXIoLS1zaXplKTtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICB9XG4gICAgLnN0YXI6bGFzdC1jaGlsZCB7XG4gICAgICBtYXJnaW4tcmlnaHQ6IDA7XG4gICAgfVxuICAgIC5zdGFyOmJlZm9yZSB7XG4gICAgICBjb250ZW50OidcXFxcMjYwNSc7XG4gICAgfVxuICAgIC5zdGFyLm9uIHtcbiAgICAgIGNvbG9yOiB2YXIoLS1jaGVja2VkQ29sb3IpO1xuICAgIH1cbiAgICAuc3Rhci5oYWxmOmFmdGVyIHtcbiAgICAgIGNvbnRlbnQ6J1xcXFwyNjA1JztcbiAgICAgIGNvbG9yOiB2YXIoLS1jaGVja2VkQ29sb3IpO1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgbWFyZ2luLWxlZnQ6IHZhcigtLWhhbGZNYXJnaW4pO1xuICAgICAgd2lkdGg6IHZhcigtLWhhbGZXaWR0aCk7XG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIH1cbiAgPC9zdHlsZT5cbiAgIGBcbn0pXG5cbmV4cG9ydCBjbGFzcyBTdGFyUmF0aW5nQ29tcG9uZW50IHtcbiAgcHJpdmF0ZSBzdGFyczogQXJyYXk8RWxlbWVudFJlZj4gPSBbXTtcbiAgcHJpdmF0ZSBfY2hlY2tlZENvbG9yOiBzdHJpbmc7XG4gIHByaXZhdGUgX3VuQ2hlY2tlZENvbG9yOiBzdHJpbmc7XG4gIHByaXZhdGUgX3ZhbHVlOiBudW1iZXI7XG4gIHByaXZhdGUgX3NpemU6IHN0cmluZztcbiAgcHJpdmF0ZSBfcmVhZE9ubHk6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwcml2YXRlIG9uVmFsdWVDaGFuZ2U6IFN1YmplY3Q8bnVtYmVyPjtcbiAgcHJpdmF0ZSBvbkNoZWNrZWRDb2xvckNoYW5nZTogU3ViamVjdDxzdHJpbmc+O1xuICBwcml2YXRlIG9uVW5DaGVja2VkQ29sb3JDaGFuZ2U6IFN1YmplY3Q8c3RyaW5nPjtcbiAgcHJpdmF0ZSBvblNpemVDaGFuZ2U6IFN1YmplY3Q8c3RyaW5nPjtcbiAgcHJpdmF0ZSBvblJlYWRPbmx5Q2hhbmdlOiBTdWJqZWN0PGJvb2xlYW4+O1xuXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFZBUl9DSEVDS0VEX0NPTE9SOiBzdHJpbmcgPSAnLS1jaGVja2VkQ29sb3InO1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBWQVJfVU5DSEVDS0VEX0NPTE9SOiBzdHJpbmcgPSAnLS11bkNoZWNrZWRDb2xvcic7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFZBUl9TSVpFOiBzdHJpbmcgPSAnLS1zaXplJztcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgVkFSX0hBTEZfV0lEVEg6IHN0cmluZyA9ICctLWhhbGZXaWR0aCc7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFZBUl9IQUxGX01BUkdJTjogc3RyaW5nID0gJy0taGFsZk1hcmdpbic7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IENMU19DSEVDS0VEX1NUQVI6IHN0cmluZyA9ICdvbic7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IENMU19ERUZBVUxUX1NUQVI6IHN0cmluZyA9ICdzdGFyJztcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgQ0xTX0hBTEZfU1RBUjogc3RyaW5nID0gJ2hhbGYnO1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBJTlBfQ0hFQ0tFRF9DT0xPUjogc3RyaW5nID0gJ2NoZWNrZWRjb2xvcic7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IElOUF9VTkNIRUNLRURfQ09MT1I6IHN0cmluZyA9ICd1bmNoZWNrZWRjb2xvcic7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IElOUF9WQUxVRTogc3RyaW5nID0gJ3ZhbHVlJztcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSU5QX1NJWkU6IHN0cmluZyA9ICdzaXplJztcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSU5QX1JFQURPTkxZOiBzdHJpbmcgPSAncmVhZG9ubHknO1xuXG4gIEBWaWV3Q2hpbGQoJ3N0YXJNYWluJywgeyBzdGF0aWM6IHRydWUgfSkgcHJpdmF0ZSBtYWluRWxlbWVudDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnc3RhcjEnLCB7IHN0YXRpYzogdHJ1ZSB9KSBwcml2YXRlIHN0YXIxRWxlbWVudDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnc3RhcjInLCB7IHN0YXRpYzogdHJ1ZSB9KSBwcml2YXRlIHN0YXIyRWxlbWVudDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnc3RhcjMnLCB7IHN0YXRpYzogdHJ1ZSB9KSBwcml2YXRlIHN0YXIzRWxlbWVudDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnc3RhcjQnLCB7IHN0YXRpYzogdHJ1ZSB9KSBwcml2YXRlIHN0YXI0RWxlbWVudDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnc3RhcjUnLCB7IHN0YXRpYzogdHJ1ZSB9KSBwcml2YXRlIHN0YXI1RWxlbWVudDogRWxlbWVudFJlZjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBpZiAoIXRoaXMub25WYWx1ZUNoYW5nZSkge1xuICAgICAgdGhpcy5vblZhbHVlQ2hhbmdlID0gbmV3IFN1YmplY3QoKTtcbiAgICAgIHRoaXMub25WYWx1ZUNoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmdlbmVyYXRlUmF0aW5nKCk7XG4gICAgICAgIHRoaXMuYXBwbHlTaXplQWxsU3RhcnMoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5vbkNoZWNrZWRDb2xvckNoYW5nZSkge1xuICAgICAgdGhpcy5vbkNoZWNrZWRDb2xvckNoYW5nZSA9IG5ldyBTdWJqZWN0KCk7XG4gICAgICB0aGlzLm9uQ2hlY2tlZENvbG9yQ2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuYXBwbHlDb2xvclN0eWxlQWxsU3RhcnModHJ1ZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMub25VbkNoZWNrZWRDb2xvckNoYW5nZSkge1xuICAgICAgdGhpcy5vblVuQ2hlY2tlZENvbG9yQ2hhbmdlID0gbmV3IFN1YmplY3QoKTtcbiAgICAgIHRoaXMub25VbkNoZWNrZWRDb2xvckNoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmFwcGx5Q29sb3JTdHlsZUFsbFN0YXJzKGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5vblNpemVDaGFuZ2UpIHtcbiAgICAgIHRoaXMub25TaXplQ2hhbmdlID0gbmV3IFN1YmplY3QoKTtcbiAgICAgIHRoaXMub25TaXplQ2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuYXBwbHlTaXplQWxsU3RhcnMoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5vblJlYWRPbmx5Q2hhbmdlKSB7XG4gICAgICB0aGlzLm9uUmVhZE9ubHlDaGFuZ2UgPSBuZXcgU3ViamVjdCgpO1xuICAgICAgdGhpcy5vblJlYWRPbmx5Q2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuYWRkUmVtb3ZlRXZlbnRzKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBnZXQgY2hlY2tlZGNvbG9yKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2NoZWNrZWRDb2xvcjtcbiAgfVxuXG4gIGdldCB1bmNoZWNrZWRjb2xvcigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl91bkNoZWNrZWRDb2xvcjtcbiAgfVxuXG4gIGdldCB2YWx1ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIGdldCBzaXplKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3NpemUuY29uY2F0KCghdGhpcy5fc2l6ZS5pbmNsdWRlcyhcInB4XCIpID8gXCJweFwiIDogXCJcIikpO1xuICB9XG5cbiAgZ2V0IHJlYWRvbmx5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBTdHJpbmcodGhpcy5fcmVhZE9ubHkpID09PSBcInRydWVcIjtcbiAgfVxuXG4gIEBPdXRwdXQoKSByYXRlOiBFdmVudEVtaXR0ZXI8eyBvbGRWYWx1ZTogbnVtYmVyLCBuZXdWYWx1ZTogbnVtYmVyLCBzdGFyUmF0aW5nOiBTdGFyUmF0aW5nQ29tcG9uZW50IH0+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBJbnB1dChTdGFyUmF0aW5nQ29tcG9uZW50LklOUF9DSEVDS0VEX0NPTE9SKSBzZXQgY2hlY2tlZGNvbG9yKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9jaGVja2VkQ29sb3IgPSB2YWx1ZTtcbiAgICBpZiAodGhpcy5fY2hlY2tlZENvbG9yKSB7XG4gICAgICB0aGlzLm9uQ2hlY2tlZENvbG9yQ2hhbmdlLm5leHQodGhpcy5fY2hlY2tlZENvbG9yKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoU3RhclJhdGluZ0NvbXBvbmVudC5JTlBfVU5DSEVDS0VEX0NPTE9SKSBzZXQgdW5jaGVja2VkY29sb3IodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX3VuQ2hlY2tlZENvbG9yID0gdmFsdWU7XG4gICAgaWYgKHRoaXMuX3VuQ2hlY2tlZENvbG9yKSB7XG4gICAgICB0aGlzLm9uVW5DaGVja2VkQ29sb3JDaGFuZ2UubmV4dCh0aGlzLl91bkNoZWNrZWRDb2xvcik7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KFN0YXJSYXRpbmdDb21wb25lbnQuSU5QX1ZBTFVFKSBzZXQgdmFsdWUodmFsdWU6IG51bWJlcikge1xuICAgIGlmICghdmFsdWUgfHwgdmFsdWUgPT0gbnVsbCkge1xuICAgICAgdmFsdWUgPSAwO1xuICAgIH1cblxuICAgIGlmICh2YWx1ZSA+IDUpIHtcbiAgICAgIHZhbHVlID0gNTtcbiAgICB9XG5cbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuXG4gICAgaWYgKHRoaXMuX3ZhbHVlID49IDApIHtcbiAgICAgIHRoaXMub25WYWx1ZUNoYW5nZS5uZXh0KHRoaXMuX3ZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoU3RhclJhdGluZ0NvbXBvbmVudC5JTlBfU0laRSkgc2V0IHNpemUodmFsdWU6IHN0cmluZykge1xuICAgIGlmICghdmFsdWUgfHwgdmFsdWUgPT0gbnVsbCB8fCB2YWx1ZSA9PSBcIjBweFwiKSB7XG4gICAgICB2YWx1ZSA9IFwiMjRweFwiO1xuICAgIH1cbiAgICB0aGlzLl9zaXplID0gdmFsdWU7XG4gICAgdGhpcy5vblNpemVDaGFuZ2UubmV4dCh0aGlzLl9zaXplKTtcbiAgfVxuXG4gIEBJbnB1dChTdGFyUmF0aW5nQ29tcG9uZW50LklOUF9SRUFET05MWSkgc2V0IHJlYWRvbmx5KHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fcmVhZE9ubHkgPSB2YWx1ZTtcbiAgICB0aGlzLm9uUmVhZE9ubHlDaGFuZ2UubmV4dCh2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIG1ha2VFZGl0YWJsZSgpIHtcbiAgICB0aGlzLm1haW5FbGVtZW50Lm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMub2ZmU3Rhci5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLm1haW5FbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XG4gICAgdGhpcy5tYWluRWxlbWVudC5uYXRpdmVFbGVtZW50LnRpdGxlID0gdGhpcy52YWx1ZTtcbiAgICB0aGlzLnN0YXJzLmZvckVhY2goKHN0YXI6IEVsZW1lbnRSZWYpID0+IHtcbiAgICAgIHN0YXIubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25SYXRlLmJpbmQodGhpcykpO1xuICAgICAgc3Rhci5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0aGlzLm9uU3Rhci5iaW5kKHRoaXMpKTtcbiAgICAgIHN0YXIubmF0aXZlRWxlbWVudC5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcbiAgICAgIHN0YXIubmF0aXZlRWxlbWVudC50aXRsZSA9IHN0YXIubmF0aXZlRWxlbWVudC5kYXRhc2V0LmluZGV4O1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBtYWtlUmVhZE9ubHkoKSB7XG4gICAgdGhpcy5tYWluRWxlbWVudC5uYXRpdmVFbGVtZW50Ll9fem9uZV9zeW1ib2xfX21vdXNlbGVhdmVmYWxzZSA9IG51bGw7XG4gICAgdGhpcy5tYWluRWxlbWVudC5uYXRpdmVFbGVtZW50LnN0eWxlLmN1cnNvciA9IFwiZGVmYXVsdFwiO1xuICAgIHRoaXMubWFpbkVsZW1lbnQubmF0aXZlRWxlbWVudC50aXRsZSA9IHRoaXMudmFsdWU7XG4gICAgdGhpcy5zdGFycy5mb3JFYWNoKChzdGFyOiBFbGVtZW50UmVmKSA9PiB7XG4gICAgICBzdGFyLm5hdGl2ZUVsZW1lbnQuX196b25lX3N5bWJvbF9fY2xpY2tmYWxzZSA9IG51bGw7XG4gICAgICBzdGFyLm5hdGl2ZUVsZW1lbnQuX196b25lX3N5bWJvbF9fbW91c2VlbnRlcmZhbHNlID0gbnVsbDtcbiAgICAgIHN0YXIubmF0aXZlRWxlbWVudC5zdHlsZS5jdXJzb3IgPSBcImRlZmF1bHRcIjtcbiAgICAgIHN0YXIubmF0aXZlRWxlbWVudC50aXRsZSA9IFwiXCI7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFkZFJlbW92ZUV2ZW50cygpIHtcbiAgICBpZiAodGhpcy5yZWFkb25seSkge1xuICAgICAgdGhpcy5tYWtlUmVhZE9ubHkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tYWtlRWRpdGFibGUoKTtcbiAgICAgIHRoaXMub25WYWx1ZUNoYW5nZS5uZXh0KHRoaXMudmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbmdBZnRlclZpZXdJbml0KCkge1xuICB9XG5cbiAgcHJpdmF0ZSBvblJhdGUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBsZXQgc3RhcjogSFRNTEVsZW1lbnQgPSA8SFRNTEVsZW1lbnQ+ZXZlbnQuc3JjRWxlbWVudDtcbiAgICBsZXQgb2xkVmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgIHRoaXMudmFsdWUgPSBwYXJzZUludChzdGFyLmRhdGFzZXQuaW5kZXgpO1xuICAgIGlmICh0aGlzLnZhbHVlID09IDApIHtcbiAgICAgIHRoaXMudmFsdWUgPSAxO1xuICAgIH1cbiAgICBsZXQgcmF0ZVZhbHVlcyA9IHsgb2xkVmFsdWU6IG9sZFZhbHVlLCBuZXdWYWx1ZTogdGhpcy52YWx1ZSwgc3RhclJhdGluZzogdGhpcyB9O1xuICAgIHRoaXMucmF0ZS5lbWl0KHJhdGVWYWx1ZXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBvblN0YXIoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBsZXQgc3RhcjogSFRNTEVsZW1lbnQgPSA8SFRNTEVsZW1lbnQ+ZXZlbnQuc3JjRWxlbWVudDtcbiAgICBsZXQgY3VycmVudEluZGV4ID0gcGFyc2VJbnQoc3Rhci5kYXRhc2V0LmluZGV4KTtcblxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBjdXJyZW50SW5kZXg7IGluZGV4KyspIHtcbiAgICAgIHRoaXMuc3RhcnNbaW5kZXhdLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0ID0gW107XG4gICAgICB0aGlzLmFkZERlZmF1bHRDbGFzcyh0aGlzLnN0YXJzW2luZGV4XS5uYXRpdmVFbGVtZW50KTtcbiAgICAgIHRoaXMuYWRkQ2hlY2tlZFN0YXJDbGFzcyh0aGlzLnN0YXJzW2luZGV4XS5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpbmRleCA9IGN1cnJlbnRJbmRleDsgaW5kZXggPCB0aGlzLnN0YXJzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgdGhpcy5zdGFyc1tpbmRleF0ubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QgPSBbXTtcbiAgICAgIHRoaXMuYWRkRGVmYXVsdENsYXNzKHRoaXMuc3RhcnNbaW5kZXhdLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb2ZmU3RhcihldmVudDogTW91c2VFdmVudCkge1xuICAgIHRoaXMuZ2VuZXJhdGVSYXRpbmcoKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkRGVmYXVsdENsYXNzKHN0YXI6IEhUTUxTcGFuRWxlbWVudCkge1xuICAgIHN0YXIuY2xhc3NMaXN0LmFkZChTdGFyUmF0aW5nQ29tcG9uZW50LkNMU19ERUZBVUxUX1NUQVIpO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRDaGVja2VkU3RhckNsYXNzKHN0YXI6IEhUTUxTcGFuRWxlbWVudCkge1xuICAgIHN0YXIuY2xhc3NMaXN0LmFkZChTdGFyUmF0aW5nQ29tcG9uZW50LkNMU19DSEVDS0VEX1NUQVIpO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRIYWxmU3RhckNsYXNzKHN0YXI6IEhUTUxTcGFuRWxlbWVudCkge1xuICAgIHN0YXIuY2xhc3NMaXN0LmFkZChTdGFyUmF0aW5nQ29tcG9uZW50LkNMU19IQUxGX1NUQVIpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRTdGFycygpIHtcbiAgICBpZiAodGhpcy5zdGFycy5sZW5ndGggPT0gMCkge1xuICAgICAgdGhpcy5zdGFycy5wdXNoKHRoaXMuc3RhcjFFbGVtZW50KTtcbiAgICAgIHRoaXMuc3RhcnMucHVzaCh0aGlzLnN0YXIyRWxlbWVudCk7XG4gICAgICB0aGlzLnN0YXJzLnB1c2godGhpcy5zdGFyM0VsZW1lbnQpO1xuICAgICAgdGhpcy5zdGFycy5wdXNoKHRoaXMuc3RhcjRFbGVtZW50KTtcbiAgICAgIHRoaXMuc3RhcnMucHVzaCh0aGlzLnN0YXI1RWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhcHBseVNpemVBbGxTdGFycygpIHtcbiAgICBpZiAodGhpcy5fc2l6ZSkge1xuICAgICAgdGhpcy5zdGFycy5mb3JFYWNoKChzdGFyOiBFbGVtZW50UmVmKSA9PiB7XG4gICAgICAgIGxldCBuZXdTaXplID0gdGhpcy5zaXplLm1hdGNoKC9cXGQrLylbMF07XG4gICAgICAgIGxldCBoYWxmU2l6ZSA9IChwYXJzZUludChuZXdTaXplKSAqIDEwKSAvIDI0O1xuICAgICAgICBsZXQgaGFsZk1hcmdpbiA9IDAgLSAoKHBhcnNlSW50KG5ld1NpemUpICogMjApIC8gMjQpO1xuICAgICAgICBzdGFyLm5hdGl2ZUVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoU3RhclJhdGluZ0NvbXBvbmVudC5WQVJfU0laRSwgdGhpcy5zaXplKTtcbiAgICAgICAgaWYgKHN0YXIubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoU3RhclJhdGluZ0NvbXBvbmVudC5DTFNfSEFMRl9TVEFSKSkge1xuICAgICAgICAgIHN0YXIubmF0aXZlRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShTdGFyUmF0aW5nQ29tcG9uZW50LlZBUl9IQUxGX1dJRFRILCBgJHtoYWxmU2l6ZX1weGApO1xuICAgICAgICAgIHN0YXIubmF0aXZlRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShTdGFyUmF0aW5nQ29tcG9uZW50LlZBUl9IQUxGX01BUkdJTiwgYCR7aGFsZk1hcmdpbn1weGApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFwcGx5Q29sb3JTdHlsZUFsbFN0YXJzKHNldENoZWNrZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLnN0YXJzLmZvckVhY2goKHN0YXI6IEVsZW1lbnRSZWYpID0+IHtcbiAgICAgIGlmIChzZXRDaGVja2VkKSB7XG4gICAgICAgIHRoaXMuYXBwbHlDaGVja2VkQ29sb3JTdHlsZShzdGFyLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hcHBseVVuQ2hlY2tlZENvbG9yU3R5bGUoc3Rhci5uYXRpdmVFbGVtZW50KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlDb2xvclN0eWxlKHN0YXJFbGVtZW50OiBIVE1MU3BhbkVsZW1lbnQpIHtcbiAgICB0aGlzLmFwcGx5Q2hlY2tlZENvbG9yU3R5bGUoc3RhckVsZW1lbnQpO1xuICAgIHRoaXMuYXBwbHlVbkNoZWNrZWRDb2xvclN0eWxlKHN0YXJFbGVtZW50KTtcbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlDaGVja2VkQ29sb3JTdHlsZShzdGFyRWxlbWVudDogSFRNTFNwYW5FbGVtZW50KSB7XG4gICAgc3RhckVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoU3RhclJhdGluZ0NvbXBvbmVudC5WQVJfQ0hFQ0tFRF9DT0xPUiwgdGhpcy5jaGVja2VkY29sb3IpO1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBseVVuQ2hlY2tlZENvbG9yU3R5bGUoc3RhckVsZW1lbnQ6IEhUTUxTcGFuRWxlbWVudCkge1xuICAgIHN0YXJFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFN0YXJSYXRpbmdDb21wb25lbnQuVkFSX1VOQ0hFQ0tFRF9DT0xPUiwgdGhpcy51bmNoZWNrZWRjb2xvcik7XG4gIH1cblxuICBwcml2YXRlIGdlbmVyYXRlUmF0aW5nKCkge1xuICAgIGlmICh0aGlzLnJlYWRvbmx5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhcnMoKTtcbiAgICBpZiAodGhpcy52YWx1ZSA+PSAwKSB7XG4gICAgICB0aGlzLm1haW5FbGVtZW50Lm5hdGl2ZUVsZW1lbnQudGl0bGUgPSB0aGlzLnZhbHVlO1xuXG4gICAgICBsZXQgaGFzRGVjaW1hbHM6IGJvb2xlYW4gPVxuICAgICAgICAoKE51bWJlci5wYXJzZUZsb2F0KHRoaXMudmFsdWUudG9TdHJpbmcoKSkgJSAxKVxuICAgICAgICAgIC50b1N0cmluZygpXG4gICAgICAgICAgLnN1YnN0cmluZygzLCAyKSkgPyB0cnVlIDogZmFsc2U7XG5cbiAgICAgIGxldCBpID0gMTtcbiAgICAgIHRoaXMuc3RhcnMuZm9yRWFjaCgoc3RhcjogRWxlbWVudFJlZikgPT4ge1xuICAgICAgICBzdGFyLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0ID0gW107XG4gICAgICAgIHRoaXMuYXBwbHlDb2xvclN0eWxlKHN0YXIubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIHRoaXMuYWRkRGVmYXVsdENsYXNzKHN0YXIubmF0aXZlRWxlbWVudCk7XG5cbiAgICAgICAgaWYgKHRoaXMudmFsdWUgPj0gaSkge1xuICAgICAgICAgIC8vIHN0YXIgb25cbiAgICAgICAgICB0aGlzLmFkZENoZWNrZWRTdGFyQ2xhc3Moc3Rhci5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBoYWxmIHN0YXJcbiAgICAgICAgICBpZiAoaGFzRGVjaW1hbHMpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkSGFsZlN0YXJDbGFzcyhzdGFyLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgICAgaGFzRGVjaW1hbHMgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaSsrO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=