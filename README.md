# jQuery-ProMap
A simple jQuery plugin for imagemaps that can be styled with css.
Always thought why css doesn't support custom imagemaps? You need a workaround? Here it is!

## Features
  - css - customize the areas, even hovering!
  - fast and responsive - scales always according to the underlying image!
  - jQuery plugin - just one function call!

## Usage
**1. add an image to your html file (the following attributes are required):**
```html
  <img id="" src="" usemap="#" width="" height="">
```
> *Notice: width and height are required for correct(responsive) scaling. These values should represent the real size of the Image. Modifying the size of the image should be done by applying CSS to the image (e.g. width:100%; height:auto;)*

**2. add a map to your html file:**
```html
  <map name="">
  </map
```
> *Notice: the name attribute should be the usemap attribute of your image (without the first #)*

**3. add areas to your map:**
```html
  <map name="">
    <area shape="poly" coords="12,45,56,34,67,78,45,34" href="" content="">
    <area shape="poly" coords="90,785,45,896,443,342,449,54" href="" content="">
  </map
```
> **jQuery ProMap** adds 2 optional attributes to the area tag:
  - 'href': a link which is opened when clicked
  - 'content': a tooltip/information for the area

> *Notice: jQuery-ProMap currently only supports polygones*

**4. import `jQuery.js`, `adobe snap.svg` and `jq-promap.js`**

**5. Finally, call jp-promap.js on the documentbody:**
```html
  <script>
    $(document.body).promap();
  </script
```

Your code should now look slightly like this:
```html
<body>
  <img id="nicepic" src="img/nicepic.jpg" usemap="#highlights" width="1500" height="350">
  <map name="highlights">
    <area shape="poly" coords="12,45,56,34,67,78,45,34" href="http://www.facebook.com/theguy" content="This is his face">
    <area shape="poly" coords="90,785,45,896,443,342,449,54" href="" content="Nothing to see here :D ">
  </map
  <script src="js/jquery.min.js"></script>
  <script src="js/snap.svg-min.js"></script>
  <script src="js/jq-promap.js"></script>
  <script>
    $(document.body).promap();
  </script
</body>
```

Thank you for using my scripts :D
Over and Out
