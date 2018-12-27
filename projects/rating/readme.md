# ng-starrating

[![npm version]](https://www.npmjs.com/package/ng-starrating/v/1.0.2)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/riteshgandhi/ng-star-rating)

Highly Customizable and Responsive Star Rating built using Angular.

For production, use the files from the `dist/` folder.

## Installation

Use one of the following methods to add the Star Rating library to your project:

- [Download ZIP](https://github.com/riteshgandhi/ng-star-rating/archive/master.zip)
- `npm install ng-starrating`

## Usage

```html
<div style="text-align:center">
  <h1>
    ng-starrating demo
  </h1>
  <star-rating value="5" checkedcolor="red" uncheckedcolor="black" size="24px" readonly="false"></star-rating>
</div>
```

## Options

Here are the default options

```html

checkedcolor: "gold",
uncheckedcolor: "gray",
size: "24px",
value: 0,
readonly: false,
```

### checkedcolor:

Type: `String`

Checked color for the star. Default color is "gold". You can even use color codes.

### uncheckedcolor:

Type: `String`

Un-checked color for the star. Default color is "gray". You can even use color codes.

### size:

Type: `String`

Size of the Stars in pixels. Default size is 24px.

### value:

Type: `Number`

Value of the Star Rating. Default value is 0. It can be between 0 to 5. It also supports half rating.

### readonly:

Type: `Boolean`

Determines whether the star rating component is readonly. 


## Build

Star Rating uses [npm](https://www.npmjs.com/get-npm) to manage package dependencies.

## Compatibility

- All modern browsers

## Contributing

All changes should be committed to the files in `src/`.

## Changelog

`v1.0.2 - [2018-12-26]`
- Minor fixes

`v1.0.1 - [2018-12-26]`
- Initial release

## License

[MIT](/LICENSE)