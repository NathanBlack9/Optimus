import './iconChange-min.js';
import './slider-min.js';

//modal windows
$('[data-modal=contact]').on('click', function() {
  $('.modal-overlay, #contact').fadeIn(500);
});
$('.form-close').on('click', () => {
  $('.modal-overlay, #contact, #login, #personal').fadeOut(500);
})
//-------------
//Yandex Map init
ymaps.ready(init);
  function init(){
    var myMap = new ymaps.Map("map", {
        center: [55.73865681, 37.62860303],
        zoom: 17,
        controls: ['largeMapDefaultSet','routeButtonControl']
    });

    myMap.controls
      .remove('rulerControl')
      .remove('fullscreenControl')
      .remove('searchControl')
      .remove('routeButton');

      var control = myMap.controls.get('routeButtonControl');
      control.routePanel.state.set({
        fromEnabled: true,
        from: "",
        to: "Пятницкая улица, 37",
        type: "auto"
      });

    myMap.behaviors.disable([
      'scrollZoom'
    ]);

    var placemark = new ymaps.Placemark([55.73864469, 37.62858697], {
      hideIcon: false,
      balloonContentHeader: "г. Москва",
      balloonContentBody: "ул. Пятницкая, д. 37",
      balloonContentFooter: "офис 61",
      hindContent: "Мы здесь!"
    },
    {
      iconLayout: 'default#image',
      iconImageHref: '/img/map-placemark.svg',
      iconImageSize: [26, 37],
      iconImageOffset: [-13, -37]
    });

    myMap.geoObjects.add(placemark);
  }
//---------------
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
