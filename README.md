## WP Kickstart
This repo is built to facilitate the setup of new WordPress theme projects.  It uses [gulp](http://gulpjs.com/) for separating project files from WordPress files, as well as compiling & minifying less stylesheets and JavaScript files.  It also uses [bower](http://bower.io) for front-end package management. 

###Installation
In order to use this repo, execute the following steps:
(**NOTE:** before starting, make sure you have both `npm` and `bower` installed globally.)

 1. Start with a fresh WordPress installation.  You can download WordPress [here](https://wordpress.org/download/).
 2. Extract all of the core WordPress files to your project root.
 3. Follow the typical WordPress installation procedure.
 4. Clone this repo into the project root.
 5. In the terminal, run `npm install` followed by `bower install`.  This will bring in all of the project's dependencies.
 6. In the terminal, run `gulp` to compile the initial js and css files.  
**NOTE:** `/gulpfile.js` can be edited in order to suit your specific needs.  In particular, you will likely wish to edit the `config` object near the top of the file. 
 7. All edits should take place within the `src` directory.  Running `gulp watch` will automatically pull changes into the correct WordPress directories.