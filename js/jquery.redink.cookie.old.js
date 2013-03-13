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
    var options = {};
    var text = expires+" <br>"+domainName;

    //JSON.stringify(data)
    //JSON.parse(cookie)

    //decodeURIComponent
    //encodeURIComponent


    var methods = {
        init: function(options, callback) {
            //create cookie if not set - return true/false
            var res;
            if (document.cookie != null) {
                res = "Cookie exist "+document.cookie;
                // var o = JSON.parse(document.cookie);
                // for (var i in o) {
                //     console.log(i + " >  "+o[i]);
                // }
            } else {
                res = "Cookie created";
                options = $.extend({},
                    defaultSettings, 
                    options
                );

                cookieObj = {
                    'name': options.name,
                    'version': options.version
                }



                document.cookie = JSON.stringify(cookieObj);
            }

            console.log("> "+options.name);
            callback(res);
        },
        add: function(callback) {
            //cookie = cookie + " > "+randomNr(1, 2002).toString();
            //document.cookie = cookie;
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
        get_cookie: function(callback) {
            var msg;
            /*var obj = JSON.parse(document.cookie);
            for (var i in obj) {
                msg += "> "+i+" > "+obj[i]+"<br>";
            }*/
            //msg = $.parseJSON(document.cookie);
            callback(msg);
        },
        delete_cookie: function(callback) {
            
            document.cookie = name+'="";-1; path=/';
            callback("cookie deleted");
        }
    }

    var defaultSettings = {
        expire: 1,
        name: "TestCookie",
        version: 0.1
    }

    var cookie = "Test cookie content";
    //document.cookie = cookie;

    $.RedinkCookie = function(name, method, options) {
        var msg;
        if (method == "init") {
            methods[method](options, function(m) {
                msg = m;
            });
        } else if (method == "" || method == null) {
            msg = "No method found";
        } else {
            methods[method](function(m) {
                msg = m;
            });
        }
        /*else if (methods[method]) {
            methods[method](function(m) {
                msg = m;
            });
        } else {
            msg = "no method found";
        }*/
        
        
        return msg+"<br>";//"<br>"+document.cookie
    }

    $.RedinkCookie.check = function(name) {
        var r = false;
        /*if (document.cookie.name == name) {
            r = true;
        }*/
        /*var o = JSON.parse(document.cookie);
        for (var i in o) {
            console.log(i+" > "+o[i])
        }*/
        return r;
    }

    $.RedinkCookie.create = function(options) {
        document.cookie = '{name: '+options.name+'};';
    }

    $.RedinkCookie.delete = function(name) {
        console.log("-> "+document.cookie);
        document.cookie = null;//'name="";-1; path=/';
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