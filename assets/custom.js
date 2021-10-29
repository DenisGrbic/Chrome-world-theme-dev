/* ===========================================================
 * jQuery Fixed Header
 *
 * Author: Drew Rawitz <email@drewrawitz.com>
 * http://www.drewrawitz.com
 *
 * https://github.com/drewrawitz/JS-Fixed-Header
 *
 * Options:
 *  - Content Element (string)
 *  - Class (string)
 *  - Breakpoint (integer)
 * ========================================================== */

(function ($) {
  'use strict';

  $.fn.fixedHeader = function (options) {

    // Default options
    var defaults = {
      contentElement: 'body',
      class: null,
      breakpoint: null
    };

    var opts = $.extend(true, {}, defaults, options);

    // Define some variables
    var $this = $(this);
    var headerHeight = $this.outerHeight();

    // If the Content Element defined does not exist, revert back to the default body tag
    var $contentElement = ( $(opts.contentElement).length ) ? $(opts.contentElement) : $(defaults.contentElement);

    // Function to execute the commands
    var execute = function(el) {
      // add the class if specified
      if (opts.class) {
        el.addClass(opts.class);
      }

      // pad the content element
      $contentElement.css('padding-top', headerHeight);
    };

    // Only execute if this element exists on the page
    if ($this.length) {

      if (!opts.breakpoint || $(window).width() >= opts.breakpoint) {
        execute($this);
      }
    }

    $(window).on('resize', function () {
      if (opts.breakpoint && $(window).width() <= opts.breakpoint) {
        // remove the inline style
        $contentElement.css('padding-top', '');

        // remove the custom class
        if (opts.class) {
          $this.removeClass(opts.class);
        }
      } else {
        execute($this);

        // if the height of the header has changed
        if (parseInt($contentElement.css('padding-top')) !== $this.outerHeight()) {

          // then let's set the padding-top value to the new header height
          $contentElement.css('padding-top', $this.outerHeight());
        }
      }
    });

    return $this;
  };
}(jQuery));

/* =====================
End jQuery Fixed Header
====================== */

$(document).ready(function() {
  console.log("Document ready");
  // $("body.index header .search-enabled--true").fixedHeader();
  $(".shopify-section--video .plyr--video").each(function(){
    // $(this).find("video").trigger("click")
  });

  // Size Guide Page
  $('.tiffany-product-options ul a').click(function(event) {
    $('.tiffany-product-options ul a').removeClass('active');
    $(this).addClass('active');
  
    var target = $(this).attr('aria-controls');
    $('.tiffany-sizes-preview-block').removeClass('active');
    $('#' + target).addClass('active');
  });
});

$(".Timeline__NavItem").click(function() {
  var index = $(this).attr("data-index");
  $(this).closest(".Timeline__NavWrapper").find(".Timeline__NavItem").removeClass("is-selected");
  $(this).addClass("is-selected");
  $(".Timeline__ListItem .Timeline__Item").removeClass("is-selected");
  $(".Timeline__Item[data-index='"+ index +"']").addClass("is-selected");
});