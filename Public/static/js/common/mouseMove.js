var data1,
    data2;

setTimeout(function() {
    $.ajax({
        url: url.dayUrl,
        dataType: "jsonp",
        jsonp: "callback",
        success: function(res) {
            data1 = res.data;
        }
    });
    $.ajax({
        url: url.weekUrl,
        dataType: "jsonp",
        jsonp: "callback",
        success: function(res) {
            data2 = res.data;
        }
    });
}, 200);

(function() {

    $("#inside").on('mouseover', function(ev) {

        ev.preventDefault();
        showXyShow();

    }).on('mousemove', function(ev) {

        ev.preventDefault();
        handleData(url.todayUrl, getShow);

    }).on('mouseout', function(ev) {

        ev.preventDefault();
        hideXyShow();
        if(lastVolume) {
            $(".show-volume")[0].innerHTML = lastVolume;
        }
    });

})();

(function() {

    $("#inside-day").on('mouseover', function(ev) {

        ev.preventDefault();
        showXyShow();

    }).on('mousemove', function(ev) {

        ev.preventDefault();
        getShow2(data1);

    }).on('mouseout', function(ev) {

        ev.preventDefault();
        hideXyShow();
        if(lastVolume) {
            $(".show-volume")[0].innerHTML = lastVolume;
        }
    });

})();

(function() {

    $("#inside-week").on('mouseover', function(ev) {

        ev.preventDefault();
        showXyShow();

    }).on('mousemove', function(ev) {

        ev.preventDefault();
        getShow3(data2);

    }).on('mouseout', function(ev) {

        ev.preventDefault();
        hideXyShow();
        if(lastVolume) {
            $(".show-volume")[0].innerHTML = lastVolume;
        }
    });

})();


/*
    鼠标跟随显示数据
*/

var Class = {

    createClass: function() {

        return function() {

            this.init.apply(this, arguments);
        }
    }
}

var Move = Class.createClass();

//如果这里我还有一个App，我只需要调用 var App = Class.createClass();即可

Move.prototype = {

    init: function(conId, idCon, idLine){

        this.container = document.getElementById(conId);
        this.moveTgt = document.getElementById(idCon);
        this.line = document.getElementById(idLine);
        this.canvas = document.getElementsByTagName('canvas')[0];
        this.disX = 0;
    },

    /*
        鼠标移入canvas，绑定事件 
    */
    fnMove: function(ev){

        var _this = this;

        var marginLeft = 50;

        document.onmousemove = function(ev){

            /*
                设置显示坐标盒子的位置
            */
            _this.moveTgt.style.left = ev.clientX - _this.disX - _this.container.offsetLeft + marginLeft + 'px';

            /*
                设置竖线的位置 
            */
            _this.line.style.left = ev.clientX - _this.disX - _this.container.offsetLeft + 'px';

            _this.fnRemove();
        }
    },

    /*
        鼠标移出canvas，消除绑定事件   
    */
    fnRemove: function(){

        var _this = this;

        this.canvas.onmouseout = function () {

            document.onmousemove = null;

            _this.moveTgt.style.display = 'none';
            _this.line.style.display = 'none';  
  
        }   
    }
}



var MoveDay = Class.createClass();

//如果这里我还有一个App，我只需要调用 var App = Class.createClass();即可

MoveDay.prototype = {

    init: function(idCon, idLine){

        this.container = document.getElementById('container2');
        this.moveTgt = document.getElementById(idCon);
        this.line = document.getElementById(idLine);
        this.canvas = document.getElementsByTagName('canvas')[2];
        this.disX = 0;
    },

    /*
        鼠标移入canvas，绑定事件 
    */
    fnMove: function(ev){

        var _this = this;

        var marginLeft = 50;

        document.onmousemove = function(ev){

            /*
                设置显示坐标盒子的位置
            */
            _this.moveTgt.style.left = ev.clientX - _this.disX - _this.container.offsetLeft + marginLeft + 'px';

            /*
                设置竖线的位置 
            */
            _this.line.style.left = ev.clientX - _this.disX - _this.container.offsetLeft + 'px';

            _this.fnRemove();
        }
    },

    /*
        鼠标移出canvas，消除绑定事件   
    */
    fnRemove: function(){

        var _this = this;

        this.canvas.onmouseout = function () {

            document.onmousemove = null;

            _this.moveTgt.style.display = 'none';
            _this.line.style.display = 'none';  
  
        }   
    }
}
