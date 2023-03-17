/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/**
* Fonction qui met en place le code HTML relatif au header du photographe
* @param {HTMLElement} target 
* @param {object} data 
* @param {Array} media
*/
function photographerHeaderDisplay(target, data, media) {
   /**
    * Mise en place de la fonction relative à l'encart en bas de page
    */
   photographerBannerDisplay(data, media);

   const photographInfo = document.createElement("div");
   photographInfo.classList.add("photographInfo");
   const h1 = document.createElement("h1");
   h1.classList.add("test");
   h1.textContent = data.name;
   const h2 = document.createElement("h2");
   h2.textContent = data.city + " " + data.country;
   const tagline = document.createElement("h3");
   tagline.textContent = data.tagline;
   target.appendChild(photographInfo);
   photographInfo.appendChild(h1);
   photographInfo.appendChild(h2);
   photographInfo.appendChild(tagline);
   tagline.setAttribute("tabindex", "0");
   const blocContact = document.createElement("div");
   blocContact.setAttribute("id", "bloc-contact");
   const contactButton = document.createElement("button");
   contactButton.classList.add("contact_button");
   contactButton.textContent = "Contactez-moi";
   target.appendChild(blocContact);
   blocContact.appendChild(contactButton);
   const blocPicture = document.createElement("div");
   blocPicture.setAttribute("id", "bloc-picture");
   const img = document.createElement("img");
   img.setAttribute("src", "assets/photographers/" + data.portrait)
   img.setAttribute("alt", "photo de " + data.name )
   target.appendChild(blocPicture);
   blocPicture.appendChild(img);
   h1.setAttribute("tabindex", "0");
   h2.setAttribute("tabindex", "0");
   img.setAttribute("tabindex", "0");
   contactButton.setAttribute("tabindex", "0");
   /**
    * Listenner pour ouvrir la modale de contact au clic et focus à l'intérieur de cette dernière
    */
   contactButton.addEventListener("click", function() { displayModal(), firstNameInput.focus()});
   const closeModalFocus = document.querySelector(".modal header img");
   closeModalFocus.addEventListener("click", function() {closeModal()})
}