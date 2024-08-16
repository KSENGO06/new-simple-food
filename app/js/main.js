
$(document).ready(function() {
    $('.main-slider__items').slick({
        dots: false,
        prevArrow: '<button type="button" class="main-slider__arrow main-slider__arrow--prev"><svg class="arrow-icon"><use xlink:href="images/sprite.svg#breadcrambs"></use></svg></button>',
        nextArrow: '<button type="button" class="main-slider__arrow main-slider__arrow--next"><svg class="arrow-icon"><use xlink:href="images/sprite.svg#breadcrambs"></use></svg></button>',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    dots: true,
                    arrows: false,  
                }
            }
        ]
    });
    $('.reviews__slider-items').slick({
        dots: true,
        arrow:true,
        prevArrow: '<button type="button" class="reviews__slider-arrow reviews__slider-arrow--prev"><svg class="reviews__slider-arrow--icon"><use xlink:href="images/sprite.svg#arrow_slider"></use></svg></button>',
        nextArrow: '<button type="button" class="reviews__slider-arrow reviews__slider-arrow--next"><svg class="reviews__slider-arrow--icon"><use xlink:href="images/sprite.svg#arrow_slider"></use></svg></button>',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    dots: false
                }
            }
        ]
    });

    $('.main-slider__item').on('click', function() {
        $('#popupSlider').show();
        $('#popupOverlay').show();


        setTimeout(function() {
            $('.popup-slider__items').slick({
                dots: true,
                infinite: true,
                arrows: false,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            dots: true
                        }
                    }
                ]
            });
        }, 0); 
    });


    $('#popupClose, #popupOverlay').on('click', function() {
        $('#popupSlider').hide();
        $('#popupOverlay').hide();

        $('.popup-slider__items').slick('unslick');
    });


const emptyStarSvg = `
<svg class="star star-empty" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <path d="M.023 6.164a.469.469 0 0 1 .378-.319l4.96-.72L7.58.63a.469.469 0 0 1 .84 0l2.219 4.495 4.96.72a.469.469 0 0 1 .26.8l-3.59 3.498.848 4.94a.469.469 0 0 1-.68.495L8 13.245l-4.436 2.333a.469.469 0 0 1-.68-.495l.847-4.94-3.59-3.498a.469.469 0 0 1-.118-.48Z"/>
</svg>
`;


function renderStaticStars(container) {
const rating = parseInt(container.getAttribute('data-rating'), 10);
const totalStars = parseInt(container.getAttribute('data-total-stars'), 10);

container.innerHTML = '';

for (let i = 1; i <= totalStars; i++) {
    const starElement = document.createElement('div');
    starElement.innerHTML = emptyStarSvg;

    if (i <= rating) {
        starElement.querySelector('.star').classList.add('star-filled');
    }

    container.appendChild(starElement);
}
}

function renderInteractiveStars(container, userRating = 0) {
const totalStars = parseInt(container.getAttribute('data-total-stars'), 10);
container.innerHTML = '';

for (let i = 1; i <= totalStars; i++) {
    const starElement = document.createElement('div');
    starElement.innerHTML = emptyStarSvg;

    if (i <= userRating) {
        starElement.querySelector('.star').classList.add('star-filled');
    }

    starElement.addEventListener('click', () => {
        renderInteractiveStars(container, i);
        container.setAttribute('data-rating', i);  
    });

    container.appendChild(starElement);
}
}


const staticRatingContainers = document.querySelectorAll('.rating-container');
staticRatingContainers.forEach(renderStaticStars);


