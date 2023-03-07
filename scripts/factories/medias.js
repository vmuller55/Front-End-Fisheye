/**
* Fonction qui met en place le code HTML relatif au header du photographe
* @param {HTMLElement} target 
* @param {Array} data 
*/
function photographerHeaderFactory (target, data) {
    target.innerHTML = `
        <div class="photographInfo">
        <h2 class="test">${data.name}</h2>
        <h3>${data.city} ${data.country}</h3>
        <p>${data.tagline}</p>
        </div>
        <div id="bloc-contact">
        <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
        </div>
        <div id="bloc-picture">
        <img src="assets/photographers/${data.portrait}" alt="photo de ${data.name}">
        </div>
    `
    photographerBannerFactory();
}
/**
* Fonction qui met en place le code HTML relatif au petit encart de la page
*/
async function photographerBannerFactory() {
    const totalLikes =  await getTotalLikes();
    const photographerInfo = await getPhotographerInfo();
    const target = document.getElementById("banner");
    target.innerHTML = `
        <div class="likes">
        <p>${totalLikes}</p>
        <img src="./assets/icons/heart-solid.svg">
        </div>
        <div class="price">
        <p>${photographerInfo.price}€ / jour</p>
        </div>
    `
}
/**
 * Fonction permettant de créer le code HTML relatif aux cards des photos
 * @param {HTMLElement} target 
 * @param {Array} mediaData 
 * @param {Array} photographer 
 */
function mediaFactory(target, mediaData, photographer) {
    target.innerHTML = mediaData.map((media) => `
        <article class="media-card"> 
        <div class = "bloc-img">
        ${
            media.image
            ? `<button onclick="openLightBox(${media.id})"> <img src="assets/images/media/${photographer.name}/${media.image}" alt="photo de ${photographer.name}-${media.title}"></img></button>`
            : `<button onclick="openLightBox(${media.id})"> <video controls width="250"><source src="assets/images/media/${photographer.name}/${media.video}" type="video/mp4" alt="vidéo de ${photographer.name}"></video></button>`
        }
        </div>
        <div class="mediaInfo">
        <div class="mediaTittle">
        <p>${media.title}</p>
        </div>
        <div id="mediaLikesAndPrice">
        <p id="${media.id}">${media.likes}</p>
        <img src="./assets/icons/heart-solid-red.svg" alt="bouton like en forme de coeur" onclick="addLike(${media.id})">
        </div>
        </div>
        </article>
    `
    )
    .join('')
}
/**
 * Fonction permettant de créer le code HTML relatif à la lightbox
 * @param {Array} medias 
 * @param {Array} photographerInfo 
 * @param {HTMLElement} elements 
 * @param {Number} index 
 */
function lightBoxFactory (medias, photographerInfo, elements, index){
    elements.innerHTML = `
        ${
            medias[index].image
            ? `<img src="./assets/images/media/${photographerInfo.name}/${medias[index].image}" alt="">`
            : `<video controls autoplay "><source src="assets/images/media/${photographerInfo.name}/${medias[index].video}"  type="video/mp4" alt="vidéo de ${photographerInfo.name}"></video>`
        }
        <h2>${medias[index].title}</h2>
    `    
}
