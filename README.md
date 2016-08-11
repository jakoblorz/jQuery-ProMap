# jQuery-ProMap
A simple jQuery Plugin for Imagemaps that can be styled with css.
Always thought why CSS doesn't support designing ImageMaps? You need a workaround? Here it is!

## Features
<ul>
  <li>CSS designable - customize the areas, even hovering!</li>
  <li>fast and responsive - scales always according to the base Image!</li>
  <li>jQuery plugin - just one function call!</li>
</ul>

## Usage
###Add an Image to your html file (the following attributes are required):
```
  <img id="" src="" usemap="#" width="" height="">
```
> Notice: width and height are required for correct(responsive) scaling. These values should represent the real size of the Image. Modifying the size of the Image should be done by applying CSS to the Image (e.g. width:100%; height:auto;)

###Add a Map to your html file:
```
  <map name="">
  </map
```
> Notice: the name attribute should be the usemap attribute of your image (without the first #)

###Add some noteworthy areas to your map:
```
  <map name="">
    <area shape="poly" coords="12,45,56,34,67,78,45,34" href="" content="">
    <area shape="poly" coords="90,785,45,896,443,342,449,54" href="" content="">
  </map
```
The plugins adds 2 non-standard yet possible attributes to the area markup:<br>
  1. 'href': a link which is opened when clicked<br>
  2. 'content': a tooltip/information for the area.<br>
  
But they are both optional. 

> Notice: jQuery-ProMap currently only supports polygones.<br>

###Import jQuery, adobe snap.svg and jq-promap.js
I don't think you need help with that ;)

###Finally, call jp-promap.js on the documentbody:
```
  <script>
    $(document.body).promap();
  </script
```

###Your code should now look slightly like this:
```
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

Thank you for using me scripts :D
Over and Out
