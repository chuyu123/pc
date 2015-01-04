//Javascript Document
//base function
function addClass(elem, className) {
    elem.className += " " + className;
};
function removeClass(elem, className) {
    var tmpClassName = elem.className;
    elem.className = null;
    elem.className = tmpClassName.split(new RegExp(" " + className + "|" + className + " " + "|" + "^" + className + "$", "ig")).join("");
};

//全部分类显隐
function overShow(body, elem, indent) {
    var effectBody = document.getElementById(body);
    var effectElem = document.getElementById(elem);
    var effectCon = document.getElementById(indent);
    effectBody.onmouseover = function () {
        addClass(effectElem, "cur");
        effectCon.style.display = "block";
    };
    effectBody.onmouseout = function () {
        removeClass(effectElem, "cur");
        effectCon.style.display = "none";
    };
};

//选项卡
function tab(tid, tidtag, bid, bidtag) {
    var hd = document.getElementById(tid);
    var hdlist = hd.getElementsByTagName(tidtag);
    var bd = document.getElementById(bid);
    var bdlist = bd.getElementsByTagName(bidtag);
    var cur = "cur";
    var _indexValue = function (self, obj) {
        for (i = 0; i < obj.length; i++) {
            if (obj[i] == self) {
                return i;
            }
            ;
        }
        ;
    };
    var _index;
    for (l = 0; l < hdlist.length; l++) {
        hdlist[l].onmouseover = function () {
            _index = _indexValue(this, hdlist);
            for (m = 0; m < hdlist.length; m++) {
                hdlist[m].className = (m == _index) ? cur : "";
            }
            ;
            for (n = 0; n < hdlist.length; n++) {
                bdlist[n].style.display = (n == _index) ? "block" : "none";
            }
            ;
        };
    }
    ;
};

function tabSub(tid, tidtag, bid, bidsib) {
    $('#' + tid).find(tidtag).each(function (i) {
        $(this).mouseover(function () {
            $(this).siblings().removeClass('cur').end().addClass('cur');
            $('#' + bid).find(bidsib).eq(i).siblings().hide().end().show();
        });
    }).eq(0).trigger('mouseover');
};

function tabSubClick(tid, tidtag, bid, bidsib) {
    $('#' + tid).find(tidtag).each(function (i) {
        $(this).click(function () {
            $(this).siblings().removeClass('cur').end().addClass('cur');
            $('#' + bid).find(bidsib).eq(i).siblings().hide().end().show();
        });
    }).eq(0).trigger('click');
};

//search
$(function () {
    var defVal = "请输入搜索内容";
    $("#j-search-txt").val(defVal);
    $("#j-search-txt").focus(function () {
        $(this).val("");
        $(this).css("color", "#000");
    }).blur(function () {
        if ($("#j-search-txt").val() == "") {
            $(this).val(defVal);
            $(this).css("color", "");
        }
        ;
    });
});

//抢车滚动功能
function run(elem) {
    var oMarquee = document.getElementById(elem);
    var iLineHeight = 81;
    var iLineCount = 3;
    var iScrollAmount = 1;

    function play() {
        oMarquee.scrollTop += iScrollAmount;
        if (oMarquee.scrollTop == iLineCount * iLineHeight) {
            oMarquee.scrollTop = 0;
        }
        ;
        if (oMarquee.scrollTop % iLineHeight == 0) {
            window.setTimeout(play, 500);
        } else {
            window.setTimeout(play, 50);
        }
        ;
        oMarquee.onmouseover = function () {
            iScrollAmount = 0;
        };
        oMarquee.onmouseout = function () {
            iScrollAmount = 1;
        };
    };
    oMarquee.innerHTML += oMarquee.innerHTML;
    window.setTimeout(play, 2000);
};

