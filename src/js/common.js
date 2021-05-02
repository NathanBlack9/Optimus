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