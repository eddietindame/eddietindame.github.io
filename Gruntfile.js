module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		postcss: {
			 options: {
			      //map: true, // inline sourcemaps

			      // or
			      // map: {
			      //     inline: false, // save all sourcemaps as separate files...
			      //     annotation: 'dist/css/maps/' // ...to the specified directory
			      // },

			    //   processors: [
			    //     require('pixrem')(), // add fallbacks for rem units
			    //     require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
			    //     require('cssnano')() // minify the result
			    //   ]
			    // },
			    dist: {
			      src: 'stylesheets/*.css'
			    }
		}},
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
				files: ['**/*.scss','**/*.jade'],
				tasks: ['compass','jade']
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
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-openport');
	grunt.loadNpmTasks('grunt-express');
	grunt.loadNpmTasks('grunt-open');
	grunt.registerTask('server', ['openport:watch.options.livereload:35729:40000',
								  'express','open','watch']);
	grunt.registerTask('default', ['server']);
}