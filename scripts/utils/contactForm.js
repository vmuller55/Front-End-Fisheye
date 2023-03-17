const firstNameInput = document.getElementById('first');
const lastNameInput = document.getElementById('last');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const sendBtn = document.getElementById('sendButton');
const modal = document.getElementById('contact_modal');
const main = document.getElementById('main');
const logo = document.querySelector('header');
const body = document.querySelector('body');
const insert = document.getElementById('banner');

/**
 * Fonction permettant de tabuler uniquement dans la modale quand celle ci est ouverte
 * @param {event} e
 */
function tabInModal(e) {
  if (e.key === 'Tab') {
    const focusable = document.querySelector('.modal').querySelectorAll('input, button');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.target === last) {
      first.focus();
      e.preventDefault();
    }
  }
}

/**
 * Fonction pour ouvrir la modale de formulaire
 */
// eslint-disable-next-line no-unused-vars
function displayModal() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  // eslint-disable-next-line no-undef
  triggerElement = document.activeElement;
  const nameLocation = document.querySelector('.modal h2');
  const who = document.querySelector('.test');
  nameLocation.innerHTML = `Contactez-moi <br/> ${who.textContent}`;
  modal.setAttribute('aria-hidden', false);
  main.setAttribute('aria-hidden', true);
  logo.setAttribute('aria-hidden', true);
  insert.setAttribute('aria-hidden', true);
  modal.style.display = 'block';
  body.style.overflow = 'hidden';
  main.style.opacity = '0.5';
  logo.style.opacity = '0.5';
  main.style.pointerEvents = 'none';
  logo.style.pointerEvents = 'none';
  /**
   * Listenner pour fermer la modale avec la touche escape
   */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // eslint-disable-next-line no-use-before-define
      closeModal();
    }
  });
  /**
   * Listenner pour "piéger" la tabulation à l'intérieur de la modale
   */
  document.addEventListener('keydown', (e) => tabInModal(e));
}

/**
 * Fonction pour fermer la modale
 */
function closeModal() {
  modal.setAttribute('aria-hidden', 'true');
  main.setAttribute('aria-hidden', 'false');
  insert.setAttribute('aria-hidden', 'false');
  logo.setAttribute('aria-hidden', 'false');
  modal.style.display = 'none';
  body.style.overflow = 'unset';
  main.style.pointerEvents = 'unset';
  logo.style.pointerEvents = 'unset';
  main.style.opacity = '1';
  logo.style.opacity = '1';
  // eslint-disable-next-line no-undef
  triggerElement.focus();
}
/**
 * Permet de vérifier si le formulaire est rempli et affiche les infos en dans la console
 */
sendBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (firstNameInput.value && lastNameInput.value && emailInput.value) {
    // eslint-disable-next-line no-console
    console.log(`Votre prénom : ${firstNameInput.value} Votre nom : ${lastNameInput.value} Votre email : ${emailInput.value} votre message : ${messageInput.value}`);
    // eslint-disable-next-line no-alert
    window.alert(`${firstNameInput.value} votre message a bien été envoyé`);
    firstNameInput.value = '';
    lastNameInput.value = '';
    emailInput.value = '';
    messageInput.value = '';
    closeModal();
  } else {
    // eslint-disable-next-line no-alert
    window.alert('Veuillez renseigner complétement le formulaire');
  }
});
