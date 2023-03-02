/**
 * Fonction qui met en place le code HTML relatif au header du photographe
 * @param {*} target 
 * @param {*} data 
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
 * Fonction permettant d'ajouter un like à une photo en cliquant sur l'icone du coeur // incrémente la valeur totale
 * @param {*} id Prends en param l'id de la photo pour l'utiliser en tant qu'attribut id
 */
async function addLike(id){
    const like = document.getElementById(id);
    console.log(like.nextElementSibling)
    let likeContent = like.textContent;
    like.textContent = ++likeContent;
    const totalLikesSection = document.querySelector(".likes p");
    let totalLikes = totalLikesSection.textContent;
    totalLikesSection.textContent = ++totalLikes;
    like.nextElementSibling.setAttribute("onclick", "removeLike(" + id + ")");
    
}
/**
 * Fonction permettant d'enlever le like 
 * @param {*} id 
 */
async function removeLike(id) {
    const like = document.getElementById(id);
    console.log(like.nextElementSibling)
    let likeContent = like.textContent;
    like.textContent = --likeContent;
    const totalLikesSection = document.querySelector(".likes p");
    let totalLikes = totalLikesSection.textContent;
    totalLikesSection.textContent = --totalLikes;
    like.nextElementSibling.setAttribute("onclick", "addLike(" + id + ")");
}

/**
 * Fonction qui génère le code html relatif à l'affichage des médias
 * @param {*}  
 */
function mediaFactory(target, mediaData, photographer) {
    target.innerHTML = mediaData.map((media) => `
        <article class="media-card"> 
            <div class = "bloc-img">
                ${
                media.image
                    ? `<img src="assets/images/media/${photographer.name}/${media.image}" alt="photo de ${photographer.name}-${media.title}"></img>`
                    : `<video controls width="250"><source src="assets/images/media/${photographer.name}/${media.video}" type="video/mp4" alt="vidéo de ${photographer.name}"></video>`
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