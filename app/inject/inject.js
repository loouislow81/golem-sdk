//image preloader
function init() {
  var imgPreload = document.getElementsByTagName('img');
  for (var i=0; i<imgPreload.length; i++) {
    if(imgPreload[i].getAttribute('src')) {
      imgPreload[i].setAttribute('src',imgPreload[i].getAttribute('src'));
    }
  }
}
window.onload = init;
