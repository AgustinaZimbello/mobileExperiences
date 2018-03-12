cordova-screenshot
==================

[![NPM version](http://img.shields.io/npm/v/com.sharerevolution.cordova.screenshot.svg?style=flat)](https://github.com/perry2of5/cordova-screenshot-crosswalk-ios-only.git)


The Screenshot plugin allows your application to take screenshots of the current screen and save them into the phone.

This is a fork of https://github.com/gitawego/cordova-screenshot.git which supports only crosswalk on Android and the
default webview on iOS. The goal is to allow a screenshot of the crosswalk display without needing to request
permissions to the file system or the user's images. This works if you want to get screenshot of the app for support
purposes.... The image can not be written to disk since the permission is not requested...thus may exhibit out of
memory issues on devices with very high screen resolutions but with not much memory free.

##how to install

install it via cordova cli

```
cordova plugin add https://github.com/perry2of5/cordova-screenshot-crosswalk-ios-only.git
```

notice:
On iOS, only jpg format is supported.
On Android, only [Crosswalk](https://crosswalk-project.org/documentation/cordova.html) is supported

##usage


take screenshot and get it as Data URI
```js
navigator.screenshot.URI(function(error,res){
  if(error){
    console.error(error);
  }else{
    html = '<img style="width:50%;" src="'+res.URI+'">';
    document.body.innerHTML = html;
  }
},50);
```

##usage in AngularJS  TODO: update to use URI

```js
.service('$cordovaScreenshot', ['$q', function ($q){
	return {
		capture: function (filename, extension, quality){
			extension = extension || 'jpg';
			quality = quality || '100';

			var defer = $q.defer();
			
			navigator.screenshot.save(function (error, res){
				if (error) {
					console.error(error);
					defer.reject(error);
				} else {
					console.log('screenshot saved in: ', res.filePath);
					defer.resolve(res.filePath);
				}
			}, extension, quality, filename);
			
			return defer.promise;
		}
	};
}])
```

##Known Issue
###in Android platform I receive the black image with crosswalk 
####solution: 

add this line ``<preference name="CrosswalkAnimatable" value="true" />`` in config.xml, see [bug](https://crosswalk-project.org/jira/browse/XWALK-2233)


License
=========
this repo uses the MIT license
