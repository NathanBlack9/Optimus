let total = 0;

for(let i=0; i<$('.js-basket__product-price').length; i++){
  let price = $('.js-basket__product-price')[i];

  total += (+price.getAttribute('data-price'))
}

$('.js-basket__price-total').html(total);