/**
* Récupération de l'id grace a serch params
*/
var link = window.location.href;
var url = new URL(link);
var id = url.searchParams.get("id");
/**
* Fonction qui récupère le photographe lié à l'id de l'url
* @returns les infos du photographe correspondant
*/
function getPhotographerInfo(photographers, media){
    const photographerInfo = photographers.find(
        (e) => e.id == id
        )
    const mediaOfPhotographer = media.filter(
        (e) => e.photographerId == id
        )
    let sort = document.getElementById("sortBy");
    sort.addEventListener("change", () => {
            displayMedia(mediaOfPhotographer, photographerInfo, sort.value)   
    });
    displayMedia(mediaOfPhotographer, photographerInfo, sort.value);
    photographerHeader(photographerInfo, mediaOfPhotographer)

}
/**
* Fonction qui récupère les infos du photographe séléctionné et initialise la fonction factory pour créer le header du photographe
*/
function photographerHeader(infos, media){
     const photographerHeader = document.querySelector('.photograph-header');
     photographerHeaderDisplay(photographerHeader, infos, media);
}

function displayMedia(media, photographerInfo, sort){
     const mediaSection = document.querySelector('.media_section');
     
     if (sort === "date"){ 
        return media.sort((a, b) => new Date (a.date).valueOf() - new Date(b.date).valueOf()), mediaFactory(mediaSection, media, photographerInfo)
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
            }), mediaFactory(mediaSection, media, photographerInfo) ;
        }
        else {
            return media.sort((a, b) => b.likes - a.likes), mediaFactory(mediaSection, media, photographerInfo)
        }
    }
     
}
/**
* Fonction permettant d'enlever le like 
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
        
        