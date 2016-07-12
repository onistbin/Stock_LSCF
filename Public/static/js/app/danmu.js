var startId = 0,
    timer = null;


var Barrage = {
    init: function(){

        // 显示其他用户数据
        this.viewBarrage();

        this.bindEvnet();
    },
    bindEvnet: function(){
        var that = this,
            flagOnOff = true,
            $on_off = $(".on-off-btn"),
            $text = $("#text");

        /*弹幕开关*/
        $("#on-off").on('click', function() {
            
            if($on_off.hasClass('on')) {
                
                clearInterval(timer);
                $(".danmu").html("");
                flagOnOff = false;
                $(this).removeClass('onbg').addClass('offbg');
                $on_off.removeClass('on').addClass('off');
                $text.attr("disabled", "disabled").val(""); 
            } else {
                that.viewBarrage();
                flagOnOff = true;
                $(this).removeClass('offbg').addClass('onbg');
                $on_off.removeClass('off').addClass('on');
                $text.attr("disabled", false); 
            }
        });


        /*发送弹幕*/

        (function() {

            $(document).on('keydown', function(ev) {

                if(flagOnOff && $text.val() && (ev.keyCode == 13)) {

                    ev.preventDefault();
                    that.postMessageData('red');
                }
            });

            $("#btn").on('click', function() {

                if(flagOnOff && $text.val()) {

                    that.postMessageData('red');
                    
                }
            });
        })();
    },
    viewBarrage: function(){

        var that = this;
        that.getData(function(data) {

            for(var i = 0, len = data.length; i < len; i ++) {

                that.appendMessage(data, i);
            }

        });
    },
    
    postMessageData: function(color) {
        var res = [{
                messagecon: $text.val()
            }],
            that = this;
        $.ajax({
            url: ipAddress + '/Stock/index.php?m=Home&c=Index&a=postMessage',
            type: 'post',
            data: {
                messageCon: $text.val()
            },
            success: function(data) {

                if(data == 'error') {

                    if(confirm("您未登录，请先登录")) {
                        window.location.href = 'http://172.33.12.161/Stock/index.php?m=Home&c=Login&a=login';
                    }
                    
                }
            }
        });
        that.appendMessage(res, 0, color);
        $text.val("");
    },
    appendMessage: function(data, i, color) {
        var $danmu = $('<div class="danmu"></div>'),
            $messageCon = $("#danmu"),
            randomTop = Math.round(Math.random() * $("#danmu").height());
            $messageCon.append($danmu),
            $text = $("#text");
        $danmu.css({
            "top": randomTop,
            "right": 0,
            "color": color
        }).html(data[i].messagecon);

        
        var target = $messageCon.width() - $danmu.width();

        setInterval(function() {

            if($danmu[0].offsetLeft > 0){
                $danmu[0].style.left = $danmu[0].offsetLeft -3 + 'px';
            } else {
                $danmu.hide().remove();
            }
            
        }, 30);
        
    },
    getData: function(callBack) {
        var time = 6000,
            baseUrl = ipAddress + '/Stock/index.php?m=Home&c=Index&a=getMessage&startId=' + startId;

        $.ajax({
            url: baseUrl,
            type: 'get',
            success: function(data) {

                var res = $.parseJSON(data);
                if(callBack) {
                    callBack(res);
                }

            }
        });

        timer = setInterval(function() {


            startId += 2;
            baseUrl = ipAddress + '/Stock/index.php?m=Home&c=Index&a=getMessage&startId=' + startId;
            
            $.ajax({
                url: baseUrl,
                type: 'get',
                success: function(data) {
                    var res = $.parseJSON(data);
                    if(res.length == 0) {
                        startId = 8;
                    }
                    if(callBack) {
                        callBack(res);
                    }
            
                }
            });

        }, time);
    }
};
Barrage.init();
