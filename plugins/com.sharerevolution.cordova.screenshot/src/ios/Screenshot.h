//
//  Screenshot.h
//
//  Created by Simon Madine on 29/04/2010.
//  Copyright 2010 The Angry Robot Zombie Factory.
//   - Converted to Cordova 1.6.1 by Josemando Sobral.
//  MIT licensed
// changed 2016-09-02 by Tim Perry to remove save feature -- try to avoid prompting user for access to files
//                    when all I want is a screenshot of the current app.
//

#import <Foundation/Foundation.h>
#import <QuartzCore/QuartzCore.h>
#import <Cordova/CDVPlugin.h>

@interface Screenshot : CDVPlugin {
}

- (void)getScreenshotAsURI:(CDVInvokedUrlCommand*)command;
@end
