export class ratingElement {
    private _totalStars: number;
    private _checkedColor: string;
    private _unCheckedColor: string;
    private _size: number;
    private _value: number;
    private _readOnly: boolean;

    get checkedcolor(): string {
        return this._checkedColor;
    }

    get uncheckedcolor(): string {
        return this._unCheckedColor;
    }

    get value(): number {
        return this._value;
    }

    get size(): number {
        return this._size;
    }

    get readonly(): boolean {
        return this._readOnly;
    }

    get totalstars(): number {
        return this._totalStars;
    }

    set checkedcolor(value: string) {
        this._checkedColor = value;
    }

    set uncheckedcolor(value: string) {
        this._unCheckedColor = value;
    }

    set value(value: number) {
        this._value = value;
    }

    set size(value: number) {
        if (!value || value == null) {
            value = 24;
        }
        this._size = value;
    }

    set totalstars(value: number) {
        if (!value || value == null) {
            value = 5;
        }
        this._totalStars = value;
    }

    set readonly(value: boolean) {
        this._readOnly = value;
    }

    constructor() {
        this.checkedcolor = "gold";
        this.uncheckedcolor = "gray";
        this.value = 3.5;
        this.size = 24;
        this.totalstars = 5;
    }
}