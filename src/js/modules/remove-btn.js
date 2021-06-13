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
  $('.js-favorites-clear').fadeOut();
  $('.basket__total').fadeOut();
}

/*--------*/

$('.js-favorites-clear').click(function (e) { 
  e.preventDefault();
  let answer = confirm('Вы уверены что хотите очистить избранное?')

  if(answer) {
    $.ajax({
      type: "POST",
      url: "http://localhost:8080/favorites/clear",
      data: '',
      success: function (response) {
        $('.basket__item').fadeOut();
        $('.js-empty__message').fadeIn();
        // $(this).fadeOut();
      }
    });
  }
  else 
    return false
});
  
$('.js-favorites-remove').click(function () { 
  let answer = confirm('Вы уверены что хотите удалить этот товар из избранного?')

  if(answer) {
    let vendor = $(this).parent().data('id');
    let parent = $(this).parent();
    $.ajax({
      type: "POST",
      url: "http://localhost:8080/favorites/remove",
      data: {vendor},
      success: function (response) {
        parent.fadeOut();
      }
    });
  }
  else 
    return false
});

$('.js-basket-remove').click(function () { 
  let answer = confirm('Вы уверены что хотите удалить этот товар из корзины?')

  if(answer) {
    let vendor = $(this).parent().data('id');
    let parent = $(this).parent();
    $.ajax({
      type: "POST",
      url: "http://localhost:8080/basket/remove",
      data: {vendor},
      success: function (response) {
        parent.fadeOut();
        location.reload();
      }
    });
  }
  else 
    return false
});