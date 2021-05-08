$(document).ready(function(){
  $('.assortment-slider-js').slick({
      arrows: true,
      dots: false,
      adaptiveHeight:false,
      slidesToShow:1,
      slidesToScroll:1,
      speed: 500,
      infinite:true,
      autoplay:true,
      autoplaySpeed: 2000,
      draggable:true,
      swipe:true,
      variableWidth:false
      // responsive:[
      //     {
      //         breakpoint: 1270,
      //         settings:{
      //             dots:true,
      //             autoplay:false,
      //             draggable:true,
      //             swipe:true,
      //             touchThreshold:100,
      //             slidesToShow:1,
      //             autoplaySpeed: 3500,
      //         }
      //     }
      // ]
  });
  $('.feedback-slider-js').slick({
      arrows: true,
      dots: true,
      adaptiveHeight:false,
      slidesToShow:2,
      slidesToScroll:1,
      speed: 500,
      infinite:true,
      autoplay:false,
      autoplaySpeed: 2000,
      draggable:true,
      swipe:true,
      variableWidth:false
  })
});