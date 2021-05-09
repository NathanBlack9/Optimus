$('[data-modal=login]').on('click', function() {
  $('.modal-overlay, #login').fadeIn(500);
});

$('[data-modal=contact]').on('click', function() {
  $('.modal-overlay, #contact').fadeIn(500);
});

$('[data-modal=personal]').on('click', function() {
  $('.modal-overlay, #personal').fadeIn(500);
});

$('.form-close').on('click', () => {
  $('.modal-overlay, .modal').fadeOut(500);
});

$(document).click(function (e) {
  if ($(e.target).is('.modal-overlay')) {
    $('.modal-overlay, .modal').fadeOut(500);
  }
});