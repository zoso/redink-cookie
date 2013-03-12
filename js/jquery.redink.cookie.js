(function($){
    
    //match cookie name
    //document.cookie.match( name + "=([^;]*)(;|$)" );
    //$.parseJSON(results[1]);
    var dataArr = [];
    var cookieObj = {};
    var date = new Date();
    // Get current date add/remove days "til expired
    var days = 1;
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "<br>expire: "+date.toUTCString();
    //var ipAddress = window.location.hostname.match(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g);
    var domainName = "." + window.location.hostname;

    var text = expires+" <br>"+domainName;

    //JSON.stringify(data)
    //JSON.parse(cookie)


    var methods = {
        init: function(callback) {
            //create cookie if not set - return true/false
            callback("init");
        },
        add: function(callback) {
            cookie = cookie + " > "+randomNr(1, 2002).toString();
            document.cookie = cookie;
            callback("added "+text);
        },
        remove: function(callback) {
            callback("removed");
        },
        list: function(callback) {
            callback("listed");
        },
        sort: function(callback) {
            callback("sorted");
        },
        get_cookie: function() {

        },
        delete_cookie: function(callback) {
            document.cookie = null;
            callback("cookie deleted");
        }
    }

    var randomNr = function(min, max) {
        return Math.floor(Math.random() * (max - (min) + 1)) + (min);
    }

    var defaultSettings = {
        expire: 1,
        version: 0.1
    }

    var cookie = "Test cookie content";
    //document.cookie = cookie;

    $.RedinkCookie = function(name, method, options) {
        var msg;
        if (methods[method]) {
            methods[method](function(m) {
                msg = m;
            });
        } else {
            msg = "no method found";
        }
        
        
        return msg+"<br>"+document.cookie;
    }

    /*
        usage:
            - create array of pages to send to pdfcrowd
            - cookie name
            - expires?
            - item:
                page = {
                    url: "path/to/page",
                    title: "Title of Page",
                    img; "path/to/page", (same as url?)
                    extra: "some parameters" -> could be array
                }

        example:
            - cookie:
                {
                    cookiename: "some name here",
                    cookiecreated: "date created",
                    cookieexpire: "data expires",
                    cookiedata: [
                        {
                            url: "path",
                            title: "title",
                            img: ?,
                            extra: [
                                {
                                    myVar: "something",
                                    myVar2: "something 2"
                                },
                                {
                                    myVar: "something else",
                                    myVar2: "something completly different"
                                }
                            ]
                        },
                        {
                            url: "another page",
                            title: "my other page",
                            img: "?",
                            extra: "a simple string here"
                        }
                    ]
                } //end cookie
    
    */

})(jQuery);