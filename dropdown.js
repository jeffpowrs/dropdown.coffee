/*!
 * jQuery Drop-down plugin
 * Original author: @jeffpowrs
 * Licensed under the MIT license
 */

(function ( $, window, document, undefined ) {

  if ( typeof Object.create !== 'function' ) {
    Object.create = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
  }

  $.component = function( name, object ) {
    $.fn[name] = function( options ) {
      return this.each(function() {
        if ( !$.data( this, name ) ) {
          $.data( this, name, Object.create(object)).init( options, this );
        }
      });
    };
  };
  
  var $html = $('html'),
      defaults = {
        parentSelector : '.dropdown:first',
        showClass : 'dropdown-show',
        isShowing : false
      },
    dropdown = (function ( config ) {
      
      var options  = {},

        init = function ( config, element ) {
          options = $.extend( true, defaults, config );
          options.$parent = $(options.parentSelector);
          return options.$el = $(element)
            .on('click.dropdown', function (e) {
              toggle();
            }).data( this );
        },

        bindClose = function (e) {
          $html
            .on('click.dropdown', function (e) {
              var $targ = $( e.target || window.e.srcElement ),
                targetIsNotDropdown = !$targ.is( options.$el ),
                targetsNotAChildOf = $( options.$el ).has( $targ ).length == 0;

              if( targetIsNotDropdown && targetsNotAChildOf) {
                $html.off('.dropdown');
                hide();
              }    

            });
        },

        show = function (e) {
          if (e) { e.preventDefault(); e.stopPropagation(); }
          options.$parent.addClass( options.showClass );
          options.isShowing = true;
          bindClose(e);
        },

        hide = function (e) {
          if (e) { e.preventDefault(); e.stopPropagation(); }
          options.$parent.removeClass( options.showClass );
          options.isShowing = false;
          bindClose(e);
        },

        toggle = function (e) {
          if (e) e.preventDefault();
          if (options.isShowing) hide();
          else show();
        },

        destroy = function () {
          $html.off('.dropdown');
          options.$el.off('.dropdown');
        };

      return {
        init: init,
        show : show,
        hide : hide,
        destroy : destroy
      };

  })();

  $.component('dropdown',dropdown);

})( jQuery, window , document );