//列表页品牌伸缩
$(document).ready(function () {
    var b = document.getElementById("j-xc-brand-control");
    if (!b) return false;
    var c = document.getElementById("j-xc-brand");
    var shrinkVal = 0;
    b.onclick = function () {
        if (shrinkVal == 0) {
            c.style.height = "auto";
            shrinkVal = 1;
            addClass(this, "xc-brand-control-cur");
        } else {
            c.style.height = "55px";
            shrinkVal = 0;
            removeClass(this, "xc-brand-control-cur");
        }
        ;
    };
});

$(document).ready(function () {
    //微信二维码
    var wxBtn = document.getElementById("j-wx");
    if (!wxBtn) return false;
    var wxCons = document.getElementById("j-wx-cons");
    wxBtn.onmouseover = function () {
        wxCons.style.display = "block";
    };
    wxBtn.onmouseout = function () {
        wxCons.style.display = "none";
    };
    //邮箱订阅
    var mdy = document.getElementById('j-maildy');
    if(!mdy) return false;
    var mBox = document.getElementById('j-mail-box');
    var mClose = document.getElementById('j-mail-close');
    var mIpt = document.getElementById('j-mail-info');
    var mdyTmp = 0, mIptDefault = '请输入您常用的电子邮箱';
    mIpt.value = mIptDefault;
    mdy.onclick = function(){
        if(mdyTmp == 0){
            mBox.style.display = 'block';
            mdyTmp = 1;
            return false;
        }else{
            mBox.style.display = 'none';
            mdyTmp = 0;
            return false;
        };
    };
    mClose.onclick = function(){
        mBox.style.display = 'none';
        mdyTmp = 0;
    };
    mIpt.onfocus = function(){
        if(mIpt.value == mIptDefault){
            mIpt.value = '';
        };
    };
    //侧边栏伸缩
    var contract = document.getElementById('j-contract'), fixnavUl = document.getElementById('j-fixnav-ul'), contractVal = 0;
    if (!contract) return false;
    contract.onclick = function () {
        var faxLi = fixnavUl.getElementsByTagName('li');
        if (contractVal == 0) {
            $(this).addClass('contract2');
            for (i = 0; i < faxLi.length; i++) {
                faxLi[i].style.display = 'none';
            }
            ;
            faxLi[0].style.display = 'block';
            faxLi[5].style.display = 'block';
            contractVal = 1;
        } else {
            $(this).removeClass('contract2');
            for (i = 0; i < faxLi.length; i++) {
                faxLi[i].style.display = 'block';
            }
            ;
            contractVal = 0;
        }
        ;
    };
});

//getElementsByClassName函数
function getElementsByClassName(node, classname) {
    if (node.getElementsByClassName) {
        return node.getElementsByClassName(classname);
    } else {
        var results = new Array();
        var elem = node.getElementsByTagName('*');
        for (i = 0; i < elem.length; i++) {
            if (elem[i].className.indexOf(classname) != -1) {
                results[results.length] = elem[i];
            }
            ;
        }
        ;
        return results;
    }
    ;
};

//遮罩层和弹层功能
function popup(id) {
    var shade = document.getElementById("j-shade");
    var popup = document.getElementById(id);
    var close = getElementsByClassName(popup, 'close');
    shade.style.height = document.body.scrollHeight + "px";
    shade.style.display = "block";
    popup.style.display = "block";
    popup.style.top = (window.screen.availHeight - popup.offsetHeight) / 2 + "px";
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            shade.style.display = "none";
            popup.style.display = "none";
        };
    }
    ;
};

//选车弹层
function xuanchepop(id, close) {
    var xuanche = document.getElementById(id);
    var xuancheClose = document.getElementById(close);
    xuanche.style.display = 'block';
    xuanche.parentNode.style.zIndex = '50';
    xuancheClose.onclick = function () {
        xuanche.style.display = 'none';
        xuanche.parentNode.style.zIndex = '';
    };
};

