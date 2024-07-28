
$(function(){
    $('.reviews-slider__items').slick({
        dots: true,
        arrows:false
    });
});

window.addEventListener('scroll', function() {
    const header = document.querySelector('.header__inner');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 80) {
    header.classList.add('header__inner-fixed');
    } else {
    header.classList.remove('header__inner-fixed');
    }
});

$('.reviews-slider__items').slick({
    dots: true,
    prevArrow: '<button type="button" class="reviews-slider__arrow reviews-slider__arrow-prev"><svg class="reviews-slider__icon"><use xlink:href="images/sprite.svg#arrow_slider"></use></svg></button>',
    nextArrow: '<button type="button" class="reviews-slider___arrow reviews-slider__arrow-next"><svg class="reviews-slider__icon"><use xlink:href="images/sprite.svg#next_arrow"></use></svg></button>',
    appendArrows: '.arrows-wrap'
    })




document.addEventListener('DOMContentLoaded', function() {
    var mixer = mixitup('.popular-categories__inner');
});
