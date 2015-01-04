        var imgcount = 0;
        jQuery(function () {
            /*var login = getQueryString("login");
            if (login == "Y") {
                //alert(login);
                $("#ctl00_ContentPlaceHolder1_btnbuy").click();
                return;
            }*/

            imgcount = jQuery("#smallimglist > li").length;
            jQuery("#smallimglist").css("height", imgcount * 77);

            /*jQuery(".iframe").fancybox({
                'width': 675,
                'height': 300,
                'autoScale': false,
                'showCloseButton': false,
                'titlePosition': 'inside',
                'titleFormat': formatTitle,
                'transitionIn': 'none',
                'transitionOut': 'none',
                'type': 'iframe'
            });

            jQuery(".content_nav > li").click(function () {
                jQuery(".content_nav > li").removeClass("cur");
                var i = jQuery(this).index();
                jQuery(this).addClass("cur");
                jQuery(".changediv").hide();
                jQuery(".changediv > .contenttab").show();
                jQuery(".changediv:eq(" + i + ")").show();
                jQuery(".changediv:eq(" + i + ") > .contenttab").hide();
                jQuery(".alowdisplay").show();
            });*/
            jQuery("#smallimglist > li").click(function () {
                jQuery("#smallimglist > li").removeClass("cur");
                jQuery(this).addClass("cur");
                jQuery(".bigpic > img").attr("src", jQuery(this).children(".imgarea").children("img").attr("bigimg"));
            }).css({ "cursor": "pointer" });
            jQuery("#smallimglist > li:eq(0)").addClass("cur");
            jQuery(".bigpic > img").attr("src", jQuery("#smallimglist > li:eq(0) img").attr("bigimg"));

            jQuery("#div_prv").css({ "cursor": "pointer" }).click(function () {
                var i = jQuery("#smallimglist > li[class='cur']").index();
                if (i > 0) {
                    var pianyizhi = ((i) * 126) - 505;
                    if (pianyizhi > 0) {
                        jQuery("#smallimgarea").scrollLeft(pianyizhi);
                    } else {
                        jQuery("#smallimgarea").scrollLeft(0);
                    }
                    //按钮样式定义
                    /*if (i == 1) {
                        jQuery(this).attr("class", "smallpicdotl");
                    }
                    if (imgcount > 1)
                        jQuery("#div_next").attr("class", "smallpicdotr2");*/
                    //图片显示
                    jQuery("#smallimglist > li").removeClass("cur");
                    var obj = jQuery("#smallimglist > li").eq(i - 1);
                    obj.addClass("cur");
                    jQuery(".bigpic > img").attr("src", obj.children(".imgarea").children("img").attr("bigimg"));
                }
            });
            jQuery("#div_next").css({ "cursor": "pointer" }).click(function () {
                var i = jQuery("#smallimglist > li[class='cur']").index();
                console.log(i)
                if (i < (imgcount - 1)) {
                    var pianyizhi = ((i + 2) * 126) - 505;
                    if (pianyizhi > 0) {
                        jQuery("#smallimgarea").scrollTop(pianyizhi);
                    }
                    //按钮样式定义
                    /*if (i == (imgcount - 2)) {
                        jQuery(this).attr("class", "smallpicdotr");
                    }
                    if (imgcount > 1)
                        jQuery("#div_prv").attr("class", "smallpicdotl2");*/
                    //图片显示
                    jQuery("#smallimglist > li").removeClass("cur");
                    var obj = jQuery("#smallimglist > li").eq(i + 1);
                    obj.addClass("cur");
                    jQuery(".bigpic > img").attr("src", obj.children(".imgarea").children("img").attr("bigimg"));
                }
            });
        });
        /*function getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return r[2];
            return null;
        }*/
