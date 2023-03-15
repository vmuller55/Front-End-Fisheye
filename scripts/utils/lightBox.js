const elements = document.querySelector(".lightBoxMedia");
const lightBox = document.getElementById("lightBox");
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");
const header = document.querySelector("header");
const lightboxClose = document.querySelector(".lightBoxClose");
const lightBoxContent = document.querySelector(".lightBoxContent");
var triggerElement = null;

/**
 * Fonciton permettant d'ouvrir la lightBox et initialise la fonction display relative
 * @param {number} mediaId 
 * @param {number} photographId
 */
function openLightBox(allmedia, photographer, currentMedia) {
    var triggerElement = document.activeElement;
    console.log(triggerElement)
    window.scrollTo({ top: 0, behavior: 'smooth' });
    lightBox.setAttribute("aria-hidden", false);
    main.setAttribute("aria-hidden", true);
    logo.setAttribute("aria-hidden", true);
    banner.setAttribute("aria-hidden", true);
    lightBox.style.display = "flex";
    lightBox.style.position = "absolute"
    body.style.overflow = "hidden"
    lightBox.style.top = "0"
    header.style.opacity = "0";
    main.style.opacity = "0";
    banner.style.opacity = "0";
    logo.style.opacity = "0";    
    body.classList.add("modalOpen"); 

    let indexCurrentImage = allmedia.indexOf(currentMedia);
    lightBoxDisplay(allmedia, photographer, elements, indexCurrentImage);

    leftArrow.addEventListener("click", () => {
        indexCurrentImage = previousMedia(indexCurrentImage, allmedia, photographer, elements)
    })
    rightArrow.addEventListener("click", () => {
        indexCurrentImage = nextMedia(indexCurrentImage, allmedia, photographer, elements)
    })
    window.addEventListener("keydown", (e) => {
        e.preventDefault();
        switch(e.key) {
            case "ArrowLeft" : indexCurrentImage = previousMedia(indexCurrentImage, allmedia, photographer, elements);
            break
            case "ArrowRight" : indexCurrentImage = nextMedia(indexCurrentImage, allmedia, photographer, elements);
            break
        }
    })
    lightboxClose.addEventListener("click", function() {closeLightBox(triggerElement)})
    document.addEventListener('keydown', (e) => {
        if(e.key === "Escape") {
            e.preventDefault();
            closeLightBox(triggerElement);
        }
    })
}
/**
 * Fonction permettant de navigiuer dans la lightbox
 * @param {Number} indexCurrentImage 
 * @param {Array} medias 
 * @param {Array} photographerInfo 
 * @param {HTMLElement} elements 
 * @returns l'index incrémenté ou déprecié 
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
function closeLightBox(triggerElement) {
    main.setAttribute("aria-hidden", false);
    logo.setAttribute("aria-hidden", false);
    banner.setAttribute("aria-hidden", false);
    lightBox.setAttribute("aria-hidden", true);
    body.style.overflow = "unset"      
    header.style.opacity = "1";
    main.style.opacity = "1";
    banner.style.opacity = "1";
    logo.style.opacity = "1"; 
    lightBox.style.display = "none"
    header.style.display = "block";
    body.classList.remove("modalOpen");
    triggerElement.focus();
    triggerElement = null;
}
/**
 * Fonction permettant de créer le code HTML relatif à la lightbox
 * @param {Array} medias 
 * @param {Array} photographerInfo 
 * @param {HTMLElement} elements 
 * @param {Number} index 
 */
function lightBoxDisplay (medias, photographerInfo, elements, index){
    elements.innerHTML = `
        ${
            medias[index].image
            ? `<img src="./assets/images/media/${photographerInfo.name}/${medias[index].image}" alt="photo de ${photographerInfo.name}">`
            : `<video controls autoplay><source src="assets/images/media/${photographerInfo.name}/${medias[index].video}"  type="video/mp4" alt="vidéo de ${photographerInfo.name}"></video>`
        }
        <h2>${medias[index].title}</h2>
    `   
}