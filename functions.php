<?php

add_action( 'wp_enqueue_scripts', 'porto_child_css', 1001 );

// Load CSS
function porto_child_css() {
	// porto child theme styles
	wp_deregister_style( 'styles-child' );
	wp_register_style( 'styles-child', esc_url( get_stylesheet_directory_uri() ) . '/style.css' );
	wp_enqueue_style( 'styles-child' );

	if ( is_rtl() ) {
		wp_deregister_style( 'styles-child-rtl' );
		wp_register_style( 'styles-child-rtl', esc_url( get_stylesheet_directory_uri() ) . '/style_rtl.css' );
		wp_enqueue_style( 'styles-child-rtl' );
	}

	wp_register_style('jquery-ui-smoothness', 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/themes/smoothness/jquery-ui.css');
    wp_enqueue_style('jquery-ui-smoothness');
}

add_action( 'wp_enqueue_scripts', 'porto_child_js', 1002 );
function porto_child_js() {
	wp_register_script( 'porto-child-js', esc_url( get_stylesheet_directory_uri() ) . '/custom.js', array('jquery', 'jquery-ui-core', 'jquery-ui-dialog'), '', true);
	wp_enqueue_script( 'porto-child-js' );
	wp_localize_script('porto-child-js', 'vars', array(
		'variation_msg' => __('Please select the product size before adding it into your cart.', 'porto'),
	));
}

add_filter( 'woocommerce_before_add_to_cart_quantity', 'porto_deliverable_text', 1, 2);
function porto_deliverable_text() {
	global $product;
	if ($product->is_type('simple')) {
		?>
		<div class="deliverable-text">
			<span><?php echo $product->is_on_backorder() ? __('Deliverable In 10-15 Days', 'porto') : __('Deliverable In 1 Day', 'porto') ?></span>
		</div>
		<?php
	} else {
		?>
		<div class="deliverable-text" style="display: none">
			<span id="deliver_avail"><?php echo __('Deliverable In 1 Day', 'porto')?></span>
			<span id="deliver_postpone"><?php echo __('Deliverable In 10-15 Days', 'porto')?></span>
		</div>
		<?php
	}
}

add_filter( 'woocommerce_available_variation', 'porto_get_availability', 100, 3 );
function porto_get_availability($vars, $product, $variation) {
	$vars['is_on_backorder'] = $variation->is_on_backorder();
	return $vars;
}