//对比框弹层
function duibiPop() {
    var duibiPop = document.getElementById('j-duibi-pop');
    var duibiClose = document.getElementById('j-duibi-close');
    duibiPop.style.display = 'block';
    duibiClose.onclick = function () {
        duibiPop.style.display = 'none';
    };
};

//photowall
$(function () {
    $("#j-photowall-ul").find("div").each(function (i, target) {
        $(target).mouseenter(function (e) {
            $(target).stop();
            $(target).parent().addClass("cur");
            $("#j-photowall-ul").find("div").not($(target)).addClass("not-cur");
            $(target).animate({width: "332px", height: "220px", top: "-55px", left: "-83px"}, "normal");
        });
        $(target).mouseleave(function (e) {
            $(target).stop();
            $(target).parent().removeClass("cur");
            $("#j-photowall-ul").find("div").not($(target)).removeClass("not-cur");
            $(target).animate({ width: "166px", height: "110px", top: "0", left: "0"}, "normal");
        });
    });
});

//通用前后翻页功能
/*
 容器元素为tab-scroll-box。方法中使用content id甄别
 -头部元素为tab-scroll-caption
 --缩略显示区域为tab-scroll-tip
 --翻页按钮区域为tab-scroll-btn，元素命名必须为.prev .next
 -主体元素为tab-scroll-content
 --主体长列表为tab-scroll-list
 ---主体数据任定义。遵循ul < li两层嵌套关系即可
 */
function tabScroll(content, i) {
    var page = 1;
    var i;//一个单位内list的数量
    $(content + ' .next').click(function () {
        var $parent = $(this).parents(content);
        var $tip = $parent.find('div.tab-scroll-tip');
        var $show = $parent.find('div.tab-scroll-list');
        var $showArea = $parent.find('div.tab-scroll-content');
        var wid = $showArea.width();
        var len = $show.children().children().length;
        var pageCount = Math.ceil(len / i);
        if (!$show.is(':animated')) {
            if (page == pageCount) {
                $show.animate({left: '0'}, 'normal');
                page = 1;
            } else {
                $show.animate({left: '-=' + wid}, 'normal');
                page++;
            }
            ;
        }
        ;
        $tip.children().eq((page - 1)).addClass('cur').siblings().removeClass('cur');
    });
    $(content + ' .prev').click(function () {
        var $parent = $(this).parents(content);
        var $tip = $parent.find('div.tab-scroll-tip');
        var $show = $parent.find('div.tab-scroll-list');
        var $showArea = $parent.find('div.tab-scroll-content');
        var wid = $showArea.width();
        var len = $show.children().children().length;
        var pageCount = Math.ceil(len / i);
        if (!$show.is(':animated')) {
            if (page == 1) {
                $show.animate({left: '-=' + wid * (pageCount - 1)}, 'normal');
                page = pageCount;
            } else {
                $show.animate({left: '+=' + wid}, 'normal');
                page--;
            }
            ;
        }
        ;
        $tip.children().eq((page - 1)).addClass('cur').siblings().removeClass('cur');
    });
};

//timer
function timer(obj,num,txt,retxt){
    this.obj = obj;
    this.num = num;
    this.txt = txt;
    this.retxt = retxt;
};
timer.prototype = {
    countdown : function(){
        var t = this.num;
        var obj = this.obj;
        var txt = this.txt;
        var retxt = this.retxt;
         function go(){
             if(t < 1){
                 clearInterval(per);
                 $(obj).text(retxt);
                 $(obj).attr("disabled",false);
             }else{
                 t--;
                 $(obj).text(t + txt);
                 $(obj).attr("disabled",true);
             };
         };
        var per = setInterval(go,1000);
    }
};
var findpwbtn = new timer(".btn-note-code",60,"秒后重新发送","获取短信验证码");

//单元内容分享
$(function () {
    $('.j-socialshare-btn').bind('click', function () {
        $(this).find('.sharebox').show();
        return false;
    });
    $(document).click(function () {
        if ($('.sharebox').show()) {
            $('.sharebox').hide();
        }
        ;
    });
});

