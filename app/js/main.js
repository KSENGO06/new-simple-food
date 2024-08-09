
$(function() {
    
    $('.select-style').styler();

    $('.reviews__slider-items').slick({
        dots: true,
        infinite: false,
        prevArrow: '<button type="button" class="reviews__slider-arrow reviews__slider-arrow--prev"><svg class="reviews__slider-icon"><use xlink:href="images/sprite.svg#rew_slider"></use></svg></button>',
        nextArrow: '<button type="button" class="reviews__slider-arrow reviews__slider-arrow--next"><svg class="reviews__slider-icon"><use xlink:href="images/sprite.svg#rew_slider"></use></svg></button>',
        appendArrows: '.reviews-wrap',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    dots: false 
                }
            }
        ]
    });

    var $range = $(".js-range-slider"),
        $inputFrom = $(".js-input-from"),
        $inputTo = $(".js-input-to"),
        instance,
        min = 50,
        max = 1150,
        from = 100,
        to = 1000;

    $range.ionRangeSlider({
        skin: "round",
        type: "double",
        min: min,
        max: max,
        from: from,
        to: to,
        onStart: updateInputs,
        onChange: updateInputs
    });
    instance = $range.data("ionRangeSlider");

    function updateInputs(data) {
        from = data.from;
        to = data.to;

        $inputFrom.prop("value", from);
        $inputTo.prop("value", to);
    }

    $inputFrom.on("input", function() {
        var val = $(this).prop("value");

        if (val < min) {
            val = min;
        } else if (val > to) {
            val = to;
        }

        instance.update({
            from: val
        });
    });

    $inputTo.on("input", function() {
        var val = $(this).prop("value");

        if (val < from) {
            val = from;
        } else if (val > max) {
            val = max;
        }

        instance.update({
            to: val
        });
    });

    $(window).on('load resize', function() {
        if ($(window).width() < 768) {
            $('.restaurants__inner:not(.slick-initialized)').slick({
                arrows: false,
                dots: true,
                infinite: true,
                speed: 100,
                slidesToShow: 1,
            });
        } else {
            $('.restaurants__inner.slick-initialized').slick('unslick');
        }
    });
    $(window).on('load resize', function() {
        if ($(window).width() < 768) {
            $('.sale__inner:not(.slick-initialized)').slick({
                arrows: false,
                dots: true,
                infinite: true,
                speed: 100,
                slidesToShow: 1,
            });
        } else {
            $('.sale__inner.slick-initialized').slick('unslick');
        }
    });
    function toggleMobileMenu() {
        const burger = document.querySelector('.burger');
        const mobileMenu = document.querySelector('.mobile-menu');
        const overlay = document.querySelector('.overlay');
        const close = document.querySelector('.close');
        const bodyLock = document.querySelector('body');

        if (burger && mobileMenu && overlay && close) {
            burger.addEventListener('click', () => {
                const mobileMenuContent = mobileMenu.querySelector('.mobile-menu__content');
                if (mobileMenuContent.children.length === 0) {
                    const logo = document.querySelector('.logo').cloneNode(true);
                    const menu = document.querySelector('.menu').cloneNode(true);
                    const address = document.querySelector('.address') ? document.querySelector('.address').cloneNode(true) : null;

                    mobileMenuContent.appendChild(logo);
                    mobileMenuContent.appendChild(menu);
                    if (address) {
                        mobileMenuContent.appendChild(address);
                    }
                }

                mobileMenu.classList.add('mobile-menu--active');
                overlay.classList.add('overlay--active');
                bodyLock.classList.add('lock');
                close.style.display = 'block';
                close.classList.add('close--active');
            });

            close.addEventListener('click', () => {
                mobileMenu.classList.remove('mobile-menu--active');
                overlay.classList.remove('overlay--active');
                bodyLock.classList.remove('lock');
                close.style.display = 'none';
                close.classList.remove('close--active');
            });

            overlay.addEventListener('click', () => {
                mobileMenu.classList.remove('mobile-menu--active');
                overlay.classList.remove('overlay--active');
                bodyLock.classList.remove('lock');
                close.style.display = 'none';
                close.classList.remove('close--active');
            });
        }
    }

    function handleResize() {
        if ($(window).width() < 768) {
            toggleMobileMenu();
        } else {
            const mobileMenu = document.querySelector('.mobile-menu');
            const overlay = document.querySelector('.overlay');
            const bodyLock = document.querySelector('body');

            if (mobileMenu && overlay && bodyLock) {
                mobileMenu.classList.remove('mobile-menu--active');
                overlay.classList.remove('overlay--active');
                bodyLock.classList.remove('lock');
            }
        }
    }

    $(window).on('load resize', handleResize);
    handleResize();

    
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header__inner');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 80) {
            header.classList.add('header__inner--fixed');
        } else {
            header.classList.remove('header__inner--fixed');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var filterToggle = document.getElementById('filterToggle');
    var filterContent = document.getElementById('filterContent');
    var filterClose = document.getElementById('filterClose');
    var overlay = document.getElementById('overlay');

    function toggleFilters() {
        filterContent.classList.toggle('catalog__filters--active');
        overlay.classList.toggle('overlay--active');
    }

    filterToggle.addEventListener('click', toggleFilters);
    filterClose.addEventListener('click', toggleFilters);
    overlay.addEventListener('click', toggleFilters);
});


document.addEventListener('DOMContentLoaded', function() {
    var mixer = mixitup('.popular-categories__inner');
});