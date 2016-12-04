'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

var path = require('path');

module.exports = function (grunt) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Configurable paths for the application
	var appConfig = {
		
	};

	// Define the configuration for all the tasks
	grunt.initConfig({

		// Project settings
		yeoman: appConfig,
		
		watch: {
			scss: {
				files: [
					'!node_modules/**/*.scss',
					'!bower_components/**/*.scss',
					'src/**/*.scss'
				],
				tasks: ['sass', 'postcss:dist', 'cssmin:dist']
			},
			// templates: {
			// 	files: [
			// 		'src/**/*.html'
			// 	],
			// 	tasks: [
			// 		'clean:dist',
			// 		'ngtemplates:foundation',
			// 		'concat'
			// 	]
			// }
		},

		/*
			SASS & CSS Tasks
		*/
		// Add vendor prefixed styles
		postcss: {
			options: {
				map: true,
				processors: [
					require('autoprefixer')({browsers: ['last 2 version']})
				]
			},
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/css/',
					src: '{,*/}*.css',
					dest: '.tmp/css/'
				}]
			}
		},
		// Compiles Sass to CSS and generates necessary files if requested
		sass: {
			options: {
				sourceMap: true
			},
			dist: {
				files: {
					'.tmp/css/n-foundation-extras.css': 'src/n-foundation-extras.scss'
				}
			}
		},
		// Strip out comments from compiled css
		cssmin: {
			dist: {
				options: {
					keepSpecialComments: 0
				},
				files: {
					'./n-foundation-extras.css': '.tmp/css/{,*/}*.css'
				}
			}
		},

		/*
			Javascript Tasks
		*/

		/*
			AngularJS Specific tasks
		 */
		// ng-annotate tries to make the code safe for minification automatically
		// by using the Angular long form for dependency injection.
		// ngAnnotate: {
		// 	dist: {
		// 		files: [{
		// 			expand: true,
		// 			cwd: '.tmp/concat/scripts',
		// 			src: '*.js',
		// 			dest: '.tmp/concat/scripts'
		// 		}]
		// 	}
		// },
		// Inline templates in Javascript to avoid async template loading
		// ngtemplates: {
		// 	foundation: {
		// 		cwd: './',
		// 		src: UIB_TEMPLATES,
		// 		dest: '.tmp/scripts/n-foundation-extras.js',
		// 		options: {
		// 			standalone: true,
		// 			module: 'n.ui.foundation.tpls',
		// 			url: function(path) {
		// 				var neededSubStr = path.split('src/');
		// 				var postfix = neededSubStr[neededSubStr.length - 1];
		// 				var prefix = 'uib/template';
		// 				return [prefix, postfix].join('/');
		// 			},
		// 			htmlmin: {
		// 				collapseBooleanAttributes: false,
		// 				collapseWhitespace: false,
		// 				removeAttributeQuotes: false,
		// 				removeComments: false, // Only if you don't use comment directives!
		// 				removeEmptyAttributes: false,
		// 				removeRedundantAttributes: false,
		// 				removeScriptTypeAttributes: false,
		// 				removeStyleLinkTypeAttributes: false
		// 			}
		// 		}
		// 	}
		// },
		
		/*
			Global Build Tasks
		*/
		// Concatenate the scripts and the newly generated environment constant
		// concat: {
		// 	dist: {
		// 		src: ['.tmp/scripts/n-foundation-extras.js'],
		// 		dest: './n-uib-foundation.js'
		// 	}
		// },
		// Disable Mangling: http://lisperator.net/uglifyjs/mangle
		// uglify: {
		// 	options: {
		// 		mangle: false
		// 	}
		// },

		/*
			Global Utility Tasks
		*/
		// Empties folders to start fresh
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'./*.css',
						'!./.git*'
					]
				}]
			}
		},
		// Run some tasks in parallel to speed up the tasks processes
		concurrent: {
			dist: [
				'sass'
			]
		}
	});

	/*
		Command line tasks
	 */
	grunt.registerTask('build', [
		'clean:dist',
		'sass',
		'postcss:dist',
		'cssmin',
		// 'ngtemplates:foundation',
		// 'concat',
		// 'concat:dist',
		// 'uglify',
		// 'filerev',
		// 'usemin'
	]);

	grunt.registerTask('default', [
		'build'
	]);
	
};
