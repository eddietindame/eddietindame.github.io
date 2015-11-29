module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		postcss: {
			 options: {
			      map: true, // inline sourcemaps

			      // or
			      // map: {
			      //     inline: false, // save all sourcemaps as separate files...
			      //     annotation: 'dist/css/maps/' // ...to the specified directory
			      // },

			      processors: [
			        // require('pixrem')(), // add fallbacks for rem units
			        require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
			        // require('cssnano')() // minify the result
			      ]
			    },
			    dist: {
			      src: 'stylesheets/*.css'
			    }
		},
		// uglify: {
		// 	my_target: {
		// 	  files: {
		// 	    'js/app.min.js': ['js/plugins/*.js']
		// 	  }
		// 	}
		// },
	    babel: {
	        options: {
	            sourceMap: true,
	            presets: ['babel-preset-es2015']
	        },
	        dist: {
	            files: {
	                'js/app.js': 'js/**/scripts.js'
	            }
	        }
	    },
		// concat: {
		// 	dist: {
		// 		src: ['bower_components/**/*.js', 'node-modules/waypoints/**/*.js', 'js/plugins/*.js'],
		// 		dest: 'js/app.js'
		// 	}
		// },
		compass: {
			dist: {
				options: {
					sassDir: 'scss',
					cssDir: 'stylesheets'
				}
			}
		},
		jade: {
			compile: {
	            options: {
	                client: false,
	                pretty: true
	            },
	            files: [ {
	              cwd: './',
	              src: 'index.jade',
	              dest: "./",
	              expand: true,
	              ext: '.html'
	            } ]
        	}
    	},
		watch: {
			options: {livereload: true},
			css: {
				files: ['**/*.scss','stylesheets/*.css', '**/*.jade', 'js/**/*.js'],
				tasks: ['compass','postcss', 'jade', 'babel']
			}
		},
		express:{
			all:{
				options:{
					port: 9000,
					hostname: 'localhost',
					bases: ['./'],
					livereload:true
				}
			}
		},
		open: {
      		all: {
        		path: 'http://localhost:<%= express.all.options.port%>',
        		app: 'Google Chrome'
      		}
    	}
	});
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-express');
	grunt.loadNpmTasks('grunt-open');
	grunt.registerTask('server', ['express','open','watch']);
	// grunt.registerTask('js', ['uglify','babel']);
	grunt.registerTask('default', ['server']);
}