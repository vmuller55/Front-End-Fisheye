/**
 * Fonction permettant de créer le code HTML relatif aux cards des photos
 * @param {HTMLElement} target 
 * @param {Array} mediaData 
 * @param {object} photographer 
 */
function mediaFactory(target, mediaData, photographer) {
    /**
     * Permet de parcourir chaque média du photographe
     */
    mediaData.forEach(media => {
        const article = document.createElement("article");
        article.classList.add("media-card");
        target.appendChild(article);
        const blocImg = document.createElement("div");
        blocImg.classList.add("bloc-img");
        article.appendChild(blocImg);
        /**
         * Permet de vérifier si le média est une image ou une vidéo
         */
        if (media.image) {
            const img = document.createElement("img");
            img.setAttribute("src", "assets/images/media/" + photographer.name + "/" + media.image);
            img.setAttribute("alt", "photo de " + photographer.name + " - " + media.title);
            img.setAttribute("tabindex", "0")
            blocImg.appendChild(img);
            img.addEventListener("click", function() {openLightBox(mediaData, photographer, media)});
            img.addEventListener("keypress", function() {openLightBox(mediaData, photographer, media)});
        } else {
            const video = document.createElement("video");
            video.setAttribute("controls", "controls");
            video.setAttribute("tabindex", "0")
            const source = document.createElement("source");
            source.setAttribute("src", "assets/images/media/" + photographer.name + "/" + media.video);
            source.setAttribute("alt", "video de " + photographer.name + " - " + media.title);
            blocImg.appendChild(video);
            video.appendChild(source);
            video.addEventListener("click", function() {openLightBox(mediaData, photographer, media)});
            video.addEventListener("keypress", function() {openLightBox(mediaData, photographer, media)});
        }
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
        img.setAttribute("alt", "bouton like en forme de coeur, ajout d'un like");
        img.setAttribute("tabindex", "0");
        mediaLikeAndPrice.appendChild(img);
        /**
         * Listenner pour ajouter un like ou le retirer au clic ou avec le clavier sur l'image de coeur
         */
        img.addEventListener("click", function() {like(media.id)});
        img.addEventListener("keypress", function() {like(media.id)});
        
    });
}
