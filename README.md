## rExtract (region extract)

> Rextract JS is an image Region Extraction library. HTML5 based image processing library which helps automatically detect regions of the image to extract.
> Usually for sprite creation automation process, and custom sprite editors.


[![](https://raw.githubusercontent.com/linuxenko/rextract.js/master/examples/screenshot.png)](http://www.linuxenko.pro/showcase/peter/)

Live [demo](http://codepen.io/linuxenko/pen/xVZgmX)


## Who is using rExtract.js

[![uSprited](https://raw.githubusercontent.com/linuxenko/usprited/master/app/screen/image/usprited.png)](https://github.com/linuxenko/usprited)


### Installation

* Using npm

```
npm install rextract.js
```

* Using cdn

Insert dist/rextract.js or cdn version into html

```
<script src="rextract/dist/rextract.js"></script>
or 
<script src="https://npmcdn.com/rextract.js@0.2.2/dist/rextract.js"></script>
```

### Usage

Webpack, Browresify

```
var Rex = require('rextract.js');
```

Available modules :
  Rextract (default)
  RegionMap
  Rect
  Color

Can be used like this

```
import {RegionMap, Rect, Color} from 'rextract.js';
```

or simple

```
import Rextract from 'rextract.js';
```


CDN version usage

```
var Rex = new Rextract(imageElement, [hexColor])
```

### API


### .detectAll()
> Returns : Array of Rect elements or null

Find all the images inside.

### .detectRegion(x, y)
> Returns : Rect element or null

Find image at specified position

### .fromRegion(x, y, w, h)
> Returns Rect element or null
