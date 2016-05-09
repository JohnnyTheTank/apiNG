module.exports = function (grunt) {

    var banner = '/**\n    @name: <%= pkg.name %> \n    @version: <%= pkg.version %> (<%= grunt.template.today("dd-mm-yyyy") %>) \n    @author: <%= pkg.author %> \n    @url: <%= pkg.homepage %> \n    @license: <%= pkg.license %>\n*/\n';

    var sources = [
        'src/aping.module.js',
        'src/aping-directive.js',
        'src/aping-helpers.js',
        'src/aping-inputObjects.js',
        'src/aping-models.js',
        'src/plugin-jsonloader.js',
        'src/plugin-json-string.js',
        'src/plugin-ng-array.js',
        'src/plugin-local-storage.js',
        'src/plugin-xml.js',
    ];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            js: {
                files: {
                    'dist/aping.min.js': sources
                }
            },
            options: {
                banner: banner
            }
        },
        concat: {
            options: {
                separator: ';',
                banner: banner
            },
            dist: {
                src: sources,
                dest: 'dist/aping.js'
            }
        },
        copy: {
            main: {
                src: 'src/aping-config.js',
                dest: 'dist/aping-config.js'
            }
        },
        watch: {
            minifiyJs: {
                files: sources,
                tasks: ['uglify', 'concat'],
                options: {
                    spawn: true
                }
            },
            copyConfig: {
                files: ['src/aping-config.js'],
                tasks: ['copy'],
                options: {
                    spawn: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['watch']);

};

