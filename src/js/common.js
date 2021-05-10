//AJAX---------
$('form.ajax-contact-form').on('submit', function() {
  var that = $(this),
      url = that.attr('action'),
      method = that.attr('method'),
      data = {};

  that.find('[name]').each(function(index, value) { 
    //  console.log(index, value);
    var that = $(this),
        name = that.attr('name'),
        value = that.val();

    data[name] = value;
  });

  // console.log(data);
  console.log(url);

  $.ajax({
    url : url, 
    type: method,
    data: data,
    success: function (response) {
      console.log('success');
      let message;
      
      switch (url) {
        case '/contact':
          message = $('.contact-message');
          break;
        case '/login':
          message = $('.login-message');
          $('html').css('cursor', 'progress');
          setInterval(function(){window.location = "/login"}, 1000);
          break;
        case '/register':
          message = $('.register-message');
          $('html').css('cursor', 'progress');
          break;
      }
      message.html(response);
      message.css('color', 'green');
    },
    error: function (response) {
      console.log('error');
      let message;
      message.css('color', 'red');

      switch (url) {
        case '/contact':
          message = $('.contact-message');
          message.html('Данные введены некореектно');
          break;
        case '/login':
          message = $('.login-message');
          message.html('Такого пользователя не существует');
          break;
        case '/register':
          message = $('.register-message');
          message.html('Ошибочные данные');
          break;
      }
    }
  });

  return false;
});
//-------------