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
        //expire: 0,
        //path: '/',
        //domain: '.' + window.location.hostname,
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
        for (var j in defaultSettings) {
            console.log("defaultSettings: "+j+" > "+defaultSettings[j]);    
        }
        defaultSettings = $.extend({}, defaultSettings, o);
        $.cookie(c_name, defaultSettings, options);
    }

    $.RedinkCookie.setCookieName = function(name) {
        c_name = name;
        console.log("setting name "+name);
    }

    $.RedinkCookie.check = function(name) {
        return $.cookie(c_name);
    }

    $.RedinkCookie.getData = function() {
        var res = [];
        var obj = $.cookie(c_name);
        
        /*for (var i in obj.data) {
            //console.log("getData: "+i+" > "+obj.data[i]);
            for (var j in obj.data[i]) {
                //console.log("--> "+j+" > "+obj.data[i][j]);
            }
        }*/
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
            for (var i = 0; i < tmpArr.length; i++) {
                for (var k in tmpArr[i]) {
                    console.log(k+" > "+tmpArr[i][k]);
                }
            }
            //add to 


            defaultSettings = $.extend({}, defaultSettings, {data: tmpArr});
            //obj.data = tmpArr;
            
            /*for (var j in defaultSettings) {
                console.log("defaultSettings: "+j+" > "+defaultSettings[j]);
                for (u in defaultSettings[j].data) {
                    console.log("--> defaultSettings: "+u+" > "+defaultSettings[j].data[u]);
                }   
            }*/
            //console.log("addData: "+obj.data+" > data: "+data);
            $.RedinkCookie.delete(function(s) {
                if (s) {
                    console.log("--- new cookie?");
                    $.cookie(c_name, defaultSettings, options);
                }
            })
            
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
                    console.log("----> removed: "+nr);
                    //
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
            obj.data = tmpArr;
            //$.cookie(c_name, defaultSettings, options);
            state = true;
        }
        callback(state);
    }

    $.RedinkCookie.delete = function(callback) {
        $.removeCookie(c_name, {}, options);
        callback(true);
    }
})(jQuery);