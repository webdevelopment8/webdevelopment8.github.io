(function ($) {
    "use stict";

    $(window).on('scroll', function () {
        animateElement();
    });


    $(".single-portfolio .content-wrapper").first().css("padding-top", 0);

    if (!$(".single-portfolio .nav-next").length)
    {
        $(".single-portfolio .nav-previous").css("padding-bottom", 0);
    }

    //Portfolio
    var grid = $('.grid').imagesLoaded(function () {
        grid.isotope({
            itemSelector: '.grid-item',
            transitionDuration: 0,
            masonry: {
                columnWidth: '.grid-sizer'
            }
        });
        $('.grid-sizer, .grid-item').innerWidth($(".grid-sizer, .grid-item").innerWidth());
    });

    //Placeholder show/hide
    $('input, textarea').focus(function () {
        $(this).data('placeholder', $(this).attr('placeholder'));
        $(this).attr('placeholder', '');
    });
    $('input, textarea').blur(function () {
        $(this).attr('placeholder', $(this).data('placeholder'));
    });    

    singlePaginationHeightFix();

    //Set menu
    $('.main-menu').smartmenus({
        subMenusSubOffsetX: 1,
        subMenusSubOffsetY: -8,
        markCurrentItem: true
    });
	
	$('.contact-form [type="submit"]').on('click',function(){
        SendMail(); 
    });

    $(".site-content").fitVids();    


$(window).on('load', function () {

    //Image
    $(".image-slider").each(function () {
        var id = $(this).attr('id');

        var auto_value = window[id + '_auto'];
        var hover_pause = window[id + '_hover'];
        var speed_value = window[id + '_speed'];

        auto_value = (auto_value === 'true') ? true : false;
        hover_pause = (hover_pause === 'true') ? true : false;

        $('#' + id).slick({
            arrows: false,
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 750,
            autoplay: auto_value,
            autoplaySpeed: speed_value,
            pauseOnHover: hover_pause,
            fade: true,
            draggable: false,
            adaptiveHeight: true
        });
    });

    imageGallery();

//PrettyPhoto initial
    $('a[data-rel]').each(function () {
        $(this).attr('rel', $(this).data('rel'));
    });

    $("a[rel^='prettyPhoto']").prettyPhoto({
        slideshow: false, /* false OR interval time in ms */
        overlay_gallery: false, /* If set to true, a gallery will overlay the fullscreen image on mouse over */
        default_width: 1280,
        default_height: 720,
        deeplinking: false,
        social_tools: false,
        iframe_markup: '<iframe src ="{path}" width="{width}" height="{height}" frameborder="no" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
    });


    blogLayoutFix();    
    homeLoadMore();
    portfolioLoadMore();
    animateElement();

//Show-Hide header sidebar
    $('#toggle, .menu-wraper').on('click', multiClickFunctionStop);
    $('.main-menu, .search-field').on('click', function (e) {
        e.stopPropagation();
    });


    $('.doc-loader').fadeOut();

});


$(window).on('resize', function () {
    blogLayoutFix();    
    imageGallery();
    $('.grid-sizer, .grid-item').innerWidth("50%");
});

//------------------------------------------------------------------------
//Helper Methods -->
//------------------------------------------------------------------------


function animateElement(e) {

    $(".animate").each(function (i) {

        var top_of_object = $(this).offset().top;
        var bottom_of_window = $(window).scrollTop() + $(window).height();
        if ((bottom_of_window) > top_of_object) {
            $(this).addClass('show-it');
        }

    });

}

function homeLoadMore(e) {
    $('.more-posts').on("click", function () {
        $('.blog-holder').find(".hidden").slice(0, 4).removeClass("hidden").addClass("animate loaded");
		blogLayoutFix();
        animateElement();
        if (!$('.blog-holder').find(".hidden").length)
        {
            $('.more-posts').hide();
            $('.no-more-posts').css('display', 'inline-block');
        }
    });
}

function portfolioLoadMore(e) {
    $('.more-posts-portfolio').on("click", function () {
        $('#portfolio').find(".hidden").slice(0, 4).removeClass("hidden").addClass("animate loaded");
        $('.grid').isotope();
        $('.grid-sizer, .grid-item').innerWidth($(".grid-sizer, .grid-item").innerWidth());
        animateElement();
        if (!$('#portfolio').find(".hidden").length)
        {
            $('.more-posts-portfolio').hide();
            $('.no-more-posts-portfolio').css('display', 'inline-block');
        }
    });
}

function blogLayoutFix() {
    $('.blog-item-holder.has-post-thumbnail:nth-child(2n)').each(function () {
        var x = $(".blog-holder").width() - $(this).find('.post-thumbnail').width() - (parseFloat($(this).find('.post-thumbnail').css('max-width')) - $(this).find('.post-thumbnail').width()) / 2;
        $(this).find('.post-thumbnail').css('transform', 'translateX(' + x + 'px)');
        x = $(this).find('.entry-holder').innerWidth() - 87 + $(this).find('.post-thumbnail').width() - x;
        $(this).find('.entry-holder').css('transform', 'translateX(-' + x + 'px)');
    });
}

function multiClickFunctionStop(e) {
    if ($(e.target).is('.menu-wraper') || $(e.target).is('.menu-right-part') || $(e.target).is('.menu-holder') || $(e.target).is('#toggle') || $(e.target).is('#toggle div'))
    {

        $('#toggle, .menu-wraper').off("click");
        $('#toggle').toggleClass("on");
        if ($('#toggle').hasClass("on"))
        {
            $('.header-holder').addClass('down');
            $('.menu-wraper, .menu-holder').addClass('show');
            $('#toggle, .menu-wraper').on("click", multiClickFunctionStop);
        } else
        {
            $('.header-holder').removeClass('down');
            $('.menu-wraper, .menu-holder').removeClass('show');
            $('#toggle, .menu-wraper').on("click", multiClickFunctionStop);
        }
    }
}

function singlePaginationHeightFix() {
    if ($('.single .nav-previous a').height() > $('.single .nav-next a').height())
    {
        $('.single .nav-next a').height($('.single .nav-previous a').height());
    } else
    {
        $('.single .nav-previous a').height($('.single .nav-next a').height());
    }
}

function imageGallery() {
    var isMobile = $(window).width() < 750;
    var rowHeight = isMobile ? 120 : 300;
    var imgMargin = isMobile ? 10 : 20;
    var borderVal;

    $('.coco-image-gallery').each(function () {
        var id = $(this).attr('id');

        $(this).find('.prettyPhotoLink').each(function () {
            $(this).attr('data-rel', "prettyPhoto[" + id + "]");
        });

        if ($('#' + id).parents('.full-page-width').length)
        {
            borderVal = -1;
        } else
        {
            borderVal = 0;
        }

        $('#' + id).justifiedGallery({
            rowHeight: rowHeight,
            margins: imgMargin,
            border: borderVal
        });
    });
}

function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
}

function SendMail() {

    var emailVal = $('#contact-email').val();

    if (isValidEmailAddress(emailVal)) {
        var params = {
            'action': 'SendMessage',
            'name': $('#name').val(),
            'email': $('#contact-email').val(),
            'subject': $('#subject').val(),
            'message': $('#message').val()
        };
        $.ajax({
            type: "POST",
            url: "php/sendMail.php",
            data: params,
            success: function (response) {
                if (response) {
                    var responseObj = $.parseJSON(response);
                    if (responseObj.ResponseData)
                    {
                        alert(responseObj.ResponseData);
                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                //xhr.status : 404, 303, 501...
                var error = null;
                switch (xhr.status)
                {
                    case "301":
                        error = "Redirection Error!";
                        break;
                    case "307":
                        error = "Error, temporary server redirection!";
                        break;
                    case "400":
                        error = "Bad request!";
                        break;
                    case "404":
                        error = "Page not found!";
                        break;
                    case "500":
                        error = "Server is currently unavailable!";
                        break;
                    default:
                        error = "Unespected error, please try again later.";
                }
                if (error) {
                    alert(error);
                }
            }
        });
    } else
    {
        alert('Your email is not in valid format');
    }
}

function is_touch_device() {
    return !!('ontouchstart' in window);
}

})(jQuery);