let iconPhone = $('.fa-phone-alt'),
    iconEmail = $('.fa-envelope'),
    iconWhats = $('.fa-whatsapp'),
    iconViber = $('.fa-viber');

iconPhone.on('click', () => {
  iconPhone.toggleClass('active');
  iconEmail.removeClass('active');
  iconWhats.removeClass('active');
  iconViber.removeClass('active');
});

iconEmail.on('click', () => {
  iconPhone.removeClass('active');
  iconEmail.toggleClass('active');
  iconWhats.removeClass('active');
  iconViber.removeClass('active');
});

iconWhats.on('click', () => {
  iconPhone.removeClass('active');
  iconEmail.removeClass('active');
  iconWhats.toggleClass('active');
  iconViber.removeClass('active');
});

iconViber.on('click', () => {
  iconPhone.removeClass('active');
  iconEmail.removeClass('active');
  iconWhats.removeClass('active');
  iconViber.toggleClass('active');
});
