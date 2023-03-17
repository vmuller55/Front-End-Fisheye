/* eslint-disable no-unused-vars */
/**
* Fonction permettant de liker ou de retirer son like une photo
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
            like.nextElementSibling.setAttribute("alt", "bouton like en forme de coeur, ajoute un like")
        }
        else{
            like.textContent = ++likeContent;
            totalLikesSection.textContent = ++totalLikes;
            like.nextElementSibling.classList.replace("noLike", "liked")
            like.nextElementSibling.setAttribute("alt", "bouton like en forme de coeur, supprime le like ")
        }
}
/**
* Fonction qui permet de calculer le nombre total de likes
* @returns le nombre total de like
*/
function getTotalLikes(medias){
    let likes = 0;
    for (let i = 0; i < medias.length; i++) {
        likes += medias[i].likes;
    }
    return likes
}