import"./iconChange-min.js";import"./slider-min.js";function init(){var o=new ymaps.Map("map",{center:[55.73865681,37.62860303],zoom:17,controls:["largeMapDefaultSet","routeButtonControl"]});o.controls.remove("rulerControl").remove("fullscreenControl").remove("searchControl").remove("routeButton"),o.controls.get("routeButtonControl").routePanel.state.set({fromEnabled:!0,from:"",to:"Пятницкая улица, 37",type:"auto"}),o.behaviors.disable(["drag","scrollZoom"]);var t=new ymaps.Placemark([55.73864469,37.62858697],{hideIcon:!1,balloonContentHeader:"г. Москва",balloonContentBody:"ул. Пятницкая, д. 37",balloonContentFooter:"офис 61",hindContent:"Мы здесь!"},{iconLayout:"default#image",iconImageHref:"/img/map-placemark.svg",iconImageSize:[26,37],iconImageOffset:[-13,-37]});o.geoObjects.add(t)}$("[data-modal=contact]").on("click",function(){$(".modal-overlay, #contact").fadeIn(500)}),$(".form-close").on("click",()=>{$(".modal-overlay, #contact, #login, #personal").fadeOut(500)}),ymaps.ready(init),$("form.ajax-contact-form").on("submit",function(){var o=$(this),t=o.attr("action"),e=o.attr("method"),a={};return o.find("[name]").each(function(o,t){var e=$(this),n=e.attr("name");t=e.val();a[n]=t}),console.log(t),$.ajax({url:t,type:e,data:a,success:function(o){let t=$(".form-message");t.html(o),t.css("color","green")}}),!1});