<?php

function wpk_get_page_title()
{
    if (is_home())
        return 'Home';
}

// Register Custom Post Type
function projects_post_type() {

    $labels = array(
        'name'                => _x( 'Projects', 'Post Type General Name', 'text_domain' ),
        'singular_name'       => _x( 'Project', 'Post Type Singular Name', 'text_domain' ),
        'menu_name'           => __( 'Projects', 'text_domain' ),
        'name_admin_bar'      => __( 'Projects', 'text_domain' ),
        'parent_item_colon'   => __( 'Parent Project:', 'text_domain' ),
        'all_items'           => __( 'All Projects', 'text_domain' ),
        'add_new_item'        => __( 'Add New Project', 'text_domain' ),
        'add_new'             => __( 'Add New', 'text_domain' ),
        'new_item'            => __( 'New Project', 'text_domain' ),
        'edit_item'           => __( 'Edit Project', 'text_domain' ),
        'update_item'         => __( 'Update Project', 'text_domain' ),
        'view_item'           => __( 'View Project', 'text_domain' ),
        'search_items'        => __( 'Search Project', 'text_domain' ),
        'not_found'           => __( 'Not found', 'text_domain' ),
        'not_found_in_trash'  => __( 'Not found in Trash', 'text_domain' ),
    );
    $args = array(
        'label'               => __( 'Project', 'text_domain' ),
        'description'         => __( 'Post type for showing off projects', 'text_domain' ),
        'labels'              => $labels,
        'supports'            => array( 'title', 'editor', 'excerpt', 'thumbnail', 'comments', 'custom-fields', ),
        'taxonomies'          => array( 'category', 'post_tag' ),
        'hierarchical'        => false,
        'public'              => true,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'menu_position'       => 5,
        'menu_icon'           => 'dashicons-clipboard',
        'show_in_admin_bar'   => true,
        'show_in_nav_menus'   => true,
        'can_export'          => true,
        'has_archive'         => 'projects',
        'exclude_from_search' => false,
        'publicly_queryable'  => true,
        'capability_type'     => 'post',
    );
    register_post_type( 'project', $args );

}
add_action( 'init', 'projects_post_type', 0 );