document.addEventListener('DOMContentLoaded', function() {
  var carouselItems = document.getElementsByClassName('carousel-item');
  carouselItems[0].classList.add('active');
  var total = carouselItems.length;
  var current = 0;
  
  document.getElementById('moveRight').addEventListener('click', function() {
    var next = current;
    current = current + 1;
    setSlide(next, current);
  });
  
  document.getElementById('moveLeft').addEventListener('click', function() {
    var prev = current;
    current = current - 1;
    setSlide(prev, current);
  });
  
  function setSlide(prev, next) {
    var slide = current;
    
    if (next > total - 1) {
      slide = 0;
      current = 0;
    }
    
    if (next < 0) {
      slide = total - 1;
      current = total - 1;
    }
    
    carouselItems[prev].classList.remove('active');
    carouselItems[slide].classList.add('active');
    
    setTimeout(function() {
      // Code to be executed after 800 milliseconds
    }, 800);
    
    console.log('current ' + current);
    console.log('prev ' + prev);
  }
});
