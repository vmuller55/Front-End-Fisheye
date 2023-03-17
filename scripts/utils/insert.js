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