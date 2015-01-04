//Start QiankunUI Base
var QiankunUI = {};
QiankunUI.extend = function (destination, source) {
    for (var property in source) {
        if (destination[property]) {
            continue;
        }
        destination[property] = source[property];
    }
    return destination;
};
QiankunUI.clone = function (matrix) {
    if (typeof (matrix) == "function") {
        return new matrix();
    }
    else if (typeof (matrix) == "object") {
        var cloning = new Object();
        for (var member in matrix) {
            switch (typeof (matrix[member])) {
                case "object":
                    cloning[member] = clone(matrix[member]);
                    break;
                default:
                    cloning[member] = matrix[member];
            }
        }
        return cloning;
    }
    else {
        var cloning = matrix;
        return cloning;
    }
}
QiankunUI.getWindowWidth = function (objWindow) {
    if (objWindow.innerWidth) {
        return Math.min(objWindow.innerWidth, objWindow.document.documentElement.clientWidth);
    }
    else {
        return objWindow.document.documentElement.clientWidth;
    }
}
QiankunUI.getWindowHeight = function (objWindow) {
    if (objWindow.innerHeight) {
        return Math.min(objWindow.innerHeight, objWindow.document.documentElement.clientHeight);
    }
    else {
        return objWindow.document.documentElement.clientHeight;
    }
}
QiankunUI.getDocumentScrollTop = function (objDocument) {
    return Math.max(objDocument.documentElement.scrollTop, objDocument.body.scrollTop);
}
QiankunUI.getDocumentScrollLeft = function (objDocument) {
    return Math.max(objDocument.documentElement.scrollLeft, objDocument.body.scrollLeft);
}
QiankunUI.getDocumentWidth = function (objDocument) {
    return objDocument.documentElement.scrollWidth;
}
QiankunUI.getDocumentHeight = function (objDocument) {
    return objDocument.documentElement.scrollHeight;
}
QiankunUI.maxZIndex = function (objDocument) {
    var zIndex = 0;
    var elments = objDocument.getElementsByTagName("*");
    for (var i = 0; i < elments.length; i++) {
        if (elments[i].currentStyle) {
            elementZIndex = elments[i].currentStyle.zIndex; //get z-index on IE
        } else if (window.getComputedStyle) {
            elementZIndex = window.getComputedStyle(elments[i], null).zIndex; //get z-index on Firfox, Safari and Chrome
        }
        if (elementZIndex) {
            if (zIndex < parseInt(elementZIndex)) {
                zIndex = elementZIndex;
            }
        }
    }
    return parseInt(zIndex);
}
QiankunUI.BindEvent = function (element, type, listener) {
    if (window.addEventListener) {
        element.addEventListener(type, listener, false);
    }
    else if (window.attachEvent) {
        element.attachEvent('on' + type, listener);
    }
}
QiankunUI.userAgent = navigator.userAgent.toLowerCase();
QiankunUI.browser = {
    version: (QiankunUI.userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
    safari: /webkit/.test(QiankunUI.userAgent),
    opera: /opera/.test(QiankunUI.userAgent),
    msie: /msie/.test(QiankunUI.userAgent) && !/opera/.test(QiankunUI.userAgent),
    mozilla: /mozilla/.test(QiankunUI.userAgent) && !/(compatible|webkit)/.test(QiankunUI.userAgent)
};
QiankunUI.phoneList = new Array("2.0 MMP", "240320", "AvantGo", "BlackBerry", "Blazer", "Cellphone", "Danger", "DoCoMo", "Elaine/3.0", "EudoraWeb",
                               "hiptop", "IEMobile", "KYOCERA/WX310K", "LG/U990", "MIDP-2.0", "MMEF20", "MOT-V", "NetFront", "Newt", "Nintendo Wii", 
                               "Nitro", "Nokia","Opera Mini", "Opera Mobi","Palm", "Playstation Portable", "portalmmm", "Proxinet", "ProxiNet",
                               "SHARP-TQ-GX10", "Small", "SonyEricsson", "Symbian", "TS21i-10", "UP.Browser", "UP.Link", "Windows CE", "WinWAP",
                               "iPhone", "iPod", "Windows Phone", "HTC", "ucweb", "Mobile", "Android");
QiankunUI.isOnTouchStart = function () { return typeof (ontouchstart) != "undefined"; }
QiankunUI.isiPad = function () { return QiankunUI.userAgent.indexOf("ipad") >= 0; }
QiankunUI.isAndroid = function () { return QiankunUI.userAgent.indexOf("Android") > -1 || QiankunUI.userAgent.indexOf("Silk") > -1; }
QiankunUI.isiPhone = function () { return (navigator.platform.indexOf("iPhone") != -1) || (navigator.platform.indexOf("iPod") != -1); }
QiankunUI.isPhone = function () {
    if (QiankunUI.isOnTouchStart() && !QiankunUI.isiPad()) {
        return true;
    }
    for (var i = 0; i < QiankunUI.phoneList.length; i++) {
        if (QiankunUI.userAgent.indexOf(QiankunUI.phoneList[i].toLowerCase()) >= 0 && QiankunUI.userAgent.indexOf("ipad") == -1) {
            return true;
        }
    }
    var appNameList = new Array("Microsoft Pocket Internet Explorer");
    for (var i = 0; i < appNameList.length; i++) {
        if (QiankunUI.userAgent.indexOf(appNameList[i]) >= 0) {
            return true;
        }
    }
    return false;
}
QiankunUI.isMobile = function () { return QiankunUI.isOnTouchStart() || QiankunUI.isPhone() || QiankunUI.isiPad() || QiankunUI.isAndroid(); }

//End QiankunUI

//Start QiankunUIList
function QiankunUIList() {
    this.data = new Array();
}
QiankunUIList.prototype.count = function () {
    return this.data.length;
}
QiankunUIList.prototype.indexOf = function (item) {
    var index = -1;
    for (var i = this.count(); i >= 0; ) {
        if (this.data[--i] == item) {
            index = i;
            break;
        }
    }
    return index;
}
QiankunUIList.prototype.contain = function (item) {
    return this.indexOf(item) == -1 ? false : true;
}
QiankunUIList.prototype.add = function (item) {
    if (this.contain(item)) {
        return;
    }
    this.data.push(item);
}
QiankunUIList.prototype.removeAt = function (index) {
    for (var i = index; i < this.count() - 1; i++) {
        this[i] = this[i + 1];
    }
    return this.data.pop();
}
QiankunUIList.prototype.item = function (index) {
    if (index >= 0 && index <= this.count() - 1) {
        return this.data[index]
    }
}
QiankunUIList.prototype.remove = function (item) {
    var index = this.indexOf(item);
    if (index != -1) {
        return this.removeAt(index);
    }
    return null;
}
//End QiankunUIList

/*******************************
QiankunUI Common Hopup Prototypes
********************************/
var qiankunPopupZIndex = 10000;
function qiankunPopupMaxZindex(action) {
    if (action == "remove")
        qiankunPopupZIndex -= 1;
    else{
        qiankunPopupZIndex += 1;
        return qiankunPopupZIndex;
    }
}
//Start QiankunMaskPopup
function QiankunMaskPopup(param) {
    this.targetWindow = param["targetWindow"] || window;
    this.elementKey = new Array();
    this.element = new Object();
    this.style = new Object();
    this.cssClass = new Object();

    this.elementKey.push("maskSpan");
    this.elementKey.push("maskDiv");
    this.element["maskSpan"] = this.targetWindow.document.createElement("span");
    this.element["maskDiv"] = this.targetWindow.document.createElement("div");
    this.element["maskDiv"].setAttribute("class", "maskBackground");
    this.element["maskDiv"].setAttribute("className", "maskBackground");
    this.style["maskDiv"] = { zIndex: qiankunPopupMaxZindex(), display: "block" };
}
QiankunMaskPopup.prototype.setStyle = function () {
    this.element.maskDiv.style.zIndex = this.style["maskDiv"]["zIndex"];
    this.element.maskDiv.style.display = this.style["maskDiv"]["display"];
}

QiankunMaskPopup.prototype.setSize = function () {
    this.element.maskDiv.style.width = "100%";
    this.element.maskDiv.style.height = Math.max(QiankunUI.getWindowHeight(this.targetWindow), QiankunUI.getDocumentHeight(this.targetWindow.document)) + "px";
}

QiankunMaskPopup.prototype.setPosition = function () {
    this.element.maskDiv.style.left = "0px";
    this.element.maskDiv.style.top = "0px";
}
QiankunMaskPopup.prototype.build = function () {
    this.element.maskSpan.appendChild(this.element.maskDiv);
    this.targetWindow.document.body.appendChild(this.element.maskSpan);
}
QiankunMaskPopup.prototype.bindEvent = function () {
    var me = this;
    QiankunUI.BindEvent(this.targetWindow, "resize", function () { me.setSize(); });
}
QiankunMaskPopup.prototype.show = function () {
    this.setSize();
    this.setStyle();
    this.build();
    this.setPosition();
    this.bindEvent();
}
QiankunMaskPopup.prototype.close = function () {
    if (this.element.maskSpan) {
        $("*").find(this.element.maskSpan).remove();
    }
    qiankunPopupMaxZindex("remove");
}
//End MaskPopup
function QiankunPopup(param){
    this.targetWindow=param["targetWindow"]||window;
    
    this.elementKey=new Array();
    this.config=new Object();
    this.element=new Object();
    this.callBack=new Object();
    this.cssClass=new Object();
    this.style=new Object();
    this.size=new Object();
    this.position=new Object();
    this.action=new Object();
    this.actionData = new Object();
    this.config["targetObj"] = param.targetObj || "";

    if(param.showMask){
        this.config["showMask"]=param.showMask;
        this.mask = new QiankunMaskPopup({ targetWindow: this.targetWindow});
    }
    
    this.config["title"]=param.title;
    this.config["className"] = param.className || "";
    this.config["content"]=param.content;
    this.config["autoSize"] = false;
    this.config["hasArrow"] = param.hasArrow || false;
    this.config["htmlWrap"] = param.htmlWrap || false;
    this.size["borderShadow"] = param.borderShadow || 0;
    this.callBack["closeCallBack"] = param.closeCallBack;
    
    this.size["width"]=param.width||300;
    this.size["height"]=param.height||180;
    
    this.position["top"]=param.top;
    this.position["left"]=param.left;

    this.init();
}

QiankunPopup.prototype.init=function(){
    this.action["hasShow"]=false;

    this.elementKey.push("popupSpan");
    this.elementKey.push("popupDiv");
    this.elementKey.push("popupBorderTop");
    this.elementKey.push("popupBorderBottom");
    this.elementKey.push("popupContent");

    this.elementKey.push("QiankunCloseDiv");
    this.elementKey.push("QiankunReturnBtn");
    this.elementKey.push("headerDiv");

    this.elementKey.push("contentDiv");
    this.element["popupSpan"]=this.targetWindow.document.createElement("span");
    this.element["popupDiv"]=this.targetWindow.document.createElement("div");
    this.element["popupDiv"].setAttribute("class", "qiankunPopup" + this.config["className"]);
    this.element["popupDiv"].setAttribute("className", "qiankunPopup" + this.config["className"]);

    this.element["popupBorderTop"]=this.targetWindow.document.createElement("div");
    this.element["popupBorderTop"].setAttribute("class", "qiankunPopupTop clearfix");
    this.element["popupBorderTop"].setAttribute("className", "qiankunPopupTop clearfix");
    this.element["popupBorderTop"].innerHTML = "<div class=\"qiankunPopupTopLeft\"> </div><div class=\"qiankunPopupTopRight\"> </div>";

    this.element["popupBorderBottom"]=this.targetWindow.document.createElement("div");
    this.element["popupBorderBottom"].setAttribute("class", "qiankunPopupBtm clearfix");
    this.element["popupBorderBottom"].setAttribute("className", "qiankunPopupBtm clearfix");
    this.element["popupBorderBottom"].innerHTML = "<div class=\"qiankunPopupBtmLeft\"> </div><div class=\"qiankunPopupBtmRight\"> </div>";
    
    this.element["popupContent"]=this.targetWindow.document.createElement("div");
    this.element["popupContent"].setAttribute("class", "qiankunPopupContent");
    this.element["popupContent"].setAttribute("className", "qiankunPopupContent");
    
    this.element["headerDiv"]=this.targetWindow.document.createElement("div");
    this.element["headerDiv"].setAttribute("class", "qiankunPopupTitle");
    this.element["headerDiv"].setAttribute("className", "qiankunPopupTitle");

    this.element["QiankunCloseDiv"] = this.targetWindow.document.createElement("div");
    this.element["QiankunCloseDiv"].setAttribute("class", "qiankunCloseBtn");
    this.element["QiankunCloseDiv"].setAttribute("className", "qiankunCloseBtn");
    this.element["QiankunCloseDiv"].innerHTML="×";
    this.element["QiankunReturnBtn"] = this.targetWindow.document.createElement("div");
    this.element["QiankunReturnBtn"].setAttribute("class", "qiankunReturnBtn");
    this.element["QiankunReturnBtn"].setAttribute("className", "qiankunReturnBtn");
        
    this.element["contentDiv"]=this.targetWindow.document.createElement("div");
    this.element["contentDiv"].setAttribute("class", "qiankunIframeContent");
    this.element["contentDiv"].setAttribute("className", "qiankunIframeContent");
    
    this.style["popupDiv"]={position:"fixed"};

    this.style["popupDiv"]["zIndex"] = qiankunPopupMaxZindex();

    if (this.config["hasArrow"]) {
        this.style["popupDiv"]={position:"absolute"};
        this.elementKey.push("popupArrow");
        this.element["popupArrow"] = this.targetWindow.document.createElement("div");
        this.element["popupArrow"].setAttribute("class", "qiankunArrow");
        this.element["popupArrow"].setAttribute("className", "qiankunArrow");
    }
}

//initContent
QiankunPopup.prototype.initContent=function(){}
//setStyle
QiankunPopup.prototype.setStyle=function(){
    for(var i=this.elementKey.length-1;i>0;i--){
        var key=this.elementKey[i];
        if(!this.style[key]){
            continue;
        }
        for(var styleItem in this.style[key]){
            try
            {
                this.element[key].style[styleItem]=this.style[key][styleItem];
            }
            catch(e)
            {}
        }
    }
}
QiankunPopup.prototype.setClass=function(){
    for(var i=this.elementKey.length-1;i>0;i--){
        var key=this.elementKey[i];
        if(!this.cssClass[key]){
            continue;
        }
        try{
            this.element[key].className=this.cssClass[key];
        }
        catch(e)
        {}
    }
}
//setSize
QiankunPopup.prototype.setSize=function(){
    this.element.popupDiv.style["width"]=(parseInt(this.size.width)) +"px";
    //this.element.popupDiv.style["height"]=this.size.height+"px";
}
//setSize with URL iframe
QiankunPopup.prototype.setUrlSize=function(){
    //this.element.popupDiv.style["height"]=this.size.height+"px";
}
//reset the size of popup
QiankunPopup.prototype.resetPopupSize = function (width, height) {
    if (width !="") {
        this.size.width = width;
        this.element["url"].setAttribute("width", width + "px");
        this.size.width = width + 23;
    }
    if (height != "") {
        this.size.height = height;
        this.element["url"].setAttribute("height", height + "px");
    }
    this.setSize();
    this.setPosition();
}
//The user can close the hopup window by clicking the outside area of the hopup window
QiankunPopup.prototype.closePopupByClickingOutside=function(thisCloseCallBack){
    if(this.config.showMask)
    {
        var me = this;
        QiankunUI.BindEvent(this.mask.element["maskDiv"],"click",function(){
            if (thisCloseCallBack)
            {            
                thisCloseCallBack();
            }
            me.close();
            if(me.callBack.closeCallBack)
            {
                me.callBack.closeCallBack();
            }
        });
    }
}
//setPosition
QiankunPopup.prototype.setPosition=function(){
        if(this.position.top){
            this.element.popupDiv.style["top"]=this.position.top+"px";
        }
        else{
            var availHeight=QiankunUI.getWindowHeight(this.targetWindow);
            var scrollTop = QiankunUI.getDocumentScrollTop(this.targetWindow.document);
            if (this.config["targetObj"] != "") {
                availHeight = $(this.config["targetObj"]).height();
                scrollTop = $(this.config["targetObj"]).scrollTop();
            }
            var availTop=0;
            if(availHeight-this.size.height>0)
            {
                availTop=(availHeight-this.size.height)/2;
                this.element.popupDiv.style["top"]=availTop+"px";
                if(this.config["showMask"]){
                    this.mask.setSize();
                }
            }
            else
            {
                availTop = 20;
                this.element.popupDiv.style["top"]=availTop+"px";
            }
        }
        if(this.position.left){
            this.element.popupDiv.style["left"]=this.position.left+"px";
        }
        else{
            var availWidth=QiankunUI.getWindowWidth(this.targetWindow);
            var availLeft=0;
            if(availWidth-this.size.width>0)
            {
                availLeft=(availWidth-this.size.width)/2;
            }
            this.element.popupDiv.style["left"]=availLeft+"px";
        }
    }
//adjustPosition
QiankunPopup.prototype.adjustPosition = function () {}
//build
QiankunPopup.prototype.build = function () {
    this.element["popupDiv"].appendChild(this.element["popupBorderTop"]);
    if (this.config["title"] != "") {
        this.element["headerDiv"].innerHTML = this.config["title"];
        this.element["popupContent"].appendChild(this.element["headerDiv"]);
    }
    this.element["popupContent"].appendChild(this.element["contentDiv"]);
    this.element["popupContent"].appendChild(this.element["QiankunReturnBtn"]);
    this.element["popupContent"].appendChild(this.element["QiankunCloseDiv"]);
    this.element["popupDiv"].appendChild(this.element["popupContent"]);

    this.element["popupSpan"].appendChild(this.element["popupDiv"]);
    try {
        if (this.config["targetObj"] != "")
            $(this.config["targetObj"]).append(this.element["popupSpan"]);
        else
            this.targetWindow.document.body.appendChild(this.element["popupSpan"]);
    }
    catch (ex) {
        //alert(this.targetWindow.document.body.innerHTML);
        //alert(ex.message);
    }
    this.element["popupDiv"].appendChild(this.element["popupBorderBottom"]);

    if (this.config["hasArrow"]) {
        this.element["popupSpan"].setAttribute("class", "qiankunArrowHopup");
        this.element["popupSpan"].setAttribute("className", "qiankunArrowHopup");
        this.element["popupBorderTop"].appendChild(this.element["popupArrow"]);
    }
}
//buildLoading
QiankunPopup.prototype.buildLoading=function(){}
//buildContent
QiankunPopup.prototype.buildContent = function () {}
//bindEvents
QiankunPopup.prototype.bindEvents = function () {
    var me = this;
    $(me.element["QiankunReturnBtn"]).live("click", function () {
        me.element["QiankunReturnBtn"].style.display = "none";
        me.element["QiankunCloseDiv"].style.display = "";
        me.element["url"].setAttribute("src", me.config["QiankunReturnUrl"]);
        me.config["QiankunReturnUrl"] = "";
    })//chrome && safari click bug
    var QiankunPopupClose = function(){
        me.close();
        if (me.callBack.closeCallBack) {
            me.callBack.closeCallBack();
        }
    };
    QiankunUI.BindEvent(this.element["QiankunCloseDiv"], "click", function () {
        QiankunPopupClose();
    });
    //close the hopup windows whenever users click outside of them
    if(this.config.showMask){
        QiankunUI.BindEvent(this.mask.element["maskDiv"], "click", function () {
            QiankunPopupClose();
        });
    }
    
}
//bindContentEvents
QiankunPopup.prototype.bindContentEvents=function(){}
//show
QiankunPopup.prototype.show=function(){
    this.setStyle();
    this.setClass();
    this.setSize();
    this.setPosition();
    this.bindEvents();
    this.bindContentEvents();
    this.build();
    this.buildLoading();
    this.buildContent();
    if(this.config.showMask){
        this.mask.show();
    }
    this.action["hasShow"]=true;
}
QiankunPopup.prototype.showModalDialog=function(){
    this.show();
    this.mask.show();
}
//close
QiankunPopup.prototype.close = function () {
    //for QiankunHtmlWrapHopup, hide the Html Object first
    if (this.config["htmlWrap"]){
        this.config["content"].css("display", "none");
        this.config["content"].appendTo(this.targetWindow.document.body);
    }
    if (QiankunUI.browser.msie && this.config["onFocus"] == true) {
        $(this.element.url).remove();
    }
    if (this.config["targetObj"] != "")
        $(this.config["targetObj"]).find(this.element.popupSpan).remove();
    else if (this.element.popupSpan) {
        $("*").find(this.element.popupSpan).remove();
    }

    qiankunPopupMaxZindex("remove");
    if (this.config["showMask"]) {
        this.mask.close();
    }
    this.action["hasShow"] = false;
}
//QiankunPopup Return Url
QiankunPopup.prototype.redirect = function (returnUrl, newUrl) {
    var me = this;
    me.config["QiankunReturnUrl"] = returnUrl;
    me.element["QiankunReturnBtn"].style.display = "block";
    me.element["QiankunCloseDiv"].style.display = "none";
    me.element["url"].setAttribute("src", newUrl);
}
//addCallBack
QiankunPopup.prototype.addCallBack=function(elementKey,listener){
    elementKey=elementKey.toLowerCase();
    if(this.element[elementKey]){
        this.callBack[elementKey].add(listener);
    }
}
//removeCallBack
QiankunPopup.prototype.removeCallBack=function(elementKey,listener){
    elementKey=elementKey.toLowerCase();
    if(this.element[elementKey]){
        this.callBack[elementKey].remove(listener);
    }
}

//Start QiankunUrlHopup
function QiankunUrlHopup(param){
    this.base = new QiankunPopup(param);
    QiankunUI.extend(this,this.base);
    this.config["autoSize"] = true;
    this.config["onFocus"] = true;
    this.initContent();
}
QiankunUrlHopup.prototype.initContent=function(){
    this.elementKey.push("loading");
    this.element["loading"]=this.targetWindow.document.createElement("div");
    this.element["loading"].setAttribute("class","loadingDiv");
    this.element["loading"].setAttribute("className","loadingDiv");
    this.elementKey.push("url");
    this.element["url"]=this.targetWindow.document.createElement("iframe");
    this.element["url"].setAttribute("id", "qiankunPopupIframe");
    this.element["url"].setAttribute("border","0");
    this.element["url"].setAttribute("frameBorder","0");
    this.element["url"].setAttribute("scrolling","no");
    this.element["url"].setAttribute("src",this.config["content"]);
    this.element["url"].setAttribute("width",(this.size.width)+"px");
    this.element["url"].setAttribute("class","qiankunIframeLoading");
    this.element["url"].setAttribute("className","qiankunIframeLoading");
}
QiankunUrlHopup.prototype.bindContentEvents=function(){
    var me = this;
    QiankunUI.BindEvent(me.element["url"],"load",function(){
        me.element["loading"].style.display = "none";
        me.element["url"].setAttribute("class","");
        me.element["url"].setAttribute("className","");
    });
    if(this.config["autoSize"])
    {
        QiankunUI.BindEvent(me.element["url"],"load",function(){
            try{
                var obj=me.element["url"];  
                if(me.config["className"].indexOf("qiankunStickyHopup") > 0) // init the height of qiankunStickyHopup iframe for Safari & Chrome
                    obj.height = 0;
                if (obj.contentDocument && obj.contentDocument.body.offsetHeight)
                {
                    obj.height = obj.contentDocument.body.scrollHeight;
                    obj.width = obj.contentDocument.body.scrollWidth;
                }
                else
                {
                    obj.height = obj.Document.body.scrollHeight;
                    obj.width = obj.Document.body.scrollWidth;
                }
                me.setUrlSize();
                me.size.height=obj.height;
                me.size.width=obj.width;
                
                if(me.config["className"].indexOf("qiankunStickyHopup") > 0){
                    me.setOldHopupSize(obj.width);
                }
                me.setPosition();
                me.adjustPosition();
                
                var contentWindow=obj.contentWindow;
                contentWindow.closeParent=function () {
                    me.close();
                };
                contentWindow.customerFunction=function () {
                    for(var i=0;i<me.callBack["url"].count();i++){
                        me.callBack["url"].item(i)();
                    }
                };
            }catch(e){
            }
        });
    }
}
QiankunUrlHopup.prototype.buildLoading=function(){
    this.element["loading"].innerHTML="<span><img src='/Images/loading.gif'></span><span>Please Wait ...</span>";
    this.element["contentDiv"].appendChild(this.element["loading"]);
    this.element["contentDiv"].appendChild(this.element["url"]);
}
//End QiankunUrlHopup
//Start QiankunUrlHopup
function QiankunTipPopup(param){
    this.base = new QiankunPopup(param);
    QiankunUI.extend(this,this.base);
    this.config["autoClose"]=param["autoClose"]||0;
    this.initContent();
}
QiankunTipPopup.prototype.initContent=function(){
    this.elementKey.push("tipDiv");
    this.element["tipDiv"]=this.targetWindow.document.createElement("div");
    this.element["tipDiv"].innerHTML=this.config["content"];
    this.element["tipDiv"].setAttribute("class","lightRedText bold font13Text");
    this.element["tipDiv"].setAttribute("className","lightRedText bold font13Text");
    this.style["tipDiv"]={padding:"20px"};
    this.element["popupSpan"].setAttribute("class", "tipHopup");
    this.element["popupSpan"].setAttribute("className", "tipHopup");
}
QiankunTipPopup.prototype.bindContentEvents=function(){
    var me=this;
    if(me.config["autoClose"])
    {
        setTimeout(function(){try{me.close()}catch(ex){}},me.config["autoClose"]);
    }
}
QiankunTipPopup.prototype.buildContent=function(){
    this.element["contentDiv"].appendChild(this.element["tipDiv"]);
}
//End QiankunTipPopup
//Start AlertPopup
function AlertPopup(param){
    this.base = new QiankunPopup(param);
    QiankunUI.extend(this,this.base);
    this.initContent();
}
AlertPopup.prototype.initContent=function(){
    this.elementKey.push("tipDiv");
    this.elementKey.push("ok");
    this.elementKey.push("innerContentDiv");
    this.elementKey.push("innerButtonDiv");
    this.element["tipDiv"]=this.targetWindow.document.createElement("div");
    this.element["tipDiv"].innerHTML=this.config["content"];
    this.element["ok"]=this.targetWindow.document.createElement("input");
    this.element["ok"].setAttribute("type","button");
    this.element["ok"].setAttribute("value","OK");
    this.element["ok"].setAttribute("class","redBtn");
    this.element["ok"].setAttribute("className","redBtn");
    this.element["innerContentDiv"]=this.targetWindow.document.createElement("div");
    this.element["innerButtonDiv"]=this.targetWindow.document.createElement("div");
    this.element["innerButtonDiv"].setAttribute("class","btnsBox alertHopupWinBtn textCenter");
    this.element["innerButtonDiv"].setAttribute("className","btnsBox alertHopupWinBtn textCenter");
    this.callBack["ok"]=new QiankunUIList();
}
AlertPopup.prototype.bindContentEvents=function(){
    var me=this;
    QiankunUI.BindEvent(me.element["ok"],"click",function(){
        for(var i=0;i<me.callBack["ok"].count();i++)
        {
            me.callBack["ok"].item(i)();
        }
        me.close();
    });
}
AlertPopup.prototype.buildContent=function(){
    this.element["innerContentDiv"].appendChild(this.element["tipDiv"]);
    this.element["innerButtonDiv"].appendChild(this.element["ok"]);
    this.element["innerContentDiv"].appendChild(this.element["innerButtonDiv"]);
    this.element["contentDiv"].appendChild(this.element["innerContentDiv"]);
}
//End AlertPopup
//Start QiankunLoadingPopup
function QiankunLoadingPopup(param) {
    this.base = new QiankunPopup(param);
    QiankunUI.extend(this, this.base);
    this.initContent();
}
QiankunLoadingPopup.prototype.initContent = function () {
    this.element["popupSpan"].setAttribute("class", "loadingHopup");
    this.element["popupSpan"].setAttribute("className", "loadingHopup");
    this.element["contentDiv"].innerHTML = "<div class='loadingTitle'>" + this.config["content"] + "</div><div class='loadingBar'></div>";
}
QiankunLoadingPopup.prototype.bindContentEvents = function () { }
QiankunLoadingPopup.prototype.buildContent = function () { }
//End LoadingPopup
//Start QiankunHtmlHopup
function QiankunHtmlHopup(param){
    this.base = new QiankunPopup(param);
    QiankunUI.extend(this,this.base);
    this.initContent();
}
QiankunHtmlHopup.prototype.initContent=function(){
    this.elementKey.push("contentDiv");
    this.element["contentDiv"]=this.targetWindow.document.createElement("div");
    this.element["contentDiv"].innerHTML=this.config["content"];
    this.element["contentDiv"].setAttribute("class", "qiankunHtmlContent");
    this.element["contentDiv"].setAttribute("className", "qiankunHtmlContent");
}
QiankunHtmlHopup.prototype.setSize=function(){
    if(this.config["className"].indexOf("qiankunStickyHopup") > 0){
        this.element.popupDiv.style["width"] = (parseInt(this.size.width)+23) + "px";
    }
    else
        this.element.popupDiv.style["width"]=(parseInt(this.size.width)) +"px";
}
//End QiankunHtmlHopup
//Start QiankunHasCornerHtmlHopup
function QiankunHasCornerHtmlHopup(param) {
    this.base = new QiankunHtmlHopup(param);
    QiankunUI.extend(this, this.base);
    this.initContent();
}
QiankunHasCornerHtmlHopup.prototype.initContent = function () {
    this.elementKey.push("popupCornerLeft");
    this.element["popupCornerLeft"] = this.targetWindow.document.createElement("div");
    this.element["popupCornerLeft"].setAttribute("class", "qiankunCornerLeft");
    this.element["popupCornerLeft"].setAttribute("className", "qiankunCornerLeft");
    this.elementKey.push("popupCornerRight");
    this.element["popupCornerRight"] = this.targetWindow.document.createElement("div");
    this.element["popupCornerRight"].setAttribute("class", "qiankunCornerRight");
    this.element["popupCornerRight"].setAttribute("className", "qiankunCornerRight");
}
QiankunHasCornerHtmlHopup.prototype.buildContent = function () {
    this.element["popupSpan"].setAttribute("class", "qiankunCornerHopup");
    this.element["popupSpan"].setAttribute("className", "qiankunCornerHopup");
    this.element["popupBorderTop"].appendChild(this.element["popupCornerLeft"]);
    this.element["popupBorderTop"].appendChild(this.element["popupCornerRight"]);
}
QiankunHasCornerHtmlHopup.prototype.setSize = function () {
    this.element.popupDiv.style["width"] = (parseInt(this.size.width) + 50) + "px";
}
//End QiankunHasCornerHtmlHopup
//Start ConfirmPopup
function QiankunConfirmPopup(param){
    this.base = new QiankunPopup(param);
    QiankunUI.extend(this,this.base);
    this.initContent();
}
QiankunConfirmPopup.prototype.initContent=function(){
    this.elementKey.push("tipDiv");
    this.elementKey.push("ok");
    this.elementKey.push("cancel");
    this.elementKey.push("innerContentDiv");
    this.elementKey.push("innerButtonDiv");
    this.element["tipDiv"]=this.targetWindow.document.createElement("div");
    this.element["tipDiv"].innerHTML=this.config["content"];
    this.element["tipDiv"].setAttribute("class", "qiankunConfirmContent");
    this.element["tipDiv"].setAttribute("className", "qiankunConfirmContent");
    this.element["ok"]=this.targetWindow.document.createElement("input");
    this.element["ok"].setAttribute("type","button");
    this.element["ok"].setAttribute("value","yes");
    this.element["ok"].setAttribute("class", "okBtn");
    this.element["ok"].setAttribute("className", "okBtn");
    this.element["cancel"]=this.targetWindow.document.createElement("input");
    this.element["cancel"].setAttribute("value","no");
    this.element["cancel"].setAttribute("type","button");   
    this.element["cancel"].setAttribute("class","cancelBtn");//for firefox and safari
    this.element["cancel"].setAttribute("className","cancelBtn");//for IE
    this.element["innerContentDiv"]=this.targetWindow.document.createElement("div");
    this.element["innerButtonDiv"]=this.targetWindow.document.createElement("div");
    this.element["innerButtonDiv"].setAttribute("class", "qiankunBtnsBox");
    this.element["innerButtonDiv"].setAttribute("className", "qiankunBtnsBox");
    this.callBack["ok"]=new QiankunUIList();
    this.callBack["cancel"]=new QiankunUIList();
}
QiankunConfirmPopup.prototype.bindContentEvents=function(){
    var me=this;
    QiankunUI.BindEvent(me.element["ok"],"click",function(){
        for(var i=0;i<me.callBack["ok"].count();i++){
            me.callBack["ok"].item(i)();
        }
        me.close();
    });
    QiankunUI.BindEvent(me.element["cancel"],"click",function(){
        for(var i=0;i<me.callBack["cancel"].count();i++){
            me.callBack["cancel"].item(i)();
        }
        me.close();
    });
}
QiankunConfirmPopup.prototype.buildContent=function(){
    this.element["innerContentDiv"].appendChild(this.element["tipDiv"]);
    this.element["innerButtonDiv"].appendChild(this.element["cancel"]);
    this.element["innerButtonDiv"].appendChild(this.element["ok"]);
    this.element["innerContentDiv"].appendChild(this.element["innerButtonDiv"]);
    this.element["contentDiv"].appendChild(this.element["innerContentDiv"]);
}
//End ConfirmPopup

//Start QiankunArrow Hopup
//* showDirection = "down" - the hopup will be shown under the button, 
//* showDirection = "right" - the hopup will be shown at the right of the button
var QiankunArrowHopupObj;
function QiankunArrowHopupWindow(button, url, title, width, closeCallBack, showMask, isHtml, className, showDirection, left, arrowHeight) {
    if (QiankunArrowHopupObj && QiankunArrowHopupObj.action["hasShow"])
        QiankunArrowHopupObj.close();

    var targetObj = $('body');
    var className = className || "";    
    var showDirection = showDirection || "up";
    var arrowHeight = arrowHeight || 5;
    var leftPadding = 10;
    var rightPadding = 30;
    var hopupWidth = width + 23;
    var topSpace = $(button).offset().top - $(window).scrollTop() + $(button).outerHeight();
    var top = (showDirection == "right" || showDirection == "left") ? ($(button).offset().top - 12) : ($(button).offset().top + $(button).outerHeight());
    var left = left || $(button).offset().left + $(button).outerWidth() - hopupWidth * 0.87;
    var rightGap = (left + hopupWidth) -  targetObj.width();
    if (left < leftPadding) {
        left = leftPadding;
    }
    else if (rightGap > (-rightPadding)) {
        left -= (rightGap + rightPadding);
    }
    if (showDirection == "right")
        left = $(button).offset().left + $(button).outerWidth() + 8;
    else if (showDirection == "left")
        left = $(button).offset().left - hopupWidth - 10;
    var arrowLeft = hopupWidth * 0.75;
    var param = {className:className, targetObj:targetObj, hasArrow: true, width: width, height: null, top: top, left: left, title: title, content: url, showMask: showMask, closeCallBack: closeCallBack };
    if (isHtml)
        QiankunArrowHopupObj = new QiankunHtmlHopup(param);
    else
        QiankunArrowHopupObj = new QiankunUrlHopup(param);

    QiankunArrowHopupObj.element["popupArrow"].style.left = arrowLeft + "px";

    QiankunArrowHopupObj.adjustPosition = function () {
        var arrowDirection = "";
        switch (showDirection){
            case "up":
                arrowDirection = "arrowDown"; 
            break;
            case "down" : 
                arrowDirection = "arrowUp"; 
            break;
            case "left" : 
                arrowDirection = "arrowRight"; 
            break;
            case "right" : 
                arrowDirection = "arrowLeft"; 
            break;
            default: 
                arrowDirection = "";
        }
        this.element["popupSpan"].setAttribute("class", "qiankunArrowHopup " + arrowDirection);
        this.element["popupSpan"].setAttribute("className", "qiankunArrowHopup " + arrowDirection);
        if (showDirection == "right" || showDirection == "left"){
            return;
        }
        var className = QiankunArrowHopupObj.config["className"].split(' ')[0];
        var hopupHeight = $(".qiankunArrowHopup").find(".qiankunPopup" + className).height();
        if (topSpace < hopupHeight || showDirection == "down") {
            this.element["popupSpan"].setAttribute("class", "qiankunArrowHopup arrowUp");
            this.element["popupSpan"].setAttribute("className", "qiankunArrowHopup arrowUp");
            $(".popupBorderBottom").remove(".popupArrow");
            this.element["popupBorderTop"].appendChild(this.element["popupArrow"]);
        }
        else {
            top = top - $(button).outerHeight() - hopupHeight + arrowHeight;
            this.element.popupDiv.style["top"] = top + "px";
            this.element["popupSpan"].setAttribute("class", "qiankunArrowHopup arrowDown");
            this.element["popupSpan"].setAttribute("className", "qiankunArrowHopup arrowDown");
            this.element["popupBorderBottom"].appendChild(this.element["popupArrow"]);
            $(".popupBorderTop").remove(".popupArrow");
        }
    }
    QiankunArrowHopupObj.size.width = width + 23;
    QiankunArrowHopupObj.show();
    if (isHtml)
        QiankunArrowHopupObj.adjustPosition();

    QiankunArrowHopupObj.outClick = function(){
        var hopup = this;
        $(this.element["popupSpan"]).find("*").attr("author", "outClick");
        $(button).attr("author", "outClick");
        document.onclick = outClickOnQiankunArrowHopup;
        function outClickOnQiankunArrowHopup(event) {
            event = (event == null) ? window.event : event;
            var srcelement = event.target ? event.target : event.srcElement;
            if (srcelement.getAttribute("author") != "outClick") {
                hopup.closeOutClick();
            }
        }
    }

    QiankunArrowHopupObj.closeOutClick = function(){
        $(button).removeClass("selected");
        this.close();
        document.onclick = null;
    }

    QiankunArrowHopupObj.setArrowPosition = function(){
        if (showDirection == "left" || showDirection == "right" || $(this.element["popupDiv"]).find(".arrow").length < 1)
            return;
        var arrowObj = $(this.element["popupDiv"]).find(".arrow");
        var hopupLeft = $(this.element["popupDiv"]).offset().left;
        var buttonLeft = $(button).offset().left + Math.ceil($(button).outerWidth()/2);
        arrowPosition = buttonLeft - hopupLeft - arrowObj.outerWidth()/2;
        arrowObj.css("left",arrowPosition);
    }
}

//Start QiankunHtml Hopup
var qiankunHtmlHopupObj;
function qiankunHtmlHopupWindow(width,height, title, content, showMask, closeCallBack, top, popupClass, borderShadow) {
    var top = top || null,
        popupClass = popupClass || null,
        borderShadow = borderShadow || 23;
    if(qiankunHtmlHopupObj) {
        if (qiankunHtmlHopupObj.action["hasShow"]) {
            qiankunHtmlHopupObj.close();
        }
        qiankunHtmlHopupObj = null;
    }
    var htmlPopupPara = { width: width, height: height, top: top, left: null, title: title, content: content, showMask: showMask, language: 'en-us', closeCallBack: closeCallBack, className: popupClass, borderShadow: borderShadow };
    qiankunHtmlHopupObj = new QiankunHtmlHopup(htmlPopupPara);
    qiankunHtmlHopupObj.size.width = width + borderShadow;
    qiankunHtmlHopupObj.show();
} 
/* Qiankun Common Hopup Prototypes --------END
*********************************************/
function submitSuccessHopup() {
    var succHtml =  "<div class='title-top'>提交</div>"
                                + "<div class='success-box'>"
                                + "<p class='tit'>"
                                    +"<i></i>"
                                    + "<span>提交成功！</span>"
                                + "</p>"
                                 + "<p class='title'>"
                                    + "温馨提示："
                                + "</p>"
                                + "<ul class='success-list'>"
                                        + "<li>"
                                            + "7个工作日内，我们的工作人员都会主动联系您，与您确认审核相关事宜。."
                                        + "</li>"
                                        + "<li>"
                                            +"查看是否中奖，请<a href=\"pts.html\">点击此处</a>"
                                        + "</li>"
                                        + "<li>"
                                            +"更多问题可联系客服<span>400-696-5151</span> 或微信公众号qkccwx"
                                        + "</li>"
                                + "</ul>"
                        + "</div>";
    qiankunHtmlHopupWindow(450, 275, '', succHtml, true, null)
}

function questionAnwserHopup() {
    var answerHtml =   "<div class='question-box'>"
                                + "<p>"
                                    + "感谢您抽出宝贵时间完成问卷。"
                                + "</p>"
                                + "<p>"
                                    + "您的反馈对乾坤非常重要，将帮助乾坤为客户提供更好的服务体验。如您有其他意见或者"
                                    +"建议，可拨打<span class='red'>400-696-5151</span> ，乾坤车城将竭诚为您服务"
                                + "</p>"
                                 + "<p>"
                                    + "为感谢您对乾坤的支持，我们将赠送您<span class='red'>10积分</span>作为感谢"
                                + "</p>"
                                 + "<a href='#' class='btn' onclick='parent.qiankunHtmlHopupObj.close()'>"
                                    +"立即查看积分"
                                + "</a>"
                        + "</div>";
    qiankunHtmlHopupWindow(350, 275, '', answerHtml, true, questionCloseCallBack, null, ' question-hopup')
}
function questionCloseCallBack(){
    var questionAnswer=$("#questionAnswer");
    var succAnswer=$("#sucessAnswer");
    questionAnswer.hide();
    succAnswer.show();
}