module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            js: {
                files : {
                    'dist/aping.min.js' : [
                        'src/aping-directive.js',
                        'src/aping-helpers.js',
                        'src/aping-inputObjects.js',
                        'src/aping-models.js',
                        'src/aping-designHelpers.js'
                    ]
                }
            },
            options: {
                banner: '\n/*! <%= pkg.name %> v<%= pkg.version %> (<%= grunt.template.today("dd-mm-yyyy") %>) by <%= pkg.author %> */\n',
            }
        },
        copy: {
            main: {
                src: 'src/aping-config.js',
                dest: 'dist/aping-config.js',
            },
        },
        watch: {
            minifiyJs: {
                files: [
                    'src/aping-directive.js',
                    'src/aping-helpers.js',
                    'src/aping-inputObjects.js',
                    'src/aping-models.js',
                    'src/aping-designHelpers.js'
                ],
                tasks: ['uglify'],
                options: {
                    spawn: true,
                },
            },
            copyConfig: {
                files: ['src/aping-config.js'],
                tasks: ['copy'],
                options: {
                    spawn: true,
                },
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['watch']);

};

