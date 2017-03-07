'use strict';

module.exports = function(grunt) {
    const sourceFiles = [
        '*.js',
        'bin/*.js',
        'routes/**/*.js',
        'tests/**/*.js'
    ];
    grunt.initConfig({
        jshint: {
            files: sourceFiles,
            options: {
                // use closest-through-parent jshint configuration file
                jshintrc: true
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('default', ['jshint']);
};