//内页口碑评价翻页
function contentKb(elem,con,detection){
    var con = $('#' + con);
    var tmp = 0;
    var conHeight = con.height();
    var deHeight = $('#' + detection).height();
    if(conHeight > deHeight){
        $('#' + elem).find('#prev').show();
        $('#' + elem).find('#next').show();
    };
    $('#' + elem).find('#prev').bind('click',function(){
        if(tmp < 0){
            con.stop().animate({marginTop:'+=' + deHeight},280);
            setTimeout(detectHeight,300);
        };
    });
    $('#' + elem).find('#next').bind('click',function(){
        if(tmp > - (conHeight - deHeight)){
            con.stop().animate({marginTop:'-=' + deHeight},280);
            setTimeout(detectHeight,300);
        };
    });
    function detectHeight(){
        var conMt = parseInt(con.css('marginTop'));
        tmp = conMt;
    };
};

//虚拟select框效果
$(function () {
    $('.virtual-select-frame').bind('click', function (e) {
        $(this).next().show();
        $(this).addClass('virtual-select-framefocus');
        $(this).parent().css('z-index', '1');
        e.stopPropagation();
    });
    $('.virtual-select-ul').find('li').bind('click', function () {
        var val = $(this).find('span').html();
        $(this).parents('.virtual-select-box').find('.virtual-select-char').html(val);
        $(this).parent().hide();
        $(this).parents('.virtual-select-box').find('.virtual-select-frame').removeClass('virtual-select-framefocus');
        $(this).parents('.virtual-select-box').css('z-index', '');
    });
    $(document).click(function () {
        $('.virtual-select-ul').hide();
        $('.virtual-select-frame').removeClass('virtual-select-framefocus');
        $('.virtual-select-box').css('z-index', '');
    });
});

//对比合并，高亮
var Contrast = {
    init: function () {
        if ($('#j_position').length) {
            this.iT = $('#j_position').offset().top;
            this.iw = $('#j_position').width();
            this.it = $('.newCar_param_sel').eq(0).offset().top;
            this.ih = $('.config_sidebar a').height();
            this.imL = parseInt($('.config_sidebar').css('margin-left'));
            $('.config_sidebar').css('top', this.it);
        }
        this.events();
    },
    /* 事件执行 */
    events: function () {
        var _this = this;

        /* 合并相同相同项 */
        $('#j_same').click(function () {
            if ($('.config_data td') == '') {
                return false;
            }
            if ($(this).attr('checked')) {
                _this.sameMerge("same", false);
            } else {
                _this.sameMerge("notsame");
            }
        });

        /* 高亮显示  */
        $('#j_highlight').click(function () {
            if ($(this).attr('checked')) {
                _this.sameMerge("same", true);
            } else {
                _this.sameMerge("notlight");
            }
        });

    },

    /*  合并相同  */
    sameMerge: function (flag, flag2) {
        var obj = $('.config_data table');
        var obj2 = null, obj3 = null, str = null, sum = null;
        loopone:
            for (var i = 0; i < obj.length; i++) {
                obj2 = obj.eq(i).find('tr');
                looptwo:
                    for (var j = 0; j < obj2.length; j++) {
                        obj3 = obj2.eq(j).find('td');
                        if (flag == 'same') {
                            var num = 0;
                            sum = obj3.eq(0).text();
                            for (var m = 1; m < obj3.length; m++) {
                                if (sum != obj3.eq(m).text()) {
                                    if (m - num > 1) {
                                        if (!flag2) {
                                            this.Hide(obj3, num, m);
                                        } else if (m == obj3.length - 1) {
                                            this.lightHigh(obj3, m);
                                        }
                                    } else {
                                        if (flag2) {
                                            this.lightHigh(obj3, num);
                                            if (m == obj3.length - 1) {
                                                this.lightHigh(obj3, m);
                                            }
                                        }
                                    }
                                    num = m;
                                    sum = obj3.eq(num).text();
                                }
                            }
                            if (m == obj3.length && sum == obj3.eq(m - 1).text() && !flag2) {

                                this.Hide(obj3, num, m);
                            }
                        }
                        if (flag == 'notsame') {
                            obj3.show().attr('colspan', 1);
                        }
                        if (flag == 'notlight') {
                            obj3.css('color', '#666');
                        }
                    }
            }
    },
    Hide: function (obj, Snum, Enum) {
        for (var i = Snum + 1; i < Enum; i++) {
            obj.eq(i).hide();
        }
        obj.eq(Snum).attr('colspan', Enum - Snum);
    },
    lightHigh: function (obj, num) {
        obj.eq(num).css('color', '#ff581e');
    }
};

