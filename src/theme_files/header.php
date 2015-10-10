<head>
    <!-- Make the site responsive -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

    <!-- Load theme stylesheets -->

    <link rel="stylesheet" href="<?php bloginfo('template_url'); ?>/css/styles.css">

    <title>
        <?= wpk_get_page_title() ?>
    </title>

    <!-- Call the WordPress 'wp_head()' function in order to allow plugins to initialize -->
    <?php wp_head() ?>
</head>
<body>

<header>
    Page Header
</header>