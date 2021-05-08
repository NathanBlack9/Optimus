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
      console.log(response);
      let message;
      message.html(response);
      message.css('color', 'green');

      if(url == '/contact'){
        message = $('.contact-message');
      }
      if(url == '/login'){
        message = $('.login-message');
        setInterval(function(){window.location = "/login"}, 1000);
      }
    },
    error: function (response) {
      console.log('error');
      let message;
      message.css('color', 'red');

      if(url == '/contact'){
        message = $('.contact-message');
        message.html('Данные введены некореектно');
      }
      if(url == '/login'){
        message = $('.login-message');
        message.html('Такого пользователя не существует');
      }
    }
  });

  return false;
});
//-------------
