(function($){
    
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
                name: "some name here",
                version: 1,
                expire: "data expires",
                data: [
                    {
                        url: "path",
                        title: "title",
                        img: ?,
                    {
                        url: "another page",
                        title: "my other page",
                        img: "?",
                        extra: "a simple string here"
                    }
                ],
                extra: "" 
            } //end cookie
    
    */
    
    //Default settings
    var defaultSettings = {
        name: "RedinkCookie",
        version: 1,
        expire: 0,
        domain: "." + window.location.hostname,
        data: [],
        extra: ""
    };

    //sorting the array
    Array.prototype.move = function (old_index, new_index) {
        while (old_index < 0) {
            old_index += this.length;
        }
        while (new_index < 0) {
            new_index += this.length;
        }
        if (new_index >= this.length) {
            var k = new_index - this.length;
            while ((k--) + 1) {
                this.push(undefined);
            }
        }
        this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    };

    //create the cookie
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
                res = "no array";
            }
        } else {
            res = "no data found";
        }
        return res;
    }

    $.RedinkCookie.sortData = function(old_index, new_index) {
        var res;
        if ($.RedinkCookie.check()) {
            var obj = JSON.parse(document.cookie);
            if (obj.hasOwnProperty("data")) {
                var tmpArr = obj.data;
                tmpArr.move(old_index, new_index);
                obj.data = tmpArr;
                document.cookie = JSON.stringify(obj);
                res = "sorted data";
            } else { res = "no array found"}
        } else {
            res = "no data found";
        }
        return res;
    }

    /*$.RedinkCookie.create = function(options) {
        document.cookie = '{name: '+options.name+'};';
    }*/

    $.RedinkCookie.delete = function(name) {
        //console.log("-> "+document.cookie);
        document.cookie = null;//'name="";-1; path=/';
        return "cookie deleted";
    }
})(jQuery);