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