//全站底部通栏
(function(){
    var bmbar = document.getElementById('j-bmbar');
    if(!bmbar) return false;
    var pgHeight = document.body.scrollHeight / 3;
    $(window).scroll(function(){
        if($(window).scrollTop() > pgHeight){
            bmbar.style.display = 'block';
        }else{
            bmbar.style.display = 'none';
        };
    });
})();

//51广告侧栏
(function(){
    var spring = document.getElementById('j-spring');
    if(!spring) return false;
    var springClose = document.getElementById('j-spring-close');
    springClose.onclick = function(){
      spring.style.display = 'none';
        return false;
    };
})();

//美规车所有
function mgselectbar(tid, bid) {
    $('#' + tid).find('li').each(function (i) {
        $(this).click(function () {
            var floatValue = $(this).parents('.mgc-section-infobox').find('.mg-value');
            var floatStatus = $(this).parents('.mgc-section-infobox').find('.mg-baoguan');
            floatValue.html($(this).attr('data-cv'));
            floatStatus.html($(this).attr('data-status'));
            var meal = $(this).find('span').html();
            $(this).parent().parent().prev().find('.select-peizhi').find('span').html(meal);
            $(this).siblings().removeClass('cur').end().addClass('cur');
            $('#' + bid).find('ul').eq(i).siblings().hide().end().show();
            $(this).parents('peizhi-hd-unvisi').hide();
        });
    });
};

$(function(){
    //mgc-search-box 美规车搜索效果
    $('#j-mgc-switch-brand').mouseover(function(){
        $(this).parent().addClass('cur');
        $(this).parent().next().removeClass('cur');
        $(this).parents('.mgc-switch').find('.mgc-switch-brand-area').animate({
            marginTop:0
        },200);
    });
    $('#j-mgc-switch-lv').mouseover(function(){
        $(this).parent().addClass('cur');
        $(this).parent().prev().removeClass('cur');
        $(this).parents('.mgc-switch').find('.mgc-switch-brand-area').animate({
            marginTop:-70
        },200);
    });

    //美规车套餐选择
    $('.peizhi-hd').click(function(e){
        $(this).find('.peizhi-hd-unvisi').toggle();
        e.stopPropagation();
    });
    $(document).click(function(){
        $('.peizhi-hd-unvisi').hide();
    });

    (function(){
        for(i = 0; i < $('.mgc-section-infobox').length; i++){
            mgselectbar('j-peizhi-tab' + i,'j-peizhi-cons' + i)
        };
    })();

    //美规车详细配置
    $('.peizhi-con').find('li').bind('click',function(){
       $(this).find('.info').animate({right:0},280);
    });
    $('.peizhi-con').find('.info').bind('click',function(e){
       $(this).animate({right:443},280);
        e.stopPropagation();
        setTimeout(clearPeizhiInfo,300);
    });
    function clearPeizhiInfo(){
        $('.peizhi-con').find('.info').removeAttr('style');
    };
    //美规车简介展开
    $('#j-mgc-intro1').find('#j-more').click(function(){
        var elem = $('#j-mgc-intro1-area');
        var finhei = elem.data('finhei');
        if(!!!finhei){
            finhei = elem.addClass('mgc-intro1-height').height();
            elem.data('finhei',finhei).removeClass('mgc-intro1-height');
        };
        elem.stop().animate({
            height: (finhei == elem.height() ? 230 : finhei)
        },300);
        var defTxt = $(this).html();
        if(defTxt == '点击展开'){
            $(this).html('点击收缩');
        }else{
            $(this).html('点击展开');
        };
    });
    //美规车底部广播信息
    $(window).scroll(function(){
        if($(window).scrollTop() > 497){
            $('#j-mgc-bmbar-broadcast').css({'position':'fixed'});
        }else{
            $('#j-mgc-bmbar-broadcast').removeAttr('style');
        };
    });
});

