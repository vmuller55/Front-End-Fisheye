/**
* Fonction qui met en place le code HTML relatif au header du photographe
* @param {HTMLElement} target 
* @param {Array} data 
*/
function photographerHeaderDisplay(target, data, media) {
    photographerBannerDisplay(data, media);
    const photographInfo = document.createElement("div");
    photographInfo.classList.add("photographInfo");
    const h2 = document.createElement("h2");
    h2.classList.add("test");
    h2.textContent = data.name;
    const h3 = document.createElement("h3");
    h3.textContent = data.city + " " + data.country;
    const tagline = document.createElement("p");
    tagline.textContent = data.tagline;
    target.appendChild(photographInfo);
    photographInfo.appendChild(h2);
    photographInfo.appendChild(h3);
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
    const likesText = document.createElement("p");
    likes.appendChild(likesText);
    likesText.textContent = totalLikes;
    const likesImg = document.createElement("img");
    likesImg.setAttribute("src", "./assets/icons/heart-solid.svg"); 
    likes.appendChild(likesImg);
    const price = document.createElement("div");
    price.classList.add("price");
    target.appendChild(price);
    const priceText = document.createElement("p");
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
    
    mediaData.map((media) => {
        const mediaCard = document.createElement("article");
        mediaCard.classList.add("media-card");
        const blocimg = document.createElement("div");
        blocimg.classList.add("bloc-img");
        const btnLightbox = document.createElement("button");
        btnLightbox.addEventListener("click", function() {openLightBox(media, photographer, mediaData)});
        target.appendChild(mediaCard);
        mediaCard.appendChild(blocimg);
        blocimg.appendChild(btnLightbox);
        if(media.image) {
            const img = document.createElement("img");
            img.setAttribute("src", "assets/images/media/" + photographer.name + "/" + media.image);
            img.setAttribute("alt", "photo de " + photographer.name + "-" + media.title);
            btnLightbox.appendChild(img);
        }
        else {
            const video = document.createElement("video");
            const source = document.createElement("source");
            source.setAttribute("src", "assets/images/media/" + photographer.name + "/" + media.video);
            source.setAttribute("alt", "vidéo de " + photographer.name);
            btnLightbox.appendChild(video);
            video.appendChild(source);
        }
        const mediaInfo = document.createElement("div");
        mediaInfo.classList.add("mediaInfo");
        const mediaTittle = document.createElement("div");
        mediaTittle.classList.add("mediaTittle");
        const title = document.createElement("p");
        title.textContent = media.title;
        mediaCard.appendChild(mediaInfo);
        mediaInfo.appendChild(mediaTittle);
        mediaTittle.appendChild(title);
        const likeAndPrice = document.createElement("div");
        likeAndPrice.setAttribute("id", "mediaLikesAndPrice");
        const mediaLike = document.createElement("p");
        mediaLike.setAttribute("id", media.id);
        mediaLike.textContent = media.likes;
        const likeImg = document.createElement("img");
        likeImg.classList.add("noLike");
        likeImg.setAttribute("src", "./assets/icons/heart-solid-red.svg");
        likeImg.setAttribute("alt", "bouton like en forme de coeur");
        likeImg.addEventListener("click", function() {like(media.id)});
        mediaInfo.appendChild(likeAndPrice);
        likeAndPrice.appendChild(mediaLike);
        likeAndPrice.appendChild(likeImg);
    })
}

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
