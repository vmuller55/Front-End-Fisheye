/**
* Récupération de l'id grace a serch params
*/
var link = window.location.href;
var url = new URL(link);
var id = url.searchParams.get("id");
/**
 * Fonction permettant de récuperer les information relatives au photographe séléctionné et d'initialiser les fonctions pour trier et afficher les médias de l'artiste
 * @param {Array} photographers 
 * @param {Array} media 
 */
function getPhotographerInfo(photographers, media){
    const location = document.querySelector(".media_section");
    const photographerInfo = photographers.find(
        (e) => e.id == id
        )
    const mediaOfPhotographer = media.filter(
        (e) => e.photographerId == id
        )
    let sort = document.getElementById("sortBy");
    sort.addEventListener("change", () => {
        location.innerHTML = "";
        mediaOfPhotographer == sortMedia(mediaOfPhotographer, sort.value);  
        mediaFactory(location, mediaOfPhotographer, photographerInfo);
    });
    mediaOfPhotographer.sort((a,b) => b.likes - a.likes);
    mediaFactory(location, mediaOfPhotographer, photographerInfo);
    photographerHeader(photographerInfo, mediaOfPhotographer)
}
/**
* Fonction qui récupère les infos du photographe séléctionné et initialise la fonction factory pour créer le header du photographe
*/
function photographerHeader(infos, media){
     const photographerHeader = document.querySelector('.photograph-header');
     photographerHeaderDisplay(photographerHeader, infos, media);
}
/**
 * Fonction permettant de trier selon le choix fait par l'utilisateur!
 * @param {Array} media 
 * @param {string} sort 
 * @returns Les médias triés
 */
function sortMedia(media, sort){
     if (sort === "date"){ 
        return media.sort((a, b) => new Date (a.date).valueOf() - new Date(b.date).valueOf())
    }
    else{
        if(sort === "name") {
            return media.sort((a, b) => {
                if (a.title > b.title) {
                    return 1
                } else if (b.title > a.title) {
                    return -1
                } else {
                    return 0
                }
            })
        }
        else {
            return media.sort((a, b) => b.likes - a.likes)
        }
    }  
}
/**
* Fonction permettant de liker ou disliker 
* @param {String} id 
*/
function like(id) {
    const like = document.getElementById(id);
    const totalLikesSection = document.querySelector(".likes h5");
    let likeContent = like.textContent;
    let totalLikes = totalLikesSection.textContent;  
        if (like.nextElementSibling.classList.contains("liked")) {
            like.textContent = --likeContent;
            totalLikesSection.textContent = --totalLikes;
            like.nextElementSibling.classList.replace("liked", "noLike")
        }
        else{
            like.textContent = ++likeContent;
            totalLikesSection.textContent = ++totalLikes;
            like.nextElementSibling.classList.replace("noLike", "liked")
        }
}
/**
* Fonction qui permet de calculer le nombre total de like
* @returns le nombre total de like
*/
function getTotalLikes(medias){
    let likes = 0;
    for (let i = 0; i < medias.length; i++) {
        likes += medias[i].likes;
    }
    return likes
}
/**
* Fonction qui initialise les fonctions élémentaires
*/
async function init() {
    const [{photographers}, {media}] = await getPhotographers();
    getPhotographerInfo(photographers, media)
}

init();
        
        