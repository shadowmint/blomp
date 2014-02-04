module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-ts');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            lib: {
                src: ['assets/css/*', '!assets/css/.placeholder', 'assets/js/*', '!assets/js/.placeholder']
            }
        },
        sass: {
            lib: {
                options: {                       // Target options
                    style: 'expanded'
                },
                files: {           
                    'assets/css/theme.css': 'sass/theme.scss'
                }
            }
        },
        ts: {
            lib: {
                src: ['typescript/**/*.ts'],
                out: 'assets/js/theme.js',
                options: {
                    target: 'es3',
                    sourceMaps: false,
                    declaration: true,
                    removeComments: false
                }
            }
        },
        watch: {
            ts: {
                files: ['typescript/**/*.ts'],
                tasks: ['ts:lib']
            },
            sass: {
                files: ['sass/**/*.scss'],
                tasks: ['sass:lib']
            }
        }
    });

    grunt.registerTask('default', ['clean', 'ts:lib', 'sass:lib']);
    grunt.registerTask('dev', ['default', 'watch']);
}
