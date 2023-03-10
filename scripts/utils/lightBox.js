/**
 * Fonciton permettant d'ouvrir la lightBox et initialise la fonction display relative
 * @param {number} mediaId 
 * @param {number} photographId
 */
async function openLightBox(mediaId, photographId) {
    const [{photographers}, {media}] = await getPhotographers();
    const elements = document.querySelector(".lightBoxMedia");
    const lightBox = document.getElementById("lightBox");
    const leftArrow = document.getElementById("leftArrow");
    const rightArrow = document.getElementById("rightArrow");
    const photographerInfo = photographers.find(
        (e) => e.id == photographId
    )
    const mediaOfPhotographer = media.filter(
        (e) => e.photographerId == id
    )
    const currentImage = mediaOfPhotographer.find(
        (e) => e.id == mediaId
    )
    let indexCurrentImage = mediaOfPhotographer.indexOf(currentImage);
    lightBox.style.display = "flex";
    lightBoxDisplay(mediaOfPhotographer, photographerInfo, elements, indexCurrentImage);
    
    leftArrow.addEventListener("click", () => {
        indexCurrentImage = previousMedia(indexCurrentImage, mediaOfPhotographer, photographerInfo, elements)
    })
    rightArrow.addEventListener("click", () => {
        indexCurrentImage = nextMedia(indexCurrentImage, mediaOfPhotographer, photographerInfo, elements)
    })
    window.addEventListener("keydown", (e) => {
        e.preventDefault();
        switch(e.key) {
            case "ArrowLeft" : indexCurrentImage = previousMedia(indexCurrentImage, mediaOfPhotographer, photographerInfo, elements);
            break
            case "ArrowRight" : indexCurrentImage = nextMedia(indexCurrentImage, mediaOfPhotographer, photographerInfo, elements);
            break
        }
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
function previousMedia (indexCurrentImage, mediaOfPhotographer, photographerInfo, elements) {
    if (indexCurrentImage === 0 ) {
        indexCurrentImage = mediaOfPhotographer.length -1
    } else {
        indexCurrentImage --
    }
    lightBoxDisplay (mediaOfPhotographer, photographerInfo, elements, indexCurrentImage);
    return indexCurrentImage;
}
function nextMedia (indexCurrentImage, mediaOfPhotographer, photographerInfo, elements) {
    if (indexCurrentImage === mediaOfPhotographer.length - 1 ) {
        indexCurrentImage = 0
    } else {
        indexCurrentImage ++
    }
    lightBoxDisplay (mediaOfPhotographer, photographerInfo, elements, indexCurrentImage);
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
document.addEventListener('keydown', (e) => {
    if(e.key === "Escape") {
        closeLightBox();
        closeModal();
    }
})
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
            : `<video controls autoplay "><source src="assets/images/media/${photographerInfo.name}/${medias[index].video}"  type="video/mp4" alt="vidéo de ${photographerInfo.name}"></video>`
        }
        <h2>${medias[index].title}</h2>
    `   
}