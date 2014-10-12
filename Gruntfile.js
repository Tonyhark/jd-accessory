/**
 * 京东活动打包系统
 * @param  {[type]} grunt [description]
 * @return {[type]}       [description]
 *
 */
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //拷贝不在define范围内的文件
    uglify: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/<%= pkg.dir %>/js',
          src: '*.js',
          dest: 'dist/<%= pkg.dir %>/js'
        }]
      }
    },
    /**
     * HTML CSS IMG拷走
     * @type {Object}
     */
    copy: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/<%= pkg.dir %>/html/',
          src: "*.html",
          dest: "dist/<%= pkg.dir %>/html/"
        }, {
          expand: true,
          cwd: 'src/<%= pkg.dir %>/css/',
          src: "*.css",
          dest: "dist/<%= pkg.dir %>/css/"
        }],
        options: {
          process: function(content, srcpath) {
            var version = Date.parse(new Date());
            //替换版本号
            content = content.replace(/@@version/g, version);
            //替换文件引入
            content = content.replace(/<script(.*)require.js(.*)\>\<\/script\>/, '');
            content = content.replace(/<script(.*)config.js(.*)\>\<\/script\>/, '<script src="../app/@@minfile?v=' + version + '"></script>');

            return content;
          }
        }
      },
      img: {
        files: [{
          expand: true,
          cwd: 'src/<%= pkg.dir %>/img/',
          src: "*",
          dest: "dist/<%= pkg.dir %>/img/"

        }],
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: "src/<%= pkg.dir %>/", //js根目录  
          name: 'app/index', //执行的第一个requirejs包  
          optimize: 'uglify2',
          mainConfigFile: "src/<%= pkg.dir %>/config.js", //requirejs的配置文件  
          out: "dist/<%= pkg.dir %>/app/<%= pkg.min_file %>", //输出的压缩文件  
          findNestedDependencies: true, //必须指定让requirejs能找到嵌套的文件  
          include: ['../require.js'] //指定requirejs所在的位置。  
        }
      }
    },
    //minfile: grunt.file.read('dist/<%= pkg.dir %>/app/<%= pkg.min_file %>'),
    replace: {
      dist: {
        options: {
          patterns: [{
            match: 'minfile',
            replacement: '<%= pkg.min_file %>'
          }]
        },
        files: [{
          expand: true,
          flatten: true,
          src: ['dist/v1/html/*.html'],
          dest: 'dist/v1/html/'
        }]
      }
    }
  });
  grunt.registerTask('default', ['uglify', 'copy', 'requirejs', 'replace']);

};