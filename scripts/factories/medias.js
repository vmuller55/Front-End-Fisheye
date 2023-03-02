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
 * 
 * @param {*} data 
 */

function mediaFactory(target, mediaData, photographer) {
    target.innerHTML = mediaData.map((media) => `
        <article class="media-card"> 
            <div class = "bloc-img">
                ${
                media.image
                    ? `<img class="for-zoom" src="assets/images/media/${photographer.name}/${media.image}" alt="photo de ${photographer.name}-${media.title}"></img>`
                    : `<video class="for-zoom"><source src="assets/images/media/${photographer.name}/${media.video}" type="video/mp4" alt="vidéo de ${photographer.name}"></video>`
                }
            </div>
            <div class="mediaInfo">
                <div class="mediaTittle">
                    <p>${media.title}</p>
                </div>
                <div id="mediaLikesAndPrice">
                    <p>${media.likes}</p>
                    <img src="./assets/icons/heart-solid-red.svg" alt="bouton like en forme de coeur">
                </div>
            </div>
        </article>
    `
    )
    .join('')
}