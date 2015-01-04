//排序
$(function(){
    var tabClick=$("#bm-tab").find("li");
    var conList=$("#bm-list-tab").find(".con-list");
    tabClick.each(function(){
        $(this).click(function(){
            if(tabClick.hasClass("cur")){
                tabClick.removeClass("cur");
                 $(this).addClass("cur");
            }
            else{
                $(this).addClass("cur");
            }
            conList.hide();
            conList.eq($(this).index()).show();
        })
    })

});

$(function(){
    var currentProgress = parseFloat($("#sign-succ").text());
    var progressAllBar = parseFloat($("#recommend").text());
    var progressBarWidth=$(".graph-box").width();
    $(".graph-box .graph-succ").css({width:Math.round((currentProgress/progressAllBar)*progressBarWidth)});
    });

  //click模拟函数
    function clickDelay(el) {
        this.element = typeof el == 'object' ? el : document.getElementById(el);
        if (window.Touch)  this.element.addEventListener('touchstart', this, false);
    }
    clickDelay.prototype = {
        handleEvent: function (e) {
            switch (e.type) {
                case 'touchstart':
                    this.onTouchStart(e);
                    break;
                case 'touchmove':
                    this.onTouchMove(e);
                    break;
                case 'touchend':
                    this.onTouchEnd(e);
                    break;
            }
        },
        onTouchStart: function (e) {
            e.preventDefault();
            this.moved = false;
            this.theTarget = document.elementFromPoint(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
            if (this.theTarget.nodeType == 3) this.theTarget = theTarget.parentNode;
            this.theTarget.className += ' pressed';
            this.element.addEventListener('touchmove', this, false);
            this.element.addEventListener('touchend', this, false);
        },
        onTouchMove: function (e) {
            this.moved = true;
            this.theTarget.className = this.theTarget.className.replace(/ ?pressed/gi, '');
        },
        onTouchEnd: function (e) {
            this.element.removeEventListener('touchmove', this, false);
            this.element.removeEventListener('touchend', this, false);
            if (!this.moved && this.theTarget) {
                this.theTarget.className = this.theTarget.className.replace(/ ?pressed/gi, '');
                var theEvent = document.createEvent('MouseEvents');
                theEvent.initEvent('click', true, true);
                this.theTarget.dispatchEvent(theEvent);
            }
            this.theTarget = undefined;
        }
    };
  function touchPopup(hbj){
        var popup = document.getElementById(hbj),
            inside = popup.getElementsByClassName("inside")[0],
            box = popup.getElementsByClassName("box")[0],
            close = popup.getElementsByClassName("close")[0];
        popup.style.display = "block";
        popup.style.height = document.body.clientHeight + "px";
        inside.style.top = ( document.documentElement.clientHeight - inside.offsetHeight ) / 2 + "px";
        box.style.MozTransform = "scale(1)";
        box.style.WebkitTransform = "scale(1)";
        box.style.transform = "scale(1)";
        new clickDelay(close);
        close.addEventListener("click", function () {
            box.style.MozTransform = "scale(0)";
            box.style.WebkitTransform = "scale(0)";
            box.style.transform = "scale(0)";
            var clo = setTimeout(function () {
                popup.style.display = "none"
            }, 400);
        }, false);
    }

    //漂浮窗
    (function(){
        var helpBtn = document.getElementById("help");
        if(!helpBtn) return false;
        new clickDelay(helpBtn);
        helpBtn.addEventListener("click", function(){
            popupHelp();
        }, false);
    })();

    //签到函数
    function popupHelp() {
        console.log(document.getElementById("popup-help"));
        var popup = document.getElementById("popup-help"),
            inside = popup.getElementsByClassName("inside")[0],
            box = popup.getElementsByClassName("box")[0],
            close = popup.getElementsByClassName("close")[0];

        popup.style.display = "block";
        //popup.style.height = document.body.clientHeight + "px";
        //inside.style.top = ( document.documentElement.clientHeight - inside.offsetHeight ) / 2 + "px";
        box.style.MozTransform = "scale(1)";
        box.style.WebkitTransform = "scale(1)";
        box.style.transform = "scale(1)";
        new clickDelay(close);
        close.addEventListener("click", function () {
            box.style.MozTransform = "scale(0)";
            box.style.WebkitTransform = "scale(0)";
            box.style.transform = "scale(0)";
            var clo = setTimeout(function () {
                popup.style.display = "none"
            }, 400);
        }, false);
    };

    //立即报名
    (function(){
        var loginV2Login = document.getElementById("btn-bm");
        if(!loginV2Login) return false;
        new clickDelay(loginV2Login);
        loginV2Login.addEventListener("click", function(){
            touchPopup("login-box-v2-popup");
        }, false);
    })();

    //微信分享
    (function(){
        var loginV1Login = document.getElementById("btn-bm");
        if(!loginV1Login) return false;
        new clickDelay(loginV1Login);
        loginV1Login.addEventListener("click", function(){
            touchPopup("login-box-v1-popup");
        }, false);
    })();
   
   //微信登入用户
  function wxShare(){
    $("#share").show();
    $("#share").click(function(){
        $("#share").hide();
    });
};
  //非微信登入用户
  (function(){
        var otherUser = document.getElementById("otherUser");
        if(!otherUser) return false;
        new clickDelay(otherUser);
        otherUser.addEventListener("click", function(){
            touchPopup("other-user-popup");
        }, false);
    })();

    //会员积分页面banner随屏幕变化而变化
function response(){
    (function(){
        if(!document.getElementById("top-banner")) return false;
        if(document.body.clientWidth < 767){
            var slide = document.getElementById("top-banner"),
                bannerHeight = slide.offsetWidth * 0.47;//640*270
            slide.style.height = bannerHeight + "px";
        };    
    })();
};

window.onload = window.onresize = response;
