/**
* Récupération de l'id grâce à serch params
*/
var link = window.location.href;
var url = new URL(link);
var id = url.searchParams.get("id");
/**
 * Fonction permettant de récupérer les informations relatives au photographe sélectionné et d'initialiser les fonctions pour trier et afficher les médias de l'artiste
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
* Fonction qui récupère les infos du photographe sélectionné et exécute la fonction pour afficher les éléments du header de la page photographe
*/
function photographerHeader(infos, media){
    const photographerHeader = document.querySelector('.photograph-header');
    photographerHeaderDisplay(photographerHeader, infos, media);
}
/**
* Fonction qui initialise les fonctions élémentaires
*/
async function init() {
    const [{photographers}, {media}] = await getPhotographers();
    getPhotographerInfo(photographers, media)
}

init();
        
        