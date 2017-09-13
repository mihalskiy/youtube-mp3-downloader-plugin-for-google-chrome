"use strict";

// Transition.
// $(document).on("loading-done", loadingDoneCallback);

// Might not use this global var. 
var apiResponse = null;

$(document).ready(popupOpenCallback);
$('#download-button').click = downloadButtonCallback;

function popupOpenCallback() {

    console.log("Document opened");

    $('.download-view').hide();
    $('.loading-view').show();

    // For checking if valid url. 
    const youtubeUrl = 'https://www.youtube.com/watch?v=';
    // The api URL. 
    const apiUrl = 'https://www.youtubeinmp3.com/fetch/?format=JSON&video=';

    // Find the current tab. 
    chrome.tabs.query({
            'active': true,
            'lastFocusedWindow': true
        },
        // With the current tab. 
        (tabs) => {
            let url = tabs[0].url;
            console.log('Got here');
            if (url.includes(youtubeUrl)) {
                logOnBox('This looks like a YouTube URL!');
                var xhr = new XMLHttpRequest();
                xhr.open("GET", apiUrl + url);
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4) {
                        console.log(xhr.response);
                        try {
                            apiResponse = JSON.parse(xhr.response);
                        } catch (err) {
                            console.log(err);
                        }
                        loadingDone(true);
                    }
                };
                xhr.send();
            } else {
                logOnBox("This doesn't look like a YouTube URL!");
                loadingDone(false);
            }
        });
}

function loadingDone(success) {
    console.log('Loading done fired');

    $(".loading-view").hide();
    $(".meta-view").show();

    if (success == false) {

        $(".failed-view").show();

    } else if (success == true) {

        console.log('Attempting to show download screen');
        $(".download-view").show();

    }
}

// @TODO: Not used yet. 
function getCurrentUrl(callback) {
    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    }, (tabs) => { callback(tabs[0].url); });
}

// @TODO: not used yet. Refactor. 
function getApiResp(targetUrl) {
    const apiUrl = 'https://www.youtubeinmp3.com/fetch/?format=JSON&video=';
    var xhr = new XMLHttpRequest();
    xhr.open("GET", apiUrl + targetUrl);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            return JSON.parse(xhr.response);
        }
    };
    xhr.send();
}

function sanitizeFilename(filename, replacement) {

    var illegalRe = /[\/\?<>\\:\*\|":]/g;
    var controlRe = /[\x00-\x1f\x80-\x9f]/g;
    var reservedRe = /^\.+$/;
    var windowsReservedRe = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i;
    var windowsTrailingRe = /[\. ]+$/;

    var sanitized = filename
        .replace(illegalRe, replacement)
        .replace(controlRe, replacement)
        .replace(reservedRe, replacement)
        .replace(windowsReservedRe, replacement)
        .replace(windowsTrailingRe, replacement);

    return sanitized;

}

function downloadButtonCallback() {

    console.log("Button clicked");

    if (apiResponse != null) {

        /**
         * @TODO Check if invalid, then sanitize
         */

        apiResponse.title = sanitizeFilename(apiResponse.title, "_");

        chrome.downloads.download({
            "url": apiResponse.link,
            "filename": apiResponse.title + '.mp3',
            "saveAs": false
        });

        if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError);
        }
    }
    // // console.log
    // chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, (tabs) => {
    //     var url = tabs[0].url;
    //     // var youtubeUrl = '\bhttps://www.youtube.com/watch?v=+[A-Z0-9]'; 

    //     const youtubeUrl = 'https://www.youtube.com/watch?v=';
    //     const apiUrl = 'https://www.youtubeinmp3.com/fetch/?format=JSON&video=';

    //     if (url.includes(youtubeUrl)) {
    //         // logOnPage('This is a youtube url!');

    //         var xhr = new XMLHttpRequest();
    //         xhr.open("GET", apiUrl + url);
    //         xhr.onreadystatechange = function() {
    //             if (xhr.readyState == 4) {
    //                 let resp = JSON.parse(xhr.response);

    //                 chrome.downloads.download({
    //                     url: resp.link,
    //                     filename: resp.title + '.mp3',
    //                     saveAs: false
    //                 });

    //                 logOnBox('Done! Enjoy :D');
    //                 // console.log(resp.link);
    //                 // console.log(resp);
    //                 // var getRequest = new XMLHttpRequest(); 
    //                 // getRequest.open("GET", resp.link); 
    //                 // getRequest.onreadystatechange = function() {
    //                 // 	if (getRequest.readyState == 4)
    //                 // 	{
    //                 // 		console.log(getRequest.response); 
    //                 // 	}
    //                 // }
    //             }
    //         }
    //         xhr.send();
    //         logOnBox('Sending download request...')
    //     } else {
    //         logOnBox('This is not a youtube url!');
    //     }
    // });
}

function logOnBox(text) {
    let onPageConsole = document.querySelector('#onPageConsole');
    onPageConsole.innerHTML = text;
}