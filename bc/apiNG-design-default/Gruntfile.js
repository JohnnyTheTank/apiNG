module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            js: {
                files : {
                    'dist/aping-design-default.min.js' : ['src/aping-design-default.js']
                }
            },
            options: {
                banner: '\n/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
            }
        },
        sass: {
            distMin: {
                options: {                       // Target options
                    style: 'compressed',
                    sourcemap: 'none'
                },
                files: {
                    'dist/aping-design-default.min.css': 'src/aping-design-default.scss'
                }
            },
            dist: {
                options: {                       // Target options
                    style: 'expanded',
                    sourcemap: 'none'
                },
                files: {
                    'dist/aping-design-default.css': 'src/aping-design-default.scss'
                }
            }
        },
        copy: {
            default_template: {
                src: 'src/aping_design_default.html',
                dest: 'dist/aping_design_default.html',
            },
        },
        watch: {
            minifiyJs: {
                files: [
                    'src/aping-design-default.js'
                ],
                tasks: ['uglify'],
                options: {
                    spawn: true,
                },
            },
            minifySCSS: {
                files: [
                    'src/*.scss'
                ],
                tasks: ['sass'],
                options: {
                    spawn: true,
                },
            },
            copy_default_template: {
                files: [
                    'src/*.html'
                ],
                tasks: ['copy'],
                options: {
                    spawn: true,
                },
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['watch']);

};

