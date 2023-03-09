/**
* Fonction qui met en place le code HTML relatif au header du photographe
* @param {HTMLElement} target 
* @param {Array} data 
*/
function photographerHeaderDisplay(target, data, media) {
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
    photographerBannerDisplay(data, media);
}
/**
* Fonction qui met en place le code HTML relatif au petit encart de la page
*/
function photographerBannerDisplay(data, media) {
    const totalLikes = getTotalLikes(media);
    const target = document.getElementById("banner");
    target.innerHTML = `
        <div class="likes">
        <p>${totalLikes}</p>
        <img src="./assets/icons/heart-solid.svg">
        </div>
        <div class="price">
        <p>${data.price}€ / jour</p>
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
            ? `<button onclick="openLightBox(${media.id} , ${ media.photographerId})" > <img src="assets/images/media/${photographer.name}/${media.image}" alt="photo de ${photographer.name}-${media.title}"></img></button>`
            : `<button onclick="openLightBox(${media.id} , ${ media.photographerId})" > <video controls width="250"><source src="assets/images/media/${photographer.name}/${media.video}" type="video/mp4" alt="vidéo de ${photographer.name}"></video></button>`
        }
        </div>
        <div class="mediaInfo">
        <div class="mediaTittle">
        <p>${media.title}</p>
        </div>
        <div id="mediaLikesAndPrice">
        <p id="${media.id}">${media.likes}</p>
        <img class="noLike" src="./assets/icons/heart-solid-red.svg" alt="bouton like en forme de coeur" onclick="like(${media.id})">
        </div>
        </div>
        </article>
    `
    )
    .join('')
}
