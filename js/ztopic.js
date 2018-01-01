(function (window) {
  $(document).ready(function () {
    myFunc.footerStay();
    myFunc.backToTop();
    myFunc.navAnimation();
    myFunc.toc();
    myFunc.mobileNavbar();
    myFunc.fancybox();
  });

  'use strict';

  var myFunc = {};

  myFunc.footerStay = function(){
    var win = $(window);
    var content = $(".page>.container");
    if(win.width() <= 800){
      content.css({minHeight: content.height()<win.height() ? win.height():content.height()});
    }
  }
  
  myFunc.backToTop = function () {
    var $backToTop = $('#back-to-top');

    $(window).scroll(function () {
      if ($(window).scrollTop() > 100) {
        $backToTop.addClass("show");
      } else {
        $backToTop.removeClass("show");
      }
    });

    $backToTop.click(function () {
      $('body,html').animate({ scrollTop: 0 });
    });
  };

  myFunc.toc = function () {
    var SPACING = 100;
    var $toc = $('.post-toc'),
        $footer = $('.post-footer');

    if ($toc.length) {
      var minScrollTop = $toc.offset().top;
      var maxScrollTop = $footer.offset().top - $toc.height();
      var tocState = {
        start: {
          'position': 'absolute',
          'top': '0px'
        },
        process: {
          'position': 'fixed',
          'top': SPACING
        },
        end: {
          'position': 'absolute',
          'top': '0px'
        }
      }

      $(window).scroll(function () {
        var scrollTop = $(window).scrollTop() + 80;

        if (scrollTop < minScrollTop) {
          $toc.css(tocState.start);
        } else if (scrollTop > maxScrollTop) {
          $toc.css(tocState.end);
        } else {
          $toc.css(tocState.process);
        }
      })
    }

    var HEADERFIX = 30;
    var $toclink = $('.toc-link'),
        $headerlink = $('.headerlink');

    var headerlinkTop = $.map($headerlink, function (link) {
      return $(link).offset().top;
    });

    $(window).scroll(function () {
      var scrollTop = $(window).scrollTop();

      for (var i = 0; i < $toclink.length; i++) {
        var isLastOne = i + 1 === $toclink.length,
            currentTop = headerlinkTop[i] - HEADERFIX,
            nextTop = isLastOne ? Infinity : headerlinkTop[i+1] - HEADERFIX;

        if (currentTop < scrollTop && scrollTop <= nextTop) {
          $($toclink[i]).addClass('active');
        } else {
          $($toclink[i]).removeClass('active');
        }
      }
    });
  };

  myFunc.throttle = function (func, wait, mustRun) {
       var timeout;
       var startTime = new Date();

       return function () {
         var context = this;
         var args = arguments;
         var curTime = new Date();

         clearTimeout(timeout);
         if (curTime - startTime >= mustRun) {
           func.apply(context, args)
           startTime = curTime;
         } else {
           timeout = setTimeout(func, wait);
         }
       }
     };

  myFunc.navAnimation = function (){
    var beforeScroll = 0,afterScroll = 0;
    var $nav = $('.site-nav');
    var $mobileNav = $('.mobile-header');
    $(window).scroll(myFunc.throttle(function(){
      if($(window).width() > 900){
        afterScroll = $(this).scrollTop();
        if (afterScroll > beforeScroll) {
          $nav.addClass('opacity0');
        } else {
          $nav.removeClass('opacity0');
          if (afterScroll > 100) {
            $nav.addClass('nottop');
          } else {
            $nav.removeClass('nottop');
          }
        }
        beforeScroll = afterScroll;
      }
    }, 50, 500));
  };

  myFunc.mobileNavbar = function(){
    var mbToggle = $("#mobile-nav-toggle");
    var mbNav = $(".mobile-header");
    var slideout = new Slideout({
      'panel': document.getElementById("mobile-nav-panel"),
      'menu': document.getElementById("mobile-nav-menu"),
      'padding': 180,
      'tolerance': 70
    });
    slideout.disableTouch();

    mbToggle.click(function(){
      slideout.toggle();
    });

    slideout.on('beforeopen',function(){
      $("#mobile-nav-toggle").attr("class","far fa-circle");
    });
    slideout.on('beforeclose',function(){
      $("#mobile-nav-toggle").attr("class","far fa-dot-circle");
    })

    $('#mobile-nav-panel').on('touchend', function () {
      slideout.isOpen() && mbToggle.click();
    });

  }

  myFunc.fancybox = function () {
    if ($.fancybox){
      $('.post').each(function () {
        $(this).find('img').each(function () {
          $(this).wrap('<a class="fancybox" href="' + this.src + '" title="' + this.alt + '"></a>');
        });
      });

      $('.fancybox').fancybox({
        openEffect: 'elastic',
        closeEffect: 'elastic',
		    closeBtn		: false,
		    helpers : {
			  title	: { type : 'outside' },
		    }
      });
    }
  }

  window.myFunc = myFunc;
})(window);
