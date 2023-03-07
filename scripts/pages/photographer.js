/**
 * Récupération de l'id grace a serch params
 */
var link = window.location.href;
var url = new URL(link);
var id = url.searchParams.get("id");
/**
 * Fonction qui permet de fetch le fichier JSON pour y récuperer les data
 * @returns 
 */
async function getPhotographers() {
    const response = await fetch('./data/photographers.json');
    const photographer = await response.json();
    return photographer;
}
/**
 * Fonction qui récupère le photographe lié à l'id de l'url
 */
async function getPhotographerInfo(){
    const photographer = await getPhotographers();
    const photographerInfo = photographer.photographers.find(
        (e) => e.id === +id
    )
    return photographerInfo
}
/**
 * Fonction qui récupère les infos du photographe séléctionné et initialise la fonction factory pour créer le header du photographe
 */
async function photographerHeader(){
    const photographerInfo = await getPhotographerInfo();
    const photographerHeader = document.querySelector('.photograph-header');
    photographerHeaderFactory(photographerHeader, photographerInfo);
}
/**
 * Fonction qui récupère tous les média liés à l'id du photographe à l'aide de la méthode .find
 * @returns 
 */
async function getMediaOfPhotographer(){
    const medias = await getPhotographers();
    const mediaOfPhotographer = medias.media.filter(
        (e) => e.photographerId === +id
    )
    return mediaOfPhotographer;
}
/**
 * Fonction qui permet de trier les médias en utilisant la methode .sort
 * @param {*} option 
 * @returns 
 */
async function sortBy(option){
    const media = await getMediaOfPhotographer();
    if (option === "date"){ 
        return media.sort((a, b) => new Date (a.date).valueOf() - new Date(b.date).valueOf());
    }
    else{
        if(option === "name") {
             return media.sort((a, b) => {
                if (a.title > b.title) {
                    return 1
                  } else if (b.title > a.title) {
                    return -1
                  } else {
                    return 0
                  }
            });
        }
        else {
            return media.sort((a, b) => b.likes - a.likes)
        }
    }
}
/**
 * Fonction qui récupère l'id du photographe séléctioné et qui initialise la fonction mediaFactory pour créer la page photographe
 * @param {*} media 
 */
async function displayMedia(media){
    const mediaSection = document.querySelector('.media_section');
    const photographerInfo = await getPhotographerInfo();
    const selectedOption = document.getElementById("sortBy");
    media = media ?? (await sortBy(selectedOption.value))
    mediaFactory(mediaSection, media, photographerInfo)
}
/**
 * Fonction qui permet de calculer le nombre total de like
 * @returns 
 */
async function getTotalLikes(){
    const medias = await getMediaOfPhotographer();
    let likes = 0;
    for (let i = 0; i < medias.length; i++) {
        likes += medias[i].likes;
    }
    return likes
}
/**
 * Fonction qui initialise le script
 */
function init() {
    photographerHeader();
    displayMedia();

}

init();

