$('[data-modal=login]').on('click', function() {
  $('.modal-overlay, #login').fadeIn(500);
});

$('[data-modal=contact]').on('click', function() {
  $('.modal-overlay, #contact').fadeIn(500);
});

$('.form-close').on('click', () => {
  $('.modal-overlay, #contact, #login, #personal').fadeOut(500);
});