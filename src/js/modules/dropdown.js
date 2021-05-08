let link = $('.js-has_dropdown'),
    dropdown = $('.dropdown'),
    arrow = $('.menu__dropdown-img');


link.on('click', function(){
  arrow.toggleClass('dropedd');
  dropdown.slideToggle(300);
})

