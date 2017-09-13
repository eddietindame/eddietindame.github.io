module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		svgstore: {
		    // options: {
		    //   prefix : 'icon-',
		    // },
		    default : {
		      files: {
		        'res/icons.svg': ['svg/*.svg'],
		      },
		    },
		},
		prettify: {
		    options: {
    			indent: 4,
		    },
		    files: {
		      'index.html': ['index.html']
		    }
		},
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
		concat: {
			dist: {
				src: ['js/plugins/*.js','js/scripts.js'],
				dest: 'js/app.js'
			}
		},
	    babel: {
	        options: {
	            sourceMap: false,
	            presets: ['babel-preset-es2015']
	        },
	        dist: {
	            files: {
	                'js/app.js': 'js/app.js'
	            }
	        }
	    },
		uglify: {
			dist: {
			  files: {
			    'js/app.min.js': ['js/app.js']
			  }
			}
		},
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
			// options: {
			// 	livereload: {
			// 		port: 9000,
			// 		hostname: 'localhost',
			// 	}
			// },
			dist: {
				files: ['**/*.jade','**/*.scss','stylesheets/*.css','js/scripts.js'],
				tasks: ['html','css','js']
			},
			// jade: {
			// 	files: ['**/*.jade'],
			// 	tasks: ['jade']
			// },
			// css: {
			// 	files: ['**/*.scss','stylesheets/*.css'],
			// 	tasks: ['compass','postcss']
			// },
			// js: {
			// 	files: ['js/**/*.js'],
			// 	tasks: ['js']
			// }
		},
		express: {
			all: {
				options:{
					port: 9000,
					hostname: 'localhost',
					bases: ['./'],
					// livereload: true
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
	grunt.loadNpmTasks('grunt-svgstore');
	grunt.loadNpmTasks('grunt-prettify');
	grunt.registerTask('html', ['jade','prettify']);
	grunt.registerTask('css', ['compass','postcss']);
	grunt.registerTask('svg', ['svgstore']);
	grunt.registerTask('js', ['concat','babel','uglify']);
	grunt.registerTask('server', ['express','watch']);
	grunt.registerTask('default', ['express','open','watch']);
}
