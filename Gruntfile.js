module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
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
	grunt.loadNpmTasks('grunt-express');
	grunt.loadNpmTasks('grunt-open');
	grunt.registerTask('server', ['express','open','watch']);
	grunt.registerTask('default', ['server']);
}