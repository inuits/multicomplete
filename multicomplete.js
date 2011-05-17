(function ($) {

    var oldHidePopup = Drupal.jsAC.prototype.hidePopup;


    Drupal.jsAC.prototype.hidePopup = function (keycode) {
        // Select item if the right key or mousebutton was pressed.
        if (this.selected && ((keycode && keycode != 46 && keycode != 8 && keycode != 27) || !keycode)) {
            this.input.value = $(this.selected).data('autocompleteValue');
            $(this.input).trigger('autocomplete_select', [this.selected]);
        }
        // Hide popup.
        var popup = this.popup;
        if (popup) {
            this.popup = null;
            $(popup).fadeOut('fast', function () {
                $(popup).remove();
            });
        }
        this.selected = false;
        $(this.ariaLive).empty();
    };


    //@todo: Find a way to hook this into drupal without patching drupal core. :/

    //@todo: implement generic handling of our KICKASS multicomplete callbacks.




    Drupal.behaviors.multicompleteHandler = {
        attach: function(context,settings) {
            $('input', context).bind('autocomplete_select', function(event, element) {
                //@todo: check if element has a multicomplete definition or bail out!
                var form = $(element).closest('form');

                //@todo: collect input values
                //@todo: update input fields
                // incl. empty values.

                //@todo: set form field values.
                //$.each(values, function(key, value) {
                //    if (value.length > 0) {
                //        infields[key].val(value);
                //    }
                //});

            })
        }
    }

})(jQuery);

