/**
 * Fonction permettant de fetch les donnée du fichier JSON
 * @returns la réponse du fetch dans une constante
 */
async function getPhotographers() {
    const response = await fetch('./data/photographers.json');
    const photographer = await response.json();
    return photographer;
}
/**
 * Fonction qui utilise le resultat du fetch précédant stocké dans une constante dans la fonction init 
 * @param {*} photographers const déclaré dans la fonction init, elle récupère le resultat du fetch
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

    
