/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            star.nativeElement.addEventListener('click', _this.onRate.bind(_this));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rhci1yYXRpbmcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctc3RhcnJhdGluZy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc3Rhci1yYXRpbmcvc3Rhci1yYXRpbmcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUYsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUvQjtJQWlGRTtRQUFBLGlCQW9DQztRQXRFTyxVQUFLLEdBQXNCLEVBQUUsQ0FBQztRQUs5QixjQUFTLEdBQVksS0FBSyxDQUFDO1FBdUZ6QixTQUFJLEdBQXFGLElBQUksWUFBWSxFQUFFLENBQUM7UUF6RHBILElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUNuQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQztnQkFDM0IsS0FBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN0QixLQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUMzQixDQUFDLENBQUMsQ0FBQztTQUNKO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtZQUM5QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUMxQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsU0FBUyxDQUFDO2dCQUNsQyxLQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckMsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUU7WUFDaEMsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksT0FBTyxFQUFF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c0giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3N0YXItcmF0aW5nJyxcbiAgdGVtcGxhdGU6IGBcbiAgPGRpdiAjc3Rhck1haW4+XG4gICAgPHNwYW4gZGF0YS1pbmRleD1cIjFcIiB0aXRsZT1cIjFcIiAjc3RhcjE+PC9zcGFuPlxuICAgIDxzcGFuIGRhdGEtaW5kZXg9XCIyXCIgdGl0bGU9XCIyXCIgI3N0YXIyPjwvc3Bhbj5cbiAgICA8c3BhbiBkYXRhLWluZGV4PVwiM1wiIHRpdGxlPVwiM1wiICNzdGFyMz48L3NwYW4+XG4gICAgPHNwYW4gZGF0YS1pbmRleD1cIjRcIiB0aXRsZT1cIjRcIiAjc3RhcjQ+PC9zcGFuPlxuICAgIDxzcGFuIGRhdGEtaW5kZXg9XCI1XCIgdGl0bGU9XCI1XCIgI3N0YXI1Pjwvc3Bhbj5cbiAgPC9kaXY+XG4gIDxzdHlsZT5cbiAgICA6cm9vdCB7XG4gICAgICAtLWNoZWNrZWRDb2xvcjogZ29sZDtcbiAgICAgIC0tdW5DaGVja2VkQ29sb3I6IGdyYXk7XG4gICAgICAtLXNpemU6IDI0cHg7XG4gICAgICAtLWhhbGZXaWR0aDogMTBweDtcbiAgICAgIC0taGFsZk1hcmdpbjogLTIwcHg7XG4gICAgfSAgXG4gICAgLnN0YXIge1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgY29sb3I6IHZhcigtLXVuQ2hlY2tlZENvbG9yKTtcbiAgICAgIGZvbnQtc2l6ZTogdmFyKC0tc2l6ZSk7XG4gICAgICB3aWR0aDogdmFyKC0tc2l6ZSk7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgfVxuICAgIC5zdGFyOmxhc3QtY2hpbGQge1xuICAgICAgbWFyZ2luLXJpZ2h0OiAwO1xuICAgIH1cbiAgICAuc3RhcjpiZWZvcmUge1xuICAgICAgY29udGVudDonXFxcXDI2MDUnO1xuICAgIH1cbiAgICAuc3Rhci5vbiB7XG4gICAgICBjb2xvcjogdmFyKC0tY2hlY2tlZENvbG9yKTtcbiAgICB9XG4gICAgLnN0YXIuaGFsZjphZnRlciB7XG4gICAgICBjb250ZW50OidcXFxcMjYwNSc7XG4gICAgICBjb2xvcjogdmFyKC0tY2hlY2tlZENvbG9yKTtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIG1hcmdpbi1sZWZ0OiB2YXIoLS1oYWxmTWFyZ2luKTtcbiAgICAgIHdpZHRoOiB2YXIoLS1oYWxmV2lkdGgpO1xuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB9XG4gIDwvc3R5bGU+XG4gICBgXG59KVxuXG5leHBvcnQgY2xhc3MgU3RhclJhdGluZ0NvbXBvbmVudCB7XG4gIHByaXZhdGUgc3RhcnM6IEFycmF5PEVsZW1lbnRSZWY+ID0gW107XG4gIHByaXZhdGUgX2NoZWNrZWRDb2xvcjogc3RyaW5nO1xuICBwcml2YXRlIF91bkNoZWNrZWRDb2xvcjogc3RyaW5nO1xuICBwcml2YXRlIF92YWx1ZTogbnVtYmVyO1xuICBwcml2YXRlIF9zaXplOiBzdHJpbmc7XG4gIHByaXZhdGUgX3JlYWRPbmx5OiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBvblZhbHVlQ2hhbmdlOiBTdWJqZWN0PG51bWJlcj47XG4gIHByaXZhdGUgb25DaGVja2VkQ29sb3JDaGFuZ2U6IFN1YmplY3Q8c3RyaW5nPjtcbiAgcHJpdmF0ZSBvblVuQ2hlY2tlZENvbG9yQ2hhbmdlOiBTdWJqZWN0PHN0cmluZz47XG4gIHByaXZhdGUgb25TaXplQ2hhbmdlOiBTdWJqZWN0PHN0cmluZz47XG4gIHByaXZhdGUgb25SZWFkT25seUNoYW5nZTogU3ViamVjdDxib29sZWFuPjtcblxuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBWQVJfQ0hFQ0tFRF9DT0xPUjogc3RyaW5nID0gJy0tY2hlY2tlZENvbG9yJztcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgVkFSX1VOQ0hFQ0tFRF9DT0xPUjogc3RyaW5nID0gJy0tdW5DaGVja2VkQ29sb3InO1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBWQVJfU0laRTogc3RyaW5nID0gJy0tc2l6ZSc7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFZBUl9IQUxGX1dJRFRIOiBzdHJpbmcgPSAnLS1oYWxmV2lkdGgnO1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBWQVJfSEFMRl9NQVJHSU46IHN0cmluZyA9ICctLWhhbGZNYXJnaW4nO1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBDTFNfQ0hFQ0tFRF9TVEFSOiBzdHJpbmcgPSAnb24nO1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBDTFNfREVGQVVMVF9TVEFSOiBzdHJpbmcgPSAnc3Rhcic7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IENMU19IQUxGX1NUQVI6IHN0cmluZyA9ICdoYWxmJztcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSU5QX0NIRUNLRURfQ09MT1I6IHN0cmluZyA9ICdjaGVja2VkY29sb3InO1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBJTlBfVU5DSEVDS0VEX0NPTE9SOiBzdHJpbmcgPSAndW5jaGVja2VkY29sb3InO1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBJTlBfVkFMVUU6IHN0cmluZyA9ICd2YWx1ZSc7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IElOUF9TSVpFOiBzdHJpbmcgPSAnc2l6ZSc7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IElOUF9SRUFET05MWTogc3RyaW5nID0gJ3JlYWRvbmx5JztcblxuICBAVmlld0NoaWxkKCdzdGFyTWFpbicpIHByaXZhdGUgbWFpbkVsZW1lbnQ6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ3N0YXIxJykgcHJpdmF0ZSBzdGFyMUVsZW1lbnQ6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ3N0YXIyJykgcHJpdmF0ZSBzdGFyMkVsZW1lbnQ6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ3N0YXIzJykgcHJpdmF0ZSBzdGFyM0VsZW1lbnQ6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ3N0YXI0JykgcHJpdmF0ZSBzdGFyNEVsZW1lbnQ6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ3N0YXI1JykgcHJpdmF0ZSBzdGFyNUVsZW1lbnQ6IEVsZW1lbnRSZWY7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgaWYgKCF0aGlzLm9uVmFsdWVDaGFuZ2UpIHtcbiAgICAgIHRoaXMub25WYWx1ZUNoYW5nZSA9IG5ldyBTdWJqZWN0KCk7XG4gICAgICB0aGlzLm9uVmFsdWVDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZVJhdGluZygpO1xuICAgICAgICB0aGlzLmFwcGx5U2l6ZUFsbFN0YXJzKCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMub25DaGVja2VkQ29sb3JDaGFuZ2UpIHtcbiAgICAgIHRoaXMub25DaGVja2VkQ29sb3JDaGFuZ2UgPSBuZXcgU3ViamVjdCgpO1xuICAgICAgdGhpcy5vbkNoZWNrZWRDb2xvckNoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmFwcGx5Q29sb3JTdHlsZUFsbFN0YXJzKHRydWUpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLm9uVW5DaGVja2VkQ29sb3JDaGFuZ2UpIHtcbiAgICAgIHRoaXMub25VbkNoZWNrZWRDb2xvckNoYW5nZSA9IG5ldyBTdWJqZWN0KCk7XG4gICAgICB0aGlzLm9uVW5DaGVja2VkQ29sb3JDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5hcHBseUNvbG9yU3R5bGVBbGxTdGFycyhmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMub25TaXplQ2hhbmdlKSB7XG4gICAgICB0aGlzLm9uU2l6ZUNoYW5nZSA9IG5ldyBTdWJqZWN0KCk7XG4gICAgICB0aGlzLm9uU2l6ZUNoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmFwcGx5U2l6ZUFsbFN0YXJzKCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMub25SZWFkT25seUNoYW5nZSkge1xuICAgICAgdGhpcy5vblJlYWRPbmx5Q2hhbmdlID0gbmV3IFN1YmplY3QoKTtcbiAgICAgIHRoaXMub25SZWFkT25seUNoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmFkZFJlbW92ZUV2ZW50cygpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGNoZWNrZWRjb2xvcigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9jaGVja2VkQ29sb3I7XG4gIH1cblxuICBnZXQgdW5jaGVja2VkY29sb3IoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fdW5DaGVja2VkQ29sb3I7XG4gIH1cblxuICBnZXQgdmFsdWUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICBnZXQgc2l6ZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9zaXplLmNvbmNhdCgoIXRoaXMuX3NpemUuaW5jbHVkZXMoXCJweFwiKSA/IFwicHhcIiA6IFwiXCIpKTtcbiAgfVxuXG4gIGdldCByZWFkb25seSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gU3RyaW5nKHRoaXMuX3JlYWRPbmx5KSA9PT0gXCJ0cnVlXCI7XG4gIH1cblxuICBAT3V0cHV0KCkgcmF0ZTogRXZlbnRFbWl0dGVyPHtvbGRWYWx1ZTpudW1iZXIsIG5ld1ZhbHVlOm51bWJlciwgc3RhclJhdGluZzpTdGFyUmF0aW5nQ29tcG9uZW50fT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQElucHV0KFN0YXJSYXRpbmdDb21wb25lbnQuSU5QX0NIRUNLRURfQ09MT1IpIHNldCBjaGVja2VkY29sb3IodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX2NoZWNrZWRDb2xvciA9IHZhbHVlO1xuICAgIGlmICh0aGlzLl9jaGVja2VkQ29sb3IpIHtcbiAgICAgIHRoaXMub25DaGVja2VkQ29sb3JDaGFuZ2UubmV4dCh0aGlzLl9jaGVja2VkQ29sb3IpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dChTdGFyUmF0aW5nQ29tcG9uZW50LklOUF9VTkNIRUNLRURfQ09MT1IpIHNldCB1bmNoZWNrZWRjb2xvcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fdW5DaGVja2VkQ29sb3IgPSB2YWx1ZTtcbiAgICBpZiAodGhpcy5fdW5DaGVja2VkQ29sb3IpIHtcbiAgICAgIHRoaXMub25VbkNoZWNrZWRDb2xvckNoYW5nZS5uZXh0KHRoaXMuX3VuQ2hlY2tlZENvbG9yKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoU3RhclJhdGluZ0NvbXBvbmVudC5JTlBfVkFMVUUpIHNldCB2YWx1ZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKCF2YWx1ZSB8fCB2YWx1ZSA9PSBudWxsKSB7XG4gICAgICB2YWx1ZSA9IDA7XG4gICAgfVxuXG4gICAgaWYgKHZhbHVlID4gNSkge1xuICAgICAgdmFsdWUgPSA1O1xuICAgIH1cblxuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG5cbiAgICBpZiAodGhpcy5fdmFsdWUgPj0gMCkge1xuICAgICAgdGhpcy5vblZhbHVlQ2hhbmdlLm5leHQodGhpcy5fdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dChTdGFyUmF0aW5nQ29tcG9uZW50LklOUF9TSVpFKSBzZXQgc2l6ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKCF2YWx1ZSB8fCB2YWx1ZSA9PSBudWxsIHx8IHZhbHVlID09IFwiMHB4XCIpIHtcbiAgICAgIHZhbHVlID0gXCIyNHB4XCI7XG4gICAgfVxuICAgIHRoaXMuX3NpemUgPSB2YWx1ZTtcbiAgICB0aGlzLm9uU2l6ZUNoYW5nZS5uZXh0KHRoaXMuX3NpemUpO1xuICB9XG5cbiAgQElucHV0KFN0YXJSYXRpbmdDb21wb25lbnQuSU5QX1JFQURPTkxZKSBzZXQgcmVhZG9ubHkodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9yZWFkT25seSA9IHZhbHVlO1xuICAgIHRoaXMub25SZWFkT25seUNoYW5nZS5uZXh0KHZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgbWFrZUVkaXRhYmxlKCkge1xuICAgIHRoaXMubWFpbkVsZW1lbnQubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5vZmZTdGFyLmJpbmQodGhpcykpO1xuICAgIHRoaXMubWFpbkVsZW1lbnQubmF0aXZlRWxlbWVudC5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcbiAgICB0aGlzLm1haW5FbGVtZW50Lm5hdGl2ZUVsZW1lbnQudGl0bGUgPSB0aGlzLnZhbHVlO1xuICAgIHRoaXMuc3RhcnMuZm9yRWFjaCgoc3RhcjogRWxlbWVudFJlZikgPT4ge1xuICAgICAgc3Rhci5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vblJhdGUuYmluZCh0aGlzKSk7XG4gICAgICBzdGFyLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMub25TdGFyLmJpbmQodGhpcykpO1xuICAgICAgc3Rhci5uYXRpdmVFbGVtZW50LnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xuICAgICAgc3Rhci5uYXRpdmVFbGVtZW50LnRpdGxlID0gc3Rhci5uYXRpdmVFbGVtZW50LmRhdGFzZXQuaW5kZXg7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIG1ha2VSZWFkT25seSgpIHtcbiAgICB0aGlzLm1haW5FbGVtZW50Lm5hdGl2ZUVsZW1lbnQuX196b25lX3N5bWJvbF9fbW91c2VsZWF2ZWZhbHNlID0gbnVsbDtcbiAgICB0aGlzLm1haW5FbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc3R5bGUuY3Vyc29yID0gXCJkZWZhdWx0XCI7XG4gICAgdGhpcy5tYWluRWxlbWVudC5uYXRpdmVFbGVtZW50LnRpdGxlID0gdGhpcy52YWx1ZTtcbiAgICB0aGlzLnN0YXJzLmZvckVhY2goKHN0YXI6IEVsZW1lbnRSZWYpID0+IHtcbiAgICAgIHN0YXIubmF0aXZlRWxlbWVudC5fX3pvbmVfc3ltYm9sX19jbGlja2ZhbHNlID0gbnVsbDtcbiAgICAgIHN0YXIubmF0aXZlRWxlbWVudC5fX3pvbmVfc3ltYm9sX19tb3VzZWVudGVyZmFsc2UgPSBudWxsO1xuICAgICAgc3Rhci5uYXRpdmVFbGVtZW50LnN0eWxlLmN1cnNvciA9IFwiZGVmYXVsdFwiO1xuICAgICAgc3Rhci5uYXRpdmVFbGVtZW50LnRpdGxlID0gXCJcIjtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkUmVtb3ZlRXZlbnRzKCkge1xuICAgIGlmICh0aGlzLnJlYWRvbmx5KSB7XG4gICAgICB0aGlzLm1ha2VSZWFkT25seSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1ha2VFZGl0YWJsZSgpO1xuICAgICAgdGhpcy5vblZhbHVlQ2hhbmdlLm5leHQodGhpcy52YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBuZ0FmdGVyVmlld0luaXQoKSB7XG4gIH1cblxuICBwcml2YXRlIG9uUmF0ZShldmVudDogTW91c2VFdmVudCkge1xuICAgIGxldCBzdGFyOiBIVE1MRWxlbWVudCA9IDxIVE1MRWxlbWVudD5ldmVudC5zcmNFbGVtZW50O1xuICAgIGxldCBvbGRWYWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgdGhpcy52YWx1ZSA9IHBhcnNlSW50KHN0YXIuZGF0YXNldC5pbmRleCk7XG4gICAgaWYgKHRoaXMudmFsdWUgPT0gMCkge1xuICAgICAgdGhpcy52YWx1ZSA9IDE7XG4gICAgfVxuICAgIGxldCByYXRlVmFsdWVzID0ge29sZFZhbHVlOm9sZFZhbHVlLCBuZXdWYWx1ZTp0aGlzLnZhbHVlLCBzdGFyUmF0aW5nOnRoaXN9O1xuICAgIHRoaXMucmF0ZS5lbWl0KHJhdGVWYWx1ZXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBvblN0YXIoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBsZXQgc3RhcjogSFRNTEVsZW1lbnQgPSA8SFRNTEVsZW1lbnQ+ZXZlbnQuc3JjRWxlbWVudDtcbiAgICBsZXQgY3VycmVudEluZGV4ID0gcGFyc2VJbnQoc3Rhci5kYXRhc2V0LmluZGV4KTtcblxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBjdXJyZW50SW5kZXg7IGluZGV4KyspIHtcbiAgICAgIHRoaXMuc3RhcnNbaW5kZXhdLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0ID0gW107XG4gICAgICB0aGlzLmFkZERlZmF1bHRDbGFzcyh0aGlzLnN0YXJzW2luZGV4XS5uYXRpdmVFbGVtZW50KTtcbiAgICAgIHRoaXMuYWRkQ2hlY2tlZFN0YXJDbGFzcyh0aGlzLnN0YXJzW2luZGV4XS5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpbmRleCA9IGN1cnJlbnRJbmRleDsgaW5kZXggPCB0aGlzLnN0YXJzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgdGhpcy5zdGFyc1tpbmRleF0ubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QgPSBbXTtcbiAgICAgIHRoaXMuYWRkRGVmYXVsdENsYXNzKHRoaXMuc3RhcnNbaW5kZXhdLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb2ZmU3RhcihldmVudDogTW91c2VFdmVudCkge1xuICAgIHRoaXMuZ2VuZXJhdGVSYXRpbmcoKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkRGVmYXVsdENsYXNzKHN0YXI6IEhUTUxTcGFuRWxlbWVudCkge1xuICAgIHN0YXIuY2xhc3NMaXN0LmFkZChTdGFyUmF0aW5nQ29tcG9uZW50LkNMU19ERUZBVUxUX1NUQVIpO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRDaGVja2VkU3RhckNsYXNzKHN0YXI6IEhUTUxTcGFuRWxlbWVudCkge1xuICAgIHN0YXIuY2xhc3NMaXN0LmFkZChTdGFyUmF0aW5nQ29tcG9uZW50LkNMU19DSEVDS0VEX1NUQVIpO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRIYWxmU3RhckNsYXNzKHN0YXI6IEhUTUxTcGFuRWxlbWVudCkge1xuICAgIHN0YXIuY2xhc3NMaXN0LmFkZChTdGFyUmF0aW5nQ29tcG9uZW50LkNMU19IQUxGX1NUQVIpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRTdGFycygpIHtcbiAgICBpZiAodGhpcy5zdGFycy5sZW5ndGggPT0gMCkge1xuICAgICAgdGhpcy5zdGFycy5wdXNoKHRoaXMuc3RhcjFFbGVtZW50KTtcbiAgICAgIHRoaXMuc3RhcnMucHVzaCh0aGlzLnN0YXIyRWxlbWVudCk7XG4gICAgICB0aGlzLnN0YXJzLnB1c2godGhpcy5zdGFyM0VsZW1lbnQpO1xuICAgICAgdGhpcy5zdGFycy5wdXNoKHRoaXMuc3RhcjRFbGVtZW50KTtcbiAgICAgIHRoaXMuc3RhcnMucHVzaCh0aGlzLnN0YXI1RWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhcHBseVNpemVBbGxTdGFycygpIHtcbiAgICBpZiAodGhpcy5fc2l6ZSkge1xuICAgICAgdGhpcy5zdGFycy5mb3JFYWNoKChzdGFyOiBFbGVtZW50UmVmKSA9PiB7XG4gICAgICAgIGxldCBuZXdTaXplID0gdGhpcy5zaXplLm1hdGNoKC9cXGQrLylbMF07XG4gICAgICAgIGxldCBoYWxmU2l6ZSA9IChwYXJzZUludChuZXdTaXplKSAqIDEwKSAvIDI0O1xuICAgICAgICBsZXQgaGFsZk1hcmdpbiA9IDAgLSAoKHBhcnNlSW50KG5ld1NpemUpICogMjApIC8gMjQpO1xuICAgICAgICBzdGFyLm5hdGl2ZUVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoU3RhclJhdGluZ0NvbXBvbmVudC5WQVJfU0laRSwgdGhpcy5zaXplKTtcbiAgICAgICAgaWYgKHN0YXIubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoU3RhclJhdGluZ0NvbXBvbmVudC5DTFNfSEFMRl9TVEFSKSkge1xuICAgICAgICAgIHN0YXIubmF0aXZlRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShTdGFyUmF0aW5nQ29tcG9uZW50LlZBUl9IQUxGX1dJRFRILCBgJHtoYWxmU2l6ZX1weGApO1xuICAgICAgICAgIHN0YXIubmF0aXZlRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShTdGFyUmF0aW5nQ29tcG9uZW50LlZBUl9IQUxGX01BUkdJTiwgYCR7aGFsZk1hcmdpbn1weGApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFwcGx5Q29sb3JTdHlsZUFsbFN0YXJzKHNldENoZWNrZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLnN0YXJzLmZvckVhY2goKHN0YXI6IEVsZW1lbnRSZWYpID0+IHtcbiAgICAgIGlmIChzZXRDaGVja2VkKSB7XG4gICAgICAgIHRoaXMuYXBwbHlDaGVja2VkQ29sb3JTdHlsZShzdGFyLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hcHBseVVuQ2hlY2tlZENvbG9yU3R5bGUoc3Rhci5uYXRpdmVFbGVtZW50KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlDb2xvclN0eWxlKHN0YXJFbGVtZW50OiBIVE1MU3BhbkVsZW1lbnQpIHtcbiAgICB0aGlzLmFwcGx5Q2hlY2tlZENvbG9yU3R5bGUoc3RhckVsZW1lbnQpO1xuICAgIHRoaXMuYXBwbHlVbkNoZWNrZWRDb2xvclN0eWxlKHN0YXJFbGVtZW50KTtcbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlDaGVja2VkQ29sb3JTdHlsZShzdGFyRWxlbWVudDogSFRNTFNwYW5FbGVtZW50KSB7XG4gICAgc3RhckVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoU3RhclJhdGluZ0NvbXBvbmVudC5WQVJfQ0hFQ0tFRF9DT0xPUiwgdGhpcy5jaGVja2VkY29sb3IpO1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBseVVuQ2hlY2tlZENvbG9yU3R5bGUoc3RhckVsZW1lbnQ6IEhUTUxTcGFuRWxlbWVudCkge1xuICAgIHN0YXJFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFN0YXJSYXRpbmdDb21wb25lbnQuVkFSX1VOQ0hFQ0tFRF9DT0xPUiwgdGhpcy51bmNoZWNrZWRjb2xvcik7XG4gIH1cblxuICBwcml2YXRlIGdlbmVyYXRlUmF0aW5nKCkge1xuICAgIGlmICh0aGlzLnJlYWRvbmx5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhcnMoKTtcbiAgICBpZiAodGhpcy52YWx1ZSA+PSAwKSB7XG4gICAgICB0aGlzLm1haW5FbGVtZW50Lm5hdGl2ZUVsZW1lbnQudGl0bGUgPSB0aGlzLnZhbHVlO1xuXG4gICAgICBsZXQgaGFzRGVjaW1hbHM6IGJvb2xlYW4gPVxuICAgICAgICAoKE51bWJlci5wYXJzZUZsb2F0KHRoaXMudmFsdWUudG9TdHJpbmcoKSkgJSAxKVxuICAgICAgICAgIC50b1N0cmluZygpXG4gICAgICAgICAgLnN1YnN0cmluZygzLCAyKSkgPyB0cnVlIDogZmFsc2U7XG5cbiAgICAgIGxldCBpID0gMTtcbiAgICAgIHRoaXMuc3RhcnMuZm9yRWFjaCgoc3RhcjogRWxlbWVudFJlZikgPT4ge1xuICAgICAgICBzdGFyLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0ID0gW107XG4gICAgICAgIHRoaXMuYXBwbHlDb2xvclN0eWxlKHN0YXIubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIHRoaXMuYWRkRGVmYXVsdENsYXNzKHN0YXIubmF0aXZlRWxlbWVudCk7XG5cbiAgICAgICAgaWYgKHRoaXMudmFsdWUgPj0gaSkge1xuICAgICAgICAgIC8vIHN0YXIgb25cbiAgICAgICAgICB0aGlzLmFkZENoZWNrZWRTdGFyQ2xhc3Moc3Rhci5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBoYWxmIHN0YXJcbiAgICAgICAgICBpZiAoaGFzRGVjaW1hbHMpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkSGFsZlN0YXJDbGFzcyhzdGFyLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgICAgaGFzRGVjaW1hbHMgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaSsrO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=