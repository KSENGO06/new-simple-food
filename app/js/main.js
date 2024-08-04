$(function() {
    $('.reviews__slider-items').slick({
        dots: true,
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

    $('.reviews__slider-arrow').on('click', function() {
        var $this = $(this);
        $this.addClass('active');
        setTimeout(function() {
            $this.removeClass('active');
        }, 3000);
    });
});

window.addEventListener('scroll', function() {
    const header = document.querySelector('.header__inner');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 80) {
    header.classList.add('header__inner--fixed');
    } else {
    header.classList.remove('header__inner--fixed');
    }
});

$(window). on ('load resize', function(){
    if($(window) .width () < 768) {
    $('.restaurants__inner:not(.slick-initialized)').slick({
    arrows: false,
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    });
}else {
    $('.restaurants__inner. slick-initialized'). slick( 'unslick');
}
});

$(document).ready(function () {
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

                    const divider1 = document.createElement('div');
                    divider1.classList.add('divider');
                    mobileMenuContent.appendChild(divider1);

                    mobileMenuContent.appendChild(menu);

                    const divider2 = document.createElement('div');
                    divider2.classList.add('divider');
                    mobileMenuContent.appendChild(divider2);

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
});


document.addEventListener('DOMContentLoaded', function() {
    var mixer = mixitup('.popular-categories__inner');
});
