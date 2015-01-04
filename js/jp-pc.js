//
$(document).ready(function(){
  foldMore();
  navSelect();
  initSwiper();
  scrollBar();
})
function navSelect(){
  var navCur=$(".jp-nav-list").find("a");
    navCur.click(function(){
        $(this).siblings().removeClass('cur').end().addClass('cur');
    });
}
function foldMore(){
  var moreBox=$(".product-info");
    moreBox.click(function(){
        if($(this).hasClass("cur"))
        {
          moreBox.removeClass("cur"); 
        }
        else{
               moreBox.removeClass("cur"); 
               $(this).addClass("cur");
            }
       });
}

function initSwiper(){
  var mySwiper = new Swiper('#jp-nav-bd',{
        pagination: '#pagination-jp-nav',
        paginationClickable: true,
        slidesPerView: 'auto'
    });
}

function scrollBar(){
  var container = $("#Gallery");
      var headers=container.find("h3");
      var zIndex = 2;
      var containerTop = container.offset().top + parseInt(container.css('marginTop')) + parseInt(container.css('borderTopWidth'));
      var fakeHeader = headers.filter(':first').clone();
      // 2. fixed position on the h3, and fix the z-index so they increase
      headers.each(function () {
         // set position fixed, etc
         var header = $(this), height = header.outerHeight(), width = header.outerWidth();
         zIndex += 2;  
      });
      // 3. initialisation
      container.wrap('<div class="jp-box" />');
      fakeHeader.addClass("jp-sub-hd");
      fakeHeader.css({ 
          zIndex: 1, 
          position: 'fixed', 
          top:"50px",
          marginTop:"0",
          width: headers.filter(':first').width() 
      });
     
      // 4. bind a scroll event and change the text of the take heading
      $(window).scroll(function () {
          if($(window).scrollTop() > container.offset().top){
                  container.before(fakeHeader.text(headers.filter(':first').text()));
              }else{
                  fakeHeader.remove();
              }
          headers.each(function () {
              var header = $(this);
              var top = header.offset().top;
              if($(window).scrollTop() > top){
                  fakeHeader.text(header.text());
                  fakeHeader.css('zIndex', parseInt(header.css('zIndex'))+1);        
              }
              
          });
      });
}
