/**
 * Fonction permettant de fetch les donnée du fichier JSON
 * @returns la réponse du fetch
 */
async function getPhotographers() {
    const response = await fetch('./data/photographers.json');
    const photographer = await response.json();
    return photographer;
}
/**
 * Fonction qui initialise la fonction fatory relative 
 * @param {*} photographers const déclaré dans la fonction init, elle récupère le resultat du fetch de la fonction getPhotographers
 */
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};
/**
 * Fonction qui récupère dans un objet le résultat du fetch 
 */
async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();

    
