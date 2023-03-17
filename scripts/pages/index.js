/* eslint-disable no-undef */
/**
 * Fonction qui initialise la fonction factory relative 
 * @param {Array} photographers 
 */
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}
/**
 * Fetch des data et initialisation de la fonction pour afficher les photographes
 */
async function init() {
    const [{ photographers }] = await getPhotographers();
    displayData(photographers);
}

init();

    
