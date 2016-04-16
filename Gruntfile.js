module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				/* files: {
					'statics/css/main.css': 'statics/sass/main.scss',
					'statics/css/menus.css': 'statics/sass/menus.scss',
					'statics/css/popup-styles/variable_create.css': 'statics/sass/popup-styles/variable_create.scss'
				} */
				files: [{
					expand: true,
					cwd: '/statics/scss/',
					src: '[**/*.scss]',
					dest: '/statics/css',
					ext: '.css'
				}]
			}
		},
		watch: {
			css: {
				files: 'statics/sass/*.scss',
				tasks: ['sass']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['watch']);
}
