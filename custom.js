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
    $(document).ready(function(){
        $('.single_add_to_cart_button').on('click', function (event) {
            if ($(this).is('.disabled')) {
                event.preventDefault();
                var msg = vars.variation_msg;
                jqAlert(msg);
                return false;
            }
        });

        $( ".variations_form" ).on( "woocommerce_variation_select_change", function () {
            $('.deliverable-text').hide();
        } );

        $( ".single_variation_wrap" ).on( "show_variation", function ( event, variation ) {
            $('.deliverable-text > span').hide();
            if (variation.is_on_backorder) {
                $('#deliver_postpone').show();
            } else {
                $('#deliver_avail').show();
            }
            $('.deliverable-text').show();
        } );
    });

}).apply(this, [jQuery]);