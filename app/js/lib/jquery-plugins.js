(function($) {
  $.fn.smoothScroll = function() {
    if (this.length && this.is(':visible')) {
      $('html,body').animate({
        scrollTop: this.offset().top - 100
      }, 500);
      return true;
    }
  };
})(jQuery);