//单一页面的js
(function(){
    if(!document.getElementById('j-acc-qa')) return false;
    document.getElementById('j-acc-qa').onmouseover = function(){
        document.getElementById('j-acc-qatxt').style.display = 'block';
    };
    document.getElementById('j-acc-qa').onmouseout = function(){
        document.getElementById('j-acc-qatxt').style.display = 'none';
    };
})();
(function(){
    if(!document.getElementById('j-ptsrule')) return false;
    document.getElementById('j-ptsrule').onmouseover = function(){
        document.getElementById('j-ptsruletxt').style.display = 'block';
    };
    document.getElementById('j-ptsrule').onmouseout = function(){
        document.getElementById('j-ptsruletxt').style.display = 'none';
    };
})();
//购车计算器事件
$(function(){
    var co=new calculatorObj();
    co.radioEventA();
    co.radioEventB();
    co.gotoNextEvent();
});
function calculatorObj(){
    $('#j-content-tab-ul li:lt(2)').mouseover(function(){
        $('.calculator-box').hide();
    });
    $('#j-content-tab-ul li:last').mouseover(function(event){
        if($('.calculator-section1').siblings().is(':visible')){
            $('.calculator-section1').hide();
        };
        $('.calculator-box').show();
    });
    $('#j-sljg-pop .close').click(function(){
        $('#j-sljg-pop').hide();
        $('#j-sljg-pop-small').show();
    });
    $('#j-sljg-pop-small .open').click(function(){
        $('#j-sljg-pop-small').hide();
        $('#j-sljg-pop').show();
    });
    this.radioEventA=function(){
        var ul='.calculator-section1 .group2',
            con='.calculator-section1-con .calculator-section-ul';
        var first=$(ul).children('.item').eq(0);
        check(first,con,first.children('ul'));
        $(ul).children('.item').each(function(){
            $(this).click(function(){
                var checked=check(this,con,$(this).children('ul'));
            });
        });
    }
    this.radioEventB=function(){
        var ul='.calculator-section2 .pay .calculator-section-ul',
            con='.calculator-section2 .calculator-con';
        var first=$(ul).children('li').eq(0);
        check(first,con,first.children('.table'));
        $(ul).children('li').each(function(){
            $(this).click(function(){
                var checked=check(this,con,$(this).children('.table'));
            });
        });
    }
    this.gotoNextEvent=function(){
        var o=$('.calculator-submit span');
        o.click(function(){
            $(this).parents('section').hide();
            $(this).parents('section').next().show();
        });
    }
    function check(me,con,src){
        var checked=$(me).children('input[type=radio]').attr('checked')=='checked' || $(me).children('input[type=radio]').attr('checked')==true;            
        if(checked){
            $(me).removeClass('s');
            $(me).children('input[type=radio]').attr('checked',false);
            if($(con).length!=0)$(con).hide();
        }
        else{
            $(me).siblings().removeClass('s');
            $(me).siblings().children('input[type=radio]').attr('checked',false);
            $(me).addClass('s');
            $(me).children('input[type=radio]').attr('checked',true);
            if($(con).length!=0 && $(src).length!=0)$(con).html($(src).html()).show();
            else $(con).hide();
        }
    }
}
//顾问选择事件
    $(function(){
        adviserEventA();
    });
    function adviserEventA(){
        if($('.adviser-list ul:visible li').length==0)init();
        $('.adviser-list li .more .s').click(
            function(){
                $(this).parents('li').addClass('s');
            }
        );
        $('.adviser-list li .more .h').click(
            function(){
                $(this).parents('li').removeClass('s');
            }
        );
        $('.adviser-list dt .btn1').hover(
            function(){
                $(this).parent().addClass('s');
                $(this).parent().children('.btn1').attr('class','btn1s');
            },
            function(){
                $(this).parent().removeClass('s');
                $(this).parent().children('.btn1s').attr('class','btn1');
            }
        );
        function init(){
            var li='.adviser-list-data li';
            for(var i=0;i<6 && i<li.length;i++){
                var eq=i<3 && i || (i+1)%3==0 && (i+1)/3 || (i+1)%3-1;
                $('.adviser-list ul').eq(eq).append($(li).eq(0));
            }
        }
        $('.adviser-list-more').click(
            function (){
                var arr1=[],arr2=[],arr3=[];
                $('.adviser-list-data li').each(function(n){
                    if((n+3) % 3==0){
                        arr1.push($(this));
                    }
                    else if((n+2) % 3==0){
                        arr2.push($(this));
                    }
                    else if((n+1) % 3==0){
                        arr3.push($(this));
                    }
                });
                var data=[arr1,arr2,arr3];
                var lisize=arr1.length+arr2.length+arr3.length;
                for(var i in data){
                    var item=data[i];
                    for(var j=0;j<item.length;j++){
                        $('.adviser-list ul').eq(i).append(item[j]);
                    }
                }
                $('.adviser-list-more,.adviser-list-rec').hide();
                $('.adviser-list-total').find('.red').html($('.adviser-list ul:visible li').length);
                $('.adviser-list-total').show();
            }
        );
        // $(".adviser-list ul:visible a[rel^='prettyPhoto']").prettyPhoto({animation_speed:'normal',theme:'pp_default',slideshow:500, autoplay_slideshow:false});
    }

