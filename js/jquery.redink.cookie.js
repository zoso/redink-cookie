(function($){
    
    /*
    $.cookie.json = true;
            console.log("--> "+$.cookie('redinkcookie'));
            
            if ($.cookie('redinkcookie') == "redink-cookie") {
                console.log("redink cookie exist");
            } else {
                console.log("redink cookie dosen't exist");
                //$.cookie('RedinkCookie', 'test-cookie-redink', {exists: 0});
                
                var c = {
                    name: 'redink-cookie',
                    exists: 0,
                    data: [
                        {
                            title: "nr 1"
                        },
                        {
                            title: "nr 2"
                        }
                    ]
                };
                $.cookie('redinkcookie', c);

            }

    
    */
    
    //Default settings
    var defaultSettings = {
        version: 1,
        expire: 0,
        path: "/",
        domain: "." + window.location.hostname,
        data: [],
        extra: "",
        vendor: "redink"
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

    //default 
    $.cookie.json = true;
    var c_name;

    //create the cookie
    $.RedinkCookie = function(options) {
        defaultSettings = $.extend({}, defaultSettings, options);
        $.cookie(c_name, defaultSettings);
    }

    $.RedinkCookie.setCookieName = function(name) {
        c_name = name;
    }

    $.RedinkCookie.check = function(name) {
        return $.cookie(c_name);
    }

    $.RedinkCookie.getData = function() {
        var res = [];
        var obj = $.cookie(c_name);
        if (typeof obj.data === 'object') {
           res = obj.data;
        }
        return res;
    }

    $.RedinkCookie.addData = function(data, callback) {
        var obj = $.cookie(c_name);
        var state = false;
        if (obj.hasOwnProperty("data")) {
            var tmpArr = obj.data;
            tmpArr.push(data);
            obj.data = tmpArr;
            console.log(obj.data);
            $.cookie(c_name, obj);
            state = true;
        }
        callback(state);
    }

    $.RedinkCookie.removeData = function(nr, callback) {
        var obj = $.cookie(c_name);
        var state = false;
        if (obj.hasOwnProperty("data")) {
            for (var i = 0; i < obj.data.length; i++) {
                if (parseInt(nr) == i) {
                    obj.data.splice(i,1);
                    $.cookie(c_name, obj);
                }
            }
            state = true;
        }
        callback(state);
    }

    $.RedinkCookie.sortData = function(old_index, new_index, callback) {
        var obj = $.cookie(c_name);
        var state = false;
        if (obj.hasOwnProperty("data")) {
            var tmpArr = obj.data;
            tmpArr.move(old_index, new_index);
            obj.data = tmpArr;
            $.cookie(c_name, obj);
            state = true;
        }
        callback(state);
    }

    $.RedinkCookie.delete = function() {
        $.removeCookie(c_name, {path:'/' });
        return true;
    }
})(jQuery);