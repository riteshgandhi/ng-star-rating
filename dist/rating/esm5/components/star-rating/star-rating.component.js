import { __decorate, __read, __spread } from "tslib";
import { Component, Input, Output, ViewChild, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
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
export { StarRatingComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rhci1yYXRpbmcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctc3RhcnJhdGluZy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc3Rhci1yYXRpbmcvc3Rhci1yYXRpbmcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUNuQyxZQUFZLEVBQUUsaUJBQWlCLEVBQ2hDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFTL0I7SUFrQ0U7UUFBQSxpQkFtQ0M7UUFwRU8sVUFBSyxHQUFtQixFQUFFLENBQUM7UUFNM0IsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUUzQixnQkFBVyxHQUFXLENBQUMsQ0FBQztRQXNGdEIsU0FBSSxHQUEwRixJQUFJLFlBQVksRUFBRSxDQUFDO1FBNUR6SCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUN4QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDO1lBQ2hDLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNoQixLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFCLEtBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3pCLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwQyxLQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUM7WUFDM0IsS0FBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3RCLEtBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFNBQVMsQ0FBQztZQUNsQyxLQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUM1QyxJQUFJLENBQUMsc0JBQXNCLENBQUMsU0FBUyxDQUFDO1lBQ3BDLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0QyxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUNsQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQztZQUMxQixLQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUM7WUFDOUIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDNUQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzRCQXJFVSxtQkFBbUI7SUF1RTlCLHNCQUFJLDZDQUFZO2FBQWhCO1lBQ0UsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzVCLENBQUM7YUF3QjZDLFVBQWlCLEtBQWE7WUFDMUUsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7WUFDM0IsSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMzRSxDQUFDOzs7T0EzQkE7SUFFRCxzQkFBSSwrQ0FBYzthQUFsQjtZQUNFLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUM5QixDQUFDO2FBeUIrQyxVQUFtQixLQUFhO1lBQzlFLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1lBQzdCLElBQUksQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDakYsQ0FBQzs7O09BNUJBO0lBRUQsc0JBQUksc0NBQUs7YUFBVDtZQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNyQixDQUFDO2FBMEJxQyxVQUFVLEtBQWE7WUFDM0QsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUM5QyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0QsQ0FBQzs7O09BOUJBO0lBRUQsc0JBQUkscUNBQUk7YUFBUjtZQUNFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDckUsQ0FBQzthQTRCb0MsVUFBUyxLQUFhO1lBQ3pELEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxJQUFJLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUNyRSxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckMsQ0FBQzs7O09BaENBO0lBRUQsc0JBQUkseUNBQVE7YUFBWjtZQUNFLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxNQUFNLENBQUM7UUFDM0MsQ0FBQzthQThCd0MsVUFBYSxLQUFjO1lBQ2xFLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEMsQ0FBQzs7O09BakNBO0lBRUQsc0JBQUksMkNBQVU7YUFBZDtZQUNFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUMxQixDQUFDO2FBK0IwQyxVQUFlLEtBQWE7WUFDckUsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDakQsQ0FBQzs7O09BbENBO0lBb0NPLDBDQUFZLEdBQXBCO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXO1lBQUUsT0FBTztRQUM5QixJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztRQUN4RCxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNsRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQVM7WUFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO1lBQzlCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sMENBQVksR0FBcEI7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVc7WUFBRSxPQUFPO1FBQzlCLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO1FBQ3hELElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ2xELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBUztZQUMzQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7WUFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDbEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sdUNBQVMsR0FBakI7UUFBQSxpQkFXQztRQVZDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVztZQUFFLE9BQU87UUFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDdkYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7UUFDeEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDbEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFTO1lBQzNCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUMsQ0FBQztZQUN2RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDLENBQUM7WUFDNUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO1lBQzlCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBR08sNkNBQWUsR0FBdkI7SUFDQSxDQUFDO0lBRU8sb0NBQU0sR0FBZCxVQUFlLEtBQWlCO1FBQzlCLElBQUksSUFBSSxDQUFDLFFBQVE7WUFBRSxPQUFPO1FBQzFCLElBQUksSUFBSSxHQUE2QixLQUFLLENBQUMsVUFBVSxDQUFDO1FBQ3RELElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDMUIsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQyx5QkFBeUI7UUFDekIsb0JBQW9CO1FBQ3BCLElBQUk7UUFDSixJQUFJLFVBQVUsR0FBRyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxDQUFDO1FBQ2hGLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFTyxvQ0FBTSxHQUFkLFVBQWUsS0FBaUI7UUFDOUIsSUFBSSxJQUFJLENBQUMsUUFBUTtZQUFFLE9BQU87UUFDMUIsSUFBSSxJQUFJLEdBQTZCLEtBQUssQ0FBQyxVQUFVLENBQUM7UUFDdEQsSUFBSSxZQUFZLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFaEQsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLFlBQVksRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUNqRCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7WUFDakMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUM3QztRQUVELEtBQUssSUFBSSxLQUFLLEdBQUcsWUFBWSxFQUFFLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUNqRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7WUFDakMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDekM7SUFDSCxDQUFDO0lBRU8scUNBQU8sR0FBZixVQUFnQixLQUFpQjtRQUMvQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVPLDZDQUFlLEdBQXZCLFVBQXdCLElBQVM7UUFDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMscUJBQW1CLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRU8saURBQW1CLEdBQTNCLFVBQTRCLElBQVM7UUFDbkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMscUJBQW1CLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRU8sOENBQWdCLEdBQXhCLFVBQXlCLElBQVM7UUFDaEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMscUJBQW1CLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVPLHNDQUFRLEdBQWhCO1FBQUEsaUJBYUM7UUFaQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVc7WUFBRSxPQUFPO1FBQzlCLElBQUksYUFBYSxHQUFtQixJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQztRQUNuRSxJQUFJLFFBQVEsWUFBTyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLGFBQWEsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQzdCLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxVQUFVO1lBQ3pCLElBQUksV0FBVyxHQUFvQixRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2xFLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3hELFdBQVcsQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDOUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN2QyxLQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTywrQ0FBaUIsR0FBekI7UUFBQSxpQkFjQztRQWJDLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDMUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFTO2dCQUMzQixJQUFJLE9BQU8sR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEMsSUFBSSxRQUFRLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUM3QyxJQUFJLFVBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztnQkFDckQsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMscUJBQW1CLENBQUMsUUFBUSxFQUFFLEtBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDaEUsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxxQkFBbUIsQ0FBQyxhQUFhLENBQUMsRUFBRTtvQkFDOUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMscUJBQW1CLENBQUMsY0FBYyxFQUFLLFFBQVEsT0FBSSxDQUFDLENBQUM7b0JBQzVFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLHFCQUFtQixDQUFDLGVBQWUsRUFBSyxVQUFVLE9BQUksQ0FBQyxDQUFDO2lCQUNoRjtZQUNILENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRU8scURBQXVCLEdBQS9CLFVBQWdDLFVBQW1CO1FBQW5ELGlCQVNDO1FBUkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQVM7WUFDM0IsSUFBSSxVQUFVLEVBQUU7Z0JBQ2QsS0FBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ25DO2lCQUFNO2dCQUNMLEtBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNyQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLDZDQUFlLEdBQXZCLFVBQXdCLFdBQTRCO1FBQ2xELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsd0JBQXdCLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVPLG9EQUFzQixHQUE5QixVQUErQixXQUE0QjtRQUN6RCxXQUFXLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxxQkFBbUIsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDMUYsQ0FBQztJQUVPLHNEQUF3QixHQUFoQyxVQUFpQyxXQUE0QjtRQUMzRCxXQUFXLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxxQkFBbUIsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDOUYsQ0FBQztJQUVPLDRDQUFjLEdBQXRCLFVBQXVCLGFBQThCO1FBQXJELGlCQWdDQztRQWhDc0IsOEJBQUEsRUFBQSxxQkFBOEI7UUFDbkQsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXO1lBQUUsT0FBTztRQUM5QixJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxhQUFhO1lBQUUsT0FBTztRQUU1Qyx3QkFBd0I7UUFDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUVsRCxJQUFJLFdBQVcsR0FDYixDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzVDLFFBQVEsRUFBRTthQUNWLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFFckMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFTO1lBQzNCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1lBQ3BCLEtBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0IsS0FBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUUzQixJQUFJLEtBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxFQUFFO2dCQUNuQixVQUFVO2dCQUNWLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNoQztpQkFBTTtnQkFDTCxZQUFZO2dCQUNaLElBQUksV0FBVyxFQUFFO29CQUNmLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDNUIsV0FBVyxHQUFHLEtBQUssQ0FBQztpQkFDckI7YUFDRjtZQUNELENBQUMsRUFBRSxDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7UUFDSCxHQUFHO0lBQ0wsQ0FBQzs7SUF6UnVCLHFDQUFpQixHQUFXLGdCQUFnQixDQUFDO0lBQzdDLHVDQUFtQixHQUFXLGtCQUFrQixDQUFDO0lBQ2pELDRCQUFRLEdBQVcsUUFBUSxDQUFDO0lBQzVCLGtDQUFjLEdBQVcsYUFBYSxDQUFDO0lBQ3ZDLG1DQUFlLEdBQVcsY0FBYyxDQUFDO0lBQ3pDLG9DQUFnQixHQUFXLElBQUksQ0FBQztJQUNoQyxvQ0FBZ0IsR0FBVyxNQUFNLENBQUM7SUFDbEMsaUNBQWEsR0FBVyxNQUFNLENBQUM7SUFDL0IscUNBQWlCLEdBQVcsY0FBYyxDQUFDO0lBQzNDLHVDQUFtQixHQUFXLGdCQUFnQixDQUFDO0lBQy9DLDZCQUFTLEdBQVcsT0FBTyxDQUFDO0lBQzVCLDRCQUFRLEdBQVcsTUFBTSxDQUFDO0lBQzFCLGdDQUFZLEdBQVcsVUFBVSxDQUFDO0lBQ2xDLGtDQUFjLEdBQVcsWUFBWSxDQUFDO0lBRXJCO1FBQXhDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7NERBQWlDO0lBK0QvRDtRQUFULE1BQU0sRUFBRTtxREFBa0g7SUFFN0U7UUFBN0MsS0FBSyxDQUFDLHFCQUFtQixDQUFDLGlCQUFpQixDQUFDOzJEQUc1QztJQUUrQztRQUEvQyxLQUFLLENBQUMscUJBQW1CLENBQUMsbUJBQW1CLENBQUM7NkRBRzlDO0lBRXFDO1FBQXJDLEtBQUssQ0FBQyxxQkFBbUIsQ0FBQyxTQUFTLENBQUM7b0RBSXBDO0lBRW9DO1FBQXBDLEtBQUssQ0FBQyxxQkFBbUIsQ0FBQyxRQUFRLENBQUM7bURBSW5DO0lBRXdDO1FBQXhDLEtBQUssQ0FBQyxxQkFBbUIsQ0FBQyxZQUFZLENBQUM7dURBR3ZDO0lBRTBDO1FBQTFDLEtBQUssQ0FBQyxxQkFBbUIsQ0FBQyxjQUFjLENBQUM7eURBR3pDO0lBL0hVLG1CQUFtQjtRQVAvQixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsYUFBYTtZQUN2QixtQ0FBMkM7WUFFM0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLFNBQVM7O1NBQzNDLENBQUM7T0FFVyxtQkFBbUIsQ0EyUy9CO0lBQUQsMEJBQUM7Q0FBQSxBQTNTRCxJQTJTQztTQTNTWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLCBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc3Rhci1yYXRpbmcnLFxuICB0ZW1wbGF0ZVVybDogJy4vc3Rhci1yYXRpbmcuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9zdGFyLXJhdGluZy5jb21wb25lbnQuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLlNoYWRvd0RvbVxufSlcblxuZXhwb3J0IGNsYXNzIFN0YXJSYXRpbmdDb21wb25lbnQge1xuICBwcml2YXRlIHN0YXJzOiBBcnJheTxFbGVtZW50PiA9IFtdO1xuXG4gIHByaXZhdGUgX2NoZWNrZWRDb2xvcjogc3RyaW5nO1xuICBwcml2YXRlIF91bkNoZWNrZWRDb2xvcjogc3RyaW5nO1xuICBwcml2YXRlIF92YWx1ZTogbnVtYmVyO1xuICBwcml2YXRlIF9zaXplOiBzdHJpbmc7XG4gIHByaXZhdGUgX3JlYWRPbmx5OiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBfdG90YWxTdGFyczogbnVtYmVyID0gNTtcbiAgcHJpdmF0ZSBvblN0YXJzQ291bnRDaGFuZ2U6IFN1YmplY3Q8bnVtYmVyPjtcbiAgcHJpdmF0ZSBvblZhbHVlQ2hhbmdlOiBTdWJqZWN0PG51bWJlcj47XG4gIHByaXZhdGUgb25DaGVja2VkQ29sb3JDaGFuZ2U6IFN1YmplY3Q8c3RyaW5nPjtcbiAgcHJpdmF0ZSBvblVuQ2hlY2tlZENvbG9yQ2hhbmdlOiBTdWJqZWN0PHN0cmluZz47XG4gIHByaXZhdGUgb25TaXplQ2hhbmdlOiBTdWJqZWN0PHN0cmluZz47XG4gIHByaXZhdGUgb25SZWFkT25seUNoYW5nZTogU3ViamVjdDxib29sZWFuPjtcblxuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBWQVJfQ0hFQ0tFRF9DT0xPUjogc3RyaW5nID0gJy0tY2hlY2tlZENvbG9yJztcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgVkFSX1VOQ0hFQ0tFRF9DT0xPUjogc3RyaW5nID0gJy0tdW5DaGVja2VkQ29sb3InO1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBWQVJfU0laRTogc3RyaW5nID0gJy0tc2l6ZSc7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFZBUl9IQUxGX1dJRFRIOiBzdHJpbmcgPSAnLS1oYWxmV2lkdGgnO1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBWQVJfSEFMRl9NQVJHSU46IHN0cmluZyA9ICctLWhhbGZNYXJnaW4nO1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBDTFNfQ0hFQ0tFRF9TVEFSOiBzdHJpbmcgPSAnb24nO1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBDTFNfREVGQVVMVF9TVEFSOiBzdHJpbmcgPSAnc3Rhcic7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IENMU19IQUxGX1NUQVI6IHN0cmluZyA9ICdoYWxmJztcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSU5QX0NIRUNLRURfQ09MT1I6IHN0cmluZyA9ICdjaGVja2VkY29sb3InO1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBJTlBfVU5DSEVDS0VEX0NPTE9SOiBzdHJpbmcgPSAndW5jaGVja2VkY29sb3InO1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBJTlBfVkFMVUU6IHN0cmluZyA9ICd2YWx1ZSc7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IElOUF9TSVpFOiBzdHJpbmcgPSAnc2l6ZSc7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IElOUF9SRUFET05MWTogc3RyaW5nID0gJ3JlYWRvbmx5JztcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSU5QX1RPVEFMU1RBUlM6IHN0cmluZyA9ICd0b3RhbHN0YXJzJztcblxuICBAVmlld0NoaWxkKCdzdGFyTWFpbicsIHsgc3RhdGljOiB0cnVlIH0pIHByaXZhdGUgbWFpbkVsZW1lbnQ6IEVsZW1lbnRSZWY7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5vblN0YXJzQ291bnRDaGFuZ2UgPSBuZXcgU3ViamVjdCgpO1xuICAgIHRoaXMub25TdGFyc0NvdW50Q2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXJzKCk7XG4gICAgICB0aGlzLmdlbmVyYXRlUmF0aW5nKHRydWUpO1xuICAgICAgdGhpcy5hcHBseVNpemVBbGxTdGFycygpO1xuICAgICAgdGhpcy5hcHBseUNvbG9yU3R5bGVBbGxTdGFycyhmYWxzZSk7XG4gICAgICB0aGlzLmFkZEV2ZW50cygpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5vblZhbHVlQ2hhbmdlID0gbmV3IFN1YmplY3QoKTtcbiAgICB0aGlzLm9uVmFsdWVDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuZ2VuZXJhdGVSYXRpbmcoKTtcbiAgICAgIHRoaXMuYXBwbHlTaXplQWxsU3RhcnMoKTtcbiAgICB9KTtcblxuICAgIHRoaXMub25DaGVja2VkQ29sb3JDaGFuZ2UgPSBuZXcgU3ViamVjdCgpO1xuICAgIHRoaXMub25DaGVja2VkQ29sb3JDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuYXBwbHlDb2xvclN0eWxlQWxsU3RhcnModHJ1ZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLm9uVW5DaGVja2VkQ29sb3JDaGFuZ2UgPSBuZXcgU3ViamVjdCgpO1xuICAgIHRoaXMub25VbkNoZWNrZWRDb2xvckNoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5hcHBseUNvbG9yU3R5bGVBbGxTdGFycyhmYWxzZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLm9uU2l6ZUNoYW5nZSA9IG5ldyBTdWJqZWN0KCk7XG4gICAgdGhpcy5vblNpemVDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuYXBwbHlTaXplQWxsU3RhcnMoKTtcbiAgICB9KTtcblxuICAgIHRoaXMub25SZWFkT25seUNoYW5nZSA9IG5ldyBTdWJqZWN0KCk7XG4gICAgdGhpcy5vblJlYWRPbmx5Q2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLnJlYWRvbmx5ID8gdGhpcy5tYWtlUmVhZE9ubHkoKSA6IHRoaXMubWFrZUVkaXRhYmxlKCk7XG4gICAgfSk7XG4gIH1cblxuICBnZXQgY2hlY2tlZGNvbG9yKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2NoZWNrZWRDb2xvcjtcbiAgfVxuXG4gIGdldCB1bmNoZWNrZWRjb2xvcigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl91bkNoZWNrZWRDb2xvcjtcbiAgfVxuXG4gIGdldCB2YWx1ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIGdldCBzaXplKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3NpemUuY29uY2F0KCghdGhpcy5fc2l6ZS5pbmNsdWRlcyhcInB4XCIpID8gXCJweFwiIDogXCJcIikpO1xuICB9XG5cbiAgZ2V0IHJlYWRvbmx5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBTdHJpbmcodGhpcy5fcmVhZE9ubHkpID09PSBcInRydWVcIjtcbiAgfVxuXG4gIGdldCB0b3RhbHN0YXJzKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3RvdGFsU3RhcnM7XG4gIH1cblxuICBAT3V0cHV0KCkgcmF0ZTogRXZlbnRFbWl0dGVyPHsgb2xkVmFsdWU6IG51bWJlciwgbmV3VmFsdWU6IG51bWJlciwgc3RhclJhdGluZzogU3RhclJhdGluZ0NvbXBvbmVudCB9PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBASW5wdXQoU3RhclJhdGluZ0NvbXBvbmVudC5JTlBfQ0hFQ0tFRF9DT0xPUikgc2V0IGNoZWNrZWRjb2xvcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fY2hlY2tlZENvbG9yID0gdmFsdWU7XG4gICAgdGhpcy5fY2hlY2tlZENvbG9yICYmIHRoaXMub25DaGVja2VkQ29sb3JDaGFuZ2UubmV4dCh0aGlzLl9jaGVja2VkQ29sb3IpO1xuICB9XG5cbiAgQElucHV0KFN0YXJSYXRpbmdDb21wb25lbnQuSU5QX1VOQ0hFQ0tFRF9DT0xPUikgc2V0IHVuY2hlY2tlZGNvbG9yKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl91bkNoZWNrZWRDb2xvciA9IHZhbHVlO1xuICAgIHRoaXMuX3VuQ2hlY2tlZENvbG9yICYmIHRoaXMub25VbkNoZWNrZWRDb2xvckNoYW5nZS5uZXh0KHRoaXMuX3VuQ2hlY2tlZENvbG9yKTtcbiAgfVxuXG4gIEBJbnB1dChTdGFyUmF0aW5nQ29tcG9uZW50LklOUF9WQUxVRSkgc2V0IHZhbHVlKHZhbHVlOiBudW1iZXIpIHtcbiAgICB2YWx1ZSA9ICghdmFsdWUgfHwgdmFsdWUgPT0gbnVsbCkgPyAwIDogdmFsdWU7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLl92YWx1ZSA+PSAwICYmIHRoaXMub25WYWx1ZUNoYW5nZS5uZXh0KHRoaXMuX3ZhbHVlKTtcbiAgfVxuXG4gIEBJbnB1dChTdGFyUmF0aW5nQ29tcG9uZW50LklOUF9TSVpFKSBzZXQgc2l6ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdmFsdWUgPSAoIXZhbHVlIHx8IHZhbHVlID09IG51bGwgfHwgdmFsdWUgPT0gXCIwcHhcIikgPyBcIjI0cHhcIiA6IHZhbHVlO1xuICAgIHRoaXMuX3NpemUgPSB2YWx1ZTtcbiAgICB0aGlzLm9uU2l6ZUNoYW5nZS5uZXh0KHRoaXMuX3NpemUpO1xuICB9XG5cbiAgQElucHV0KFN0YXJSYXRpbmdDb21wb25lbnQuSU5QX1JFQURPTkxZKSBzZXQgcmVhZG9ubHkodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9yZWFkT25seSA9IHZhbHVlO1xuICAgIHRoaXMub25SZWFkT25seUNoYW5nZS5uZXh0KHZhbHVlKTtcbiAgfVxuXG4gIEBJbnB1dChTdGFyUmF0aW5nQ29tcG9uZW50LklOUF9UT1RBTFNUQVJTKSBzZXQgdG90YWxzdGFycyh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fdG90YWxTdGFycyA9IHZhbHVlIDw9IDAgPyA1IDogTWF0aC5yb3VuZCh2YWx1ZSk7XG4gICAgdGhpcy5vblN0YXJzQ291bnRDaGFuZ2UubmV4dCh0aGlzLl90b3RhbFN0YXJzKTtcbiAgfVxuXG4gIHByaXZhdGUgbWFrZUVkaXRhYmxlKCkge1xuICAgIGlmICghdGhpcy5tYWluRWxlbWVudCkgcmV0dXJuO1xuICAgIHRoaXMubWFpbkVsZW1lbnQubmF0aXZlRWxlbWVudC5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcbiAgICB0aGlzLm1haW5FbGVtZW50Lm5hdGl2ZUVsZW1lbnQudGl0bGUgPSB0aGlzLnZhbHVlO1xuICAgIHRoaXMuc3RhcnMuZm9yRWFjaCgoc3RhcjogYW55KSA9PiB7XG4gICAgICBzdGFyLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xuICAgICAgc3Rhci50aXRsZSA9IHN0YXIuZGF0YXNldC5pbmRleDtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgbWFrZVJlYWRPbmx5KCkge1xuICAgIGlmICghdGhpcy5tYWluRWxlbWVudCkgcmV0dXJuO1xuICAgIHRoaXMubWFpbkVsZW1lbnQubmF0aXZlRWxlbWVudC5zdHlsZS5jdXJzb3IgPSBcImRlZmF1bHRcIjtcbiAgICB0aGlzLm1haW5FbGVtZW50Lm5hdGl2ZUVsZW1lbnQudGl0bGUgPSB0aGlzLnZhbHVlO1xuICAgIHRoaXMuc3RhcnMuZm9yRWFjaCgoc3RhcjogYW55KSA9PiB7XG4gICAgICBzdGFyLnN0eWxlLmN1cnNvciA9IFwiZGVmYXVsdFwiO1xuICAgICAgc3Rhci50aXRsZSA9IFwiXCI7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFkZEV2ZW50cygpIHtcbiAgICBpZiAoIXRoaXMubWFpbkVsZW1lbnQpIHJldHVybjtcbiAgICB0aGlzLm1haW5FbGVtZW50Lm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMub2ZmU3Rhci5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLm1haW5FbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XG4gICAgdGhpcy5tYWluRWxlbWVudC5uYXRpdmVFbGVtZW50LnRpdGxlID0gdGhpcy52YWx1ZTtcbiAgICB0aGlzLnN0YXJzLmZvckVhY2goKHN0YXI6IGFueSkgPT4ge1xuICAgICAgc3Rhci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25SYXRlLmJpbmQodGhpcykpO1xuICAgICAgc3Rhci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgdGhpcy5vblN0YXIuYmluZCh0aGlzKSk7XG4gICAgICBzdGFyLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xuICAgICAgc3Rhci50aXRsZSA9IHN0YXIuZGF0YXNldC5pbmRleDtcbiAgICB9KTtcbiAgfVxuXG5cbiAgcHJpdmF0ZSBuZ0FmdGVyVmlld0luaXQoKSB7XG4gIH1cblxuICBwcml2YXRlIG9uUmF0ZShldmVudDogTW91c2VFdmVudCkge1xuICAgIGlmICh0aGlzLnJlYWRvbmx5KSByZXR1cm47XG4gICAgbGV0IHN0YXI6IEhUTUxFbGVtZW50ID0gPEhUTUxFbGVtZW50PmV2ZW50LnNyY0VsZW1lbnQ7XG4gICAgbGV0IG9sZFZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICB0aGlzLnZhbHVlID0gcGFyc2VJbnQoc3Rhci5kYXRhc2V0LmluZGV4KTtcbiAgICAvLyBpZiAodGhpcy52YWx1ZSA9PSAwKSB7XG4gICAgLy8gICB0aGlzLnZhbHVlID0gMTtcbiAgICAvLyB9XG4gICAgbGV0IHJhdGVWYWx1ZXMgPSB7IG9sZFZhbHVlOiBvbGRWYWx1ZSwgbmV3VmFsdWU6IHRoaXMudmFsdWUsIHN0YXJSYXRpbmc6IHRoaXMgfTtcbiAgICB0aGlzLnJhdGUuZW1pdChyYXRlVmFsdWVzKTtcbiAgfVxuXG4gIHByaXZhdGUgb25TdGFyKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKHRoaXMucmVhZG9ubHkpIHJldHVybjtcbiAgICBsZXQgc3RhcjogSFRNTEVsZW1lbnQgPSA8SFRNTEVsZW1lbnQ+ZXZlbnQuc3JjRWxlbWVudDtcbiAgICBsZXQgY3VycmVudEluZGV4ID0gcGFyc2VJbnQoc3Rhci5kYXRhc2V0LmluZGV4KTtcblxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBjdXJyZW50SW5kZXg7IGluZGV4KyspIHtcbiAgICAgIHRoaXMuc3RhcnNbaW5kZXhdLmNsYXNzTmFtZSA9IFwiXCI7XG4gICAgICB0aGlzLmFkZERlZmF1bHRDbGFzcyh0aGlzLnN0YXJzW2luZGV4XSk7XG4gICAgICB0aGlzLmFkZENoZWNrZWRTdGFyQ2xhc3ModGhpcy5zdGFyc1tpbmRleF0pO1xuICAgIH1cblxuICAgIGZvciAobGV0IGluZGV4ID0gY3VycmVudEluZGV4OyBpbmRleCA8IHRoaXMuc3RhcnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICB0aGlzLnN0YXJzW2luZGV4XS5jbGFzc05hbWUgPSBcIlwiO1xuICAgICAgdGhpcy5hZGREZWZhdWx0Q2xhc3ModGhpcy5zdGFyc1tpbmRleF0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb2ZmU3RhcihldmVudDogTW91c2VFdmVudCkge1xuICAgIHRoaXMuZ2VuZXJhdGVSYXRpbmcoKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkRGVmYXVsdENsYXNzKHN0YXI6IGFueSkge1xuICAgIHN0YXIuY2xhc3NMaXN0LmFkZChTdGFyUmF0aW5nQ29tcG9uZW50LkNMU19ERUZBVUxUX1NUQVIpO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRDaGVja2VkU3RhckNsYXNzKHN0YXI6IGFueSkge1xuICAgIHN0YXIuY2xhc3NMaXN0LmFkZChTdGFyUmF0aW5nQ29tcG9uZW50LkNMU19DSEVDS0VEX1NUQVIpO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRIYWxmU3RhckNsYXNzKHN0YXI6IGFueSkge1xuICAgIHN0YXIuY2xhc3NMaXN0LmFkZChTdGFyUmF0aW5nQ29tcG9uZW50LkNMU19IQUxGX1NUQVIpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRTdGFycygpIHtcbiAgICBpZiAoIXRoaXMubWFpbkVsZW1lbnQpIHJldHVybjtcbiAgICBsZXQgc3RhckNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQgPSB0aGlzLm1haW5FbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgbGV0IG1heFN0YXJzID0gWy4uLkFycmF5KE51bWJlcih0aGlzLnRvdGFsc3RhcnMpKS5rZXlzKCldO1xuICAgIHRoaXMuc3RhcnMubGVuZ3RoID0gMDtcbiAgICBzdGFyQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgbWF4U3RhcnMuZm9yRWFjaChzdGFyTnVtYmVyID0+IHtcbiAgICAgIGxldCBzdGFyRWxlbWVudDogSFRNTFNwYW5FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICBzdGFyRWxlbWVudC5kYXRhc2V0LmluZGV4ID0gKHN0YXJOdW1iZXIgKyAxKS50b1N0cmluZygpO1xuICAgICAgc3RhckVsZW1lbnQudGl0bGUgPSBzdGFyRWxlbWVudC5kYXRhc2V0LmluZGV4O1xuICAgICAgc3RhckNvbnRhaW5lci5hcHBlbmRDaGlsZChzdGFyRWxlbWVudCk7XG4gICAgICB0aGlzLnN0YXJzLnB1c2goc3RhckVsZW1lbnQpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBseVNpemVBbGxTdGFycygpIHtcbiAgICBpZiAodGhpcy5fc2l6ZSkge1xuICAgICAgdGhpcy5zdGFycy5sZW5ndGggPT0gMCAmJiB0aGlzLnNldFN0YXJzKCk7XG4gICAgICB0aGlzLnN0YXJzLmZvckVhY2goKHN0YXI6IGFueSkgPT4ge1xuICAgICAgICBsZXQgbmV3U2l6ZSA9IHRoaXMuc2l6ZS5tYXRjaCgvXFxkKy8pWzBdO1xuICAgICAgICBsZXQgaGFsZlNpemUgPSAocGFyc2VJbnQobmV3U2l6ZSkgKiAxMCkgLyAyNDtcbiAgICAgICAgbGV0IGhhbGZNYXJnaW4gPSAwIC0gKChwYXJzZUludChuZXdTaXplKSAqIDIwKSAvIDI0KTtcbiAgICAgICAgc3Rhci5zdHlsZS5zZXRQcm9wZXJ0eShTdGFyUmF0aW5nQ29tcG9uZW50LlZBUl9TSVpFLCB0aGlzLnNpemUpO1xuICAgICAgICBpZiAoc3Rhci5jbGFzc0xpc3QuY29udGFpbnMoU3RhclJhdGluZ0NvbXBvbmVudC5DTFNfSEFMRl9TVEFSKSkge1xuICAgICAgICAgIHN0YXIuc3R5bGUuc2V0UHJvcGVydHkoU3RhclJhdGluZ0NvbXBvbmVudC5WQVJfSEFMRl9XSURUSCwgYCR7aGFsZlNpemV9cHhgKTtcbiAgICAgICAgICBzdGFyLnN0eWxlLnNldFByb3BlcnR5KFN0YXJSYXRpbmdDb21wb25lbnQuVkFSX0hBTEZfTUFSR0lOLCBgJHtoYWxmTWFyZ2lufXB4YCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlDb2xvclN0eWxlQWxsU3RhcnMoc2V0Q2hlY2tlZDogYm9vbGVhbikge1xuICAgIHRoaXMuc3RhcnMubGVuZ3RoID09IDAgJiYgdGhpcy5zZXRTdGFycygpO1xuICAgIHRoaXMuc3RhcnMuZm9yRWFjaCgoc3RhcjogYW55KSA9PiB7XG4gICAgICBpZiAoc2V0Q2hlY2tlZCkge1xuICAgICAgICB0aGlzLmFwcGx5Q2hlY2tlZENvbG9yU3R5bGUoc3Rhcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFwcGx5VW5DaGVja2VkQ29sb3JTdHlsZShzdGFyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlDb2xvclN0eWxlKHN0YXJFbGVtZW50OiBIVE1MU3BhbkVsZW1lbnQpIHtcbiAgICB0aGlzLmFwcGx5Q2hlY2tlZENvbG9yU3R5bGUoc3RhckVsZW1lbnQpO1xuICAgIHRoaXMuYXBwbHlVbkNoZWNrZWRDb2xvclN0eWxlKHN0YXJFbGVtZW50KTtcbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlDaGVja2VkQ29sb3JTdHlsZShzdGFyRWxlbWVudDogSFRNTFNwYW5FbGVtZW50KSB7XG4gICAgc3RhckVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoU3RhclJhdGluZ0NvbXBvbmVudC5WQVJfQ0hFQ0tFRF9DT0xPUiwgdGhpcy5jaGVja2VkY29sb3IpO1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBseVVuQ2hlY2tlZENvbG9yU3R5bGUoc3RhckVsZW1lbnQ6IEhUTUxTcGFuRWxlbWVudCkge1xuICAgIHN0YXJFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFN0YXJSYXRpbmdDb21wb25lbnQuVkFSX1VOQ0hFQ0tFRF9DT0xPUiwgdGhpcy51bmNoZWNrZWRjb2xvcik7XG4gIH1cblxuICBwcml2YXRlIGdlbmVyYXRlUmF0aW5nKGZvcmNlR2VuZXJhdGU6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIGlmICghdGhpcy5tYWluRWxlbWVudCkgcmV0dXJuO1xuICAgIGlmICh0aGlzLnJlYWRvbmx5ICYmICFmb3JjZUdlbmVyYXRlKSByZXR1cm47XG5cbiAgICAvL2lmICh0aGlzLnZhbHVlID49IDApIHtcbiAgICB0aGlzLnN0YXJzLmxlbmd0aCA9PSAwICYmIHRoaXMuc2V0U3RhcnMoKTtcbiAgICB0aGlzLm1haW5FbGVtZW50Lm5hdGl2ZUVsZW1lbnQudGl0bGUgPSB0aGlzLnZhbHVlO1xuXG4gICAgbGV0IGhhc0RlY2ltYWxzOiBib29sZWFuID1cbiAgICAgICgoTnVtYmVyLnBhcnNlRmxvYXQodGhpcy52YWx1ZS50b1N0cmluZygpKSAlIDEpXG4gICAgICAgIC50b1N0cmluZygpXG4gICAgICAgIC5zdWJzdHJpbmcoMywgMikpID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgbGV0IGkgPSAxO1xuICAgIHRoaXMuc3RhcnMuZm9yRWFjaCgoc3RhcjogYW55KSA9PiB7XG4gICAgICBzdGFyLmNsYXNzTmFtZSA9IFwiXCI7XG4gICAgICB0aGlzLmFwcGx5Q29sb3JTdHlsZShzdGFyKTtcbiAgICAgIHRoaXMuYWRkRGVmYXVsdENsYXNzKHN0YXIpO1xuXG4gICAgICBpZiAodGhpcy52YWx1ZSA+PSBpKSB7XG4gICAgICAgIC8vIHN0YXIgb25cbiAgICAgICAgdGhpcy5hZGRDaGVja2VkU3RhckNsYXNzKHN0YXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gaGFsZiBzdGFyXG4gICAgICAgIGlmIChoYXNEZWNpbWFscykge1xuICAgICAgICAgIHRoaXMuYWRkSGFsZlN0YXJDbGFzcyhzdGFyKTtcbiAgICAgICAgICBoYXNEZWNpbWFscyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpKys7XG4gICAgfSk7XG4gICAgLy99XG4gIH1cbn1cbiJdfQ==