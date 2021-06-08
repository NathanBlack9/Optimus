
  

// replacedNode = nav.replaceChild(nav.children[1], nav.children[0]);

// nav.appendChild(replacedNode);

$(".js-sort-cheap").on('click', () => {
  let nav = document.querySelector('.catalog__body'),
      replacedNode;

  for (let i = 0; i < nav.children.length; i++) {
    for (let j = i; j < nav.children.length; j++) {
      if (+nav.children[i].getAttribute('data-price') > +nav.children[j].getAttribute('data-price')){
        replacedNode = nav.replaceChild(nav.children[j], nav.children[i]);
        insertAfter(replacedNode, nav.children[i])
      }

    }    
  }
});

$('.js-sort-dear').on('click', () => {
  let nav = document.querySelector('.catalog__body'),
      replacedNode;

  for (let i = 0; i < nav.children.length; i++) {
    for (let j = i; j < nav.children.length; j++) {
      if (+nav.children[i].getAttribute('data-price') < +nav.children[j].getAttribute('data-price')){
        replacedNode = nav.replaceChild(nav.children[j], nav.children[i]);
        insertAfter(replacedNode, nav.children[i])
      }

    }    
  }
});

function insertAfter(elem, refElem ) {
  return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
}


$('.ajax-profile-form').submit(function (e) { 
  e.preventDefault();
  $.post(
		'/profile', 
		 $(".ajax-profile-form").serialize(),  		
		
		function(res) { 
        let message = $('.profile__message');
        $('html').css('cursor', 'progress');
        message.html(res).css('color', 'green');
		}
	);
	return false;
});