document.querySelector('.accordeon').addEventListener('click', function (event) {
  var element = event.target;
  var open = document.getElementsByClassName('open');
  if (open.length === 1) {
    var active = document.getElementsByClassName('open')[0]
    active.classList.remove('open')
    active.classList.add('close')
  }
  if (element && element.nodeName === 'H2') {
    if (element.nextElementSibling.classList.contains('close')) {
      element.nextElementSibling.className = 'open'
    }
  }
})
