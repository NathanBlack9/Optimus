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
      // console.log(response);
      let message = $('.form-message')
      message.html(response);
      message.css('color', 'green');
    }
  });

  return false;
});
//-------------