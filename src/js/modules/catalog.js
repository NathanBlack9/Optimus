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
});

//Изменить ссылку после нажатия на кнопку купить
$('.js-product-btn').on('click', function () {
  $(this).addClass('in-basket');
  $(this).html('В корзину');
  setTimeout(()=> {$(this).prop("href", "/basket")}, 200);
});


//Изменить список с моделями при изменении бренда
$('.js-filter-model').hide();
$('.js-filter-model.iveco--filter').show();

$('.js-filter-brand').on('change', function () {
  let brandFilter = $('.js-filter-brand option:selected').val();
  console.log(brandFilter);


  switch (brandFilter) {
    case 'iveco':
      $('.js-filter-model').hide();
      $('.js-filter-model.iveco--filter').show();
      break;
    case 'man':
      $('.js-filter-model').hide();
      $('.js-filter-model.man--filter').show();
      break;
    case 'daf':
      $('.js-filter-model').hide();
      $('.js-filter-model.daf--filter').show();
      break;
    case 'volvo':
      $('.js-filter-model').hide();
      $('.js-filter-model.volvo--filter').show();
      break;
    case 'kamaz':
      $('.js-filter-model').hide();
      $('.js-filter-model.kamaz--filter').show();
      break;
    case 'mercedes':
      $('.js-filter-model').hide();
      $('.js-filter-model.mercedes--filter').show();
      break;
    case 'scania':
      $('.js-filter-model').hide();
      $('.js-filter-model.scania--filter').show();
      break;
    case 'renault':
      $('.js-filter-model').hide();
      $('.js-filter-model.renault--filter').show();
      break;
  }

});