import { __decorate, __metadata, __read, __spread } from "tslib";
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
            this.onStarsCountChange.subscribe(function () {
                _this.setStars();
                _this.generateRating(true);
                _this.applySizeAllStars();
                _this.applyColorStyleAllStars(false);
                _this.addEvents();
            });
        }
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
                _this.readonly ? _this.makeReadOnly() : _this.makeEditable();
            });
        }
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
        if (this.value == 0) {
            this.value = 1;
        }
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
                // const newSize = this._size.match(/\d+/)[0];
                // let halfSize = parseInt(newSize, 10) / 2;
                // let halfMargin = 0 - parseInt(newSize, 10);        
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
        if (this.readonly && !forceGenerate)
            return;
        if (!this.mainElement)
            return;
        this.stars.length == 0 && this.setStars();
        if (this.value >= 0) {
            this.mainElement.nativeElement.title = this.value;
            var hasDecimals_1 = ((Number.parseFloat(this.value.toString()) % 1)
                .toString()
                .substring(3, 2)) ? true : false;
            var i_1 = 1;
            this.stars.forEach(function (star) {
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
            });
        }
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
        ViewChild('starMain', { static: true }),
        __metadata("design:type", ElementRef)
    ], StarRatingComponent.prototype, "mainElement", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], StarRatingComponent.prototype, "rate", void 0);
    __decorate([
        Input(StarRatingComponent_1.INP_CHECKED_COLOR),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], StarRatingComponent.prototype, "checkedcolor", null);
    __decorate([
        Input(StarRatingComponent_1.INP_UNCHECKED_COLOR),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], StarRatingComponent.prototype, "uncheckedcolor", null);
    __decorate([
        Input(StarRatingComponent_1.INP_VALUE),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], StarRatingComponent.prototype, "value", null);
    __decorate([
        Input(StarRatingComponent_1.INP_SIZE),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], StarRatingComponent.prototype, "size", null);
    __decorate([
        Input(StarRatingComponent_1.INP_READONLY),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], StarRatingComponent.prototype, "readonly", null);
    __decorate([
        Input(StarRatingComponent_1.INP_TOTALSTARS),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], StarRatingComponent.prototype, "totalstars", null);
    StarRatingComponent = StarRatingComponent_1 = __decorate([
        Component({
            selector: 'star-rating',
            template: "<div #starMain>\r\n</div>\r\n\r\n<!-- <ng-container *ngFor=\"let star of stars; let i = index;\">\r\n    <span \r\n        (click)=\"!isReadOnly && onRate(i)\" \r\n        (mouseleave)=\"!isReadOnly && generateRating()\"\r\n        (mouseenter)=\"!isReadOnly && onStar(i)\" \r\n        [ngStyle]=\"{\r\n            'font-size': getSize(),\r\n            'width': getSize(),\r\n            pointer: isReadOnly ? 'default' : 'pointer'\r\n        }\" \r\n        [ngClass]=\"{\r\n            on: star.checked,\r\n            half: star.isHalf,\r\n            readOnly: isReadOnly,\r\n            editable: !isReadOnly\r\n        }\"></span>\r\n</ng-container> -->",
            encapsulation: ViewEncapsulation.ShadowDom,
            styles: [":root{--checkedColor:gold;--unCheckedColor:gray;--size:24px;--halfWidth:10px;--halfMargin:-20px}.star{cursor:pointer;color:var(--unCheckedColor);font-size:var(--size);width:var(--size);display:inline-block}.star:last-child{margin-right:0}.star:before{content:'\\2605'}.star.on{color:var(--checkedColor)}.star.half:after{content:'\\2605';color:var(--checkedColor);position:absolute;margin-left:var(--halfMargin);width:var(--halfWidth);overflow:hidden}"]
        }),
        __metadata("design:paramtypes", [])
    ], StarRatingComponent);
    return StarRatingComponent;
}());
export { StarRatingComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rhci1yYXRpbmcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctc3RhcnJhdGluZy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc3Rhci1yYXRpbmcvc3Rhci1yYXRpbmcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFDdEQsWUFBWSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFTL0I7SUFrQ0U7UUFBQSxpQkErQ0M7UUFoRk8sVUFBSyxHQUFtQixFQUFFLENBQUM7UUFNM0IsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUUzQixnQkFBVyxHQUFXLENBQUMsQ0FBQztRQWtHdEIsU0FBSSxHQUEwRixJQUFJLFlBQVksRUFBRSxDQUFDO1FBeEV6SCxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQzVCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQ3hDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUM7Z0JBQ2hDLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDaEIsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDMUIsS0FBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7Z0JBQ3pCLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDcEMsS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ25CLENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7WUFDbkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUM7Z0JBQzNCLEtBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdEIsS0FBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDM0IsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUU7WUFDOUIsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7WUFDMUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFNBQVMsQ0FBQztnQkFDbEMsS0FBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JDLENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFO1lBQ2hDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQzVDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUM7Z0JBQ3BDLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0QyxDQUFDLENBQUMsQ0FBQztTQUNKO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDdEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDO2dCQUMxQixLQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUMzQixDQUFDLENBQUMsQ0FBQztTQUNKO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUMxQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUN0QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDO2dCQUM5QixLQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUM1RCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs0QkFqRlUsbUJBQW1CO0lBbUY5QixzQkFBSSw2Q0FBWTthQUFoQjtZQUNFLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUM1QixDQUFDO2FBd0I2QyxVQUFpQixLQUFhO1lBQzFFLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1lBQzNCLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDM0UsQ0FBQzs7O09BM0JBO0lBRUQsc0JBQUksK0NBQWM7YUFBbEI7WUFDRSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDOUIsQ0FBQzthQXlCK0MsVUFBbUIsS0FBYTtZQUM5RSxJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztZQUM3QixJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2pGLENBQUM7OztPQTVCQTtJQUVELHNCQUFJLHNDQUFLO2FBQVQ7WUFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDckIsQ0FBQzthQTBCcUMsVUFBVSxLQUFhO1lBQzNELEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDOUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNELENBQUM7OztPQTlCQTtJQUVELHNCQUFJLHFDQUFJO2FBQVI7WUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3JFLENBQUM7YUE0Qm9DLFVBQVMsS0FBYTtZQUN6RCxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDckUsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLENBQUM7OztPQWhDQTtJQUVELHNCQUFJLHlDQUFRO2FBQVo7WUFDRSxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssTUFBTSxDQUFDO1FBQzNDLENBQUM7YUE4QndDLFVBQWEsS0FBYztZQUNsRSxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN2QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLENBQUM7OztPQWpDQTtJQUVELHNCQUFJLDJDQUFVO2FBQWQ7WUFDRSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDMUIsQ0FBQzthQStCMEMsVUFBZSxLQUFhO1lBQ3JFLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2pELENBQUM7OztPQWxDQTtJQW9DTywwQ0FBWSxHQUFwQjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVztZQUFFLE9BQU87UUFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7UUFDeEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDbEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFTO1lBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztZQUM5QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLDBDQUFZLEdBQXBCO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXO1lBQUUsT0FBTztRQUM5QixJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztRQUN4RCxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNsRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQVM7WUFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO1lBQzlCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLHVDQUFTLEdBQWpCO1FBQUEsaUJBV0M7UUFWQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVc7WUFBRSxPQUFPO1FBQzlCLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3ZGLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO1FBQ3hELElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ2xELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBUztZQUMzQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzVELElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztZQUM5QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUdPLDZDQUFlLEdBQXZCO0lBQ0EsQ0FBQztJQUVPLG9DQUFNLEdBQWQsVUFBZSxLQUFpQjtRQUM5QixJQUFJLElBQUksQ0FBQyxRQUFRO1lBQUUsT0FBTztRQUMxQixJQUFJLElBQUksR0FBNkIsS0FBSyxDQUFDLFVBQVUsQ0FBQztRQUN0RCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzFCLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUMsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsRUFBRTtZQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztTQUNoQjtRQUNELElBQUksVUFBVSxHQUFHLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDaEYsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVPLG9DQUFNLEdBQWQsVUFBZSxLQUFpQjtRQUM5QixJQUFJLElBQUksQ0FBQyxRQUFRO1lBQUUsT0FBTztRQUMxQixJQUFJLElBQUksR0FBNkIsS0FBSyxDQUFDLFVBQVUsQ0FBQztRQUN0RCxJQUFJLFlBQVksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVoRCxLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsWUFBWSxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ2pELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztZQUNqQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQzdDO1FBRUQsS0FBSyxJQUFJLEtBQUssR0FBRyxZQUFZLEVBQUUsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ2pFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztZQUNqQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUN6QztJQUNILENBQUM7SUFFTyxxQ0FBTyxHQUFmLFVBQWdCLEtBQWlCO1FBQy9CLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRU8sNkNBQWUsR0FBdkIsVUFBd0IsSUFBUztRQUMvQixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxxQkFBbUIsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFTyxpREFBbUIsR0FBM0IsVUFBNEIsSUFBUztRQUNuQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxxQkFBbUIsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFTyw4Q0FBZ0IsR0FBeEIsVUFBeUIsSUFBUztRQUNoQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxxQkFBbUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRU8sc0NBQVEsR0FBaEI7UUFBQSxpQkFhQztRQVpDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVztZQUFFLE9BQU87UUFDOUIsSUFBSSxhQUFhLEdBQW1CLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDO1FBQ25FLElBQUksUUFBUSxZQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDdEIsYUFBYSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDN0IsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLFVBQVU7WUFDekIsSUFBSSxXQUFXLEdBQW9CLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbEUsV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDeEQsV0FBVyxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUM5QyxhQUFhLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3ZDLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLCtDQUFpQixHQUF6QjtRQUFBLGlCQWlCQztRQWhCQyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBUztnQkFDM0IsOENBQThDO2dCQUM5Qyw0Q0FBNEM7Z0JBQzVDLHNEQUFzRDtnQkFDdEQsSUFBSSxPQUFPLEdBQUcsS0FBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hDLElBQUksUUFBUSxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDN0MsSUFBSSxVQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7Z0JBQ3JELElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLHFCQUFtQixDQUFDLFFBQVEsRUFBRSxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2hFLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMscUJBQW1CLENBQUMsYUFBYSxDQUFDLEVBQUU7b0JBQzlELElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLHFCQUFtQixDQUFDLGNBQWMsRUFBSyxRQUFRLE9BQUksQ0FBQyxDQUFDO29CQUM1RSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxxQkFBbUIsQ0FBQyxlQUFlLEVBQUssVUFBVSxPQUFJLENBQUMsQ0FBQztpQkFDaEY7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVPLHFEQUF1QixHQUEvQixVQUFnQyxVQUFtQjtRQUFuRCxpQkFTQztRQVJDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFTO1lBQzNCLElBQUksVUFBVSxFQUFFO2dCQUNkLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNuQztpQkFBTTtnQkFDTCxLQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDckM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyw2Q0FBZSxHQUF2QixVQUF3QixXQUE0QjtRQUNsRCxJQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFTyxvREFBc0IsR0FBOUIsVUFBK0IsV0FBNEI7UUFDekQsV0FBVyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMscUJBQW1CLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzFGLENBQUM7SUFFTyxzREFBd0IsR0FBaEMsVUFBaUMsV0FBNEI7UUFDM0QsV0FBVyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMscUJBQW1CLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQzlGLENBQUM7SUFFTyw0Q0FBYyxHQUF0QixVQUF1QixhQUE2QjtRQUFwRCxpQkErQkM7UUEvQnNCLDhCQUFBLEVBQUEscUJBQTZCO1FBQ2xELElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLGFBQWE7WUFBRSxPQUFPO1FBQzVDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVztZQUFFLE9BQU87UUFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMxQyxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxFQUFFO1lBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRWxELElBQUksYUFBVyxHQUNiLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQzVDLFFBQVEsRUFBRTtpQkFDVixTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBRXJDLElBQUksR0FBQyxHQUFHLENBQUMsQ0FBQztZQUNWLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBUztnQkFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7Z0JBQ3BCLEtBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzNCLEtBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRTNCLElBQUksS0FBSSxDQUFDLEtBQUssSUFBSSxHQUFDLEVBQUU7b0JBQ25CLFVBQVU7b0JBQ1YsS0FBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNoQztxQkFBTTtvQkFDTCxZQUFZO29CQUNaLElBQUksYUFBVyxFQUFFO3dCQUNmLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDNUIsYUFBVyxHQUFHLEtBQUssQ0FBQztxQkFDckI7aUJBQ0Y7Z0JBQ0QsR0FBQyxFQUFFLENBQUM7WUFDTixDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7SUF2U3VCLHFDQUFpQixHQUFXLGdCQUFnQixDQUFDO0lBQzdDLHVDQUFtQixHQUFXLGtCQUFrQixDQUFDO0lBQ2pELDRCQUFRLEdBQVcsUUFBUSxDQUFDO0lBQzVCLGtDQUFjLEdBQVcsYUFBYSxDQUFDO0lBQ3ZDLG1DQUFlLEdBQVcsY0FBYyxDQUFDO0lBQ3pDLG9DQUFnQixHQUFXLElBQUksQ0FBQztJQUNoQyxvQ0FBZ0IsR0FBVyxNQUFNLENBQUM7SUFDbEMsaUNBQWEsR0FBVyxNQUFNLENBQUM7SUFDL0IscUNBQWlCLEdBQVcsY0FBYyxDQUFDO0lBQzNDLHVDQUFtQixHQUFXLGdCQUFnQixDQUFDO0lBQy9DLDZCQUFTLEdBQVcsT0FBTyxDQUFDO0lBQzVCLDRCQUFRLEdBQVcsTUFBTSxDQUFDO0lBQzFCLGdDQUFZLEdBQVcsVUFBVSxDQUFDO0lBQ2xDLGtDQUFjLEdBQVcsWUFBWSxDQUFDO0lBRXJCO1FBQXhDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7a0NBQXNCLFVBQVU7NERBQUM7SUEyRS9EO1FBQVQsTUFBTSxFQUFFO2tDQUFPLFlBQVk7cURBQStGO0lBRTdFO1FBQTdDLEtBQUssQ0FBQyxxQkFBbUIsQ0FBQyxpQkFBaUIsQ0FBQzs7OzJEQUc1QztJQUUrQztRQUEvQyxLQUFLLENBQUMscUJBQW1CLENBQUMsbUJBQW1CLENBQUM7Ozs2REFHOUM7SUFFcUM7UUFBckMsS0FBSyxDQUFDLHFCQUFtQixDQUFDLFNBQVMsQ0FBQzs7O29EQUlwQztJQUVvQztRQUFwQyxLQUFLLENBQUMscUJBQW1CLENBQUMsUUFBUSxDQUFDOzs7bURBSW5DO0lBRXdDO1FBQXhDLEtBQUssQ0FBQyxxQkFBbUIsQ0FBQyxZQUFZLENBQUM7Ozt1REFHdkM7SUFFMEM7UUFBMUMsS0FBSyxDQUFDLHFCQUFtQixDQUFDLGNBQWMsQ0FBQzs7O3lEQUd6QztJQTNJVSxtQkFBbUI7UUFQL0IsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGFBQWE7WUFDdkIsZ3FCQUEyQztZQUUzQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsU0FBUzs7U0FDM0MsQ0FBQzs7T0FFVyxtQkFBbUIsQ0F5VC9CO0lBQUQsMEJBQUM7Q0FBQSxBQXpURCxJQXlUQztTQXpUWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgXHJcbiAgRXZlbnRFbWl0dGVyLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3N0YXItcmF0aW5nJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vc3Rhci1yYXRpbmcuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3N0YXItcmF0aW5nLmNvbXBvbmVudC5jc3MnXSxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5TaGFkb3dEb21cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBTdGFyUmF0aW5nQ29tcG9uZW50IHtcclxuICBwcml2YXRlIHN0YXJzOiBBcnJheTxFbGVtZW50PiA9IFtdO1xyXG4gIFxyXG4gIHByaXZhdGUgX2NoZWNrZWRDb2xvcjogc3RyaW5nO1xyXG4gIHByaXZhdGUgX3VuQ2hlY2tlZENvbG9yOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBfdmFsdWU6IG51bWJlcjtcclxuICBwcml2YXRlIF9zaXplOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBfcmVhZE9ubHk6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgcHJpdmF0ZSBfdG90YWxTdGFyczogbnVtYmVyID0gNTtcclxuICBwcml2YXRlIG9uU3RhcnNDb3VudENoYW5nZTogU3ViamVjdDxudW1iZXI+O1xyXG4gIHByaXZhdGUgb25WYWx1ZUNoYW5nZTogU3ViamVjdDxudW1iZXI+O1xyXG4gIHByaXZhdGUgb25DaGVja2VkQ29sb3JDaGFuZ2U6IFN1YmplY3Q8c3RyaW5nPjtcclxuICBwcml2YXRlIG9uVW5DaGVja2VkQ29sb3JDaGFuZ2U6IFN1YmplY3Q8c3RyaW5nPjtcclxuICBwcml2YXRlIG9uU2l6ZUNoYW5nZTogU3ViamVjdDxzdHJpbmc+O1xyXG4gIHByaXZhdGUgb25SZWFkT25seUNoYW5nZTogU3ViamVjdDxib29sZWFuPjtcclxuXHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgVkFSX0NIRUNLRURfQ09MT1I6IHN0cmluZyA9ICctLWNoZWNrZWRDb2xvcic7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgVkFSX1VOQ0hFQ0tFRF9DT0xPUjogc3RyaW5nID0gJy0tdW5DaGVja2VkQ29sb3InO1xyXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFZBUl9TSVpFOiBzdHJpbmcgPSAnLS1zaXplJztcclxuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBWQVJfSEFMRl9XSURUSDogc3RyaW5nID0gJy0taGFsZldpZHRoJztcclxuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBWQVJfSEFMRl9NQVJHSU46IHN0cmluZyA9ICctLWhhbGZNYXJnaW4nO1xyXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IENMU19DSEVDS0VEX1NUQVI6IHN0cmluZyA9ICdvbic7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgQ0xTX0RFRkFVTFRfU1RBUjogc3RyaW5nID0gJ3N0YXInO1xyXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IENMU19IQUxGX1NUQVI6IHN0cmluZyA9ICdoYWxmJztcclxuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBJTlBfQ0hFQ0tFRF9DT0xPUjogc3RyaW5nID0gJ2NoZWNrZWRjb2xvcic7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSU5QX1VOQ0hFQ0tFRF9DT0xPUjogc3RyaW5nID0gJ3VuY2hlY2tlZGNvbG9yJztcclxuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBJTlBfVkFMVUU6IHN0cmluZyA9ICd2YWx1ZSc7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSU5QX1NJWkU6IHN0cmluZyA9ICdzaXplJztcclxuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBJTlBfUkVBRE9OTFk6IHN0cmluZyA9ICdyZWFkb25seSc7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSU5QX1RPVEFMU1RBUlM6IHN0cmluZyA9ICd0b3RhbHN0YXJzJztcclxuXHJcbiAgQFZpZXdDaGlsZCgnc3Rhck1haW4nLCB7IHN0YXRpYzogdHJ1ZSB9KSBwcml2YXRlIG1haW5FbGVtZW50OiBFbGVtZW50UmVmO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIGlmICghdGhpcy5vblN0YXJzQ291bnRDaGFuZ2UpIHtcclxuICAgICAgdGhpcy5vblN0YXJzQ291bnRDaGFuZ2UgPSBuZXcgU3ViamVjdCgpO1xyXG4gICAgICB0aGlzLm9uU3RhcnNDb3VudENoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhcnMoKTtcclxuICAgICAgICB0aGlzLmdlbmVyYXRlUmF0aW5nKHRydWUpO1xyXG4gICAgICAgIHRoaXMuYXBwbHlTaXplQWxsU3RhcnMoKTtcclxuICAgICAgICB0aGlzLmFwcGx5Q29sb3JTdHlsZUFsbFN0YXJzKGZhbHNlKTtcclxuICAgICAgICB0aGlzLmFkZEV2ZW50cygpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMub25WYWx1ZUNoYW5nZSkge1xyXG4gICAgICB0aGlzLm9uVmFsdWVDaGFuZ2UgPSBuZXcgU3ViamVjdCgpO1xyXG4gICAgICB0aGlzLm9uVmFsdWVDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICB0aGlzLmdlbmVyYXRlUmF0aW5nKCk7XHJcbiAgICAgICAgdGhpcy5hcHBseVNpemVBbGxTdGFycygpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMub25DaGVja2VkQ29sb3JDaGFuZ2UpIHtcclxuICAgICAgdGhpcy5vbkNoZWNrZWRDb2xvckNoYW5nZSA9IG5ldyBTdWJqZWN0KCk7XHJcbiAgICAgIHRoaXMub25DaGVja2VkQ29sb3JDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICB0aGlzLmFwcGx5Q29sb3JTdHlsZUFsbFN0YXJzKHRydWUpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMub25VbkNoZWNrZWRDb2xvckNoYW5nZSkge1xyXG4gICAgICB0aGlzLm9uVW5DaGVja2VkQ29sb3JDaGFuZ2UgPSBuZXcgU3ViamVjdCgpO1xyXG4gICAgICB0aGlzLm9uVW5DaGVja2VkQ29sb3JDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICB0aGlzLmFwcGx5Q29sb3JTdHlsZUFsbFN0YXJzKGZhbHNlKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLm9uU2l6ZUNoYW5nZSkge1xyXG4gICAgICB0aGlzLm9uU2l6ZUNoYW5nZSA9IG5ldyBTdWJqZWN0KCk7XHJcbiAgICAgIHRoaXMub25TaXplQ2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5hcHBseVNpemVBbGxTdGFycygpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMub25SZWFkT25seUNoYW5nZSkge1xyXG4gICAgICB0aGlzLm9uUmVhZE9ubHlDaGFuZ2UgPSBuZXcgU3ViamVjdCgpO1xyXG4gICAgICB0aGlzLm9uUmVhZE9ubHlDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICB0aGlzLnJlYWRvbmx5ID8gdGhpcy5tYWtlUmVhZE9ubHkoKSA6IHRoaXMubWFrZUVkaXRhYmxlKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0IGNoZWNrZWRjb2xvcigpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NoZWNrZWRDb2xvcjtcclxuICB9XHJcblxyXG4gIGdldCB1bmNoZWNrZWRjb2xvcigpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX3VuQ2hlY2tlZENvbG9yO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHZhbHVlKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XHJcbiAgfVxyXG5cclxuICBnZXQgc2l6ZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NpemUuY29uY2F0KCghdGhpcy5fc2l6ZS5pbmNsdWRlcyhcInB4XCIpID8gXCJweFwiIDogXCJcIikpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHJlYWRvbmx5KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIFN0cmluZyh0aGlzLl9yZWFkT25seSkgPT09IFwidHJ1ZVwiO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHRvdGFsc3RhcnMoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl90b3RhbFN0YXJzO1xyXG4gIH1cclxuXHJcbiAgQE91dHB1dCgpIHJhdGU6IEV2ZW50RW1pdHRlcjx7IG9sZFZhbHVlOiBudW1iZXIsIG5ld1ZhbHVlOiBudW1iZXIsIHN0YXJSYXRpbmc6IFN0YXJSYXRpbmdDb21wb25lbnQgfT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIEBJbnB1dChTdGFyUmF0aW5nQ29tcG9uZW50LklOUF9DSEVDS0VEX0NPTE9SKSBzZXQgY2hlY2tlZGNvbG9yKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX2NoZWNrZWRDb2xvciA9IHZhbHVlO1xyXG4gICAgdGhpcy5fY2hlY2tlZENvbG9yICYmIHRoaXMub25DaGVja2VkQ29sb3JDaGFuZ2UubmV4dCh0aGlzLl9jaGVja2VkQ29sb3IpO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KFN0YXJSYXRpbmdDb21wb25lbnQuSU5QX1VOQ0hFQ0tFRF9DT0xPUikgc2V0IHVuY2hlY2tlZGNvbG9yKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX3VuQ2hlY2tlZENvbG9yID0gdmFsdWU7XHJcbiAgICB0aGlzLl91bkNoZWNrZWRDb2xvciAmJiB0aGlzLm9uVW5DaGVja2VkQ29sb3JDaGFuZ2UubmV4dCh0aGlzLl91bkNoZWNrZWRDb2xvcik7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoU3RhclJhdGluZ0NvbXBvbmVudC5JTlBfVkFMVUUpIHNldCB2YWx1ZSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICB2YWx1ZSA9ICghdmFsdWUgfHwgdmFsdWUgPT0gbnVsbCkgPyAwIDogdmFsdWU7XHJcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xyXG4gICAgdGhpcy5fdmFsdWUgPj0gMCAmJiB0aGlzLm9uVmFsdWVDaGFuZ2UubmV4dCh0aGlzLl92YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoU3RhclJhdGluZ0NvbXBvbmVudC5JTlBfU0laRSkgc2V0IHNpemUodmFsdWU6IHN0cmluZykge1xyXG4gICAgdmFsdWUgPSAoIXZhbHVlIHx8IHZhbHVlID09IG51bGwgfHwgdmFsdWUgPT0gXCIwcHhcIikgPyBcIjI0cHhcIiA6IHZhbHVlO1xyXG4gICAgdGhpcy5fc2l6ZSA9IHZhbHVlO1xyXG4gICAgdGhpcy5vblNpemVDaGFuZ2UubmV4dCh0aGlzLl9zaXplKTtcclxuICB9XHJcblxyXG4gIEBJbnB1dChTdGFyUmF0aW5nQ29tcG9uZW50LklOUF9SRUFET05MWSkgc2V0IHJlYWRvbmx5KHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9yZWFkT25seSA9IHZhbHVlO1xyXG4gICAgdGhpcy5vblJlYWRPbmx5Q2hhbmdlLm5leHQodmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KFN0YXJSYXRpbmdDb21wb25lbnQuSU5QX1RPVEFMU1RBUlMpIHNldCB0b3RhbHN0YXJzKHZhbHVlOiBudW1iZXIpIHtcclxuICAgIHRoaXMuX3RvdGFsU3RhcnMgPSB2YWx1ZSA8PSAwID8gNSA6IE1hdGgucm91bmQodmFsdWUpO1xyXG4gICAgdGhpcy5vblN0YXJzQ291bnRDaGFuZ2UubmV4dCh0aGlzLl90b3RhbFN0YXJzKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbWFrZUVkaXRhYmxlKCkge1xyXG4gICAgaWYgKCF0aGlzLm1haW5FbGVtZW50KSByZXR1cm47XHJcbiAgICB0aGlzLm1haW5FbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XHJcbiAgICB0aGlzLm1haW5FbGVtZW50Lm5hdGl2ZUVsZW1lbnQudGl0bGUgPSB0aGlzLnZhbHVlO1xyXG4gICAgdGhpcy5zdGFycy5mb3JFYWNoKChzdGFyOiBhbnkpID0+IHtcclxuICAgICAgc3Rhci5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcclxuICAgICAgc3Rhci50aXRsZSA9IHN0YXIuZGF0YXNldC5pbmRleDtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBtYWtlUmVhZE9ubHkoKSB7XHJcbiAgICBpZiAoIXRoaXMubWFpbkVsZW1lbnQpIHJldHVybjtcclxuICAgIHRoaXMubWFpbkVsZW1lbnQubmF0aXZlRWxlbWVudC5zdHlsZS5jdXJzb3IgPSBcImRlZmF1bHRcIjtcclxuICAgIHRoaXMubWFpbkVsZW1lbnQubmF0aXZlRWxlbWVudC50aXRsZSA9IHRoaXMudmFsdWU7XHJcbiAgICB0aGlzLnN0YXJzLmZvckVhY2goKHN0YXI6IGFueSkgPT4ge1xyXG4gICAgICBzdGFyLnN0eWxlLmN1cnNvciA9IFwiZGVmYXVsdFwiO1xyXG4gICAgICBzdGFyLnRpdGxlID0gXCJcIjtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhZGRFdmVudHMoKSB7XHJcbiAgICBpZiAoIXRoaXMubWFpbkVsZW1lbnQpIHJldHVybjtcclxuICAgIHRoaXMubWFpbkVsZW1lbnQubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5vZmZTdGFyLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5tYWluRWxlbWVudC5uYXRpdmVFbGVtZW50LnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xyXG4gICAgdGhpcy5tYWluRWxlbWVudC5uYXRpdmVFbGVtZW50LnRpdGxlID0gdGhpcy52YWx1ZTtcclxuICAgIHRoaXMuc3RhcnMuZm9yRWFjaCgoc3RhcjogYW55KSA9PiB7XHJcbiAgICAgIHN0YXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uUmF0ZS5iaW5kKHRoaXMpKTtcclxuICAgICAgc3Rhci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgdGhpcy5vblN0YXIuYmluZCh0aGlzKSk7XHJcbiAgICAgIHN0YXIuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XHJcbiAgICAgIHN0YXIudGl0bGUgPSBzdGFyLmRhdGFzZXQuaW5kZXg7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICBwcml2YXRlIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25SYXRlKGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICBpZiAodGhpcy5yZWFkb25seSkgcmV0dXJuO1xyXG4gICAgbGV0IHN0YXI6IEhUTUxFbGVtZW50ID0gPEhUTUxFbGVtZW50PmV2ZW50LnNyY0VsZW1lbnQ7XHJcbiAgICBsZXQgb2xkVmFsdWUgPSB0aGlzLnZhbHVlO1xyXG4gICAgdGhpcy52YWx1ZSA9IHBhcnNlSW50KHN0YXIuZGF0YXNldC5pbmRleCk7XHJcbiAgICBpZiAodGhpcy52YWx1ZSA9PSAwKSB7XHJcbiAgICAgIHRoaXMudmFsdWUgPSAxO1xyXG4gICAgfVxyXG4gICAgbGV0IHJhdGVWYWx1ZXMgPSB7IG9sZFZhbHVlOiBvbGRWYWx1ZSwgbmV3VmFsdWU6IHRoaXMudmFsdWUsIHN0YXJSYXRpbmc6IHRoaXMgfTtcclxuICAgIHRoaXMucmF0ZS5lbWl0KHJhdGVWYWx1ZXMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvblN0YXIoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgIGlmICh0aGlzLnJlYWRvbmx5KSByZXR1cm47XHJcbiAgICBsZXQgc3RhcjogSFRNTEVsZW1lbnQgPSA8SFRNTEVsZW1lbnQ+ZXZlbnQuc3JjRWxlbWVudDtcclxuICAgIGxldCBjdXJyZW50SW5kZXggPSBwYXJzZUludChzdGFyLmRhdGFzZXQuaW5kZXgpO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBjdXJyZW50SW5kZXg7IGluZGV4KyspIHtcclxuICAgICAgdGhpcy5zdGFyc1tpbmRleF0uY2xhc3NOYW1lID0gXCJcIjtcclxuICAgICAgdGhpcy5hZGREZWZhdWx0Q2xhc3ModGhpcy5zdGFyc1tpbmRleF0pO1xyXG4gICAgICB0aGlzLmFkZENoZWNrZWRTdGFyQ2xhc3ModGhpcy5zdGFyc1tpbmRleF0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gY3VycmVudEluZGV4OyBpbmRleCA8IHRoaXMuc3RhcnMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHRoaXMuc3RhcnNbaW5kZXhdLmNsYXNzTmFtZSA9IFwiXCI7XHJcbiAgICAgIHRoaXMuYWRkRGVmYXVsdENsYXNzKHRoaXMuc3RhcnNbaW5kZXhdKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgb2ZmU3RhcihldmVudDogTW91c2VFdmVudCkge1xyXG4gICAgdGhpcy5nZW5lcmF0ZVJhdGluZygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhZGREZWZhdWx0Q2xhc3Moc3RhcjogYW55KSB7XHJcbiAgICBzdGFyLmNsYXNzTGlzdC5hZGQoU3RhclJhdGluZ0NvbXBvbmVudC5DTFNfREVGQVVMVF9TVEFSKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWRkQ2hlY2tlZFN0YXJDbGFzcyhzdGFyOiBhbnkpIHtcclxuICAgIHN0YXIuY2xhc3NMaXN0LmFkZChTdGFyUmF0aW5nQ29tcG9uZW50LkNMU19DSEVDS0VEX1NUQVIpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhZGRIYWxmU3RhckNsYXNzKHN0YXI6IGFueSkge1xyXG4gICAgc3Rhci5jbGFzc0xpc3QuYWRkKFN0YXJSYXRpbmdDb21wb25lbnQuQ0xTX0hBTEZfU1RBUik7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNldFN0YXJzKCkge1xyXG4gICAgaWYgKCF0aGlzLm1haW5FbGVtZW50KSByZXR1cm47XHJcbiAgICBsZXQgc3RhckNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQgPSB0aGlzLm1haW5FbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICBsZXQgbWF4U3RhcnMgPSBbLi4uQXJyYXkoTnVtYmVyKHRoaXMudG90YWxzdGFycykpLmtleXMoKV07XHJcbiAgICB0aGlzLnN0YXJzLmxlbmd0aCA9IDA7XHJcbiAgICBzdGFyQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICBtYXhTdGFycy5mb3JFYWNoKHN0YXJOdW1iZXIgPT4ge1xyXG4gICAgICBsZXQgc3RhckVsZW1lbnQ6IEhUTUxTcGFuRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgICBzdGFyRWxlbWVudC5kYXRhc2V0LmluZGV4ID0gKHN0YXJOdW1iZXIgKyAxKS50b1N0cmluZygpO1xyXG4gICAgICBzdGFyRWxlbWVudC50aXRsZSA9IHN0YXJFbGVtZW50LmRhdGFzZXQuaW5kZXg7XHJcbiAgICAgIHN0YXJDb250YWluZXIuYXBwZW5kQ2hpbGQoc3RhckVsZW1lbnQpO1xyXG4gICAgICB0aGlzLnN0YXJzLnB1c2goc3RhckVsZW1lbnQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFwcGx5U2l6ZUFsbFN0YXJzKCkge1xyXG4gICAgaWYgKHRoaXMuX3NpemUpIHtcclxuICAgICAgdGhpcy5zdGFycy5sZW5ndGggPT0gMCAmJiB0aGlzLnNldFN0YXJzKCk7XHJcbiAgICAgIHRoaXMuc3RhcnMuZm9yRWFjaCgoc3RhcjogYW55KSA9PiB7XHJcbiAgICAgICAgLy8gY29uc3QgbmV3U2l6ZSA9IHRoaXMuX3NpemUubWF0Y2goL1xcZCsvKVswXTtcclxuICAgICAgICAvLyBsZXQgaGFsZlNpemUgPSBwYXJzZUludChuZXdTaXplLCAxMCkgLyAyO1xyXG4gICAgICAgIC8vIGxldCBoYWxmTWFyZ2luID0gMCAtIHBhcnNlSW50KG5ld1NpemUsIDEwKTsgICAgICAgIFxyXG4gICAgICAgIGxldCBuZXdTaXplID0gdGhpcy5zaXplLm1hdGNoKC9cXGQrLylbMF07XHJcbiAgICAgICAgbGV0IGhhbGZTaXplID0gKHBhcnNlSW50KG5ld1NpemUpICogMTApIC8gMjQ7XHJcbiAgICAgICAgbGV0IGhhbGZNYXJnaW4gPSAwIC0gKChwYXJzZUludChuZXdTaXplKSAqIDIwKSAvIDI0KTtcclxuICAgICAgICBzdGFyLnN0eWxlLnNldFByb3BlcnR5KFN0YXJSYXRpbmdDb21wb25lbnQuVkFSX1NJWkUsIHRoaXMuc2l6ZSk7XHJcbiAgICAgICAgaWYgKHN0YXIuY2xhc3NMaXN0LmNvbnRhaW5zKFN0YXJSYXRpbmdDb21wb25lbnQuQ0xTX0hBTEZfU1RBUikpIHtcclxuICAgICAgICAgIHN0YXIuc3R5bGUuc2V0UHJvcGVydHkoU3RhclJhdGluZ0NvbXBvbmVudC5WQVJfSEFMRl9XSURUSCwgYCR7aGFsZlNpemV9cHhgKTtcclxuICAgICAgICAgIHN0YXIuc3R5bGUuc2V0UHJvcGVydHkoU3RhclJhdGluZ0NvbXBvbmVudC5WQVJfSEFMRl9NQVJHSU4sIGAke2hhbGZNYXJnaW59cHhgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhcHBseUNvbG9yU3R5bGVBbGxTdGFycyhzZXRDaGVja2VkOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLnN0YXJzLmxlbmd0aCA9PSAwICYmIHRoaXMuc2V0U3RhcnMoKTtcclxuICAgIHRoaXMuc3RhcnMuZm9yRWFjaCgoc3RhcjogYW55KSA9PiB7XHJcbiAgICAgIGlmIChzZXRDaGVja2VkKSB7XHJcbiAgICAgICAgdGhpcy5hcHBseUNoZWNrZWRDb2xvclN0eWxlKHN0YXIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuYXBwbHlVbkNoZWNrZWRDb2xvclN0eWxlKHN0YXIpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXBwbHlDb2xvclN0eWxlKHN0YXJFbGVtZW50OiBIVE1MU3BhbkVsZW1lbnQpIHtcclxuICAgIHRoaXMuYXBwbHlDaGVja2VkQ29sb3JTdHlsZShzdGFyRWxlbWVudCk7XHJcbiAgICB0aGlzLmFwcGx5VW5DaGVja2VkQ29sb3JTdHlsZShzdGFyRWxlbWVudCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFwcGx5Q2hlY2tlZENvbG9yU3R5bGUoc3RhckVsZW1lbnQ6IEhUTUxTcGFuRWxlbWVudCkge1xyXG4gICAgc3RhckVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoU3RhclJhdGluZ0NvbXBvbmVudC5WQVJfQ0hFQ0tFRF9DT0xPUiwgdGhpcy5jaGVja2VkY29sb3IpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhcHBseVVuQ2hlY2tlZENvbG9yU3R5bGUoc3RhckVsZW1lbnQ6IEhUTUxTcGFuRWxlbWVudCkge1xyXG4gICAgc3RhckVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoU3RhclJhdGluZ0NvbXBvbmVudC5WQVJfVU5DSEVDS0VEX0NPTE9SLCB0aGlzLnVuY2hlY2tlZGNvbG9yKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2VuZXJhdGVSYXRpbmcoZm9yY2VHZW5lcmF0ZTpib29sZWFuID0gZmFsc2UpIHtcclxuICAgIGlmICh0aGlzLnJlYWRvbmx5ICYmICFmb3JjZUdlbmVyYXRlKSByZXR1cm47XHJcbiAgICBpZiAoIXRoaXMubWFpbkVsZW1lbnQpIHJldHVybjtcclxuICAgIHRoaXMuc3RhcnMubGVuZ3RoID09IDAgJiYgdGhpcy5zZXRTdGFycygpO1xyXG4gICAgaWYgKHRoaXMudmFsdWUgPj0gMCkge1xyXG4gICAgICB0aGlzLm1haW5FbGVtZW50Lm5hdGl2ZUVsZW1lbnQudGl0bGUgPSB0aGlzLnZhbHVlO1xyXG5cclxuICAgICAgbGV0IGhhc0RlY2ltYWxzOiBib29sZWFuID1cclxuICAgICAgICAoKE51bWJlci5wYXJzZUZsb2F0KHRoaXMudmFsdWUudG9TdHJpbmcoKSkgJSAxKVxyXG4gICAgICAgICAgLnRvU3RyaW5nKClcclxuICAgICAgICAgIC5zdWJzdHJpbmcoMywgMikpID8gdHJ1ZSA6IGZhbHNlO1xyXG5cclxuICAgICAgbGV0IGkgPSAxO1xyXG4gICAgICB0aGlzLnN0YXJzLmZvckVhY2goKHN0YXI6IGFueSkgPT4ge1xyXG4gICAgICAgIHN0YXIuY2xhc3NOYW1lID0gXCJcIjtcclxuICAgICAgICB0aGlzLmFwcGx5Q29sb3JTdHlsZShzdGFyKTtcclxuICAgICAgICB0aGlzLmFkZERlZmF1bHRDbGFzcyhzdGFyKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudmFsdWUgPj0gaSkge1xyXG4gICAgICAgICAgLy8gc3RhciBvblxyXG4gICAgICAgICAgdGhpcy5hZGRDaGVja2VkU3RhckNsYXNzKHN0YXIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyBoYWxmIHN0YXJcclxuICAgICAgICAgIGlmIChoYXNEZWNpbWFscykge1xyXG4gICAgICAgICAgICB0aGlzLmFkZEhhbGZTdGFyQ2xhc3Moc3Rhcik7XHJcbiAgICAgICAgICAgIGhhc0RlY2ltYWxzID0gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGkrKztcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==