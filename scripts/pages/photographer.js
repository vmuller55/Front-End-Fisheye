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
    console.log(photographer.photographers)
    const photographerInfo = photographer.photographers.find(
        (e) => e.id === id
    )
    console.log(photographerInfo)
    return photographerInfo
}

async function photographerHeader(){
    const photographerInfo = await getPhotographerInfo();
    const photographerHeader = document.getElementById('photograph-header');
    photographerHeaderFactory(photographerHeader, photographerInfo);
}

function init() {
    photographerHeader();
}

init();

