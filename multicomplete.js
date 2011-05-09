(function ($) {

//@todo: Find a way to hook this into drupal without patching drupal core. :/

//@todo: implement generic handling of our KICKASS multicomplete callbacks.

  Drupal.behaviours.multicompleteHandler = {
    attach: function(context,settings) {
      $('input.multicomplete', context).bind('', function(event, element) {
        var form = $(element).closest('form');
        
        //@todo: collect input values
        
        //@todo: update input fields
        
        $.each(values, function(key, value) {
          if (value.length > 0) {
            infields[key].val(value);
          }
        });
        
      })
    }
  }

})(jQuery);

