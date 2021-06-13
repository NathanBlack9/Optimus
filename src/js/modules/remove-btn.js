$('.js-basket-clear').click(function () {
  let answer = confirm('Вы уверены что хотите очистить корзину?')

  if(answer) {
    $.ajax({
      type: "POST",
      url: "http://localhost:8080/basket/clear",
      data: '',
      success: function (response) {
        $('.basket__item').fadeOut();
        $('.js-basket__price-total').html('0');
        $('.js-empty__message').fadeIn();
        $('.js-buy').fadeOut();
        $('.basket__total').fadeOut();
        $(this).fadeOut();
      }
    });
  }
  else 
    return false
  
})
if($("div").is('.basket__item')){
  $('.js-empty__message').fadeOut();
}   
else {
  $('.js-empty__message').fadeIn();
  $('.js-buy').fadeOut();
  $('.js-basket-clear').fadeOut();
  $('.basket__total').fadeOut();
}
  