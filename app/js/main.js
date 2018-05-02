$(document).ready(function(){
    $('a, img').on('dragstart', function () {
        return false
    });
    function getAMS() {
        if (window.AMS === undefined){
            window.AMS = {};
        }
        return window.AMS;
    }
    setHeightForElemenst();
    $(window).on('resize', function () {
        setHeightForElemenst();
    });
    function setHeightForElemenst() {
        var ams = getAMS();
        ams.r2 = $('.r2');
        var a = ams.r2.find('.c1');
        a.css('height', 0);
        var r2h = parseInt(ams.r2.css('height'));
        a.css({'height' : r2h});

        ams.r3 = $('.r3');
        var b = ams.r3.find('.c1');
        b.css('height', 0);
        var r3h = parseInt(ams.r3.css('height'));
        b.css({'height' : r3h});
    }

    (function () {
        var ams = getAMS(),
            benefits = $('.benefit-wrap'),
            benefitsBtns = benefits.find('.fa'),
            bttnActive = $('.buttons').find('.active'),
            normalMac = {
                height: 1070,
                weight: 1320
            },
            mac = $('.row.mac');
        ams.openedBenefit = false;
        benefitsBtns.click(function () {
            var parent = $(this).parent('.benefit-wrap');
            if (ams.openedBenefit){
                if (parent.is(ams.openedBenefit)){
                    parent.toggleClass('active');
                    ams.openedBenefit = false;
                } else {
                    ams.openedBenefit.toggleClass('active');
                    parent.toggleClass('active');
                    ams.openedBenefit = parent;
                }
            } else {
                parent.toggleClass('active');
                ams.openedBenefit = parent
            }
            return false;
        });
        $(window).click(function () {
            if(ams.openedBenefit){
                ams.openedBenefit.toggleClass('active');
                ams.openedBenefit = false;
            }
        });
        $(".button").click(function () {
            var imgClass;
            var th = $(this);
            if(th.is(bttnActive)) {
                return false;
            } else {
                imgClass = th.attr('class').replace(" button", '');
                changeImgTo(imgClass);
                bttnActive.toggleClass('active');
                th.toggleClass('active');
                bttnActive = th;
            }
        });

        setNormalSizeForMac();
        function setNormalSizeForMac() {
            var a = parseInt(mac.css('width'));
            var b = normalMac.height * a / normalMac.weight;
            mac.css({'height': b});
        }
        function changeImgTo(imgClass) {
            var screen = $('.mac-screen');
            screen.find('.active').toggleClass('active');
            screen.find('.' + imgClass).toggleClass("active");
        }
        $(window).resize(function () {
            setNormalSizeForMac();
        });

        $('a[href="#call-back-form"]').click(function () {
            var el = $(this);
            var src = el.data('src');
            $('#call-back-form').find('.src').val(src);
            $.magnificPopup.open({
                    items: {
                        src: "#call-back-form",
                        type: "inline"
                    }
            });

            return false;
        });
        $("form").submit(function() { //Change
            var th = $(this);
            $.ajax({
                type: "POST",
                url: "mail.php", //Change
                data: th.serialize()
            }).done(function(data) {
                console.log(data);
                if (th.hasClass('popup-form')) {
                    $.magnificPopup.close();
                }
                $.magnificPopup.open({
                    items: {
                        src: "#call-back-success",
                        type: "inline"
                    }
                });
                setTimeout(function() {
                    // Done Functions
                    th.trigger("reset");
                    $.magnificPopup.close();
                }, 2000);
            });
            return false;
        });
        $('a[href="#video"]').magnificPopup();
    }());
});