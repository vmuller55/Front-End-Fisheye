window.addEventListener("keydown", (e) => {
    if(e.key == "Tab") {
        console.log(e.target)
    }
})
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
    contactButton.addEventListener("click", function() { displayModal(), window.setTimeout(firstNameInput.focus(), 0)});
    const closeModalFocus = document.querySelector(".modal header img");
    closeModalFocus.addEventListener("click", function() {closeModal(), contactButton.focus()})
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
    target.setAttribute("tabindex", "0");
    likesText.setAttribute("tabindex", "0");
    likesImg.setAttribute("tabindex", "0");
    priceText.setAttribute("tabindex", "0");
}
/**
 * Fonction permettant de créer le code HTML relatif aux cards des photos
 * @param {HTMLElement} target 
 * @param {Array} mediaData 
 * @param {Array} photographer 
 */
function mediaFactory(target, mediaData, photographer) {
    mediaData.forEach(media => {
        const article = document.createElement("article");
        article.classList.add("media-card");
        target.appendChild(article);
        const blocImg = document.createElement("div");
        blocImg.classList.add("bloc-img");
        article.appendChild(blocImg);
        const button = document.createElement("button");
        blocImg.appendChild(button);
        if (media.image) {
            const img = document.createElement("img");
            img.setAttribute("src", "assets/images/media/" + photographer.name + "/" + media.image);
            img.setAttribute("alt", "photo de " + photographer.name + " - " + media.title);
            button.appendChild(img)
        } else {
            const video = document.createElement("video");
            video.setAttribute("controls", "controls");
            const source = document.createElement("source");
            source.setAttribute("src", "assets/images/media/" + photographer.name + "/" + media.video);
            source.setAttribute("alt", "video de " + photographer.name + " - " + media.title);
            button.appendChild(video);
            video.appendChild(source);
        }
        button.addEventListener("click", function() {openLightBox(mediaData, photographer, media)})
        const mediaInfo = document.createElement("div");
        mediaInfo.classList.add("mediaInfo");
        article.appendChild(mediaInfo);
        const mediaTittle = document.createElement("div");
        mediaTittle.classList.add("mediaTittle");
        mediaInfo.appendChild(mediaTittle);
        const h3 = document.createElement("h3");
        h3.setAttribute("tabindex", "0");
        h3.textContent = media.title;
        mediaTittle.appendChild(h3);
        const mediaLikeAndPrice = document.createElement("div");
        mediaLikeAndPrice.classList.add("mediaLikesAndPrice");
        mediaInfo.appendChild(mediaLikeAndPrice);
        const h4 = document.createElement("h4");
        h4.setAttribute("id", media.id);
        h4.textContent = media.likes;
        h4.setAttribute("tabindex", "0");
        mediaLikeAndPrice.appendChild(h4);
        const img = document.createElement("img");
        img.classList.add("noLike");
        img.setAttribute("src", "./assets/icons/heart-solid-red.svg");
        img.setAttribute("alt", "bouton like en forme de coeur");
        img.setAttribute("tabindex", "0");
        img.addEventListener("click", function() {like(media.id)});
        img.addEventListener("keypress", function() {like(media.id)});
        mediaLikeAndPrice.appendChild(img);
    });
}
