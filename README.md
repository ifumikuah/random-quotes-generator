# Random Quotes Generator

![Quicklook](./design/Screenshot%202024-01-20%20172417.png)

[Visit Here]()

## What is This?

Simple Random Quotes Generator

## Features

Generate random background image and quote with two different APIs.

Quotes card background taken from the dominant color of the background image.

## How does this work?

### Fetch API's

Fetch image from API with endpoint:

```js
`https://picsum.photos/v2/list?page=1&limit=1`
```

Since we generate random up to `n` image, `page` parameter is set to `Math.random() * n` instead of `1`.

The acquired response must be further parse with `response.json()` to access the `data`, refer to the source for further information.

Obtain image from `data.download_url`

Do the same with the quotes API

### Get Background Color

Using [`color-thief`](https://github.com/lokesh/color-thief), we can get the dominant color of current background image. Note that the background image must be fully loaded to trigger `color-thief` operations.

```js
element.addEventListener("load", ()=>{
  // Your operations here...
})
```

### Connecting With Each Other

After getting everything you need, you can run some of your own functions for your application features. In this case, the obtained color is converted into a more eye-pleasing color by utilizing the HSL value of the color,  refer to the source for further information.