//评论弹层功能
function popupLogin() {
    var obj = document.getElementById("popup-login");
    var inside = getElementsByClassName(obj, 'inside');
    var close = getElementsByClassName(obj, 'f-close');
    obj.style.height = document.body.scrollHeight + "px";
    obj.style.display = "block";
    inside[0].style.display = "block";
    inside[0].style.top = (window.screen.availHeight - inside[0].offsetHeight) / 2 + "px";
    for (i = 0; i < close.length; i++) {
        inside.style.display = "none";
    };
};
function tipWindow(){
     $("#popup-help").show();
     $("#popup-help").find(".close").click(function(){
        $('#popup-help').hide();
    });
}

//问卷调查页面
$(function(){
    var container=$("#questionAnswer");
    if(!container) return;
    var m1=0,m2=0,m3=0,m4=0,m5=0,m6=0,m7=0;
    var len=$("#questionAnswer").find("dl").length; 
    var progress=$(".progress").height();  //$("#progress").css("height");
    var progressBar=0;
    
    function setProgress(){
        var ress=Math.round((m1+m2+m3+m4+m5+m6+m7)*progress/len);
        $("#ress").css({"height": ress+"px"});
    }
     
     $("#isChecked1").find("input").click(function(){
        if($(this).prop("checked") ){
            m1=1;
            setProgress();
        }
     })
     var checkbox2=$("#isChecked2").find("input[type='checkbox']");
     checkbox2.each(function(){
        checkbox2.click(function(){
             if($(this).prop("checked") ){
            m2=1;
            setProgress();
        }else{
            if(!checkbox2.prop("checked")){
                m2=0;
                setProgress();
            }
        }
        })
       
     })
     $("#isChecked3").find("input").click(function(){
        if($("input[value='是']").prop("checked")){
            m3=1;
            setProgress();
            $("#isChecked4").removeClass("disabled");
            $("#isChecked4").find("input").attr("disabled",false);
        }else{
             m3=1;
            setProgress();
            $("#isChecked4").addClass("disabled");
            $("#isChecked4").find("input").attr("disabled",true);
        }
     })
     // $("#isChecked4").find("input").click(function(){
     //    if($(this).prop("checked") ){
     //        m4=1;
     //        setProgress();
     //    }else{
     //        m4=0;
     //        setProgress();
     //    }
     // })
var checkbox4=$("#isChecked4").find("input[type='checkbox']");
     checkbox4.each(function(){
        checkbox4.click(function(){
             if($(this).prop("checked") ){
            m4=1;
            setProgress();
        }else{
            if(!checkbox4.prop("checked")){
                m4=0;
                setProgress();
            }
        }
        })
       
     })
      $("#isChecked5").find("input").click(function(){
        if($(this).prop("checked") ){
            m5=1;
            setProgress();
        }
     })
       $("#isChecked6").find("input").click(function(){
        if($(this).prop("checked") ){
            m6=1;
            setProgress();
        }
     })
     $("#isChecked7").find("textarea").keydown(function() {
        var str=$("#isChecked7").find("textarea").val().length;
                if(str!=0){
                     m7=1;
             setProgress();
                 }else{
                     m7=0;
             setProgress();
                }
                
        });
})
// seo 问答JS
$(document).ready(function () {
    var seo=$("#question-brand");
    if(seo.length>0){
        brandClick();
        quesTab();
    }
})

