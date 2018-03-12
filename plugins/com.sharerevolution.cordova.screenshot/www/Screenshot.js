/*
 * This code is a slimmed down version of the code by Simon
 * Madine of The Angry Robot Zombie Factory. His code was
 * adapted from the work of Michael Nachbaur.
 *   - Converted to Cordova 1.6.1 by Josemando Sobral.
 *   - Converted to Cordova 2.0.0 by Simon MacDonald
 *   - Removed get screenshot as file. Only URI support remains.
 *  2016-09-16
 *  MIT licensed
 */
var exec = require('cordova/exec'), formats = ['png','jpg'];
module.exports = {

	URI:function(callback, quality){
		quality = typeof(quality) !== 'number'?100:quality;
		exec(function(res){
			callback && callback(null, res);
		}, function(error){
			callback && callback(error);
		}, "Screenshot", "getScreenshotAsURI", [quality]);

	}

};
