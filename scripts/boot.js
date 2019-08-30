function LoadJS(url, id, callback) {
    var js, hjs = document.getElementsByTagName('script')[0];
    if (document.getElementById(id)) return;

    js = document.createElement('script');
    js.id = id;
    js.src = url;

    if (callback) {
        // IE]
        js.onreadystatechange = function () {
            if (js.readyState === 'loaded' || js.readyState === 'complete') {
                js.onreadystatechange = null;
                js.onload = null;
                callback();
            }
        };
        // others
        js.onload = function () {
            js.onreadystatechange = null;
            js.onload = null;
            callback();
        };
    }

    hjs.parentNode.insertBefore(js, hjs);
}

function LoadCSS(href, id) {
    if ($('#' + id).length > 0)
        return;
    var cssLink = $("<link id='" + id + "' rel='stylesheet' type='text/css' href='" + href + "'>");
    $("head").append(cssLink);
};

function LoadMultipleFiles(files, callback) {
    var index = 0;

    var nextFile = function () {
        if (index < files.length) {
            
            if (files[index].type == 'css') {
                LoadCSS(files[index].url, files[index].id);
                index++;
                nextFile();
            } else if (files[index].type == 'js') {
                LoadJS(files[index].url, files[index].id, nextFile);
                index++;
            }

        } else {
            if (callback) {
                callback();
            }
        }
    };

    nextFile();
}

$(document).ready(function () {
    var loadMainContent = function() {
        LoadMultipleFiles(
            [
                { type: 'js', url: 'http://theta-carousel.com/Scripts/config.js', id: 'config' },
                { type: 'css', url: 'http://theta-carousel.com/Styles/config.css', id: 'confCss' }
            ],
            function() {
                $('.theta-carousel').carousel_config({
                    htmlUrl: "http://theta-carousel.com/config-ui.html"
                });
            }
        );
    };

    if (typeof ($.ui) == "undefined") {
        // load jQuery UI
        LoadMultipleFiles(
            [
                { type: 'js', url: 'http://code.jquery.com/ui/1.12.1/jquery-ui.min.js', id: 'jqUIJs' },
                { type: 'css', url: 'http://code.jquery.com/ui/1.12.1/themes/cupertino/jquery-ui.css', id: 'jqUICss' }
            ],
            loadMainContent
        );
    } else {
        loadMainContent();
    }
});
