(function($){
    
    //Default settings
    var defaultSettings = {
        version: 1,
        data: [],
        extra: '',
        vendor: 'redink'
    };

    var options = {
        path: '/',
        domain: '.' + window.location.hostname,
        expire: 0
    }

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
    $.RedinkCookie = function(o) {
        defaultSettings = $.extend({}, defaultSettings, o);
        $.cookie(c_name, defaultSettings, options);
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
            //add to cookie
            defaultSettings = $.extend({}, defaultSettings, {data: tmpArr});
            $.cookie(c_name, defaultSettings, options);
            state = true;
        }
        callback(state);
    }

    $.RedinkCookie.removeData = function(nr, callback) {
        var obj = $.cookie(c_name);
        var state = false;
        if (obj.hasOwnProperty("data")) {
            var tmpArr = obj.data;
            for (var i = 0; i < tmpArr.length; i++) {
                if (parseInt(nr) == i) {
                    tmpArr.splice(i,1);
                }
            }
            defaultSettings = $.extend({}, defaultSettings, {data: tmpArr});
            $.cookie(c_name, defaultSettings, options);
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
            defaultSettings = $.extend({}, defaultSettings, {data: tmpArr});
            $.cookie(c_name, defaultSettings, options);
            state = true;
        }
        callback(state);
    }

    $.RedinkCookie.delete = function(callback) {
        $.removeCookie(c_name, options);
        callback(true);
    }
})(jQuery);