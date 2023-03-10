/**
* Fonction qui met en place le code HTML relatif au header du photographe
* @param {HTMLElement} target 
* @param {Array} data 
*/
function photographerHeaderDisplay(target, data, media) {
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
    contactButton.addEventListener("click", function() { displayModal()});

}
/**
* Fonction qui met en place le code HTML relatif au petit encart de la page
*/
function photographerBannerDisplay(data, media) {
    const totalLikes = getTotalLikes(media);
    const target = document.getElementById("banner");
    const likes = document.createElement("div");
    likes.classList.add("likes");
    target.appendChild(likes);
    const likesText = document.createElement("h5");
    likes.appendChild(likesText);
    likesText.textContent = totalLikes;
    const likesImg = document.createElement("img");
    likesImg.setAttribute("src", "./assets/icons/heart-solid.svg"); 
    likesImg.setAttribute("alt", "bouton like en forme de coeur")
    likes.appendChild(likesImg);
    const price = document.createElement("div");
    price.classList.add("price");
    target.appendChild(price);
    const priceText = document.createElement("h5");
    priceText.textContent = data.price + "€ / jour";
    price.appendChild(priceText);
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
            ? `<button aria-label="zoom sur l'image" onclick="openLightBox(${media.id} , ${ media.photographerId})" > <img src="assets/images/media/${photographer.name}/${media.image}" alt="photo de ${photographer.name}-${media.title}"></img></button>`
            : `<button aria-label="zoom sur l'image"" onclick="openLightBox(${media.id} , ${ media.photographerId})" > <video controls ><source src="assets/images/media/${photographer.name}/${media.video}" type="video/mp4" alt="vidéo de ${photographer.name}"></video></button>`
        }
        </div>
        <div class="mediaInfo">
        <div class="mediaTittle">
        <h3>${media.title}</h3>
        </div>
        <div class="mediaLikesAndPrice">
        <h4 id="${media.id}">${media.likes}</h4>
        <img class="noLike" src="./assets/icons/heart-solid-red.svg" alt="bouton like en forme de coeur" onclick="like(${media.id})">
        </div>
        </div>
        </article>
    `
    )
    .join('')
}
