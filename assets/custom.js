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
  // $(".header.header-fixed--false").fixedHeader();
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

  // Size chart
  /* product sizing guide popup */
  $('.sizing-guide-button').click(function(event) {
    console.log("sizing-guide-button");
    event.preventDefault();
    var popupClass = 'chromeworld-popup';
    if($(this).hasClass('rings-sizing-converter-button')) {
    	popupClass += ' sizing-ring-converter-popup';
    } else {
    	popupClass += ' sizing-guide-popup';
    }
    
    var popup = '<div class="ik-modal-overlay"></div><aside id="product-popup" data-section-id="popup" data-section-type="product-popup" class="' + popupClass + '">';
    popup += '<button class="cart-popup-close popup-close-button" data-action="close-popup" aria-label="Close"><svg class="Icon Icon--close" role="presentation" viewBox="0 0 16 14"><path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none" fill-rule="evenodd"></path></svg></button>';
    
    var popupTitle = '';
    var popupContent = '';
    
    if($(this).hasClass('pendants-sizing-guide-button')) {
      	popupTitle = 'Pendant sizing guide';
      	popupContent = '<div class="tiffany-sizes-preview-block" id="tiffany-pendant-content"><div class="tiffany-sizes-your-fit-block">   <table>      <tbody><tr>   <th>Chain Length (in)</th>   <th>Chain Length (cm)</th></tr><tr>   <td>16</td>   <td>40</td></tr><tr>   <td>18</td>   <td>45</td></tr><tr>   <td>20</td>   <td>50</td></tr><tr>   <td>22</td>   <td>55</td></tr><tr>   <td>24</td>   <td>60</td></tr><tr>   <td>26</td>   <td>65</td></tr><tr>   <td>28</td>   <td>70</td></tr><tr>   <td>30</td>   <td>75</td></tr><tr>   <td>32</td>   <td>80</td></tr>      </tbody>   </table>   <div class="tiffany-sizes-description">      <h2 class="Heading Heading u-h2">Find Your Fit</h2>      <p>Chrome World uses inches and centimeters to measure pendant chains. Refer to our measurement chart or the ruler found in our size guide.</p>      <a href="https://chromeworld.jp/pages/pendant-sizing-guide" target="_blank" rel="noopener noreferrer"><span>View &amp; download complete guide</span> </a>   </div></div></div>';
    } else if($(this).hasClass('rings-sizing-guide-button')) {
      	popupTitle = 'Ring sizing guide';
      	popupContent = '<div class="tiffany-sizes-preview-block" id="tiffany-rings-content"><div class="tiffany-sizes-your-fit-block"><table><tbody><tr><th>US Size</th><th>Inside circumference (mm)</th></tr><tr><td>4</td><td>47.1</td></tr><tr><td>5</td><td>49.6</td></tr><tr><td>6</td><td>51.8</td></tr><tr><td>7</td><td>54</td></tr><tr><td>7.5</td><td>56.2</td></tr><tr><td>8.5</td><td>58.1</td></tr><tr><td>9</td><td>60</td></tr><tr><td>10</td><td>62.2</td></tr><tr><td>10.5</td><td>63.8</td></tr><tr><td>11.5</td><td>66</td></tr><tr><td>12</td><td>67.9</td></tr><tr><td>13</td><td>70.1</td></tr></tbody></table><div class="tiffany-sizes-description"><h2 class="Heading Heading u-h2">Find your fit</h2><p>Chrome World uses standard US rings sizes. Refer to our measurement chart or the ruler found in our size guide.</p><a href="https://cdn.shopify.com/s/files/1/0430/2779/2040/files/US_Ring_size_guide_CW.pdf?v=1594970187" target="_blank" rel="noopener noreferrer"><span>View &amp; download complete guide</span> </a></div></div></div>';
    } else if($(this).hasClass('rings-sizing-converter-button')) {
      	popupTitle = 'Ring sizing guide';
      	popupContent = '<div class="size-converter-container"><p>Input your ring size to find the corresponding UK size</p>';
      	popupContent += '<form id="ring-converter-form">';
      	popupContent += '<div><span>Inside Diameter</span><select><option value="1">14.1mm</option><option value="2">14.5mm</option><option value="3">14.8mm</option><option value="4">15.5mm</option><option value="5">15.9mm</option><option value="6">16.2mm</option><option value="7">16.5mm</option><option value="8">16.7mm</option><option value="9">17.3mm</option><option value="10">18mm</option><option value="11">18.3mm</option><option value="12">18.7mm</option><option value="13">19mm</option><option value="14">19.4mm</option><option value="15">19.7mm</option><option value="16">20.4mm</option><option value="17">20.8mm</option><option value="18">21.1mm</option><option value="19">21.5mm</option><option value="20">21.8mm</option><option value="21">22.2mm</option></select></div>';
//       	popupContent += '<div><span>Inside Circumference</span><select><option value="1">44.14</option><option value="2">45.40</option><option value="3">46.68</option><option value="4">47.97</option><option value="5">49.32</option><option value="6">50.58</option><option value="7">51.87</option><option value="8">53.16</option><option value="9">54.51</option><option value="10">55.76</option><option value="11">57.15</option><option value="12">58.21</option><option value="13">59.34</option><option value="14">60.98</option><option value="15">62.33</option><option value="16">63.46</option><option value="17">64.97</option><option value="18">66.22</option><option value="19">67.51</option><option value="20">68.77</option><option value="21">70.15</option></select></div>';
      	popupContent += '<div><span>UK</span><select><option value="1">F</option><option value="2">G 1/4</option><option value="3">H 1/2</option><option value="4">I 1/2</option><option value="5">J 1/2</option><option value="6">L</option><option value="7">M</option><option value="8">N</option><option value="9">O</option><option value="10">P</option><option value="11">Q</option><option value="12">Q 3/4</option><option value="13">R 3/4</option><option value="14">S 3/4</option><option value="15">T 1/2</option><option value="16">U 1/2</option><option value="17">V 1/2</option><option value="18">W 3/4</option><option value="19">Y</option><option value="20">Z</option><option value="21">Z+1</option></select></div>';
      	popupContent += '<div><span>USA</span><select><option value="1">3</option><option value="2">3.5</option><option value="3">4</option><option value="4">4.5</option><option value="5">5</option><option value="6">5.5</option><option value="7">6</option><option value="8">6.5</option><option value="9">7</option><option value="10">7.5</option><option value="11">8</option><option value="12">8.5</option><option value="13">9</option><option value="14">9.5</option><option value="15">10</option><option value="16">10.5</option><option value="17">11</option><option value="18">11.5</option><option value="19">12</option><option value="20">12.5</option><option value="21">13</option></select></div>';
      	popupContent += '<div><span>French & Russian</span><select><option value="1">44</option><option value="2">-</option><option value="3">-</option><option value="4">-</option><option value="5">-</option><option value="6">51 3/4</option><option value="7">52 3/4</option><option value="8">54</option><option value="9">55 1/4</option><option value="10">56 1/2</option><option value="11">57 3/4</option><option value="12">-</option><option value="13">-</option><option value="14">-</option><option value="15">-</option><option value="16">-</option><option value="17">-</option><option value="18">-</option><option value="19">67 1/2</option><option value="20">68 3/4</option><option value="21">-</option></select></div>';
      	popupContent += '<div><span>German</span><select><option value="1">14</option><option value="2">14 1/2</option><option value="3">15</option><option value="4">15 1/4</option><option value="5">15 3/4</option><option value="6">16</option><option value="7">16 1/2</option><option value="8">17</option><option value="9">17 1/4</option><option value="10">17 3/4</option><option value="11">18</option><option value="12">18 1/2</option><option value="13">19</option><option value="14">19 1/2</option><option value="15">20</option><option value="16">20 1/4</option><option value="17">20 3/4</option><option value="18">21</option><option value="19">21 1/4</option><option value="20">21 3/4</option><option value="21">22</option></select></div>';
      	popupContent += '<div><span>Japanese</span><select><option value="1">4</option><option value="2">6</option><option value="3">7</option><option value="4">8</option><option value="5">9</option><option value="6">10</option><option value="7">12</option><option value="8">13</option><option value="9">14</option><option value="10">15</option><option value="11">16</option><option value="12">17</option><option value="13">18</option><option value="14">19</option><option value="15">20</option><option value="16">22</option><option value="17">23</option><option value="18">24</option><option value="19">25</option><option value="20">26</option><option value="21">27</option></select></div>';
      	popupContent += '<div><span>HK</span><select><option value="1">6</option><option value="2">7</option><option value="3">8</option><option value="4">10</option><option value="5">11</option><option value="6">12</option><option value="7">13</option><option value="8">14</option><option value="9">15</option><option value="10">17</option><option value="11">18</option><option value="12">19</option><option value="13">20</option><option value="14">21</option><option value="15">22</option><option value="16">24</option><option value="17">25</option><option value="18">26</option><option value="19">27</option><option value="20">28</option><option value="21">29</option></select></div>';
      	popupContent += '</form>';
      	popupContent += '<h3 class="hide--mobile"><a href="https://cdn.shopify.com/s/files/1/0430/2779/2040/files/Full_CW_Ring_Size_Guide.pdf?v=1615278158" target="_blank" rel="noopener noreferrer" style="text-decoration: underline;">How do I measure my ring size? (printable guide)</a></h3>';
      	popupContent += '<h3 class="hide--desktop"><a href="/pages/sizing-guides" rel="noopener noreferrer" style="text-decoration: underline;">How do I measure my ring size? (printable guide)</a></h3>';
      	popupContent += '</div>';
    } else if($(this).hasClass('chains-sizing-guide-button')) {
      	popupTitle = 'Chain sizing guide';
      	popupContent = '<div class="tiffany-sizes-preview-block" id="tiffany-pendant-content"><div class="tiffany-sizes-your-fit-block">   <table>      <tbody><tr>   <th>Chain Length (in)</th>   <th>Chain Length (cm)</th></tr><tr>   <td>16</td>   <td>40</td></tr><tr>   <td>18</td>   <td>45</td></tr><tr>   <td>20</td>   <td>50</td></tr><tr>   <td>22</td>   <td>55</td></tr><tr>   <td>24</td>   <td>60</td></tr><tr>   <td>26</td>   <td>65</td></tr><tr>   <td>28</td>   <td>70</td></tr><tr>   <td>30</td>   <td>75</td></tr><tr>   <td>32</td>   <td>80</td></tr>      </tbody>   </table>   <div class="tiffany-sizes-description">      <h2 class="Heading Heading u-h2">Find Your Fit</h2>      <p>Chrome World uses inches and centimeters to measure pendant chains. Refer to our measurement chart or the ruler found in our size guide.</p>      <a href="https://chromeworld.jp/pages/pendant-sizing-guide" target="_blank" rel="noopener noreferrer"><span>View &amp; download complete guide</span> </a>   </div></div></div>';
    }
    
    popup += '<h2 class="Heading u-h2">';
    popup += popupTitle;	
    popup += '</h2>';
    
    popup += '<div class="popup-content">';
    popup += popupContent;	
    popup += '</div>';
    
    $('#ik-modal').html(popup);

    $('#product-popup').fadeIn();
  });
  
      
  $('#ik-modal').on('click', '.popup-close-button', function() {
    $('.chromeworld-popup').fadeOut();
    $("#ik-modal").html("");
  });
      
  
  $('#ik-modal').on('change', '#ring-converter-form select', function() {
	$('#ring-converter-form select').val($(this).val());
  });
});

$(".Timeline__NavItem").click(function() {
  var index = $(this).attr("data-index");
  $(this).closest(".Timeline__NavWrapper").find(".Timeline__NavItem").removeClass("is-selected");
  $(this).addClass("is-selected");
  $(".Timeline__ListItem .Timeline__Item").removeClass("is-selected");
  $(".Timeline__Item[data-index='"+ index +"']").addClass("is-selected");
});

$(document).on("click", ".ik-modal-overlay", function() {
  $("#ik-modal").html("");
});

$('.Cart__NoteButton').click(function(){
  $('.cart-note-hidden-part').slideToggle();
});