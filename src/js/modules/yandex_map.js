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