function brandClick(){
        var allSort = $("#all-sort").find("a");
        var allSort2 = $("#all-sort2").find("a");
        var allSort3 = $("#all-sort3").find("a");
        var brandList=$("#brand-list").find("a");
        var brandName=$("#brand-name").find("ul");
        var hdlist = $("#question-brand").find("a");
        var bdlist = $("#brand-list").find("ul");

        for(var i=0; i<hdlist.length; i++){
            hdlist[i].onclick=function(){
                 for(var j=0 ;j<hdlist.length; j++) {
                    hdlist[j].className = (hdlist[j] == this) ? "cur" : "";
                    bdlist[j].style.display = (hdlist[j] == this) ? "block" : "none";
                    $(".brand-list").css("display","block");
                } 
            }
        }

        brandList.each(function (i) {
            $(this).click(function () {
                $("#brand-name").css("display","block");
                allSort2.removeClass("cur");
                $(this).parent().siblings().removeClass('cur').end().addClass('cur');
                $("#brand-name").find("ul").eq(i).siblings().hide().end().show();
                $(".brand-name").css("display","block");
            });
        })
        $("#brand-name").find("a").each(function(i){
            $(this).click(function () {
                 allSort3.removeClass("cur");
                $(this).parent().siblings().removeClass('cur').end().addClass('cur');
            });
        })
        allSort2.click(function(){
            allSort2.addClass("cur");
            $("#brand-list").find("li").removeClass("cur");
        })
        allSort3.click(function(){
            allSort3.addClass("cur");
            $("#brand-name").find("li").removeClass("cur");
        })

}

function quesTab(){
    $("#ques-tab-hd").find("a").each(function (i) {
        $(this).click(function () {
            $(this).siblings().removeClass("cur").end().addClass("cur");
        });
    })
}
function commontPopup(hbj){
    var popup = document.getElementById(hbj),
        inside = popup.getElementsByClassName("inside")[0],
        close = popup.getElementsByClassName("close")[0];
    popup.style.display = "block";
    popup.style.height = document.body.clientHeight + "px";
    inside.style.top = ( document.documentElement.clientHeight - inside.offsetHeight ) / 2 + "px";
    close.addEventListener("click", function () {
            popup.style.display = "none";
    });
}
