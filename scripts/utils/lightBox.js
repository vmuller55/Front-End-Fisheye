const elements = document.querySelector(".lightBoxMedia");
const lightBox = document.getElementById("lightBox");
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");
const header = document.querySelector("header");
const lightboxClose = document.querySelector(".lightBoxClose");
var triggerElement = null;
/**
 * Fonction permettant d'ouvrir la lightBox et initialise la fonction display relative
 * @param {Array} allmedia 
 * @param {object} photographer
 * @param {object} currentMedia
 */
function openLightBox(allmedia, photographer, currentMedia) {
    /**
     * Récupération de l'élément déclencheur dans une variable
     */
    triggerElement = document.activeElement;
    /**
     * Changement de style
     */
    lightBox.setAttribute("aria-hidden", false);
    main.setAttribute("aria-hidden", true);
    logo.setAttribute("aria-hidden", true);
    banner.setAttribute("aria-hidden", true);
    lightBox.style.display = "flex";
    body.style.overflow = "hidden"
    header.style.display = "none";
    main.style.display = "none";
    banner.style.display = "none";
    logo.style.display = "none";    
    body.classList.add("modalOpen"); 
    /**
     * Récupération de l'index du média pour avoir son positionnement dans le tableau regroupant tous les médias du photographe
     */
    let indexCurrentImage = allmedia.indexOf(currentMedia);
    /**
     * Initialisation de la fonction mettant en place les éléments de la lightbox
     */
    lightBoxDisplay(allmedia, photographer, elements, indexCurrentImage);
    /**
     * Listenner pour changer de média au clic sur les flèches ou à l'utilisation des flèches du clavier
     */
    leftArrow.addEventListener("click", () => {
        indexCurrentImage = previousMedia(indexCurrentImage, allmedia, photographer, elements)
    })
    rightArrow.addEventListener("click", () => {
        indexCurrentImage = nextMedia(indexCurrentImage, allmedia, photographer, elements)
    })
    document.addEventListener("keydown", (e) => {
        switch(e.key) {
            case "ArrowLeft" : indexCurrentImage = previousMedia(indexCurrentImage, allmedia, photographer, elements);
            break
            case "ArrowRight" : indexCurrentImage = nextMedia(indexCurrentImage, allmedia, photographer, elements);
            break
        }
    })
    /**
     * Listenner pour fermer la lightbox au clic sur l'image de croix ou avec la touche escape
     */
    lightboxClose.addEventListener("click", function() {closeLightBox()})
    document.addEventListener('keydown', (e) => {
        if(e.key === "Escape") {
            closeLightBox();
        }
    })
    /**
     * Listenner pour tabuler uniquement dans la lightbox
     */
    document.addEventListener("keydown", (e) => tabInLightBox(e));
}
/**
 * Fonction qui permet de "piéger" la tabulation dans la lightbox
 * @param {Event} e 
 */
function tabInLightBox(e) {
    if (e.key === 'Tab') {
      let focusable = document.querySelector(".lightBoxContainer").querySelectorAll("button");
      let first = focusable[0];
      let last = focusable[focusable.length -1];
      if(e.target === last) {
        first.focus();
        e.preventDefault();
      }
    }
  }
/**
 * Fonction permettant de naviguer dans la lightbox en modifiant l'index de l'image 
 * @param {Number} indexCurrentImage 
 * @param {Array} mediasOfPhotographer
 * @param {object} photographer
 * @param {HTMLElement} elements 
 * @returns l'index incrémenté ou déprécié 
 */
function previousMedia (indexCurrentImage, mediaOfPhotographer, photographer, elements) {
    if (indexCurrentImage === 0 ) {
        indexCurrentImage = mediaOfPhotographer.length -1
    } else {
        indexCurrentImage --
    }
    lightBoxDisplay (mediaOfPhotographer, photographer, elements, indexCurrentImage);
    return indexCurrentImage;
}
function nextMedia (indexCurrentImage, mediaOfPhotographer, photographer, elements) {
    if (indexCurrentImage === mediaOfPhotographer.length - 1 ) {
        indexCurrentImage = 0
    } else {
        indexCurrentImage ++
    }
    lightBoxDisplay (mediaOfPhotographer, photographer, elements, indexCurrentImage);
    return indexCurrentImage;
}
/**
 * Fonction permettant de fermer la lightBox
 */
function closeLightBox() {
    main.setAttribute("aria-hidden", false);
    logo.setAttribute("aria-hidden", false);
    banner.setAttribute("aria-hidden", false);
    lightBox.setAttribute("aria-hidden", true);
    body.style.overflow = "unset"      
    main.style.display = "block";
    banner.style.display = "flex";
    logo.style.display = "block"; 
    lightBox.style.display = "none"
    header.style.display = "block";
    body.classList.remove("modalOpen");
    /**
     * Focus sur l'élément déclencheur à la fermeture
     */
    triggerElement.focus();
}
/**
 * Fonction permettant de créer le code HTML relatif à la lightbox
 * @param {Array} medias 
 * @param {object} photographerInfo 
 * @param {HTMLElement} elements 
 * @param {Number} index 
 */
function lightBoxDisplay (medias, photographerInfo, elements, index){
    elements.innerHTML = `
        ${
            medias[index].image
            ? `<img src="./assets/images/media/${photographerInfo.name}/${medias[index].image}" alt="photo de ${photographerInfo.name}" tabindex = "0">`
            : `<video controls autoplay><source src="assets/images/media/${photographerInfo.name}/${medias[index].video}"  type="video/mp4" alt="vidéo de ${photographerInfo.name}" tabindex = "0"></video>`
        }
        <h2 tabindex = "0">${medias[index].title}</h2>
    `   
}