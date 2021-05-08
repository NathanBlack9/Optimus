var iconPhone = document.querySelector('.fa-phone-alt');
var iconEmail = document.querySelector('.fa-envelope');
var iconWhats = document.querySelector('.fa-whatsapp');
var iconViber = document.querySelector('.fa-viber');

iconPhone.addEventListener('click', () => {
  iconPhone.classList.toggle('active');
  iconEmail.classList.remove('active');
  iconWhats.classList.remove('active');
  iconViber.classList.remove('active');
});

iconEmail.addEventListener('click', () => {
  iconPhone.classList.remove('active');
  iconEmail.classList.toggle('active');
  iconWhats.classList.remove('active');
  iconViber.classList.remove('active');
});

iconWhats.addEventListener('click', () => {
  iconPhone.classList.remove('active');
  iconEmail.classList.remove('active');
  iconWhats.classList.toggle('active');
  iconViber.classList.remove('active');
});

iconViber.addEventListener('click', () => {
  iconPhone.classList.remove('active');
  iconEmail.classList.remove('active');
  iconWhats.classList.remove('active');
  iconViber.classList.toggle('active');
});
