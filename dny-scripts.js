{
      "@context": "http://schema.org",
      "@type": "Organization",

      "address": {
    "@type": "PostalAddress",
    "addressLocality": "Tp.Hồ Chí Minh",
    "addressRegion": "Việt Nam",
    "postalCode":"70000",
    "streetAddress": " Tp.Hồ Chí Minh"
      },
      "url": "https://dny.com.vn.vn",    
"logo": "https://dny.com.vn/upload/images/Logo.png", 
      "name" : "dny.com.vn",
          "sameAs" : [ "https://www.facebook.com/aobongdadny"
                        ],
      "contactPoint" : [
        { "@type" : "ContactPoint",
          "telephone" : "+84909362079",
          "contactType" : "customer service"
        } ]
    }

/* --- Script Block --- */

$(document).ready(function () {
                            $('.menu_mb i').click(function () {
                                var obj = $(this);
                                if (obj.hasClass('expand')) {
                                    obj.removeClass('fa-angle-down');
                                    obj.removeClass('expand');
                                    obj.addClass('fa-angle-up');
                                    obj.addClass('colpand');
                                    obj.siblings('ul').show(400);
                                }
                                else if (obj.hasClass('colpand')) {
                                    obj.removeClass('fa-angle-up');
                                    obj.addClass('fa-angle-down');
                                    obj.removeClass('colpand');
                                    obj.addClass('expand');
                                    obj.siblings('ul').hide(400);

                                }
                                //return false;
                            });
                        });

/* --- Script Block --- */

$(document).ready(function () {
                            $('.right_mn').click(function () {
                                var obj = $(this);
                                if (obj.hasClass('expand')) {
                                    obj.removeClass('expand');
                                    obj.addClass('colpand');
                                    $('.menu_mb').slideDown(700);
                                    //$('.sf-menu').show(400);
                                    //$('.Close').show(400);
                                }
                                else if (obj.hasClass('colpand')) {
                                    obj.removeClass('colpand');
                                    obj.addClass('expand');
                                    //$('.wap_mn').css('display','none');
                                    $('.menu_mb').hide(400);

                                }
                            });
                        });

/* --- Script Block --- */

$('.plus-btn').on('click', function (e) {
                                                    e.preventDefault();
                                                    var $this = $(this);
                                                    var $input = $this.closest('div').find('input');
                                                    var value = parseInt($input.val());

                                                    if (value > 1) {
                                                        value = value - 1;
                                                    } else {
                                                        value = 1;
                                                    }

                                                    $input.val(value);

                                                });

                                                $('.minus-btn').on('click', function (e) {
                                                    e.preventDefault();
                                                    var $this = $(this);
                                                    var $input = $this.closest('div').find('input');
                                                    var value = parseInt($input.val());

                                                    if (value < 100) {
                                                        value = value + 1;
                                                    } else {
                                                        value = 100;
                                                    }

                                                    $input.val(value);
                                                });

/* --- Script Block --- */

$(".themvaogio").click(function () {
                                        var giatri = '';
                                        //var sl = 1;
                                        var sl = $('#sl').val();
                                        //if(giatri=='0') 
                                        //						{
                                        //							alert('Bạn chưa chọn thuộc tính');
                                        //						}
                                        //						else
                                        //						{
                                        //alert(giatri+sl); 	
                                        //alert(giatri);		
                                        $.ajax({
                                            type: 'POST',
                                            url: 'https://dny.com.vn/sanpham/themvaogio/1178',
                                            data: { giatri: giatri, sl: sl },
                                            success: function (html) {
                                                $('#numorder').html(html)
                                                alert('Thêm sản phẩm vào giỏ hàng thành công');
                                                // window.location.href = "";
                                            }
                                        });
                                        //}
                                        return false;
                                    });

/* --- Script Block --- */

$(".muangay").click(function () {
                                        var giatri = '';
                                        //var sl = 1;
                                        var sl = $('#sl').val();
                                        //if(giatri=='0') 
                                        //{
                                        //	alert('Bạn chưa chọn thuộc tính');
                                        //}
                                        //else
                                        //{
                                        //alert(giatri+sl); 	
                                        //alert(giatri);		
                                        $.ajax({
                                            type: 'POST',
                                            url: 'https://dny.com.vn/sanpham/addnum/1178',
                                            data: { giatri: giatri, sl: sl },
                                            success: function (html) {
                                                //$('#numorder').html(html)
                                                //alert('Thêm sản phẩm vào giỏ hàng thành công');
                                                window.location.href = "https://dny.com.vn/gio-hang.html";
                                            }
                                        });
                                        //}
                                        return false;
                                    });

/* --- Script Block --- */

$(document).ready(function () {
                                                    $(".tt_ml a").click(function () {
                                                        if ($(this).hasClass("ex")) {
                                                            $(this).removeClass('ex');
                                                            $(this).addClass('an');
                                                            $(this).html('Hiển thị');
                                                            $('.mucluc').hide();
                                                        }
                                                        else {
                                                            $(this).removeClass('an');
                                                            $(this).addClass('ex');
                                                            $(this).html('Ẩn');
                                                            $('.mucluc').show();
                                                        }

                                                        return false;
                                                    });
                                                });

