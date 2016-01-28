/*jslint node: true */
"use strict";

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        electron: {
            build: {
                options: {
                    name: 'MailJS',
                    dir: 'app',
                    out: 'dist',
                    platform: 'win32',
                    arch: 'all',
                    asar: false,
                    overwrite: true,
                    'app-category-type': true,
                    ignore: 'node_modules/*'
                }
            }
        },
        rcedit: {
            pack: {
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    src: ['**/*.exe']
                }],
                options: {
                    'icon': './icon.ico',
                    'file-version': '<%= pkg.version %>',
                    'version-string': {
                        'ProductName': 'MailJS',
                        'FileDescription': '<%= pkg.description %>',
                        'CompanyName': '<%= pkg.author %>',
                        'LegalCopyright': 'MIT licensed by AtlasDev.',
                        'OriginalFilename': ''
                    }
                }
            }
        },
        'electron-builder': {
            win64: {
                options: {
                    appPath: __dirname+'/dist/MailJS-win32-x64',
                    platform: 'win32',
                    out: 'build',
                    config: 'builder.json'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-electron-builder-wrapper');
    grunt.loadNpmTasks('grunt-electron');
    grunt.loadNpmTasks('grunt-rcedit');

    grunt.registerTask('build', [
        'electron',
        'rcedit:pack',
        'electron-builder'
    ]);
};
