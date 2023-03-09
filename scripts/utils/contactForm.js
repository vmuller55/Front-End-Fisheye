const firstNameInput = document.getElementById("first");
const lastNameInput = document.getElementById("last");
const emailInput = document.getElementById("email");
const sendBtn = document.getElementById("sendButton")
const modal = document.getElementById("contact_modal");
const main = document.getElementById('main');
const logo = document.querySelector('header');


/**
 * Fonction pour ouvrir la modale de formulaire
 */
function displayModal() {
  let nameLocation = document.querySelector(".modal h2");
  let who = document.querySelector(".test");
  nameLocation.innerHTML = `Contactez-moi <br/> ${who.textContent}`;
  modal.setAttribute("aria-hidden", false);
  main.setAttribute("aria-hidden", true);
  logo.setAttribute("aria-hidden", true);
  modal.style.display = "block";
  modal.focus();
  disableScroll();
}
/**
 * Fonction pour fermer la modale
 */
function closeModal() {
  modal.setAttribute("aria-hidden", "true");
  main.setAttribute("aria-hidden", "false");
  banner.setAttribute("aria-hidden", "false");
  logo.setAttribute("aria-hidden", "false");
  modal.style.display = "none";
  main.style.opacity = "1";
  banner.style.opacity = "1";
  logo.style.opacity = "1";
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