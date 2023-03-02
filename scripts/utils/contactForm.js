function displayModal() {
    const modal = document.getElementById("contact_modal");
    const main = document.getElementById('main');
    const banner = document.getElementById('banner');
    const logo = document.querySelector('.logo');
    const nameLocation = document.querySelector(".modal h2");
    const who = document.querySelector(".test");
    nameLocation.innerHTML = `Contactez-moi <br/> ${who.textContent}`;
	modal.style.display = "block";
    main.style.filter = "blur(5px)";
    banner.style.filter = 'blur(5px)';
    logo.style.filter = 'blur(5px)';
    disableScroll();
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    const main = document.getElementById('main');
    const banner = document.getElementById('banner');
    const logo = document.querySelector('.logo');
    modal.style.display = "none";
    main.style.filter = "none";
    banner.style.filter = 'none';
    logo.style.filter = 'none';
    enableScroll();
}

/**
 * Désactivation du scroll lorsque la modal est ouverte
 */




// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}