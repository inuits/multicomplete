(function ($) {

    var oldHidePopup = Drupal.jsAC.prototype.hidePopup;

    // we pretty much override the default functionallity in core that normally
    // would have to be patched when trying to use this functionallity.
    // see bug: http://drupal.org/node/365241
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

    // @todo: Allow disabling of updating not-empty fields.

    Drupal.behaviors.multicompleteHandler = {
        attach: function(context,settings) {

            valuesetter = function(form, field) {
                //@todo: handle stuff other than text (checkboxes, etc etc)
                var inputf =  $(form).find('input[name=' + $(field).attr('data-field') + ']');
                inputf.val($(field).first().text());
            };

            $('input', context).bind('autocomplete_select', function(event, element) {
                //check if element has a multicomplete definition or bail out!
                var mcomplete_wrapper = $(element).find('.multicomplete-result .multicomplete-element');
                if (mcomplete_wrapper.length == 0) {
                    return;
                }
                //inter-form updates are not allowed.
                var form = $(element).closest('form');
                $.each(mcomplete_wrapper.children(), function(index, child) {
                    valuesetter(form, child);
                });

            });
        }
    }

})(jQuery);

