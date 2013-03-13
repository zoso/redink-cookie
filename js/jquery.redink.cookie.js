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

    /*
    var obj = JSON.parse(document.cookie);
    //console.log(obj.data.length);

    //add some data
    var tmpArr = obj.data;
    tmpArr.push({
        data: tmpArr.length+1
    });
    obj.data = tmpArr;
    var c = JSON.stringify(obj);
    console.log(c);
    document.cookie = c;
    */

    /*

     var cookieObj = {
                name: 'the Cookie name',
                version: 'the version',
                expire: 0, //when user close browser
                domain: "",
                    path: "/",
                    secure: false,
                    data: [
                        {
                            "data": 1
                        },
                        {
                            "data": 2
                        }
                    ],
                    extra: "hello" //extra is where you can add whatever you want
                }

                var cookie = JSON.stringify(cookieObj);
                document.cookie = cookie;

    */
    var defaultSettings = {
        name: "RedinkCookie",
        version: 1,
        expire: 0,
        domain: "." + window.location.hostname,
        data: [],
        extra: ""
    };

    Array.prototype.remove = function(from, to) {
        var rest = this.slice((to || from) + 1 || this.length);
        this.length = from < 0 ? this.length + from : from;
        return this.push.apply(this, rest);
    };

    $.RedinkCookie = function(options) {
        var res;
        if ($.RedinkCookie.check()) {
            //cookie exist
            res = "cookie exists"
        } else {
            //create new cookie
           defaultSettings = $.extend({}, defaultSettings, options);
           document.cookie = JSON.stringify(defaultSettings);
           res = "cookie created";
        }
        return res;
    }

    $.RedinkCookie.check = function() {
        var state = false;
        if (document.cookie.length > 0) {
            state = true;
        }
        return state;
    }

    $.RedinkCookie.getData = function() {
        var res;
        if ($.RedinkCookie.check()) {
            var obj = JSON.parse(document.cookie);
            if (typeof obj.data === 'object') {
                res = obj.data;
            } else {
                res = "no array";
            }
        } else {
            res = "no data found";
        }
        return res;
    }

    $.RedinkCookie.removeData = function(nr) { //nr is the datas place in array...
        var res;
        if ($.RedinkCookie.check()) {
            var obj = JSON.parse(document.cookie);
            if (obj.hasOwnProperty("data")) {
                for (var i = 0; i < obj.data.length; i++) {
                    if (parseInt(nr) == i) {
                        obj.data.splice(i,1);
                        res = "deleted";
                        break;
                    }
                }
                document.cookie = JSON.stringify(obj);
            } else {

            }

        } else {

        }
        return res;
    }

    $.RedinkCookie.sortData = function(arr) {
        
    }

    $.RedinkCookie.getExtra = function() {
        var res;
        if ($.RedinkCookie.check()) {
            var obj = JSON.parse(document.cookie);
            if (obj.hasOwnProperty("extra")) {
                res = obj.extra;
            } else {
                res = "no extra found";
            }
        } else {
            res = "no cookie found";
        }
        return res;
    }

    $.RedinkCookie.addData = function(data) {
        var res;
        if ($.RedinkCookie.check()) {
            var obj = JSON.parse(document.cookie);
            if (obj.hasOwnProperty("data")) {
                var tmpArr = obj.data;
                tmpArr.push(data);
                obj.data = tmpArr;
                document.cookie = JSON.stringify(obj);
                res = "data added";
                //data exist
            } else {
                //no data exist
                res = "no array present";
            }
        } else {
            res = "no cookie found";
        }
        return res;
    }

    $.RedinkCookie.create = function(options) {
        document.cookie = '{name: '+options.name+'};';
    }

    $.RedinkCookie.delete = function(name) {
        //console.log("-> "+document.cookie);
        document.cookie = null;//'name="";-1; path=/';
        return "cookie deleted";
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