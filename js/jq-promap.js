$.fn.promap = function(){
    //populate master data store after DOMs are loaded
    $(document).ready(function(){
        //master data store
        mapdata = new Array();
        
        //get all images on page that use the 'usemap' attribute
        $('img[usemap]').each(function(index, value){

            /* PRESTORAGE ===========================
             * get width, height and id, store them in data 
             * (width and height are stored after they got cut off their improper px)
             * store the mapname, an array for the areas as well as a generated svgid
             * for future use  */
            var preWidth = $(this).attr('width')
              , preHeight = $(this).attr('height')
              , preId = $(this).attr('id')
              , data = {
                imgid: preId,
                mapid: $(this).attr('usemap').substring(1),
                width: (preWidth.indexOf('px') === -1 ? preWidth : preWidth.substring(0, preWidth.indexOf('px'))),
                height: (preHeight.indexOf('px') === -1 ? preHeight : preHeight.substring(0, preHeight.indexOf('px'))),
                areas: new Array(),
                svgid: 'svg_' + preId
            };

            /* MAP WALKTHRU ===========================
             * go through each map, decide wether the map is the required map based on the image
             * if so, get the attributes coords (v1: only polys are supported), content (text for a dynamic tooltip) and href 
             * (a link for the onclick event) */
            $('map').each(function(index, value){
                if($(this).attr('name') === data.mapid){
                    $(this).children('area').each(function(index, value){
                        data.areas.push(
                            $(this).attr('coords') +
                            ($(this).attr('content') == undefined ? '' : '<|>' + $(this).attr('content')) +
                            ($(this).attr('href') == undefined ? '' : '<|>' + $(this).attr('href'))
                        );
                    });
                    $(this).replaceWith('<svg id="' + data.svgid + '" style="position:absolute;"></svg>');
                }
            });
            mapdata.push(data);
        });

        //append the Tooltip-div to the body
        $(document.body).append('<div id="imgmapTooltip" class="imgmapTooltip"></div>');

        function applyEvents(id, content){
            $(id).mouseenter(function(){
                $('#imgmapTooltip').show().html(content);
            }).mouseleave(function(){
                $('#imgmapTooltip').hide();
            }).mousemove(function(event){
                $('#imgmapTooltip').css({
                    left: event.pageX + 25,
                    top: event.pageY,
                    position: 'absolute'
                });
            });
        }

        //Eventhandler onWindowResize
        $(window).resize(function(e){
            mapdata.forEach(function(entry){

                /* DATA GATHERING ===========================
                 * Get data about 'real' width and height and store img and svg DOM.
                 * Finally equalize svg and img visually, reset svg content and get
                 * new Adobe SVG Snap Object on svg DOM*/
                var img = $('#' + entry.imgid)
                  , svg = $('#' + entry.svgid)
                  , width = img.width()
                  , height = img.height();
                svg.offset(img.offset());
                svg.height(height);
                svg.width(width);
                svg.css({ 'padding': img.css('padding') });
                svg.css({ 'margin': img.css('margin') });
                svg.html('');
                var cvs = Snap('#' + entry.svgid);

                /* DRAWING AREA =========================== 
                 * Draw each Area 'by hand' after the coords were scaled accordingly.
                 * Hook up the different events mathing to content and href*/
                entry.areas.forEach(function (data, index) {
                    var sptdt = data.split('<|>');
                    var coords = sptdt[0].replace(' ', '').split(',');
                    for (var i = 0; i < coords.length; i = i + 2) {
                        coords[i] = parseInt(coords[i] * width / entry.width);
                        coords[i + 1] = parseInt(coords[i + 1] * height / entry.height);
                    }
                    var polyid = entry.svgid + '_poly' + index;
                    switch(sptdt.length){
                        case 1:
                            //1 nothing had been applied
                            cvs.polygon().attr({
                                id: polyid,
                                class: 'poly-noaction',
                                points: coords
                            });
                            break;
                        case 2:
                            //2 further cases: only href OR content was applied
                            if(sptdt[1].substring(0,4) === 'http'){
                                cvs.polygon().attr({
                                    id: polyid,
                                    class: 'poly-action poly-link',
                                    points: coords
                                }).click(function(){
                                    window.location.href = sptdt[1];
                                });
                            }
                            else{
                                cvs.polygon().attr({
                                    id: polyid,
                                    class: 'poly-noaction poly-content',
                                    points: coords
                                });
                                applyEvents('#' + polyid, sptdt[1]);
                            }
                            break;
                        case 3:
                            //3 everything had been applied
                            cvs.polygon().attr({
                                id: polyid,
                                class: 'poly-action poly-content poly-link',
                                points: coords
                            }).click(function(){
                                window.location.href = sptdt[2];
                            });
                            applyEvents('#' + polyid, sptdt[1]);
                            break;
                    }
                });
            });
        }).trigger('resize');
        setTimeout(function() {
            $(window).trigger('resize');
        }, 1000);
    });   
}