const interactiveRatingContainer = document.querySelector('.interactive-rating-container');
if (interactiveRatingContainer) {
renderInteractiveStars(interactiveRatingContainer);
}



    $('.product-tabs__top-item').on('click', function(e){
        e.preventDefault();
        $('.product-tabs__top-item').removeClass('product-tabs__top-item--active');
        $(this).addClass('product-tabs__top-item--active');
    
        $('.product-tabs__content-item').removeClass('product-tabs__content-item--active');
        $($(this).attr('href')).addClass('product-tabs__content-item--active');
    });
    

    $('.select-style, .product-content__num').styler();

    $('.product-slider__items').slick({
        infinite: true,
        slidesToShow: 5, 
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev"><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 38.0182C30.197 38.0182 38.5 29.8634 38.5 19.7591C38.5 9.65476 30.197 1.5 20 1.5C9.80299 1.5 1.5 9.65476 1.5 19.7591C1.5 29.8634 9.80299 38.0182 20 38.0182Z" fill="white" fill-opacity="0.01" stroke="#C2C2C2" stroke-width="3"/><path d="M21.1967 28.6801L13.4508 21.0439C12.8497 20.4482 12.8497 19.4861 13.4508 18.8905L21.1967 11.2543C21.7761 10.764 22.6328 10.764 23.2122 11.2543C23.8613 11.8026 23.9372 12.7677 23.381 13.4077L16.7351 19.9595L23.3811 26.5267C23.9822 27.1223 23.9822 28.0844 23.3811 28.6801C22.7769 29.2727 21.8009 29.2727 21.1967 28.6801Z" fill="#C2C2C2"/></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 38.0182C30.197 38.0182 38.5 29.8634 38.5 19.7591C38.5 9.65476 30.197 1.5 20 1.5C9.80299 1.5 1.5 9.65476 1.5 19.7591C1.5 29.8634 9.80299 38.0182 20 38.0182Z" fill="white" fill-opacity="0.01" stroke="#C2C2C2" stroke-width="3"/><path d="M18.8033 28.6801L26.5492 21.0439C27.1503 20.4482 27.1503 19.4861 26.5492 18.8905L18.8033 11.2543C18.2239 10.764 17.3672 10.764 16.7878 11.2543C16.1387 11.8026 16.0628 12.7677 16.619 13.4077L23.2649 19.9595L16.6189 26.5267C16.0178 27.1223 16.0178 28.0844 16.6189 28.6801C17.2231 29.2727 18.1991 29.2727 18.8033 28.6801Z" fill="#C2C2C2"/></svg></button>',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4, 
                    dots: true,     
                    arrows: false   
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3, 
                    dots: true,      
                    arrows: false   
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2, 
                    dots: true,      
                    arrows: false  
                }
            }
        ]
    });
    



    var $range = $(".js-range-slider"),
        $inputFrom = $(".js-input-from"),
        $inputTo = $(".js-input-to"),
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

    var instance = $range.data("ionRangeSlider");

    function updateInputs(data) {
        from = data.from;
        to = data.to;

        $inputFrom.prop("value", from);
        $inputTo.prop("value", to);
    }

    $inputFrom.on("input", function() {
        var val = $(this).prop("value");

        if (val < min) val = min;
        else if (val > to) val = to;

        instance.update({ from: val });
    });

    $inputTo.on("input", function() {
        var val = $(this).prop("value");

        if (val < from) val = from;
        else if (val > max) val = max;

        instance.update({ to: val });
    });


    $ (window).on('load resize', function(){
        if ($(window) .width () < 768) {
            $('.restaurants__inner:not(.slick-initialized)').slick({
                arrows: false,
                dots: true,
                infinite: true,
                speed: 100,
                slidesToShow: 1,
            });
            $('.sale__inner:not(.slick-initialized)').slick({
                arrows: false,
                dots: true,
                infinite: true,
                speed: 100,
                slidesToShow: 1,
            });
        } else {
            $('.restaurants__inner.slick-initialized').slick('unslick');
            $('.sale__inner.slick-initialized').slick('unslick');
        }
    });


    function toggleMobileMenu() {
        const burger = document.querySelector('.burger');
        const mobileMenu = document.querySelector('.mobile-menu');
        const overlay = document.querySelector('.overlay--mobile-menu'); 
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

    document.addEventListener('DOMContentLoaded', function () {

        const emptyStarSvg = `
            <svg class="star star-empty" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path d="M.023 6.164a.469.469 0 0 1 .378-.319l4.96-.72L7.58.63a.469.469 0 0 1 .84 0l2.219 4.495 4.96.72a.469.469 0 0 1 .26.8l-3.59 3.498.848 4.94a.469.469 0 0 1-.68.495L8 13.245l-4.436 2.333a.469.469 0 0 1-.68-.495l.847-4.94-3.59-3.498a.469.469 0 0 1-.118-.48Z"/>
            </svg>
        `;

        function renderStars(container) {
            const rating = parseInt(container.getAttribute('data-rating'), 10);
            const totalStars = parseInt(container.getAttribute('data-total-stars'), 10);
    
            container.innerHTML = '';
    
            for (let i = 1; i <= totalStars; i++) {
                const starElement = document.createElement('div');
                starElement.innerHTML = emptyStarSvg;
    
                if (i <= rating) {
                    starElement.querySelector('.star').classList.add('star-filled');
                }
    
                container.appendChild(starElement);
            }
        }
    

        const ratingContainers = document.querySelectorAll('.rating-container');
        ratingContainers.forEach(renderStars);
    });
    



    var filterToggle = document.getElementById('filterToggle');
    var filterContent = document.getElementById('filterContent');
    var filterClose = document.getElementById('filterClose');
    var filterOverlay = document.querySelector('.overlay--filter'); 
    
    if (filterToggle && filterContent && filterClose && filterOverlay) {
        function toggleFilters() {
            filterContent.classList.toggle('catalog__filters--active');
            filterOverlay.classList.toggle('overlay--active');
        }
    
        filterToggle.addEventListener('click', toggleFilters);
        filterClose.addEventListener('click', toggleFilters);
        filterOverlay.addEventListener('click', toggleFilters);
    }
    
});
document.addEventListener("DOMContentLoaded", function() {
    var mixer = mixitup(".popular-categories__inner");
});
