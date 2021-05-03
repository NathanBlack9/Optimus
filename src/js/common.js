import './iconChange-min.js';
import './assSlider-min.js';

// var xhr = new XMLHttpRequest();

// xhr.open('GET', 'catalog', true);
//   console.log(xhr.req);
// xhr.send(null);

//modal windows
$('[data-modal=contact]').on('click', function() {
  $('.modal-overlay, #contact').fadeIn(500);
});
$('.form-close').on('click', () => {
  $('.modal-overlay, #contact, #login, #personal').fadeOut(500);
})
//-------------

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
