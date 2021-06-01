$('.js-filter-open').on('click', function () {
  $(this).parent().toggleClass('is-open');
});

$('.js-select').on('click', function () {
  $(this).parent().toggleClass('open');
});

$('.js-add-favorite').on('click', function () {
  $(this).toggleClass('added');
});

$('.js-product-btn').on('click', function () {
  $(this).addClass('in-basket');
  $(this).html('В корзину');
  setTimeout(()=> {$(this).prop("href", "/basket")}, 200);
});