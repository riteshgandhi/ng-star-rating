/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Output, ViewChild, ElementRef, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
var StarRatingComponent = /** @class */ (function () {
    function StarRatingComponent() {
        var _this = this;
        this.stars = [];
        this._readOnly = false;
        this._totalStars = 5;
        this.rate = new EventEmitter();
        if (!this.onStarsCountChange) {
            this.onStarsCountChange = new Subject();
            this.onStarsCountChange.subscribe((/**
             * @return {?}
             */
            function () {
                _this.setStars();
                _this.generateRating(true);
                _this.applySizeAllStars();
                _this.applyColorStyleAllStars(false);
                _this.addRemoveEvents();
            }));
        }
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
            this._checkedColor && this.onCheckedColorChange.next(this._checkedColor);
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
            this._unCheckedColor && this.onUnCheckedColorChange.next(this._unCheckedColor);
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
            value = (!value || value == null) ? 0 : value;
            value > this.stars.length && (value = this.stars.length);
            this._value = value;
            this._value >= 0 && this.onValueChange.next(this._value);
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
            value = (!value || value == null || value == "0px") ? "24px" : value;
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
    Object.defineProperty(StarRatingComponent.prototype, "totalstars", {
        get: /**
         * @return {?}
         */
        function () {
            return this._totalStars;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._totalStars = value <= 0 ? 5 : value;
            this.onStarsCountChange.next(Number(value));
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
            star.addEventListener('click', _this.onRate.bind(_this));
            star.addEventListener('mouseenter', _this.onStar.bind(_this));
            star.style.cursor = "pointer";
            star.title = star.dataset.index;
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
            star.__zone_symbol__clickfalse = null;
            star.__zone_symbol__mouseenterfalse = null;
            star.style.cursor = "default";
            star.title = "";
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
            this.stars[index].className = "";
            this.addDefaultClass(this.stars[index]);
            this.addCheckedStarClass(this.stars[index]);
        }
        for (var index = currentIndex; index < this.stars.length; index++) {
            this.stars[index].className = "";
            this.addDefaultClass(this.stars[index]);
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
        var _this = this;
        /** @type {?} */
        var starContainer = this.mainElement.nativeElement;
        /** @type {?} */
        var maxStars = tslib_1.__spread(Array(Number(this.totalstars)).keys());
        this.stars.length = 0;
        starContainer.innerHTML = "";
        maxStars.forEach((/**
         * @param {?} starNumber
         * @return {?}
         */
        function (starNumber) {
            /** @type {?} */
            var starElement = document.createElement("span");
            starElement.dataset.index = (starNumber + 1).toString();
            starElement.title = starElement.dataset.index;
            starContainer.appendChild(starElement);
            _this.stars.push(starElement);
        }));
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
            this.stars.length == 0 && this.setStars();
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
                star.style.setProperty(StarRatingComponent.VAR_SIZE, _this.size);
                if (star.classList.contains(StarRatingComponent.CLS_HALF_STAR)) {
                    star.style.setProperty(StarRatingComponent.VAR_HALF_WIDTH, halfSize + "px");
                    star.style.setProperty(StarRatingComponent.VAR_HALF_MARGIN, halfMargin + "px");
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
        this.stars.length == 0 && this.setStars();
        this.stars.forEach((/**
         * @param {?} star
         * @return {?}
         */
        function (star) {
            if (setChecked) {
                _this.applyCheckedColorStyle(star);
            }
            else {
                _this.applyUnCheckedColorStyle(star);
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
     * @param {?=} forceGenerate
     * @return {?}
     */
    StarRatingComponent.prototype.generateRating = /**
     * @private
     * @param {?=} forceGenerate
     * @return {?}
     */
    function (forceGenerate) {
        var _this = this;
        if (forceGenerate === void 0) { forceGenerate = false; }
        if (this.readonly && !forceGenerate) {
            return;
        }
        this.stars.length == 0 && this.setStars();
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
                star.className = "";
                _this.applyColorStyle(star);
                _this.addDefaultClass(star);
                if (_this.value >= i_1) {
                    // star on
                    _this.addCheckedStarClass(star);
                }
                else {
                    // half star
                    if (hasDecimals_1) {
                        _this.addHalfStarClass(star);
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
    StarRatingComponent.ctorParameters = function () { return []; };
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
    StarRatingComponent.INP_TOTALSTARS;
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
    StarRatingComponent.prototype._totalStars;
    /**
     * @type {?}
     * @private
     */
    StarRatingComponent.prototype.onStarsCountChange;
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
    /** @type {?} */
    StarRatingComponent.prototype.rate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rhci1yYXRpbmcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctc3RhcnJhdGluZy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc3Rhci1yYXRpbmcvc3Rhci1yYXRpbmcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pILE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFL0I7SUF3Q0U7UUFBQSxpQkErQ0M7UUEvRU8sVUFBSyxHQUFtQixFQUFFLENBQUM7UUFLM0IsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUMzQixnQkFBVyxHQUFXLENBQUMsQ0FBQztRQW1HdEIsU0FBSSxHQUEwRixJQUFJLFlBQVksRUFBRSxDQUFDO1FBeEV6SCxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQzVCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQ3hDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTOzs7WUFBQztnQkFDaEMsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNoQixLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMxQixLQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztnQkFDekIsS0FBSSxDQUFDLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNwQyxLQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDekIsQ0FBQyxFQUFDLENBQUM7U0FDSjtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUNuQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVM7OztZQUFDO2dCQUMzQixLQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3RCLEtBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQzNCLENBQUMsRUFBQyxDQUFDO1NBQ0o7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFO1lBQzlCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQzFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTOzs7WUFBQztnQkFDbEMsS0FBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JDLENBQUMsRUFBQyxDQUFDO1NBQ0o7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFO1lBQ2hDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQzVDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTOzs7WUFBQztnQkFDcEMsS0FBSSxDQUFDLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RDLENBQUMsRUFBQyxDQUFDO1NBQ0o7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN0QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7WUFDbEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTOzs7WUFBQztnQkFDMUIsS0FBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDM0IsQ0FBQyxFQUFDLENBQUM7U0FDSjtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDMUIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7WUFDdEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVM7OztZQUFDO2dCQUM5QixLQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDekIsQ0FBQyxFQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFRCxzQkFBSSw2Q0FBWTs7OztRQUFoQjtZQUNFLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUM1QixDQUFDOzs7OztRQXdCRCxVQUErRCxLQUFhO1lBQzFFLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1lBQzNCLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDM0UsQ0FBQzs7O09BM0JBO0lBRUQsc0JBQUksK0NBQWM7Ozs7UUFBbEI7WUFDRSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDOUIsQ0FBQzs7Ozs7UUF5QkQsVUFBbUUsS0FBYTtZQUM5RSxJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztZQUM3QixJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2pGLENBQUM7OztPQTVCQTtJQUVELHNCQUFJLHNDQUFLOzs7O1FBQVQ7WUFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDckIsQ0FBQzs7Ozs7UUEwQkQsVUFBZ0QsS0FBYTtZQUMzRCxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQzlDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3pELElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzRCxDQUFDOzs7T0EvQkE7SUFFRCxzQkFBSSxxQ0FBSTs7OztRQUFSO1lBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNyRSxDQUFDOzs7OztRQTZCRCxVQUE4QyxLQUFhO1lBQ3pELEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxJQUFJLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUNyRSxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckMsQ0FBQzs7O09BakNBO0lBRUQsc0JBQUkseUNBQVE7Ozs7UUFBWjtZQUNFLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxNQUFNLENBQUM7UUFDM0MsQ0FBQzs7Ozs7UUErQkQsVUFBc0QsS0FBYztZQUNsRSxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN2QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLENBQUM7OztPQWxDQTtJQUVELHNCQUFJLDJDQUFVOzs7O1FBQWQ7WUFDRSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDMUIsQ0FBQzs7Ozs7UUFnQ0QsVUFBMEQsS0FBYTtZQUNyRSxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQzFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDOUMsQ0FBQzs7O09BbkNBOzs7OztJQXFDTywwQ0FBWTs7OztJQUFwQjtRQUFBLGlCQVVDO1FBVEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDdkYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7UUFDeEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDbEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPOzs7O1FBQUMsVUFBQyxJQUFTO1lBQzNCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUMsQ0FBQztZQUN2RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDLENBQUM7WUFDNUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO1lBQzlCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDbEMsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7OztJQUVPLDBDQUFZOzs7O0lBQXBCO1FBQ0UsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsOEJBQThCLEdBQUcsSUFBSSxDQUFDO1FBQ3JFLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO1FBQ3hELElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ2xELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTzs7OztRQUFDLFVBQUMsSUFBUztZQUMzQixJQUFJLENBQUMseUJBQXlCLEdBQUcsSUFBSSxDQUFDO1lBQ3RDLElBQUksQ0FBQyw4QkFBOEIsR0FBRyxJQUFJLENBQUM7WUFDM0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO1lBQzlCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFTyw2Q0FBZTs7OztJQUF2QjtRQUNFLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDckI7YUFBTTtZQUNMLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUNwQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDckM7SUFDSCxDQUFDOzs7OztJQUVPLDZDQUFlOzs7O0lBQXZCO0lBQ0EsQ0FBQzs7Ozs7O0lBRU8sb0NBQU07Ozs7O0lBQWQsVUFBZSxLQUFpQjs7WUFDMUIsSUFBSSxHQUFnQixtQkFBYSxLQUFLLENBQUMsVUFBVSxFQUFBOztZQUNqRCxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUs7UUFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQyxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxFQUFFO1lBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1NBQ2hCOztZQUNHLFVBQVUsR0FBRyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRTtRQUMvRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM3QixDQUFDOzs7Ozs7SUFFTyxvQ0FBTTs7Ozs7SUFBZCxVQUFlLEtBQWlCOztZQUMxQixJQUFJLEdBQWdCLG1CQUFhLEtBQUssQ0FBQyxVQUFVLEVBQUE7O1lBQ2pELFlBQVksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFFL0MsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLFlBQVksRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUNqRCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7WUFDakMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUM3QztRQUVELEtBQUssSUFBSSxLQUFLLEdBQUcsWUFBWSxFQUFFLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUNqRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7WUFDakMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDekM7SUFDSCxDQUFDOzs7Ozs7SUFFTyxxQ0FBTzs7Ozs7SUFBZixVQUFnQixLQUFpQjtRQUMvQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7Ozs7O0lBRU8sNkNBQWU7Ozs7O0lBQXZCLFVBQXdCLElBQVM7UUFDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUMzRCxDQUFDOzs7Ozs7SUFFTyxpREFBbUI7Ozs7O0lBQTNCLFVBQTRCLElBQVM7UUFDbkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUMzRCxDQUFDOzs7Ozs7SUFFTyw4Q0FBZ0I7Ozs7O0lBQXhCLFVBQXlCLElBQVM7UUFDaEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDeEQsQ0FBQzs7Ozs7SUFFTyxzQ0FBUTs7OztJQUFoQjtRQUFBLGlCQVlDOztZQVhLLGFBQWEsR0FBbUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhOztZQUM5RCxRQUFRLG9CQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDekQsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLGFBQWEsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQzdCLFFBQVEsQ0FBQyxPQUFPOzs7O1FBQUMsVUFBQSxVQUFVOztnQkFDckIsV0FBVyxHQUFvQixRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQztZQUNqRSxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN4RCxXQUFXLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQzlDLGFBQWEsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdkMsS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDL0IsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7OztJQUVPLCtDQUFpQjs7OztJQUF6QjtRQUFBLGlCQWNDO1FBYkMsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUMxQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU87Ozs7WUFBQyxVQUFDLElBQVM7O29CQUN2QixPQUFPLEdBQUcsS0FBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOztvQkFDbkMsUUFBUSxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUU7O29CQUN4QyxVQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUNwRCxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsS0FBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNoRSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxFQUFFO29CQUM5RCxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLEVBQUssUUFBUSxPQUFJLENBQUMsQ0FBQztvQkFDNUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsbUJBQW1CLENBQUMsZUFBZSxFQUFLLFVBQVUsT0FBSSxDQUFDLENBQUM7aUJBQ2hGO1lBQ0gsQ0FBQyxFQUFDLENBQUM7U0FDSjtJQUNILENBQUM7Ozs7OztJQUVPLHFEQUF1Qjs7Ozs7SUFBL0IsVUFBZ0MsVUFBbUI7UUFBbkQsaUJBU0M7UUFSQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTzs7OztRQUFDLFVBQUMsSUFBUztZQUMzQixJQUFJLFVBQVUsRUFBRTtnQkFDZCxLQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDbkM7aUJBQU07Z0JBQ0wsS0FBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3JDO1FBQ0gsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7Ozs7SUFFTyw2Q0FBZTs7Ozs7SUFBdkIsVUFBd0IsV0FBNEI7UUFDbEQsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM3QyxDQUFDOzs7Ozs7SUFFTyxvREFBc0I7Ozs7O0lBQTlCLFVBQStCLFdBQTRCO1FBQ3pELFdBQVcsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUMxRixDQUFDOzs7Ozs7SUFFTyxzREFBd0I7Ozs7O0lBQWhDLFVBQWlDLFdBQTRCO1FBQzNELFdBQVcsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUM5RixDQUFDOzs7Ozs7SUFFTyw0Q0FBYzs7Ozs7SUFBdEIsVUFBdUIsYUFBNkI7UUFBcEQsaUJBZ0NDO1FBaENzQiw4QkFBQSxFQUFBLHFCQUE2QjtRQUNsRCxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDbkMsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMxQyxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxFQUFFO1lBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDOztnQkFFOUMsYUFBVyxHQUNiLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQzVDLFFBQVEsRUFBRTtpQkFDVixTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSzs7Z0JBRWhDLEdBQUMsR0FBRyxDQUFDO1lBQ1QsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPOzs7O1lBQUMsVUFBQyxJQUFTO2dCQUMzQixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztnQkFDcEIsS0FBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDM0IsS0FBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFM0IsSUFBSSxLQUFJLENBQUMsS0FBSyxJQUFJLEdBQUMsRUFBRTtvQkFDbkIsVUFBVTtvQkFDVixLQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ2hDO3FCQUFNO29CQUNMLFlBQVk7b0JBQ1osSUFBSSxhQUFXLEVBQUU7d0JBQ2YsS0FBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUM1QixhQUFXLEdBQUcsS0FBSyxDQUFDO3FCQUNyQjtpQkFDRjtnQkFDRCxHQUFDLEVBQUUsQ0FBQztZQUNOLENBQUMsRUFBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBbFN1QixxQ0FBaUIsR0FBVyxnQkFBZ0IsQ0FBQztJQUM3Qyx1Q0FBbUIsR0FBVyxrQkFBa0IsQ0FBQztJQUNqRCw0QkFBUSxHQUFXLFFBQVEsQ0FBQztJQUM1QixrQ0FBYyxHQUFXLGFBQWEsQ0FBQztJQUN2QyxtQ0FBZSxHQUFXLGNBQWMsQ0FBQztJQUN6QyxvQ0FBZ0IsR0FBVyxJQUFJLENBQUM7SUFDaEMsb0NBQWdCLEdBQVcsTUFBTSxDQUFDO0lBQ2xDLGlDQUFhLEdBQVcsTUFBTSxDQUFDO0lBQy9CLHFDQUFpQixHQUFXLGNBQWMsQ0FBQztJQUMzQyx1Q0FBbUIsR0FBVyxnQkFBZ0IsQ0FBQztJQUMvQyw2QkFBUyxHQUFXLE9BQU8sQ0FBQztJQUM1Qiw0QkFBUSxHQUFXLE1BQU0sQ0FBQztJQUMxQixnQ0FBWSxHQUFXLFVBQVUsQ0FBQztJQUNsQyxrQ0FBYyxHQUFXLFlBQVksQ0FBQzs7Z0JBcEMvRCxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLHFDQUEyQztvQkFFM0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2lCQUN0Qzs7Ozs7OEJBaUNFLFNBQVMsU0FBQyxVQUFVLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO3VCQTJFdEMsTUFBTTsrQkFFTixLQUFLLFNBQUMsbUJBQW1CLENBQUMsaUJBQWlCO2lDQUszQyxLQUFLLFNBQUMsbUJBQW1CLENBQUMsbUJBQW1CO3dCQUs3QyxLQUFLLFNBQUMsbUJBQW1CLENBQUMsU0FBUzt1QkFPbkMsS0FBSyxTQUFDLG1CQUFtQixDQUFDLFFBQVE7MkJBTWxDLEtBQUssU0FBQyxtQkFBbUIsQ0FBQyxZQUFZOzZCQUt0QyxLQUFLLFNBQUMsbUJBQW1CLENBQUMsY0FBYzs7SUEySzNDLDBCQUFDO0NBQUEsQUExVEQsSUEwVEM7U0FuVFksbUJBQW1COzs7Ozs7SUFnQjlCLHNDQUFxRTs7Ozs7SUFDckUsd0NBQXlFOzs7OztJQUN6RSw2QkFBb0Q7Ozs7O0lBQ3BELG1DQUErRDs7Ozs7SUFDL0Qsb0NBQWlFOzs7OztJQUNqRSxxQ0FBd0Q7Ozs7O0lBQ3hELHFDQUEwRDs7Ozs7SUFDMUQsa0NBQXVEOzs7OztJQUN2RCxzQ0FBbUU7Ozs7O0lBQ25FLHdDQUF1RTs7Ozs7SUFDdkUsOEJBQW9EOzs7OztJQUNwRCw2QkFBa0Q7Ozs7O0lBQ2xELGlDQUEwRDs7Ozs7SUFDMUQsbUNBQThEOzs7OztJQTVCOUQsb0NBQW1DOzs7OztJQUNuQyw0Q0FBOEI7Ozs7O0lBQzlCLDhDQUFnQzs7Ozs7SUFDaEMscUNBQXVCOzs7OztJQUN2QixvQ0FBc0I7Ozs7O0lBQ3RCLHdDQUFtQzs7Ozs7SUFDbkMsMENBQWdDOzs7OztJQUVoQyxpREFBNEM7Ozs7O0lBQzVDLDRDQUF1Qzs7Ozs7SUFDdkMsbURBQThDOzs7OztJQUM5QyxxREFBZ0Q7Ozs7O0lBQ2hELDJDQUFzQzs7Ozs7SUFDdEMsK0NBQTJDOzs7OztJQWlCM0MsMENBQXlFOztJQTJFekUsbUNBQTJIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc3Rhci1yYXRpbmcnLFxuICB0ZW1wbGF0ZVVybDogJy4vc3Rhci1yYXRpbmcuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9zdGFyLXJhdGluZy5jb21wb25lbnQuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5cbmV4cG9ydCBjbGFzcyBTdGFyUmF0aW5nQ29tcG9uZW50IHtcbiAgcHJpdmF0ZSBzdGFyczogQXJyYXk8RWxlbWVudD4gPSBbXTtcbiAgcHJpdmF0ZSBfY2hlY2tlZENvbG9yOiBzdHJpbmc7XG4gIHByaXZhdGUgX3VuQ2hlY2tlZENvbG9yOiBzdHJpbmc7XG4gIHByaXZhdGUgX3ZhbHVlOiBudW1iZXI7XG4gIHByaXZhdGUgX3NpemU6IHN0cmluZztcbiAgcHJpdmF0ZSBfcmVhZE9ubHk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfdG90YWxTdGFyczogbnVtYmVyID0gNTtcblxuICBwcml2YXRlIG9uU3RhcnNDb3VudENoYW5nZTogU3ViamVjdDxudW1iZXI+O1xuICBwcml2YXRlIG9uVmFsdWVDaGFuZ2U6IFN1YmplY3Q8bnVtYmVyPjtcbiAgcHJpdmF0ZSBvbkNoZWNrZWRDb2xvckNoYW5nZTogU3ViamVjdDxzdHJpbmc+O1xuICBwcml2YXRlIG9uVW5DaGVja2VkQ29sb3JDaGFuZ2U6IFN1YmplY3Q8c3RyaW5nPjtcbiAgcHJpdmF0ZSBvblNpemVDaGFuZ2U6IFN1YmplY3Q8c3RyaW5nPjtcbiAgcHJpdmF0ZSBvblJlYWRPbmx5Q2hhbmdlOiBTdWJqZWN0PGJvb2xlYW4+O1xuXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFZBUl9DSEVDS0VEX0NPTE9SOiBzdHJpbmcgPSAnLS1jaGVja2VkQ29sb3InO1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBWQVJfVU5DSEVDS0VEX0NPTE9SOiBzdHJpbmcgPSAnLS11bkNoZWNrZWRDb2xvcic7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFZBUl9TSVpFOiBzdHJpbmcgPSAnLS1zaXplJztcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgVkFSX0hBTEZfV0lEVEg6IHN0cmluZyA9ICctLWhhbGZXaWR0aCc7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFZBUl9IQUxGX01BUkdJTjogc3RyaW5nID0gJy0taGFsZk1hcmdpbic7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IENMU19DSEVDS0VEX1NUQVI6IHN0cmluZyA9ICdvbic7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IENMU19ERUZBVUxUX1NUQVI6IHN0cmluZyA9ICdzdGFyJztcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgQ0xTX0hBTEZfU1RBUjogc3RyaW5nID0gJ2hhbGYnO1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBJTlBfQ0hFQ0tFRF9DT0xPUjogc3RyaW5nID0gJ2NoZWNrZWRjb2xvcic7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IElOUF9VTkNIRUNLRURfQ09MT1I6IHN0cmluZyA9ICd1bmNoZWNrZWRjb2xvcic7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IElOUF9WQUxVRTogc3RyaW5nID0gJ3ZhbHVlJztcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSU5QX1NJWkU6IHN0cmluZyA9ICdzaXplJztcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSU5QX1JFQURPTkxZOiBzdHJpbmcgPSAncmVhZG9ubHknO1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBJTlBfVE9UQUxTVEFSUzogc3RyaW5nID0gJ3RvdGFsc3RhcnMnO1xuXG4gIEBWaWV3Q2hpbGQoJ3N0YXJNYWluJywgeyBzdGF0aWM6IHRydWUgfSkgcHJpdmF0ZSBtYWluRWxlbWVudDogRWxlbWVudFJlZjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBpZiAoIXRoaXMub25TdGFyc0NvdW50Q2hhbmdlKSB7XG4gICAgICB0aGlzLm9uU3RhcnNDb3VudENoYW5nZSA9IG5ldyBTdWJqZWN0KCk7XG4gICAgICB0aGlzLm9uU3RhcnNDb3VudENoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXJzKCk7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVSYXRpbmcodHJ1ZSk7XG4gICAgICAgIHRoaXMuYXBwbHlTaXplQWxsU3RhcnMoKTtcbiAgICAgICAgdGhpcy5hcHBseUNvbG9yU3R5bGVBbGxTdGFycyhmYWxzZSk7XG4gICAgICAgIHRoaXMuYWRkUmVtb3ZlRXZlbnRzKCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMub25WYWx1ZUNoYW5nZSkge1xuICAgICAgdGhpcy5vblZhbHVlQ2hhbmdlID0gbmV3IFN1YmplY3QoKTtcbiAgICAgIHRoaXMub25WYWx1ZUNoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmdlbmVyYXRlUmF0aW5nKCk7XG4gICAgICAgIHRoaXMuYXBwbHlTaXplQWxsU3RhcnMoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5vbkNoZWNrZWRDb2xvckNoYW5nZSkge1xuICAgICAgdGhpcy5vbkNoZWNrZWRDb2xvckNoYW5nZSA9IG5ldyBTdWJqZWN0KCk7XG4gICAgICB0aGlzLm9uQ2hlY2tlZENvbG9yQ2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuYXBwbHlDb2xvclN0eWxlQWxsU3RhcnModHJ1ZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMub25VbkNoZWNrZWRDb2xvckNoYW5nZSkge1xuICAgICAgdGhpcy5vblVuQ2hlY2tlZENvbG9yQ2hhbmdlID0gbmV3IFN1YmplY3QoKTtcbiAgICAgIHRoaXMub25VbkNoZWNrZWRDb2xvckNoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmFwcGx5Q29sb3JTdHlsZUFsbFN0YXJzKGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5vblNpemVDaGFuZ2UpIHtcbiAgICAgIHRoaXMub25TaXplQ2hhbmdlID0gbmV3IFN1YmplY3QoKTtcbiAgICAgIHRoaXMub25TaXplQ2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuYXBwbHlTaXplQWxsU3RhcnMoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5vblJlYWRPbmx5Q2hhbmdlKSB7XG4gICAgICB0aGlzLm9uUmVhZE9ubHlDaGFuZ2UgPSBuZXcgU3ViamVjdCgpO1xuICAgICAgdGhpcy5vblJlYWRPbmx5Q2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuYWRkUmVtb3ZlRXZlbnRzKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBnZXQgY2hlY2tlZGNvbG9yKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2NoZWNrZWRDb2xvcjtcbiAgfVxuXG4gIGdldCB1bmNoZWNrZWRjb2xvcigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl91bkNoZWNrZWRDb2xvcjtcbiAgfVxuXG4gIGdldCB2YWx1ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIGdldCBzaXplKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3NpemUuY29uY2F0KCghdGhpcy5fc2l6ZS5pbmNsdWRlcyhcInB4XCIpID8gXCJweFwiIDogXCJcIikpO1xuICB9XG5cbiAgZ2V0IHJlYWRvbmx5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBTdHJpbmcodGhpcy5fcmVhZE9ubHkpID09PSBcInRydWVcIjtcbiAgfVxuXG4gIGdldCB0b3RhbHN0YXJzKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3RvdGFsU3RhcnM7XG4gIH1cblxuICBAT3V0cHV0KCkgcmF0ZTogRXZlbnRFbWl0dGVyPHsgb2xkVmFsdWU6IG51bWJlciwgbmV3VmFsdWU6IG51bWJlciwgc3RhclJhdGluZzogU3RhclJhdGluZ0NvbXBvbmVudCB9PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBASW5wdXQoU3RhclJhdGluZ0NvbXBvbmVudC5JTlBfQ0hFQ0tFRF9DT0xPUikgc2V0IGNoZWNrZWRjb2xvcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fY2hlY2tlZENvbG9yID0gdmFsdWU7XG4gICAgdGhpcy5fY2hlY2tlZENvbG9yICYmIHRoaXMub25DaGVja2VkQ29sb3JDaGFuZ2UubmV4dCh0aGlzLl9jaGVja2VkQ29sb3IpO1xuICB9XG5cbiAgQElucHV0KFN0YXJSYXRpbmdDb21wb25lbnQuSU5QX1VOQ0hFQ0tFRF9DT0xPUikgc2V0IHVuY2hlY2tlZGNvbG9yKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl91bkNoZWNrZWRDb2xvciA9IHZhbHVlO1xuICAgIHRoaXMuX3VuQ2hlY2tlZENvbG9yICYmIHRoaXMub25VbkNoZWNrZWRDb2xvckNoYW5nZS5uZXh0KHRoaXMuX3VuQ2hlY2tlZENvbG9yKTtcbiAgfVxuXG4gIEBJbnB1dChTdGFyUmF0aW5nQ29tcG9uZW50LklOUF9WQUxVRSkgc2V0IHZhbHVlKHZhbHVlOiBudW1iZXIpIHtcbiAgICB2YWx1ZSA9ICghdmFsdWUgfHwgdmFsdWUgPT0gbnVsbCkgPyAwIDogdmFsdWU7XG4gICAgdmFsdWUgPiB0aGlzLnN0YXJzLmxlbmd0aCAmJiAodmFsdWUgPSB0aGlzLnN0YXJzLmxlbmd0aCk7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLl92YWx1ZSA+PSAwICYmIHRoaXMub25WYWx1ZUNoYW5nZS5uZXh0KHRoaXMuX3ZhbHVlKTtcbiAgfVxuXG4gIEBJbnB1dChTdGFyUmF0aW5nQ29tcG9uZW50LklOUF9TSVpFKSBzZXQgc2l6ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdmFsdWUgPSAoIXZhbHVlIHx8IHZhbHVlID09IG51bGwgfHwgdmFsdWUgPT0gXCIwcHhcIikgPyBcIjI0cHhcIiA6IHZhbHVlO1xuICAgIHRoaXMuX3NpemUgPSB2YWx1ZTtcbiAgICB0aGlzLm9uU2l6ZUNoYW5nZS5uZXh0KHRoaXMuX3NpemUpO1xuICB9XG5cbiAgQElucHV0KFN0YXJSYXRpbmdDb21wb25lbnQuSU5QX1JFQURPTkxZKSBzZXQgcmVhZG9ubHkodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9yZWFkT25seSA9IHZhbHVlO1xuICAgIHRoaXMub25SZWFkT25seUNoYW5nZS5uZXh0KHZhbHVlKTtcbiAgfVxuXG4gIEBJbnB1dChTdGFyUmF0aW5nQ29tcG9uZW50LklOUF9UT1RBTFNUQVJTKSBzZXQgdG90YWxzdGFycyh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fdG90YWxTdGFycyA9IHZhbHVlIDw9IDAgPyA1IDogdmFsdWU7XG4gICAgdGhpcy5vblN0YXJzQ291bnRDaGFuZ2UubmV4dChOdW1iZXIodmFsdWUpKTtcbiAgfVxuXG4gIHByaXZhdGUgbWFrZUVkaXRhYmxlKCkge1xuICAgIHRoaXMubWFpbkVsZW1lbnQubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5vZmZTdGFyLmJpbmQodGhpcykpO1xuICAgIHRoaXMubWFpbkVsZW1lbnQubmF0aXZlRWxlbWVudC5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcbiAgICB0aGlzLm1haW5FbGVtZW50Lm5hdGl2ZUVsZW1lbnQudGl0bGUgPSB0aGlzLnZhbHVlO1xuICAgIHRoaXMuc3RhcnMuZm9yRWFjaCgoc3RhcjogYW55KSA9PiB7XG4gICAgICBzdGFyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vblJhdGUuYmluZCh0aGlzKSk7XG4gICAgICBzdGFyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0aGlzLm9uU3Rhci5iaW5kKHRoaXMpKTtcbiAgICAgIHN0YXIuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XG4gICAgICBzdGFyLnRpdGxlID0gc3Rhci5kYXRhc2V0LmluZGV4O1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBtYWtlUmVhZE9ubHkoKSB7XG4gICAgdGhpcy5tYWluRWxlbWVudC5uYXRpdmVFbGVtZW50Ll9fem9uZV9zeW1ib2xfX21vdXNlbGVhdmVmYWxzZSA9IG51bGw7XG4gICAgdGhpcy5tYWluRWxlbWVudC5uYXRpdmVFbGVtZW50LnN0eWxlLmN1cnNvciA9IFwiZGVmYXVsdFwiO1xuICAgIHRoaXMubWFpbkVsZW1lbnQubmF0aXZlRWxlbWVudC50aXRsZSA9IHRoaXMudmFsdWU7XG4gICAgdGhpcy5zdGFycy5mb3JFYWNoKChzdGFyOiBhbnkpID0+IHtcbiAgICAgIHN0YXIuX196b25lX3N5bWJvbF9fY2xpY2tmYWxzZSA9IG51bGw7XG4gICAgICBzdGFyLl9fem9uZV9zeW1ib2xfX21vdXNlZW50ZXJmYWxzZSA9IG51bGw7XG4gICAgICBzdGFyLnN0eWxlLmN1cnNvciA9IFwiZGVmYXVsdFwiO1xuICAgICAgc3Rhci50aXRsZSA9IFwiXCI7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFkZFJlbW92ZUV2ZW50cygpIHtcbiAgICBpZiAodGhpcy5yZWFkb25seSkge1xuICAgICAgdGhpcy5tYWtlUmVhZE9ubHkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tYWtlRWRpdGFibGUoKTtcbiAgICAgIHRoaXMub25WYWx1ZUNoYW5nZS5uZXh0KHRoaXMudmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbmdBZnRlclZpZXdJbml0KCkge1xuICB9XG5cbiAgcHJpdmF0ZSBvblJhdGUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBsZXQgc3RhcjogSFRNTEVsZW1lbnQgPSA8SFRNTEVsZW1lbnQ+ZXZlbnQuc3JjRWxlbWVudDtcbiAgICBsZXQgb2xkVmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgIHRoaXMudmFsdWUgPSBwYXJzZUludChzdGFyLmRhdGFzZXQuaW5kZXgpO1xuICAgIGlmICh0aGlzLnZhbHVlID09IDApIHtcbiAgICAgIHRoaXMudmFsdWUgPSAxO1xuICAgIH1cbiAgICBsZXQgcmF0ZVZhbHVlcyA9IHsgb2xkVmFsdWU6IG9sZFZhbHVlLCBuZXdWYWx1ZTogdGhpcy52YWx1ZSwgc3RhclJhdGluZzogdGhpcyB9O1xuICAgIHRoaXMucmF0ZS5lbWl0KHJhdGVWYWx1ZXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBvblN0YXIoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBsZXQgc3RhcjogSFRNTEVsZW1lbnQgPSA8SFRNTEVsZW1lbnQ+ZXZlbnQuc3JjRWxlbWVudDtcbiAgICBsZXQgY3VycmVudEluZGV4ID0gcGFyc2VJbnQoc3Rhci5kYXRhc2V0LmluZGV4KTtcblxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBjdXJyZW50SW5kZXg7IGluZGV4KyspIHtcbiAgICAgIHRoaXMuc3RhcnNbaW5kZXhdLmNsYXNzTmFtZSA9IFwiXCI7XG4gICAgICB0aGlzLmFkZERlZmF1bHRDbGFzcyh0aGlzLnN0YXJzW2luZGV4XSk7XG4gICAgICB0aGlzLmFkZENoZWNrZWRTdGFyQ2xhc3ModGhpcy5zdGFyc1tpbmRleF0pO1xuICAgIH1cblxuICAgIGZvciAobGV0IGluZGV4ID0gY3VycmVudEluZGV4OyBpbmRleCA8IHRoaXMuc3RhcnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICB0aGlzLnN0YXJzW2luZGV4XS5jbGFzc05hbWUgPSBcIlwiO1xuICAgICAgdGhpcy5hZGREZWZhdWx0Q2xhc3ModGhpcy5zdGFyc1tpbmRleF0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb2ZmU3RhcihldmVudDogTW91c2VFdmVudCkge1xuICAgIHRoaXMuZ2VuZXJhdGVSYXRpbmcoKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkRGVmYXVsdENsYXNzKHN0YXI6IGFueSkge1xuICAgIHN0YXIuY2xhc3NMaXN0LmFkZChTdGFyUmF0aW5nQ29tcG9uZW50LkNMU19ERUZBVUxUX1NUQVIpO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRDaGVja2VkU3RhckNsYXNzKHN0YXI6IGFueSkge1xuICAgIHN0YXIuY2xhc3NMaXN0LmFkZChTdGFyUmF0aW5nQ29tcG9uZW50LkNMU19DSEVDS0VEX1NUQVIpO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRIYWxmU3RhckNsYXNzKHN0YXI6IGFueSkge1xuICAgIHN0YXIuY2xhc3NMaXN0LmFkZChTdGFyUmF0aW5nQ29tcG9uZW50LkNMU19IQUxGX1NUQVIpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRTdGFycygpIHtcbiAgICBsZXQgc3RhckNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQgPSB0aGlzLm1haW5FbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgbGV0IG1heFN0YXJzID0gWy4uLkFycmF5KE51bWJlcih0aGlzLnRvdGFsc3RhcnMpKS5rZXlzKCldO1xuICAgIHRoaXMuc3RhcnMubGVuZ3RoID0gMDtcbiAgICBzdGFyQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgbWF4U3RhcnMuZm9yRWFjaChzdGFyTnVtYmVyID0+IHtcbiAgICAgIGxldCBzdGFyRWxlbWVudDogSFRNTFNwYW5FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICBzdGFyRWxlbWVudC5kYXRhc2V0LmluZGV4ID0gKHN0YXJOdW1iZXIgKyAxKS50b1N0cmluZygpO1xuICAgICAgc3RhckVsZW1lbnQudGl0bGUgPSBzdGFyRWxlbWVudC5kYXRhc2V0LmluZGV4O1xuICAgICAgc3RhckNvbnRhaW5lci5hcHBlbmRDaGlsZChzdGFyRWxlbWVudCk7XG4gICAgICB0aGlzLnN0YXJzLnB1c2goc3RhckVsZW1lbnQpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBseVNpemVBbGxTdGFycygpIHtcbiAgICBpZiAodGhpcy5fc2l6ZSkge1xuICAgICAgdGhpcy5zdGFycy5sZW5ndGggPT0gMCAmJiB0aGlzLnNldFN0YXJzKCk7XG4gICAgICB0aGlzLnN0YXJzLmZvckVhY2goKHN0YXI6IGFueSkgPT4ge1xuICAgICAgICBsZXQgbmV3U2l6ZSA9IHRoaXMuc2l6ZS5tYXRjaCgvXFxkKy8pWzBdO1xuICAgICAgICBsZXQgaGFsZlNpemUgPSAocGFyc2VJbnQobmV3U2l6ZSkgKiAxMCkgLyAyNDtcbiAgICAgICAgbGV0IGhhbGZNYXJnaW4gPSAwIC0gKChwYXJzZUludChuZXdTaXplKSAqIDIwKSAvIDI0KTtcbiAgICAgICAgc3Rhci5zdHlsZS5zZXRQcm9wZXJ0eShTdGFyUmF0aW5nQ29tcG9uZW50LlZBUl9TSVpFLCB0aGlzLnNpemUpO1xuICAgICAgICBpZiAoc3Rhci5jbGFzc0xpc3QuY29udGFpbnMoU3RhclJhdGluZ0NvbXBvbmVudC5DTFNfSEFMRl9TVEFSKSkge1xuICAgICAgICAgIHN0YXIuc3R5bGUuc2V0UHJvcGVydHkoU3RhclJhdGluZ0NvbXBvbmVudC5WQVJfSEFMRl9XSURUSCwgYCR7aGFsZlNpemV9cHhgKTtcbiAgICAgICAgICBzdGFyLnN0eWxlLnNldFByb3BlcnR5KFN0YXJSYXRpbmdDb21wb25lbnQuVkFSX0hBTEZfTUFSR0lOLCBgJHtoYWxmTWFyZ2lufXB4YCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlDb2xvclN0eWxlQWxsU3RhcnMoc2V0Q2hlY2tlZDogYm9vbGVhbikge1xuICAgIHRoaXMuc3RhcnMubGVuZ3RoID09IDAgJiYgdGhpcy5zZXRTdGFycygpO1xuICAgIHRoaXMuc3RhcnMuZm9yRWFjaCgoc3RhcjogYW55KSA9PiB7XG4gICAgICBpZiAoc2V0Q2hlY2tlZCkge1xuICAgICAgICB0aGlzLmFwcGx5Q2hlY2tlZENvbG9yU3R5bGUoc3Rhcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFwcGx5VW5DaGVja2VkQ29sb3JTdHlsZShzdGFyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlDb2xvclN0eWxlKHN0YXJFbGVtZW50OiBIVE1MU3BhbkVsZW1lbnQpIHtcbiAgICB0aGlzLmFwcGx5Q2hlY2tlZENvbG9yU3R5bGUoc3RhckVsZW1lbnQpO1xuICAgIHRoaXMuYXBwbHlVbkNoZWNrZWRDb2xvclN0eWxlKHN0YXJFbGVtZW50KTtcbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlDaGVja2VkQ29sb3JTdHlsZShzdGFyRWxlbWVudDogSFRNTFNwYW5FbGVtZW50KSB7XG4gICAgc3RhckVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoU3RhclJhdGluZ0NvbXBvbmVudC5WQVJfQ0hFQ0tFRF9DT0xPUiwgdGhpcy5jaGVja2VkY29sb3IpO1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBseVVuQ2hlY2tlZENvbG9yU3R5bGUoc3RhckVsZW1lbnQ6IEhUTUxTcGFuRWxlbWVudCkge1xuICAgIHN0YXJFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFN0YXJSYXRpbmdDb21wb25lbnQuVkFSX1VOQ0hFQ0tFRF9DT0xPUiwgdGhpcy51bmNoZWNrZWRjb2xvcik7XG4gIH1cblxuICBwcml2YXRlIGdlbmVyYXRlUmF0aW5nKGZvcmNlR2VuZXJhdGU6Ym9vbGVhbiA9IGZhbHNlKSB7XG4gICAgaWYgKHRoaXMucmVhZG9ubHkgJiYgIWZvcmNlR2VuZXJhdGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5zdGFycy5sZW5ndGggPT0gMCAmJiB0aGlzLnNldFN0YXJzKCk7XG4gICAgaWYgKHRoaXMudmFsdWUgPj0gMCkge1xuICAgICAgdGhpcy5tYWluRWxlbWVudC5uYXRpdmVFbGVtZW50LnRpdGxlID0gdGhpcy52YWx1ZTtcblxuICAgICAgbGV0IGhhc0RlY2ltYWxzOiBib29sZWFuID1cbiAgICAgICAgKChOdW1iZXIucGFyc2VGbG9hdCh0aGlzLnZhbHVlLnRvU3RyaW5nKCkpICUgMSlcbiAgICAgICAgICAudG9TdHJpbmcoKVxuICAgICAgICAgIC5zdWJzdHJpbmcoMywgMikpID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgICBsZXQgaSA9IDE7XG4gICAgICB0aGlzLnN0YXJzLmZvckVhY2goKHN0YXI6IGFueSkgPT4ge1xuICAgICAgICBzdGFyLmNsYXNzTmFtZSA9IFwiXCI7XG4gICAgICAgIHRoaXMuYXBwbHlDb2xvclN0eWxlKHN0YXIpO1xuICAgICAgICB0aGlzLmFkZERlZmF1bHRDbGFzcyhzdGFyKTtcblxuICAgICAgICBpZiAodGhpcy52YWx1ZSA+PSBpKSB7XG4gICAgICAgICAgLy8gc3RhciBvblxuICAgICAgICAgIHRoaXMuYWRkQ2hlY2tlZFN0YXJDbGFzcyhzdGFyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBoYWxmIHN0YXJcbiAgICAgICAgICBpZiAoaGFzRGVjaW1hbHMpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkSGFsZlN0YXJDbGFzcyhzdGFyKTtcbiAgICAgICAgICAgIGhhc0RlY2ltYWxzID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGkrKztcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19