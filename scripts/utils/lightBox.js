/**
 * Fonciton permettant d'ouvrir la lightBox et initialise la fonction factory relative
 * @param {number} id 
 */
async function openLightBox(id) {
    const photographerInfo = await getPhotographerInfo();
    const medias = await getMediaOfPhotographer();
    const elements = document.querySelector(".lightBoxMedia");
    const lightBox = document.getElementById("lightBox");
    const leftArrow = document.getElementById("leftArrow");
    const rightArrow = document.getElementById("rightArrow");
    const currentImage = medias.find((e) => e.id === id)
    let indexCurrentImage = medias.indexOf(currentImage);
    lightBox.style.display = "flex";
    lightBoxFactory(medias, photographerInfo, elements, indexCurrentImage);
    
    leftArrow.addEventListener("click", () => {
        indexCurrentImage = previousMedia(indexCurrentImage, medias, photographerInfo, elements)
    })
    rightArrow.addEventListener("click", () => {
        indexCurrentImage = nextMedia(indexCurrentImage, medias, photographerInfo, elements)
    })
    const header = document.querySelector("header");
    header.style.display = "none";
    main.style.display = "none";
    banner.style.display = "none";
    logo.style.display = "none";
    
}
/**
 * Fonction permettant de navigiuer dans la lightbox
 * @param {Number} indexCurrentImage 
 * @param {Array} medias 
 * @param {Array} photographerInfo 
 * @param {HTMLElement} elements 
 * @returns l'index incrémenté ou déprecié 
 */
function previousMedia (indexCurrentImage, medias, photographerInfo, elements) {
    if (indexCurrentImage === 0 ) {
        indexCurrentImage = medias.length -1
    } else {
        indexCurrentImage --
    }
    lightBoxFactory (medias, photographerInfo, elements, indexCurrentImage);
    return indexCurrentImage;
}
function nextMedia (indexCurrentImage, medias, photographerInfo, elements) {
    if (indexCurrentImage === medias.length - 1 ) {
        indexCurrentImage = 0
    } else {
        indexCurrentImage ++
    }
    lightBoxFactory (medias, photographerInfo, elements, indexCurrentImage);
    return indexCurrentImage;
}
/**
 * Fonction permettant de fermer la lightBox
 */
function closeLightBox() {
    const lightBox = document.getElementById("lightBox");
    const header = document.querySelector("header");
    main.style.display = "block";
    banner.style.display = "flex";
    logo.style.display = "block";
    lightBox.style.display = "none"
    header.style.display = "block";
}