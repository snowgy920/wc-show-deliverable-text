(function($) {
    function jqAlert(outputMsg, titleMsg) {
        if (!outputMsg) return;
        var div=$('<div></div>');
        div.html(outputMsg).dialog({
            title: titleMsg,
            resizable: false,
            width: 'auto',
            modal: true,
            buttons: {
                "OK": function () {
                    $(this).dialog("close");
                }
            },
            create: function( event, ui ) {
                $(this).css("maxWidth", "400px");
            }
        });
        if (!titleMsg) div.siblings('.ui-dialog-titlebar').hide();
    }

    $('.single_add_to_cart_button').on('click', function (event) {
        if ($(this).is('.disabled')) {
            event.preventDefault();
            var msg = "Please select some product options before adding this product to your cart.";
            if ($(this).is('.wc-variation-is-unavailable')) {
                msg = "Sorry, this product is unavailable. Please choose a different combination.";
            }
            jqAlert(msg);
            return false;
        }
    });

    $( ".variations_form" ).on( "woocommerce_variation_select_change", function () {
        $('.deliverable-text').hide();
    } );

    $( ".single_variation_wrap" ).on( "show_variation", function ( event, variation ) {
        console.log(variation);
        $('.deliverable-text > span').hide();
        if (variation.availability_html) {
            $('#deliver_avail').show();
        } else {
            $('#deliver_postpone').show();
        }
        $('.deliverable-text').show();
    } );
}).apply(this, [jQuery]);