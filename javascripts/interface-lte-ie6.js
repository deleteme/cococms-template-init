Event.observe(window, 'load', initAfterImagesIE);
  
function initAfterImagesIE(){

}


Element.addMethods({
  /*


  Makes 32 bit PNG's transparency work in Internet Explorer 6

    * Dependent on "Prototype JavaScript framework (1.6.0)":http://www.prototypejs.org/2007/8/15/prototype-1-6-0-release-candidate
    * Works on *img elements* and on *background images of elements*
    * PNG's can be used as backgrounds. However, *image tiling will not work*
    * *Safe to use* - You don't have to make an exception or write separate code for IE6
    * Background PNG's used in :hover's might need another application of the method


  Example Usages:

   $('yourPNG').pngHack();
   $$('div#fixMe', 'img#andMe', 'img.andUsTo').invoke('pngHack');

  */
  pngHack: function(el){
    var el = $(el);
    if (!Prototype.Browser.IE) return el;
    var gif = '/images/s.gif';
    if ((el.match('img')) && (el.src.include('png'))){
      var alphaImgSrc  = el.src;
      var sizingMethod = 'scale';
      el.src = gif;
    } else if (el.getStyle('backgroundImage').include('png')){
      var bgc = el.getStyle('backgroundColor') || '';
      var alphaImgSrc = el.getStyle('backgroundImage').gsub(/url\(|\)|'|"/, '');
      var sizingMethod = 'crop';
      el.setStyle({ background: [bgc, ' url(', gif, ') no-repeat'].join('') });
    } else {
      return el;
    }
    el.runtimeStyle.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="#{al}",sizingMethod="#{sz}")'.interpolate({ al: alphaImgSrc, sz: sizingMethod });
    return el;
  }
});