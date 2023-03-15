const firstNameInput = document.getElementById("first");
const lastNameInput = document.getElementById("last");
const emailInput = document.getElementById("email");
const sendBtn = document.getElementById("sendButton")
const modal = document.getElementById("contact_modal");
const main = document.getElementById('main');
const logo = document.querySelector('header');
const body = document.querySelector("body");
const contactButton = document.querySelector(".contact_button");
/**
 * Fonction pour ouvrir la modale de formulaire
 */
function displayModal() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  let nameLocation = document.querySelector(".modal h2");
  let who = document.querySelector(".test");
  nameLocation.innerHTML = `Contactez-moi <br/> ${who.textContent}`;
  modal.setAttribute("aria-hidden", false);
  main.setAttribute("aria-hidden", true);
  logo.setAttribute("aria-hidden", true);
  banner.setAttribute("aria-hidden", true);
  modal.style.display = "block";
  body.style.overflow = "hidden"
  main.style.opacity = "0.5";
  main.style.pointerEvents = "none";
  logo.style.pointerEvents = "none";
  logo.style.opacity = "0.5";
  document.addEventListener('keydown', (e) => {
    if(e.key === "Escape") {
      e.preventDefault();
      closeModal(); 
    }
  })
  document.addEventListener("keydown", (e) => tabInModal(e));
}
/**
 * Fonction permettant de tabuler uniquement dans la modale quand celle ci est ouverte
 * @param {event} e 
 */
function tabInModal(e) {
  if (e.key === 'Tab') {
    let focusable = document.querySelector(".modal").querySelectorAll("input, button");
    let first = focusable[0];
    let last = focusable[focusable.length -1];
    if(e.target === last) {
      first.focus();
      e.preventDefault();
    }
  }
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
  body.style.overflow = "unset"
  main.style.pointerEvents = "unset";
  logo.style.pointerEvents = "unset";
  main.style.opacity = "1";
  logo.style.opacity = "1"; 
  contactButton.focus();
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