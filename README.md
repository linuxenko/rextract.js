## rExtract

> Rextract JS is an image Region Extraction library. HTML5 based image processing library which helps automatically detect regions of the image to extract.
> Usually for sprite creation automation process, and custom sprite editors.


## Usage

Create rExtractor.

```
new Rextract(imageElement, [hexColor])
```

### .detectAll()
> Returns : Array of Rect elements or null

Find all the images inside.

### .detectRegion(x, y)
> Returns : Rect element or null

Find image at specified position
