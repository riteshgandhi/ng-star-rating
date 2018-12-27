/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
     * @return {?}
     */
    StarRatingComponent.prototype.makeEditable = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.stars.forEach(function (star) {
            star.nativeElement.addEventListener('click', _this.rate.bind(_this));
            star.nativeElement.addEventListener('mouseover', _this.rate.bind(_this));
        });
    };
    /**
     * @return {?}
     */
    StarRatingComponent.prototype.makeReadOnly = /**
     * @return {?}
     */
    function () {
        this.stars.forEach(function (star) {
            star.nativeElement.__zone_symbol__clickfalse = null;
            star.nativeElement.__zone_symbol__mouseoverfalse = null;
        });
    };
    /**
     * @return {?}
     */
    StarRatingComponent.prototype.addRemoveEvents = /**
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
     * @return {?}
     */
    StarRatingComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} event
     * @return {?}
     */
    StarRatingComponent.prototype.rate = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var star = /** @type {?} */ (event.srcElement);
        this.value = parseInt(star.dataset["index"]);
        if (this.value == 0) {
            this.value = 1;
        }
    };
    /**
     * @return {?}
     */
    StarRatingComponent.prototype.setStars = /**
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
     * @return {?}
     */
    StarRatingComponent.prototype.applySizeAllStars = /**
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
                star.nativeElement.style.setProperty('--size', _this.size);
                if (star.nativeElement.classList.contains("half")) {
                    star.nativeElement.style.setProperty('--halfWidth', halfSize + "px");
                    star.nativeElement.style.setProperty('--halfMargin', halfMargin + "px");
                }
            });
        }
    };
    /**
     * @param {?} setChecked
     * @return {?}
     */
    StarRatingComponent.prototype.applyColorStyleAllStars = /**
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
     * @param {?} starElement
     * @return {?}
     */
    StarRatingComponent.prototype.applyColorStyle = /**
     * @param {?} starElement
     * @return {?}
     */
    function (starElement) {
        this.applyCheckedColorStyle(starElement);
        this.applyUnCheckedColorStyle(starElement);
    };
    /**
     * @param {?} starElement
     * @return {?}
     */
    StarRatingComponent.prototype.applyCheckedColorStyle = /**
     * @param {?} starElement
     * @return {?}
     */
    function (starElement) {
        starElement.style.setProperty('--checkedColor', this.checkedcolor);
    };
    /**
     * @param {?} starElement
     * @return {?}
     */
    StarRatingComponent.prototype.applyUnCheckedColorStyle = /**
     * @param {?} starElement
     * @return {?}
     */
    function (starElement) {
        starElement.style.setProperty('--unCheckedColor', this.uncheckedcolor);
    };
    /**
     * @return {?}
     */
    StarRatingComponent.prototype.generateRating = /**
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
                star.nativeElement.classList.add("star");
                if (_this.value >= i_1) {
                    // star on
                    star.nativeElement.classList.add("on");
                }
                else {
                    // hald star
                    if (hasDecimals_1) {
                        star.nativeElement.classList.add("half");
                        hasDecimals_1 = false;
                    }
                }
                i_1++;
            });
        }
    };
    StarRatingComponent.decorators = [
        { type: Component, args: [{
                    selector: 'star-rating',
                    template: "\n  <div #starMain>\n    <span data-index=\"1\" #star1></span>\n    <span data-index=\"2\" #star2></span>\n    <span data-index=\"3\" #star3></span>\n    <span data-index=\"4\" #star4></span>\n    <span data-index=\"5\" #star5></span>\n  </div>\n  <style>\n    :root {\n      --checkedColor: gold;\n      --unCheckedColor: gray;\n      --size: 24px;\n      --halfWidth: 10px;\n      --halfMargin: -20px;\n    }  \n    .star {\n      cursor: pointer;\n      color: var(--unCheckedColor);\n      font-size: var(--size);\n      width: var(--size);\n      display: inline-block;\n    }\n    .star:last-child {\n      margin-right: 0;\n    }\n    .star:before {\n      content:'\\2605';\n    }\n    .star.on {\n      color: var(--checkedColor);\n    }\n    .star.half:after {\n      content:'\\2605';\n      color: var(--checkedColor);\n      position: absolute;\n      margin-left: var(--halfMargin);\n      width: var(--halfWidth);\n      overflow: hidden;\n    }\n  </style>\n   "
                }] }
    ];
    /** @nocollapse */
    StarRatingComponent.ctorParameters = function () { return []; };
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
    return StarRatingComponent;
}());
export { StarRatingComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rhci1yYXRpbmcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctc3RhcnJhdGluZy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc3Rhci1yYXRpbmcvc3Rhci1yYXRpbmcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7O0lBcUU3QjtRQUFBLGlCQW9DQztxQkF4RGUsRUFBRTt5QkFLVyxLQUFLO1FBZ0JoQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7WUFDbkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUM7Z0JBQzNCLEtBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdEIsS0FBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7YUFDMUIsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFO1lBQzlCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQzFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLENBQUM7Z0JBQ2xDLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNwQyxDQUFDLENBQUM7U0FDSjtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUU7WUFDaEMsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7WUFDNUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFNBQVMsQ0FBQztnQkFDcEMsS0FBSSxDQUFDLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3JDLENBQUMsQ0FB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QixTQUFTLFNBQUMsT0FBTzsrQkFDakIsU0FBUyxTQUFDLE9BQU87K0JBQ2pCLFNBQVMsU0FBQyxPQUFPOytCQTREakIsS0FBSyxTQUFDLGNBQWM7aUNBT3BCLEtBQUssU0FBQyxnQkFBZ0I7d0JBT3RCLEtBQUssU0FBQyxPQUFPO3VCQWdCYixLQUFLLFNBQUMsTUFBTTsyQkFRWixLQUFLLFNBQUMsVUFBVTs7OEJBdEtuQjs7U0FpRGEsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3N0YXItcmF0aW5nJyxcbiAgdGVtcGxhdGU6IGBcbiAgPGRpdiAjc3Rhck1haW4+XG4gICAgPHNwYW4gZGF0YS1pbmRleD1cIjFcIiAjc3RhcjE+PC9zcGFuPlxuICAgIDxzcGFuIGRhdGEtaW5kZXg9XCIyXCIgI3N0YXIyPjwvc3Bhbj5cbiAgICA8c3BhbiBkYXRhLWluZGV4PVwiM1wiICNzdGFyMz48L3NwYW4+XG4gICAgPHNwYW4gZGF0YS1pbmRleD1cIjRcIiAjc3RhcjQ+PC9zcGFuPlxuICAgIDxzcGFuIGRhdGEtaW5kZXg9XCI1XCIgI3N0YXI1Pjwvc3Bhbj5cbiAgPC9kaXY+XG4gIDxzdHlsZT5cbiAgICA6cm9vdCB7XG4gICAgICAtLWNoZWNrZWRDb2xvcjogZ29sZDtcbiAgICAgIC0tdW5DaGVja2VkQ29sb3I6IGdyYXk7XG4gICAgICAtLXNpemU6IDI0cHg7XG4gICAgICAtLWhhbGZXaWR0aDogMTBweDtcbiAgICAgIC0taGFsZk1hcmdpbjogLTIwcHg7XG4gICAgfSAgXG4gICAgLnN0YXIge1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgY29sb3I6IHZhcigtLXVuQ2hlY2tlZENvbG9yKTtcbiAgICAgIGZvbnQtc2l6ZTogdmFyKC0tc2l6ZSk7XG4gICAgICB3aWR0aDogdmFyKC0tc2l6ZSk7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgfVxuICAgIC5zdGFyOmxhc3QtY2hpbGQge1xuICAgICAgbWFyZ2luLXJpZ2h0OiAwO1xuICAgIH1cbiAgICAuc3RhcjpiZWZvcmUge1xuICAgICAgY29udGVudDonXFxcXDI2MDUnO1xuICAgIH1cbiAgICAuc3Rhci5vbiB7XG4gICAgICBjb2xvcjogdmFyKC0tY2hlY2tlZENvbG9yKTtcbiAgICB9XG4gICAgLnN0YXIuaGFsZjphZnRlciB7XG4gICAgICBjb250ZW50OidcXFxcMjYwNSc7XG4gICAgICBjb2xvcjogdmFyKC0tY2hlY2tlZENvbG9yKTtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIG1hcmdpbi1sZWZ0OiB2YXIoLS1oYWxmTWFyZ2luKTtcbiAgICAgIHdpZHRoOiB2YXIoLS1oYWxmV2lkdGgpO1xuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB9XG4gIDwvc3R5bGU+XG4gICBgXG59KVxuXG5leHBvcnQgY2xhc3MgU3RhclJhdGluZ0NvbXBvbmVudCB7XG4gIHByaXZhdGUgc3RhcnMgPSBbXTtcbiAgcHJpdmF0ZSBfY2hlY2tlZENvbG9yOiBzdHJpbmc7XG4gIHByaXZhdGUgX3VuQ2hlY2tlZENvbG9yOiBzdHJpbmc7XG4gIHByaXZhdGUgX3ZhbHVlOiBudW1iZXI7XG4gIHByaXZhdGUgX3NpemU6IHN0cmluZztcbiAgcHJpdmF0ZSBfcmVhZE9ubHk6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwcml2YXRlIG9uVmFsdWVDaGFuZ2U6IFN1YmplY3Q8bnVtYmVyPjtcbiAgcHJpdmF0ZSBvbkNoZWNrZWRDb2xvckNoYW5nZTogU3ViamVjdDxzdHJpbmc+O1xuICBwcml2YXRlIG9uVW5DaGVja2VkQ29sb3JDaGFuZ2U6IFN1YmplY3Q8c3RyaW5nPjtcbiAgcHJpdmF0ZSBvblNpemVDaGFuZ2U6IFN1YmplY3Q8c3RyaW5nPjtcbiAgcHJpdmF0ZSBvblJlYWRPbmx5Q2hhbmdlOiBTdWJqZWN0PGJvb2xlYW4+O1xuXG4gIEBWaWV3Q2hpbGQoJ3N0YXJNYWluJykgcHJpdmF0ZSBtYWluRWxlbWVudDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnc3RhcjEnKSBwcml2YXRlIHN0YXIxRWxlbWVudDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnc3RhcjInKSBwcml2YXRlIHN0YXIyRWxlbWVudDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnc3RhcjMnKSBwcml2YXRlIHN0YXIzRWxlbWVudDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnc3RhcjQnKSBwcml2YXRlIHN0YXI0RWxlbWVudDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnc3RhcjUnKSBwcml2YXRlIHN0YXI1RWxlbWVudDogRWxlbWVudFJlZjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBpZiAoIXRoaXMub25WYWx1ZUNoYW5nZSkge1xuICAgICAgdGhpcy5vblZhbHVlQ2hhbmdlID0gbmV3IFN1YmplY3QoKTtcbiAgICAgIHRoaXMub25WYWx1ZUNoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmdlbmVyYXRlUmF0aW5nKCk7XG4gICAgICAgIHRoaXMuYXBwbHlTaXplQWxsU3RhcnMoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5vbkNoZWNrZWRDb2xvckNoYW5nZSkge1xuICAgICAgdGhpcy5vbkNoZWNrZWRDb2xvckNoYW5nZSA9IG5ldyBTdWJqZWN0KCk7XG4gICAgICB0aGlzLm9uQ2hlY2tlZENvbG9yQ2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuYXBwbHlDb2xvclN0eWxlQWxsU3RhcnModHJ1ZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMub25VbkNoZWNrZWRDb2xvckNoYW5nZSkge1xuICAgICAgdGhpcy5vblVuQ2hlY2tlZENvbG9yQ2hhbmdlID0gbmV3IFN1YmplY3QoKTtcbiAgICAgIHRoaXMub25VbkNoZWNrZWRDb2xvckNoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmFwcGx5Q29sb3JTdHlsZUFsbFN0YXJzKGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5vblNpemVDaGFuZ2UpIHtcbiAgICAgIHRoaXMub25TaXplQ2hhbmdlID0gbmV3IFN1YmplY3QoKTtcbiAgICAgIHRoaXMub25TaXplQ2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuYXBwbHlTaXplQWxsU3RhcnMoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5vblJlYWRPbmx5Q2hhbmdlKSB7XG4gICAgICB0aGlzLm9uUmVhZE9ubHlDaGFuZ2UgPSBuZXcgU3ViamVjdCgpO1xuICAgICAgdGhpcy5vblJlYWRPbmx5Q2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuYWRkUmVtb3ZlRXZlbnRzKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBnZXQgY2hlY2tlZGNvbG9yKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2NoZWNrZWRDb2xvcjtcbiAgfVxuXG4gIGdldCB1bmNoZWNrZWRjb2xvcigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl91bkNoZWNrZWRDb2xvcjtcbiAgfVxuXG4gIGdldCB2YWx1ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIGdldCBzaXplKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3NpemUuY29uY2F0KCghdGhpcy5fc2l6ZS5pbmNsdWRlcyhcInB4XCIpID8gXCJweFwiIDogXCJcIikpO1xuICB9XG5cbiAgZ2V0IHJlYWRvbmx5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBTdHJpbmcodGhpcy5fcmVhZE9ubHkpID09PSBcInRydWVcIjtcbiAgfVxuXG4gIEBJbnB1dCgnY2hlY2tlZGNvbG9yJykgc2V0IGNoZWNrZWRjb2xvcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fY2hlY2tlZENvbG9yID0gdmFsdWU7XG4gICAgaWYgKHRoaXMuX2NoZWNrZWRDb2xvcikge1xuICAgICAgdGhpcy5vbkNoZWNrZWRDb2xvckNoYW5nZS5uZXh0KHRoaXMuX2NoZWNrZWRDb2xvcik7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCd1bmNoZWNrZWRjb2xvcicpIHNldCB1bmNoZWNrZWRjb2xvcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fdW5DaGVja2VkQ29sb3IgPSB2YWx1ZTtcbiAgICBpZiAodGhpcy5fdW5DaGVja2VkQ29sb3IpIHtcbiAgICAgIHRoaXMub25VbkNoZWNrZWRDb2xvckNoYW5nZS5uZXh0KHRoaXMuX3VuQ2hlY2tlZENvbG9yKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoJ3ZhbHVlJykgc2V0IHZhbHVlKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAoIXZhbHVlIHx8IHZhbHVlID09IG51bGwpIHtcbiAgICAgIHZhbHVlID0gMDtcbiAgICB9XG5cbiAgICBpZiAodmFsdWUgPiA1KSB7XG4gICAgICB2YWx1ZSA9IDU7XG4gICAgfVxuXG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcblxuICAgIGlmICh0aGlzLl92YWx1ZSA+PSAwKSB7XG4gICAgICB0aGlzLm9uVmFsdWVDaGFuZ2UubmV4dCh0aGlzLl92YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCdzaXplJykgc2V0IHNpemUodmFsdWU6IHN0cmluZykge1xuICAgIGlmICghdmFsdWUgfHwgdmFsdWUgPT0gbnVsbCB8fCB2YWx1ZSA9PSBcIjBweFwiKSB7XG4gICAgICB2YWx1ZSA9IFwiMjRweFwiO1xuICAgIH1cbiAgICB0aGlzLl9zaXplID0gdmFsdWU7XG4gICAgdGhpcy5vblNpemVDaGFuZ2UubmV4dCh0aGlzLl9zaXplKTtcbiAgfVxuXG4gIEBJbnB1dCgncmVhZG9ubHknKSBzZXQgcmVhZG9ubHkodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9yZWFkT25seSA9IHZhbHVlO1xuICAgIHRoaXMub25SZWFkT25seUNoYW5nZS5uZXh0KHZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgbWFrZUVkaXRhYmxlKCkge1xuICAgIHRoaXMuc3RhcnMuZm9yRWFjaChzdGFyID0+IHtcbiAgICAgIHN0YXIubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMucmF0ZS5iaW5kKHRoaXMpKTtcbiAgICAgIHN0YXIubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCB0aGlzLnJhdGUuYmluZCh0aGlzKSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIG1ha2VSZWFkT25seSgpIHtcbiAgICB0aGlzLnN0YXJzLmZvckVhY2goKHN0YXI6RWxlbWVudFJlZikgPT4ge1xuICAgICAgc3Rhci5uYXRpdmVFbGVtZW50Ll9fem9uZV9zeW1ib2xfX2NsaWNrZmFsc2UgPSBudWxsO1xuICAgICAgc3Rhci5uYXRpdmVFbGVtZW50Ll9fem9uZV9zeW1ib2xfX21vdXNlb3ZlcmZhbHNlID0gbnVsbDtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkUmVtb3ZlRXZlbnRzKCkge1xuICAgIGlmICh0aGlzLnJlYWRvbmx5KSB7XG4gICAgICB0aGlzLm1ha2VSZWFkT25seSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1ha2VFZGl0YWJsZSgpO1xuICAgICAgdGhpcy5vblZhbHVlQ2hhbmdlLm5leHQodGhpcy52YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBuZ0FmdGVyVmlld0luaXQoKSB7XG4gIH1cblxuICBwcml2YXRlIHJhdGUoZXZlbnQ6TW91c2VFdmVudCkge1xuICAgIGxldCBzdGFyOkhUTUxFbGVtZW50ID0gPEhUTUxFbGVtZW50PiBldmVudC5zcmNFbGVtZW50O1xuICAgIHRoaXMudmFsdWUgPSBwYXJzZUludChzdGFyLmRhdGFzZXQuaW5kZXgpO1xuICAgIGlmICh0aGlzLnZhbHVlID09IDApIHtcbiAgICAgIHRoaXMudmFsdWUgPSAxO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0U3RhcnMoKSB7XG4gICAgaWYgKHRoaXMuc3RhcnMubGVuZ3RoID09IDApIHtcbiAgICAgIHRoaXMuc3RhcnMucHVzaCh0aGlzLnN0YXIxRWxlbWVudCk7XG4gICAgICB0aGlzLnN0YXJzLnB1c2godGhpcy5zdGFyMkVsZW1lbnQpO1xuICAgICAgdGhpcy5zdGFycy5wdXNoKHRoaXMuc3RhcjNFbGVtZW50KTtcbiAgICAgIHRoaXMuc3RhcnMucHVzaCh0aGlzLnN0YXI0RWxlbWVudCk7XG4gICAgICB0aGlzLnN0YXJzLnB1c2godGhpcy5zdGFyNUVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlTaXplQWxsU3RhcnMoKSB7XG4gICAgaWYgKHRoaXMuX3NpemUpIHtcbiAgICAgIHRoaXMuc3RhcnMuZm9yRWFjaCgoc3RhcjpFbGVtZW50UmVmKSA9PiB7XG4gICAgICAgIGxldCBuZXdTaXplID0gdGhpcy5zaXplLm1hdGNoKC9cXGQrLylbMF07XG4gICAgICAgIGxldCBoYWxmU2l6ZSA9IChwYXJzZUludChuZXdTaXplKSAqIDEwKSAvIDI0O1xuICAgICAgICBsZXQgaGFsZk1hcmdpbiA9IDAgLSAoKHBhcnNlSW50KG5ld1NpemUpICogMjApIC8gMjQpO1xuICAgICAgICBzdGFyLm5hdGl2ZUVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tc2l6ZScsIHRoaXMuc2l6ZSk7XG4gICAgICAgIGlmIChzdGFyLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGFsZlwiKSkge1xuICAgICAgICAgIHN0YXIubmF0aXZlRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1oYWxmV2lkdGgnLCBgJHtoYWxmU2l6ZX1weGApO1xuICAgICAgICAgIHN0YXIubmF0aXZlRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1oYWxmTWFyZ2luJywgYCR7aGFsZk1hcmdpbn1weGApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFwcGx5Q29sb3JTdHlsZUFsbFN0YXJzKHNldENoZWNrZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLnN0YXJzLmZvckVhY2goc3RhciA9PiB7XG4gICAgICBpZiAoc2V0Q2hlY2tlZCkge1xuICAgICAgICB0aGlzLmFwcGx5Q2hlY2tlZENvbG9yU3R5bGUoc3Rhci5uYXRpdmVFbGVtZW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYXBwbHlVbkNoZWNrZWRDb2xvclN0eWxlKHN0YXIubmF0aXZlRWxlbWVudCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFwcGx5Q29sb3JTdHlsZShzdGFyRWxlbWVudDogSFRNTFNwYW5FbGVtZW50KSB7XG4gICAgdGhpcy5hcHBseUNoZWNrZWRDb2xvclN0eWxlKHN0YXJFbGVtZW50KTtcbiAgICB0aGlzLmFwcGx5VW5DaGVja2VkQ29sb3JTdHlsZShzdGFyRWxlbWVudCk7XG4gIH1cblxuICBwcml2YXRlIGFwcGx5Q2hlY2tlZENvbG9yU3R5bGUoc3RhckVsZW1lbnQ6IEhUTUxTcGFuRWxlbWVudCkge1xuICAgIHN0YXJFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLWNoZWNrZWRDb2xvcicsIHRoaXMuY2hlY2tlZGNvbG9yKTtcbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlVbkNoZWNrZWRDb2xvclN0eWxlKHN0YXJFbGVtZW50OiBIVE1MU3BhbkVsZW1lbnQpIHtcbiAgICBzdGFyRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS11bkNoZWNrZWRDb2xvcicsIHRoaXMudW5jaGVja2VkY29sb3IpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZW5lcmF0ZVJhdGluZygpIHtcbiAgICBpZiAodGhpcy5yZWFkb25seSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXJzKCk7XG4gICAgaWYgKHRoaXMudmFsdWUgPj0gMCkge1xuICAgICAgdGhpcy5tYWluRWxlbWVudC5uYXRpdmVFbGVtZW50LnRpdGxlID0gdGhpcy52YWx1ZTtcblxuICAgICAgbGV0IGhhc0RlY2ltYWxzOiBib29sZWFuID1cbiAgICAgICAgKChOdW1iZXIucGFyc2VGbG9hdCh0aGlzLnZhbHVlLnRvU3RyaW5nKCkpICUgMSlcbiAgICAgICAgICAudG9TdHJpbmcoKVxuICAgICAgICAgIC5zdWJzdHJpbmcoMywgMikpID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgICBsZXQgaSA9IDE7XG4gICAgICB0aGlzLnN0YXJzLmZvckVhY2goc3RhciA9PiB7XG4gICAgICAgIHN0YXIubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QgPSBbXTtcbiAgICAgICAgdGhpcy5hcHBseUNvbG9yU3R5bGUoc3Rhci5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgc3Rhci5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzdGFyXCIpO1xuXG4gICAgICAgIGlmICh0aGlzLnZhbHVlID49IGkpIHtcbiAgICAgICAgICAvLyBzdGFyIG9uXG4gICAgICAgICAgc3Rhci5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJvblwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBoYWxkIHN0YXJcbiAgICAgICAgICBpZiAoaGFzRGVjaW1hbHMpIHtcbiAgICAgICAgICAgIHN0YXIubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaGFsZlwiKTtcbiAgICAgICAgICAgIGhhc0RlY2ltYWxzID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGkrKztcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19