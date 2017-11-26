var collapseList = function () {

  var breadcrumbList = $('#breadcrumbList');
  var breadcrumbListElement = $('#breadcrumbList li');
  var button = '<button aria-expanded="false" id="collapse" aria-controls="breadcrumbList" title="collapse navigation"><span class="invisible"></span>&hellip;</button>';
  var breadcrumbSize = breadcrumbListElement.length;

  // breakpoint smartphone (0 - 480px, see css)
  if (breakpoint.value === 'smartphone') {
    
    // only collapse breadcrumb, when it contains more than 4 items
    if (!$('#collapse').length > 0 && breadcrumbSize > 4) {

      // put collapse button close to homepage link
      $('#home').append(button);

      var collapse = $('#collapse');

      // get hidden list elements
      var hiddenElements = $(breadcrumbListElement).filter(function() {
        return $(this).css('visibility') == 'hidden';
      });

      // helper function to determine object size
      Object.size = function(obj) {
        var size = 0, key;
        for (key in obj) {
          if (obj.hasOwnProperty(key)) size++;
        }
        return size;
      };

      var size = Object.size(hiddenElements);

      // set help text for buttons title attribute and hidden text
      var helpText = 'Show ' + size + ' more navigation levels';
      $(collapse).attr('title', helpText);
      $(collapse).find('.invisible').append(helpText);

      // collapse other elements (css) by setting class on list and remove collapse button
      $(collapse).click(function(){
        $(breadcrumbList).addClass('js-expanded');
        $(collapse).remove();
      });
    }
  }
  // breakpoint smartphone_wide (480px +, see css)
  if (breakpoint.value === 'smartphone_wide') {
    $('#collapse').remove();
    $(breadcrumbList).removeClass('js-expanded');
  }
}

/* JS BREAKPOINTS */
/* as described here: https://www.lullabot.com/articles/importing-css-breakpoints-into-javascript */
var breakpoint = {};
breakpoint.refreshValue = function() {
  this.value = window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');
};
$(window).resize(function() {
  breakpoint.refreshValue();
  collapseList();
}).resize();

$(document).ready(function(){
  breakpoint.refreshValue();
});