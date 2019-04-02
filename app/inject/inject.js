// check internet connection
(function () {

  function triggerEvent(type) {
    var event = document.createEvent('HTMLEvents');
    event.initEvent(type, true, true);
    event.eventName = type;
    (document.body || window).dispatchEvent(event);
  }

  function testConnection() {
    // make sync-ajax request
    var xhr = new XMLHttpRequest();
    // phone home
    xhr.open('HEAD', '/', false); // async=false
    try {
      xhr.send();
      onLine = true;
    }
    catch (e) {
      // throws NETWORK_ERR when disconnected
      onLine = false;
    }

    return onLine;
  }

  var onLine = true,
    lastOnLineStatus = true;

  // note: this doesn't allow us to define a getter in Safari
  navigator.__defineGetter__("onLine", testConnection);
  testConnection();

  if (onLine === false) {
    lastOnLineStatus = false;
    // trigger offline event
    triggerEvent('offline');

    // inject DOM decorator
    function create(htmlStr) {
      var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
      temp.innerHTML = htmlStr;
      while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
      }
      return frag;
    }
    
    var fragment = create('<style>body{height:100%;width:100%;background-color:#white;text-align:center;color:#262626;font-family: arial, sans-serif;}::-webkit-scrollbar{display:none;}</style><div style="padding:25%;font-weight:normal;font-size:20px">Whoops! Internet connection lost.<br> Please check your connection.<p style="font-size:14px"><strong>GOLEM</strong> is trying to connect to server...</p></div>');

    document.body.insertBefore(fragment, document.body.childNodes[0]);
  }

  setInterval(function () {
    testConnection();
    if (onLine !== lastOnLineStatus) {
      triggerEvent(onLine ? 'online' : 'offline');
      lastOnLineStatus = onLine;
    }
  }, 5000); // 5 seconds

})();

// if no internet connection, refresh page
setInterval(function () {
  if (navigator.onLine) {
    console.log('online');
  }
  else {
    console.log('offline');
    // reload page from cache
    location.reload(false);
  }
}, 5000); // 5 seconds

function create(htmlStr) {
  var frag = document.createDocumentFragment(),
    temp = document.createElement('div');
  temp.innerHTML = htmlStr;
  while (temp.firstChild) {
    frag.appendChild(temp.firstChild);
  }
  return frag;
}
// force 3D acceleration forever and ever
var fragment = create('<div style="-webkit-transform: translateZ(0)"></div>');

document.body.insertBefore(fragment, document.body.childNodes[0]);

