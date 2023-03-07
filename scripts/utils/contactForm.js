const firstNameInput = document.getElementById("first");
const lastNameInput = document.getElementById("last");
const emailInput = document.getElementById("email");
const sendBtn = document.getElementById("sendButton")
const modal = document.getElementById("contact_modal");
const main = document.getElementById('main');
const banner = document.getElementById('banner');
const logo = document.querySelector('.logo');

/**
 * Fonction pour ouvrir la modale de formulaire
 */
function displayModal() {
  let nameLocation = document.querySelector(".modal h2");
  let who = document.querySelector(".test");
  nameLocation.innerHTML = `Contactez-moi <br/> ${who.textContent}`;
  modal.style.display = "block";
  main.style.display = "none";
  banner.style.display = "none";
  logo.style.display = "none";
  disableScroll();
}
/**
 * Fonction pour fermer la modale
 */
function closeModal() {
  modal.style.display = "none";
  main.style.display = "block";
  banner.style.display = "flex";
  logo.style.display = "block";
  enableScroll();
}
/**
 * Permet de vérifier si le formulaire est rempli et affiche les infos en dans la console 
 */
sendBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if(firstNameInput.value && lastNameInput.value && emailInput.value) {
    console.log("Votre prénom : " + firstNameInput.value + " Votre nom : " + lastNameInput.value + " Votre email : " +  emailInput.value)
    window.alert(firstNameInput.value + " votre message a bien été envoyé" )
    closeModal();
  }
  else{
    window.alert("Veuillez renseigner complétement le formulaire");
  }
})

/**
* Désactivation du scroll lorsque la modal est ouverte
*/
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

var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} 
catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); 
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); 
  window.addEventListener('touchmove', preventDefault, wheelOpt); 
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}