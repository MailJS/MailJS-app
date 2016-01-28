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
                    platform: 'all',
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
        },
		compress: {
			win32: {
				options: {
					archive: 'build/MailJS-win-ia32.zip',
                    level: 9,
                    pretty: true
				},
				files: [
					{
						expand: true,
						cwd: './dist/MailJS-win32-ia32',
						src: ['**'],
						dest: 'MailJS-Desktop',
                        mode: 'gzip'
					}
				]
			},
			win64: {
				options: {
					archive: 'build/MailJS-win-x64.zip',
                    level: 9,
                    pretty: true
				},
				files: [
					{
						expand: true,
						cwd: './dist/MailJS-win32-x64',
						src: ['**'],
						dest: 'MailJS-Desktop',
                        mode: 'gzip'
					}
				]
			},
			linux32: {
				options: {
					archive: 'build/MailJS-linux-ia32.tar.gz'
				},
				files: [
					{
						expand: true,
						cwd: './dist/MailJS-linux-ia32',
						src: ['**'],
						dest: 'MailJS-Desktop',
                        mode: 'tgz'
					}
				]
			},
			linux64: {
				options: {
					archive: 'build/MailJS-linux-x64.tar.gz'
				},
				files: [
					{
						expand: true,
						cwd: './dist/MailJS-linux-x64',
						src: ['**'],
						dest: 'MailJS-Desktop',
                        mode: 'tgz'
					}
				]
			}
		}
    });

    grunt.loadNpmTasks('grunt-electron-builder-wrapper');
    grunt.loadNpmTasks('grunt-electron');
    grunt.loadNpmTasks('grunt-rcedit');
	grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.registerTask('build', [
        'electron',
        'rcedit:pack',
        'electron-builder',
		'compress'
    ]);
};
