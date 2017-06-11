/**********************************************************************************
 * (c) 2016, Master Technology
 * Licensed under the MIT license or contact me for a Support or Commercial License
 *
 * I do contract work in most languages, so let me solve your problems!
 *
 * Any questions please feel free to email me or put a issue up on the github repo
 * Version 3.0.0                                      Nathan@master-technology.com
 *********************************************************************************/
/**********************************************************************************
 * Modified for internal use to add behavior based on H/W ratio 
 * RedLeafSoft
 *********************************************************************************/
"use strict";

/* jshint camelcase: false */
/* global android, NSStringm, nsPlatform */

const Page = require('ui/page').Page;
require('nativescript-globalevents');
require('nativescript-platform');

/**
 * Function that adds the proper class when we navigate to a new page
 * @param args
 */
let className = '';
let groupings = [1280,1024,800,600,540,480,400,360,320];

const setDevice = function(args) {
    const currentPage = args.object;

    let device;
    if (!className) {
        switch (nsPlatform.platform) {
            case nsPlatform.type.IOS:
                device = 'ios';
                break;

            case nsPlatform.type.ANDROID:
                device = 'android';
                break;

            case nsPlatform.type.WINDOWS:
                device = 'windows';
                break;
        }

		const screen = nsPlatform.screen();

		let short, long, shape, size;
		if (screen.width < screen.height) {
			[short, long] = [screen.width, screen.height];
		} else {
			[long, short] = [screen.width, screen.height];
		}

		if (long/short < 1.65) {
			shape = 'Short'
		} else if (long/short > 1.75) {
			shape = 'Tall'
		} else {
			shape = 'Normal'
		}

		if (short <= 320) {
			size = 'Small'
		} else if (short <= 380) {
			shape = 'Medium'
		} else {
			shape = 'Large'
		}

        let roundedHeight = Math.floor(long/40)*40,
            roundedWidth = Math.floor(short/40)*40;

		className = device + ' '+ 'minH'+ roundedHeight + ' '+ 'minW'+ roundedWidth+ ' '+ 'shape'+ shape+ ' '+ 'size'+ size;
    }

    if (currentPage) {
        const data = currentPage.className || '';
        if (data) {
            currentPage.className = data + ' ' + className;
        } else {
            currentPage.className = className;
        }
    }
};

// Setup Events
Page.on(Page.navigatingToEvent, setDevice);

