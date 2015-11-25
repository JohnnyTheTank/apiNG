module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            js: {
                files : {
                    'dist/aping-plugin-instagram.min.js' : [
                        'src/aping-instagram-directive.js',
                        'src/aping-instagram-helper.js',
                        'bower_components/angular-instagram-api-factory/src/angular-instagram-api-factory.js'
                    ]
                }
            },
            options: {
                banner: '\n/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
            }
        },
        watch: {
            minifiyJs: {
                files: [
                    'src/aping-instagram-directive.js',
                    'src/aping-instagram-helper.js',
                    'bower_components/angular-instagram-api-factory/src/angular-instagram-api-factory.js'

                ],
                tasks: ['uglify'],
                options: {
                    spawn: true,
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['watch']);

};

