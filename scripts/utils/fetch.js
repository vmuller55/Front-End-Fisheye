/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/**
 * Fonction permetant de récuperer les informations du fichier json
 * @returns le resultat du fetch dans un Array
 */

async function getPhotographers() {
    const dataLocation = './data/photographers.json';

    return fetch (dataLocation)
    .then(response => {
        if(response.ok) {
            return response.json()
        }
    })
    .then(response => {
        return ([ 
            {photographers : [...response.photographers]},
            {media: [...response.media]}
        ])
    })
    .catch(err => console.log("erreur sur le fetch json", err));
}