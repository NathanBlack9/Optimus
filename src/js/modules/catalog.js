//Раскрыть вкладку с фильтрами
$('.js-filter-open').on('click', function () {
  $(this).parent().toggleClass('is-open');
});

//Для изменения стрелки на селектах 
$('.js-select').on('click', function () {
  $(this).parent().toggleClass('open');
});

//Изменить иконку для добавления в избранное 
$('.js-add-favorite').on('click', function () {
  $(this).toggleClass('added');
  let vendor = $(this).data('id');
  $.ajax({
    type: "POST",
    url: "http://localhost:8080/favorites/add",
    data: {vendor},
    success: function (response) {
      
    }
  });
	return false;
});

//Изменить ссылку после нажатия на кнопку купить
$('.js-product-btn').click( function (e) {
  e.preventDefault();
  let parent = $(this).parent().parent();  
  
  $(this).fadeOut();

  let vendor = $(this).data('id')

  $(`.js-hidden-basket__btn[data-id=${vendor}]`).fadeIn();

  $.ajax({
    type: "POST",
    url: "http://localhost:8080/basket/add",
    data: {vendor},
    success: function (response) {
      // console.log(response);
    }
  });
});

$('.delivery-form').submit(function (ev) { 
  ev.preventDefault();
  $.post(
		'/delivery', 
		 $(".delivery-form").serialize(),  		
		
		function(msg) {  
        let message = $('.delivery__message');
        $('html').css('cursor', 'progress');
        message.html(msg).css('color', 'green');
		}
	);
	return false;
});

//Изменить список с моделями при изменении бренда
$('.js-filter-model').hide();

$('.js-filter-brand').on('change', function () {
  let brandFilter = $('.js-filter-brand option:selected').val();
  console.log(brandFilter);

  $('.js-filter-model').hide();

  switch (brandFilter) {
    case 'IVECO':
      $('.js-filter-model.iveco--filter').show();
      break;
    case 'MAN':
      $('.js-filter-model.man--filter').show();
      break;
    case 'DAF':
      $('.js-filter-model.daf--filter').show();
      break;
    case 'VOLVO':
      $('.js-filter-model.volvo--filter').show();
      break;
    case 'КамАЗ':
      $('.js-filter-model.kamaz--filter').show();
      break;
    case 'MERCEDES':
      $('.js-filter-model.mercedes--filter').show();
      break;
    case 'SCANIA':
      $('.js-filter-model.scania--filter').show();
      break;
    case 'RENAULT':
      $('.js-filter-model.renault--filter').show();
      break;
  }

});