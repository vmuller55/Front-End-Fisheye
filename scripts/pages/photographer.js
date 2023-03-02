var link = window.location.href;
var url = new URL(link);
var id = url.searchParams.get("id");

async function getPhotographers() {
    const response = await fetch('./data/photographers.json');
    const photographer = await response.json();
    return photographer;
}

async function getPhotographerInfo(){
    const photographer = await getPhotographers();
    const photographerInfo = photographer.photographers.find(
        (e) => e.id === +id
    )
    return photographerInfo
}

async function photographerHeader(){
    const photographerInfo = await getPhotographerInfo();
    const photographerHeader = document.querySelector('.photograph-header');
    photographerHeaderFactory(photographerHeader, photographerInfo);
}

async function getMediaOfPhotographer(){
    const medias = await getPhotographers();
    const mediaOfPhotographer = medias.media.filter(
        (e) => e.photographerId === +id
    )
    return mediaOfPhotographer;
}

async function sortBy(option){
    const media = await getMediaOfPhotographer();
    console.log(option)
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




async function displayMedia(media){
    const mediaSection = document.querySelector('.media_section');
    const photographerInfo = await getPhotographerInfo();
    const selectedOption = document.getElementById("sortBy");
    media = media ?? (await sortBy(selectedOption.value))
    mediaFactory(mediaSection, media, photographerInfo)
}

async function getTotalLikes(){
    const medias = await getMediaOfPhotographer();
    let likes = 0;
    for (let i = 0; i < medias.length; i++) {
        likes += medias[i].likes;
    }
    return likes
}

function init() {
    photographerHeader();
    displayMedia();

}

init();

