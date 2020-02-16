import { __decorate, __spread } from 'tslib';
import { Component, EventEmitter, ViewChild, Output, Input, ViewEncapsulation, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';

var RatingComponent = /** @class */ (function () {
    function RatingComponent() {
    }
    RatingComponent.prototype.ngOnInit = function () {
    };
    RatingComponent = __decorate([
        Component({
            selector: 'lib-rating',
            template: "\n    <p>\n      rating works!\n    </p>\n  "
        })
    ], RatingComponent);
    return RatingComponent;
}());

var StarRatingComponent = /** @class */ (function () {
    function StarRatingComponent() {
        var _this = this;
        this.stars = [];
        this._readOnly = false;
        this._totalStars = 5;
        this.rate = new EventEmitter();
        this.onStarsCountChange = new Subject();
        this.onStarsCountChange.subscribe(function () {
            _this.setStars();
            _this.generateRating(true);
            _this.applySizeAllStars();
            _this.applyColorStyleAllStars(false);
            _this.addEvents();
        });
        this.onValueChange = new Subject();
        this.onValueChange.subscribe(function () {
            _this.generateRating();
            _this.applySizeAllStars();
        });
        this.onCheckedColorChange = new Subject();
        this.onCheckedColorChange.subscribe(function () {
            _this.applyColorStyleAllStars(true);
        });
        this.onUnCheckedColorChange = new Subject();
        this.onUnCheckedColorChange.subscribe(function () {
            _this.applyColorStyleAllStars(false);
        });
        this.onSizeChange = new Subject();
        this.onSizeChange.subscribe(function () {
            _this.applySizeAllStars();
        });
        this.onReadOnlyChange = new Subject();
        this.onReadOnlyChange.subscribe(function () {
            _this.readonly ? _this.makeReadOnly() : _this.makeEditable();
        });
    }
    StarRatingComponent_1 = StarRatingComponent;
    Object.defineProperty(StarRatingComponent.prototype, "checkedcolor", {
        get: function () {
            return this._checkedColor;
        },
        set: function (value) {
            this._checkedColor = value;
            this._checkedColor && this.onCheckedColorChange.next(this._checkedColor);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StarRatingComponent.prototype, "uncheckedcolor", {
        get: function () {
            return this._unCheckedColor;
        },
        set: function (value) {
            this._unCheckedColor = value;
            this._unCheckedColor && this.onUnCheckedColorChange.next(this._unCheckedColor);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StarRatingComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            value = (!value || value == null) ? 0 : value;
            this._value = value;
            this._value >= 0 && this.onValueChange.next(this._value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StarRatingComponent.prototype, "size", {
        get: function () {
            return this._size.concat((!this._size.includes("px") ? "px" : ""));
        },
        set: function (value) {
            value = (!value || value == null || value == "0px") ? "24px" : value;
            this._size = value;
            this.onSizeChange.next(this._size);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StarRatingComponent.prototype, "readonly", {
        get: function () {
            return String(this._readOnly) === "true";
        },
        set: function (value) {
            this._readOnly = value;
            this.onReadOnlyChange.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StarRatingComponent.prototype, "totalstars", {
        get: function () {
            return this._totalStars;
        },
        set: function (value) {
            this._totalStars = value <= 0 ? 5 : Math.round(value);
            this.onStarsCountChange.next(this._totalStars);
        },
        enumerable: true,
        configurable: true
    });
    StarRatingComponent.prototype.makeEditable = function () {
        if (!this.mainElement)
            return;
        this.mainElement.nativeElement.style.cursor = "pointer";
        this.mainElement.nativeElement.title = this.value;
        this.stars.forEach(function (star) {
            star.style.cursor = "pointer";
            star.title = star.dataset.index;
        });
    };
    StarRatingComponent.prototype.makeReadOnly = function () {
        if (!this.mainElement)
            return;
        this.mainElement.nativeElement.style.cursor = "default";
        this.mainElement.nativeElement.title = this.value;
        this.stars.forEach(function (star) {
            star.style.cursor = "default";
            star.title = "";
        });
    };
    StarRatingComponent.prototype.addEvents = function () {
        var _this = this;
        if (!this.mainElement)
            return;
        this.mainElement.nativeElement.addEventListener('mouseleave', this.offStar.bind(this));
        this.mainElement.nativeElement.style.cursor = "pointer";
        this.mainElement.nativeElement.title = this.value;
        this.stars.forEach(function (star) {
            star.addEventListener('click', _this.onRate.bind(_this));
            star.addEventListener('mouseenter', _this.onStar.bind(_this));
            star.style.cursor = "pointer";
            star.title = star.dataset.index;
        });
    };
    StarRatingComponent.prototype.ngAfterViewInit = function () {
    };
    StarRatingComponent.prototype.onRate = function (event) {
        if (this.readonly)
            return;
        var star = event.srcElement;
        var oldValue = this.value;
        this.value = parseInt(star.dataset.index);
        // if (this.value == 0) {
        //   this.value = 1;
        // }
        var rateValues = { oldValue: oldValue, newValue: this.value, starRating: this };
        this.rate.emit(rateValues);
    };
    StarRatingComponent.prototype.onStar = function (event) {
        if (this.readonly)
            return;
        var star = event.srcElement;
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
    StarRatingComponent.prototype.offStar = function (event) {
        this.generateRating();
    };
    StarRatingComponent.prototype.addDefaultClass = function (star) {
        star.classList.add(StarRatingComponent_1.CLS_DEFAULT_STAR);
    };
    StarRatingComponent.prototype.addCheckedStarClass = function (star) {
        star.classList.add(StarRatingComponent_1.CLS_CHECKED_STAR);
    };
    StarRatingComponent.prototype.addHalfStarClass = function (star) {
        star.classList.add(StarRatingComponent_1.CLS_HALF_STAR);
    };
    StarRatingComponent.prototype.setStars = function () {
        var _this = this;
        if (!this.mainElement)
            return;
        var starContainer = this.mainElement.nativeElement;
        var maxStars = __spread(Array(Number(this.totalstars)).keys());
        this.stars.length = 0;
        starContainer.innerHTML = "";
        maxStars.forEach(function (starNumber) {
            var starElement = document.createElement("span");
            starElement.dataset.index = (starNumber + 1).toString();
            starElement.title = starElement.dataset.index;
            starContainer.appendChild(starElement);
            _this.stars.push(starElement);
        });
    };
    StarRatingComponent.prototype.applySizeAllStars = function () {
        var _this = this;
        if (this._size) {
            this.stars.length == 0 && this.setStars();
            this.stars.forEach(function (star) {
                var newSize = _this.size.match(/\d+/)[0];
                var halfSize = (parseInt(newSize) * 10) / 24;
                var halfMargin = 0 - ((parseInt(newSize) * 20) / 24);
                star.style.setProperty(StarRatingComponent_1.VAR_SIZE, _this.size);
                if (star.classList.contains(StarRatingComponent_1.CLS_HALF_STAR)) {
                    star.style.setProperty(StarRatingComponent_1.VAR_HALF_WIDTH, halfSize + "px");
                    star.style.setProperty(StarRatingComponent_1.VAR_HALF_MARGIN, halfMargin + "px");
                }
            });
        }
    };
    StarRatingComponent.prototype.applyColorStyleAllStars = function (setChecked) {
        var _this = this;
        this.stars.length == 0 && this.setStars();
        this.stars.forEach(function (star) {
            if (setChecked) {
                _this.applyCheckedColorStyle(star);
            }
            else {
                _this.applyUnCheckedColorStyle(star);
            }
        });
    };
    StarRatingComponent.prototype.applyColorStyle = function (starElement) {
        this.applyCheckedColorStyle(starElement);
        this.applyUnCheckedColorStyle(starElement);
    };
    StarRatingComponent.prototype.applyCheckedColorStyle = function (starElement) {
        starElement.style.setProperty(StarRatingComponent_1.VAR_CHECKED_COLOR, this.checkedcolor);
    };
    StarRatingComponent.prototype.applyUnCheckedColorStyle = function (starElement) {
        starElement.style.setProperty(StarRatingComponent_1.VAR_UNCHECKED_COLOR, this.uncheckedcolor);
    };
    StarRatingComponent.prototype.generateRating = function (forceGenerate) {
        var _this = this;
        if (forceGenerate === void 0) { forceGenerate = false; }
        if (!this.mainElement)
            return;
        if (this.readonly && !forceGenerate)
            return;
        //if (this.value >= 0) {
        this.stars.length == 0 && this.setStars();
        this.mainElement.nativeElement.title = this.value;
        var hasDecimals = ((Number.parseFloat(this.value.toString()) % 1)
            .toString()
            .substring(3, 2)) ? true : false;
        var i = 1;
        this.stars.forEach(function (star) {
            star.className = "";
            _this.applyColorStyle(star);
            _this.addDefaultClass(star);
            if (_this.value >= i) {
                // star on
                _this.addCheckedStarClass(star);
            }
            else {
                // half star
                if (hasDecimals) {
                    _this.addHalfStarClass(star);
                    hasDecimals = false;
                }
            }
            i++;
        });
        //}
    };
    var StarRatingComponent_1;
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
    __decorate([
        ViewChild('starMain', { static: true })
    ], StarRatingComponent.prototype, "mainElement", void 0);
    __decorate([
        Output()
    ], StarRatingComponent.prototype, "rate", void 0);
    __decorate([
        Input(StarRatingComponent_1.INP_CHECKED_COLOR)
    ], StarRatingComponent.prototype, "checkedcolor", null);
    __decorate([
        Input(StarRatingComponent_1.INP_UNCHECKED_COLOR)
    ], StarRatingComponent.prototype, "uncheckedcolor", null);
    __decorate([
        Input(StarRatingComponent_1.INP_VALUE)
    ], StarRatingComponent.prototype, "value", null);
    __decorate([
        Input(StarRatingComponent_1.INP_SIZE)
    ], StarRatingComponent.prototype, "size", null);
    __decorate([
        Input(StarRatingComponent_1.INP_READONLY)
    ], StarRatingComponent.prototype, "readonly", null);
    __decorate([
        Input(StarRatingComponent_1.INP_TOTALSTARS)
    ], StarRatingComponent.prototype, "totalstars", null);
    StarRatingComponent = StarRatingComponent_1 = __decorate([
        Component({
            selector: 'star-rating',
            template: "<div #starMain>\n</div>",
            encapsulation: ViewEncapsulation.ShadowDom,
            styles: [":root{--checkedColor:gold;--unCheckedColor:gray;--size:24px;--halfWidth:10px;--halfMargin:-20px}.star{cursor:pointer;color:var(--unCheckedColor);font-size:var(--size);width:var(--size);display:inline-block}.star:last-child{margin-right:0}.star:before{content:'\\2605'}.star.on{color:var(--checkedColor)}.star.half:after{content:'\\2605';color:var(--checkedColor);position:absolute;margin-left:var(--halfMargin);width:var(--halfWidth);overflow:hidden}"]
        })
    ], StarRatingComponent);
    return StarRatingComponent;
}());

var RatingModule = /** @class */ (function () {
    function RatingModule() {
    }
    RatingModule.prototype.ngDoBootstrap = function () { };
    RatingModule = __decorate([
        NgModule({
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
        })
    ], RatingModule);
    return RatingModule;
}());

/*
 * Public API Surface of rating
 */

/**
 * Generated bundle index. Do not edit.
 */

export { RatingModule, StarRatingComponent, RatingComponent as ɵa };
//# sourceMappingURL=ng-starrating.js.map
