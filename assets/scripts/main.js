/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */

(function($) {

  // Use this variable to set up the common and page specific functions. If you
  // rename this variable, you will also need to rename the namespace below.
  var Rikleimt = {
    // All pages
    'common': {
      init: function() {
        // JavaScript to be fired on all pages

        // Add 'js' class on HTML tag
        $('html').addClass('js');

        // Add element so we can change its layout in CSS and have a better way
        // to trigger narrow resolution (or any other where there's no other way)
        $('body').append('<div id="responsiveResTrig"></div>');

        $(window).on('resize', function(){
          UTIL.fire('common', 'setResponsiveClasses');
        }).resize();

        // MatchHeight functions
        UTIL.fire('common', '_matchHeight');
      },

      finalize: function() {
        // JavaScript to be fired on all pages, after page specific JS is fired

      },
      setResponsiveClasses: function(){
        // Add or remove classes on window resize
        var availableSizes = ['mobile','tablet','narrow','wide','extrawide'];

        keepSelectedSizeOnly = function(size){
          for (a = 0; a < availableSizes.length; ++a) {
            if (availableSizes[a] != size){ $('body').removeClass(availableSizes[a]);}
          }
          $('body').addClass(size);
        };

        setSize = function(size){
          // If the site doesn't already have the correct class
          if((!$('body.'+size).length)){

            if(size == 'mobile'){
              keepSelectedSizeOnly('mobile');
            }else{
              // Close the mobile nav
              keepSelectedSizeOnly(size);
            }
          }
        };

        // is mobile
        if($('#responsiveResTrig').css('width') == '50px') {
          setSize('mobile');
        }
        // is tablet resolution
        else if($('#responsiveResTrig').css('width') == '75px') {
          setSize('tablet');
        }
        // is wide resolution
        else if($('#responsiveResTrig').css('width') == '200px') {
          setSize('wide');
        }
        // is extra-wide resolution
        else if($('#responsiveResTrig').css('width') == '300px') {
          setSize('extrawide');
        }
        // is narrow resolution
        else {
          setSize('narrow');
        }
      },

      _matchHeight: function() {

      }
    },

    // Home page
    'home': {
      init: function() {
        // JavaScript to be fired on the home page
      },

      finalize: function() {
        // JavaScript to be fired on the home page, after the init JS
      },
    }
  };

  // The routing fires all common scripts, followed by the page specific scripts.
  // Add additional events for more control over timing e.g. a finalize event
  var UTIL = {
    fire: function(func, funcname, args) {
      var fire;
      var namespace = Rikleimt;
      funcname = (funcname === undefined) ? 'init' : funcname;
      fire = func !== '';
      fire = fire && namespace[func];
      fire = fire && typeof namespace[func][funcname] === 'function';

      if (fire) {
        namespace[func][funcname](args);
      }
    },
    loadEvents: function() {
      // Fire common init JS
      UTIL.fire('common');

      // Fire page-specific init JS, and then finalize JS
      $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
        UTIL.fire(classnm);
        UTIL.fire(classnm, 'finalize');
      });

      // Fire common finalize JS
      UTIL.fire('common', 'finalize');
    },
  };

  // Load Events
  $(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.
