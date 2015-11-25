module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            js: {
                files : {
                    'dist/aping-plugin-facebook.min.js' : [
                        'src/aping-facebook-directive.js',
                        'src/aping-facebook-helper.js',
                        'bower_components/angular-facebook-api-factory/src/angular-facebook-api-factory.js'
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
                    'src/aping-facebook-directive.js',
                    'src/aping-facebook-helper.js',
                    'bower_components/angular-facebook-api-factory/src/angular-facebook-api-factory.js'
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

