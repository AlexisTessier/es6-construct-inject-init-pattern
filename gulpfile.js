var fs = require('fs');
var path = require('path');

var glob = require('glob');

var _ = require('lodash');
var task = require('@alexistessier/gulp-workflow-common-task');

var example = {};

_.forEach(glob.sync(path.join(__dirname, 'example/*.js')), function(filePath) {
	example[_.camelCase(path.basename(filePath, '.js'))] = fs.readFileSync(filePath, {encoding: 'utf-8'});
});

task.mustache('readme-for-node-package', {
	view : {
		example: example
	}
});
 
task.build();
task.watch();
 
task.default('build');