/* --- Script Block --- */

const tabs = document.querySelectorAll('.tab');
                                    const contents = document.querySelectorAll('.tab-content');

                                    tabs.forEach(tab => {
                                        tab.addEventListener('click', () => {
                                            // Xóa class 'active' từ tất cả các tab và nội dung
                                            tabs.forEach(t => t.classList.remove('active'));
                                            contents.forEach(c => c.classList.remove('active'));

                                            // Thêm class 'active' cho tab được click
                                            tab.classList.add('active');

                                            // Lấy id của nội dung tương ứng từ data-tab
                                            const contentId = tab.getAttribute('data-tab');

                                            // Thêm class 'active' cho nội dung tương ứng
                                            document.getElementById(contentId).classList.add('active');
                                        });
                                    });

/* --- Script Block --- */

jQuery(document).ready(function () {
            jQuery(".ctcs").owlCarousel({
                autoPlay: false,
                autoplaySpeed: 1000,
                pagination: false,
                navigation: false,
                //  navigationText : ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
                items: 2,
                itemsDesktop: [1199, 2],
                itemsDesktopSmall: [979, 2],
                itemsTablet: [768, 2],
                itemsTabletSmall: false,
                itemsMobile: [479, 2],
            });

            jQuery(".ct_proh").owlCarousel({
                autoPlay: false,
                autoplaySpeed: 1000,
                pagination: false,
                navigation: true,
                navigationText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
                items: 4,
            });
            jQuery(".wap_slider").owlCarousel({
                autoPlay: true,
                autoplaySpeed: 1000,
                pagination: true,
                // navigation : true,
                //     navigationText : ['<i class="fa fa-caret-left" aria-hidden="true"></i>', '<i class="fa fa-caret-right" aria-hidden="true"></i>'],
                items: 1,
                itemsDesktop: [1199, 1],
                itemsDesktopSmall: [979, 1],
                itemsTablet: [768, 1],
                itemsTabletSmall: false,
                itemsMobile: [479, 1],
            });
            jQuery(".ct_dvh").owlCarousel({
                autoPlay: false,
                autoplaySpeed: 1000,
                pagination: false,
                // navigation : true,
                //     navigationText : ['<i class="fa fa-caret-left" aria-hidden="true"></i>', '<i class="fa fa-caret-right" aria-hidden="true"></i>'],
                items: 1,
                itemsDesktop: [1199, 1],
                itemsDesktopSmall: [979, 1],
                itemsTablet: [768, 1],
                itemsTabletSmall: false,
                itemsMobile: [479, 1],
            });
            jQuery(".ct_tt").owlCarousel({
                autoPlay: false,
                autoplaySpeed: 1000,
                pagination: false,
                // navigation : true,
                //     navigationText : ['<i class="fa fa-caret-left" aria-hidden="true"></i>', '<i class="fa fa-caret-right" aria-hidden="true"></i>'],
                items: 4,
            });
            jQuery(".ctspm").owlCarousel({
                autoPlay: false,
                autoplaySpeed: 1000,
                pagination: false,
                // navigation : true,
                //     navigationText : ['<i class="fa fa-caret-left" aria-hidden="true"></i>', '<i class="fa fa-caret-right" aria-hidden="true"></i>'],
                items: 3,
            });
            jQuery(".owl-qc").owlCarousel({
                autoPlay: true,
                autoplaySpeed: 1000,
                pagination: false,
                // navigation : true,
                //     navigationText : ['<i class="fa fa-caret-left" aria-hidden="true"></i>', '<i class="fa fa-caret-right" aria-hidden="true"></i>'],
                items: 3,
            });
            jQuery(".owl-sp").owlCarousel({
                autoPlay: false,
                autoplaySpeed: 1000,
                pagination: false,
                navigation: false,
                navigationText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
                items: 2,
                itemsDesktop: [1199, 1],
                itemsDesktopSmall: [979, 1],
                itemsTablet: [768, 1],
                itemsTabletSmall: false,
                itemsMobile: [479, 1],
            });
            jQuery(".owl-nlh").owlCarousel({
                autoPlay: false,
                autoplaySpeed: 1000,
                pagination: false,
                // navigation : true,
                //  navigationText : ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
                items: 4,
            });
            jQuery(".doitacf").owlCarousel({
                autoPlay: false,
                autoplaySpeed: 1000,
                pagination: false,
                // navigation : true,
                //  navigationText : ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
                items: 5,
            });
            jQuery("#first-carousel").owlCarousel({
                autoPlay: false,
                autoplaySpeed: 1000,
                pagination: false,
                // navigation : true,
                //  navigationText : ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
                items: 4,
            });
            jQuery(".owl-spct").owlCarousel({
                autoPlay: false,
                autoplaySpeed: 1000,
                pagination: false,
                navigation: true,
                navigationText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
                items: 4,
            });
            jQuery(".ct_da").owlCarousel({
                autoPlay: false,
                autoplaySpeed: 1000,
                pagination: false,
                // navigation : true,
                //  navigationText : ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
                items: 3,
            });
            jQuery(".ctcc").owlCarousel({
                autoPlay: false,
                autoplaySpeed: 1000,
                pagination: false,
                // navigation : true,
                //  navigationText : ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
                items: 3,
            });
            jQuery(".pro_r").owlCarousel({
                autoPlay: false,
                autoplaySpeed: 1000,
                pagination: false,
                // navigation : true,
                //  navigationText : ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
                items: 5,
            });
            jQuery(".ctcc").owlCarousel({
                autoPlay: false,
                autoplaySpeed: 1000,
                pagination: false,
                // navigation : true,
                //  navigationText : ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
                items: 4,
            });
            jQuery(".newf").owlCarousel({
                autoPlay: false,
                autoplaySpeed: 2000,
                pagination: false,
                navigation: true,
                navigationText: ['<i class="fa fa-caret-left" aria-hidden="true"></i>', '<i class="fa fa-caret-right" aria-hidden="true"></i>'],
                items: 1,
                itemsDesktop: [1199, 1],
                itemsDesktopSmall: [979, 1],
                itemsTablet: [768, 1],
                itemsTabletSmall: false,
                itemsMobile: [479, 1],
            });
            jQuery(".owl-new").owlCarousel({
                autoPlay: false,
                autoplaySpeed: 2000,
                pagination: false,
                navigation: false,
                navigationText: ['<i class="fa fa-caret-left" aria-hidden="true"></i>', '<i class="fa fa-caret-right" aria-hidden="true"></i>'],
                items: 3,
                itemsDesktop: [1199, 1],
                itemsDesktopSmall: [979, 1],
                itemsTablet: [768, 1],
                itemsTabletSmall: false,
                itemsMobile: [479, 1],
            });
            jQuery(".owl-video").owlCarousel({
                autoPlay: true,
                autoplaySpeed: 2000,
                pagination: false,
                navigation: true,
                navigationText: ['<i class="fa fa-caret-left" aria-hidden="true"></i>', '<i class="fa fa-caret-right" aria-hidden="true"></i>'],
                items: 2,
            });
            jQuery(".owl-map").owlCarousel({
                autoPlay: false,
                autoplaySpeed: 2000,
                pagination: false,
                // navigation : true,
                //  navigationText : ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
                items: 1,
                itemsDesktop: [1199, 1],
                itemsDesktopSmall: [979, 1],
                itemsTablet: [768, 1],
                itemsTabletSmall: false,
                itemsMobile: [479, 1],
            });
            jQuery(".owl-carousel").owlCarousel({
                autoPlay: false,
                autoplaySpeed: 1000,
                pagination: false,
                // navigation : true,
                //     navigationText : ['<i class="fa fa-caret-left" aria-hidden="true"></i>', '<i class="fa fa-caret-right" aria-hidden="true"></i>'],
                items: 4,
            });
            jQuery(".owl-carouseldt").owlCarousel({
                autoPlay: false,
                autoplaySpeed: 1000,
                pagination: false,
                // navigation : true,
                //     navigationText : ['<i class="fa fa-caret-left" aria-hidden="true"></i>', '<i class="fa fa-caret-right" aria-hidden="true"></i>'],
                items: 7,
            });
            jQuery(".owl-carousel1").owlCarousel({
                autoplaySpeed: 1000,
                pagination: false,
                navigation: false,
                //  navigationText : ['<i class="fa fa-caret-left" aria-hidden="true"></i>', '<i class="fa fa-caret-right" aria-hidden="true"></i>'],
                items: 1,
                itemsDesktop: [1199, 1],
                itemsDesktopSmall: [979, 1],
                itemsTablet: [768, 1],
                itemsTabletSmall: false,
                itemsMobile: [479, 1],
            });
            jQuery(".owl-dv").owlCarousel({
                autoplaySpeed: 1000,
                pagination: false,
                navigation: false,
                items: 1,
                itemsDesktop: [1199, 1],
                itemsDesktopSmall: [979, 1],
                itemsTablet: [768, 1],
                itemsTabletSmall: false,
                itemsMobile: [479, 1],
            });
        });

/* --- Script Block --- */

let currentSlide = 0;
        const slides = document.querySelectorAll('.carousel-slide');
        const track = document.getElementById('track');
        const totalSlides = slides.length;

        function showSlide(index) {
            // Dịch chuyển track sang trái theo bội số của chiều rộng slider (100%)
            track.style.transform = 'translateX(' + (-index * 100) + '%)';
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }

        function prevSlide() {
            // Tính chỉ số slide trước đó (có xử lý vòng lặp về cuối)
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(currentSlide);
        }

        // Tự động chuyển slide sau mỗi 3 giây
        setInterval(nextSlide, 3000);