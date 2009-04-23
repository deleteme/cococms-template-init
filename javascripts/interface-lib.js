/* Utility Functions */
function cl(str){
  if(_debugMode && console) t(
    function(){
      console.log(str);
    }
  );
}

function t(f) {
  Try.these(f);
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
  },
  /*
    
    centers the element vertically and horizontally within it's parent element
      requires positioning of the element, and dimensions
  */
  center: function(el){
    var el = $(el);
    var parent = el.up();
    return el.setStyle({
      left: (parent.getWidth()  - el.getWidth())  / 2 + 'px',
      top:  (parent.getHeight() - el.getHeight()) / 2 + 'px'
    });
  },
  fakeMinHeight: function(el){
    var el = $(el);
    if (!Prototype.Browser.IE) return el;
    if (Number(el.getStyle('height').gsub('px', '')) < Number(el.getStyle('minHeight').gsub('px', ''))) {
      el.setStyle({ height: el.getStyle('minHeight') });
    }
    return el;
  }
});

/*


Equalize the heights of columns
*/
Object.extend(Array.prototype, {
  equalizeHeights: function(){
    if (this.any(function(el){
      return Object.isElement(el)
    }))
      var maxHeight = this.map(function(el){
          return el.getHeight();
      }).max();
      this.each(function(el) {
        if (el.getHeight() != maxHeight) {
          el.setStyle({height: 
            (maxHeight - Number(el.getStyle('padding-top').sub('px', '')) -
            Number(el.getStyle('padding-bottom').sub('px', ''))) + 'px'
          });
        }
      });
    return this;
  }
});



/*


Adds the ability to random a number
*/
Object.extend(Number.prototype, {
  rand: function(){
    return Math.ceil(this * Math.random());
  }
});
